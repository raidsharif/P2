<template>
  <div class="ingredient-container">
    <h2>Choose your ingredients</h2>

    <!-- 🔍 Søg efter ingredienser i listen -->
    <input
      type="text"
      v-model="soegeord"
      placeholder="Search from list..."
    />

    <!-- ✅ Liste over ingredienser (filtreret med søgning) -->
    <ul>
      <li v-for="(item, index) in filtreredeIngredienser" :key="index">
        <input type="checkbox" v-model="item.selected" />
        {{ item.name }}
      </li>
    </ul>

    <!-- ➕ Tilføj ny ingrediens -->
    <div class="tilfoej-ny">
      <input
        type="text"
        v-model="nyIngrediens"
        placeholder="Add ingredient"
        @keyup.enter="tilfoejIngrediens"
      />
      <button @click="tilfoejIngrediens">Add</button>
    </div>

    <!-- ✅ Valgte ingredienser -->
    <div class="valgte">
      <h3>You have selected:</h3>
      <ul>
        <li v-for="item in ingredienser.filter(i => i.selected)" :key="item.name">
          ✅ {{ item.name }}
        </li>
      </ul>
    </div>

    <!-- 👉 Gå videre -->
    <div class="Next">
      <button @click="gotoopskraft">Search</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { currentUser } from '../router/store'
import { onMounted } from 'vue'
import { valgteIngredienser } from '../router/store'

const router = useRouter()


const ingredienser = ref([

    { name: 'Chicken', selected: false },
    { name: 'Milk', selected: false },
    { name: 'Cream', selected: false },
    { name: 'Butter', selected: false },
    { name: 'cheese', selected: false },
    { name: 'Yoghurt', selected: false },

    { name: 'Flour', selected: false },
    { name: 'Sugar', selected: false },
    { name: 'Salt', selected: false },
    { name: 'Pepper', selected: false },
    { name: 'Yeast', selected: false },
    { name: 'Rice', selected: false },
    { name: 'Pasta', selected: false },
    { name: 'Broth', selected: false },
    { name: 'Olive oil', selected: false },
    { name: 'Canola oil', selected: false },
    { name: 'Tomato paste', selected: false },
    { name: 'Ketchup', selected: false },
    { name: 'Mayonnaise', selected: false },

    { name: 'Chicken', selected: false },
    { name: 'Beef', selected: false },
    { name: 'Tuna (canned)', selected: false },
    { name: 'Salmon', selected: false },

    { name: 'Potatoes', selected: false },
    { name: 'Onion', selected: false },
    { name: 'Garlic', selected: false },
    { name: 'Tomato', selected: false },
    { name: 'Cucumber', selected: false },
    { name: 'Carrots', selected: false },
    { name: 'Chili', selected: false },
    { name: 'Bell pepper', selected: false },
    { name: 'Spinach', selected: false },
    { name: 'Lemon', selected: false },
    { name: 'Banana', selected: false },
    { name: 'Apple', selected: false },
    { name: 'Orange', selected: false }


])

// adder brugens egne tidligere ingredenser ind i listen
onMounted(() => {
  if (currentUser.value && Array.isArray(currentUser.value.egneIngredienser))
    {
    currentUser.value.egneIngredienser.forEach(name => {
      ingredienser.value.push({ name, selected: false })
    })
  }
})

const nyIngrediens = ref('')
const soegeord = ref('')

// Tilføj ingrediens manuelt
function tilfoejIngrediens() {
  const name = nyIngrediens.value.trim()
  if (name !== '') {
    ingredienser.value.push({ name, selected: true })
    nyIngrediens.value = ''
     // gem i brugerens egne ingredienser
     if (currentUser.value) {
      const findesAllerede = currentUser.value.egneIngredienser.includes(name)
      if (!findesAllerede) {
      currentUser.value.egneIngredienser.push(name)
    }
  }
}
}

// Filtrer listen med søgeord
const filtreredeIngredienser = computed(() =>
  ingredienser.value.filter((item) =>
    item.name.toLowerCase().includes(soegeord.value.toLowerCase())
  )
)

async function gotoopskraft() {
  const selectedI = ingredienser.value.filter(i => i.selected).map(i => i.name);
  valgteIngredienser.value = selectedI;

  const userId = currentUser.value?.userId ?? null;
  // Gem ingredienser
  if(userId !== null) {
    await fetch('http://localhost:5127/gem-ingredienser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: currentUser.value.userId,
        ingredients: selectedI.join(',')
      })
    });
  }

  // Hent forslag
  const res = await fetch('http://localhost:5127/fetch-recipes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      ingredients: selectedI.join(',')
    })
  });

  const ids = await res.json();
  console.log("Hentede opskrifter med id'er:", ids);

  router.push('/opskrafterliste');
}


</script>

<style scoped>
.ingredient-container {
  max-width: 400px;
  margin: 80px auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input[type="text"] {
  padding: 8px;
  font-size: 1rem;
  width: 100%;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  gap: 10px;
}

button {
  padding: 8px 12px;
  font-size: 1rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2d8c6e;
}

.tilfoej-ny {
  display: flex;
  gap: 10px;
  align-items: center;
}

.valgte {
  position: absolute;
  top: 35%;
  right: 350px;
}

.Next {
  position: absolute;
  top: 90%;
  right: 20px;
}
</style>
