<template>
  <div class="ingredient-container">
    <h2>Vælg de ingredienser du har</h2>

    <!-- 🔍 Søg efter ingredienser i listen -->
    <input
      type="text"
      v-model="soegeord"
      placeholder="Søg i listen..."
    />

    <!-- ✅ Liste over ingredienser (filtreret med søgning) -->
    <ul>
      <li v-for="(item, index) in filtreredeIngredienser" :key="index">
        <input type="checkbox" v-model="item.valgt" />
        {{ item.navn }}
      </li>
    </ul>

    <!-- ➕ Tilføj ny ingrediens -->
    <div class="tilfoej-ny">
      <input
        type="text"
        v-model="nyIngrediens"
        placeholder="Tilføj en ingrediens"
        @keyup.enter="tilfoejIngrediens"
      />
      <button @click="tilfoejIngrediens">Tilføj</button>
    </div>

    <!-- ✅ Valgte ingredienser -->
    <div class="valgte">
      <h3>Du har valgt:</h3>
      <ul>
        <li v-for="item in ingredienser.filter(i => i.valgt)" :key="item.navn">
          ✅ {{ item.navn }}
        </li>
      </ul>
    </div>

    <!-- 👉 Gå videre -->
    <div class="Next">
      <button @click="gotoopskraft">Next</button>
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
  //  Mejeri og basis
  { navn: 'Æg', valgt: false },
  { navn: 'Mælk', valgt: false },
  { navn: 'Fløde', valgt: false },
  { navn: 'Smør', valgt: false },
  { navn: 'Ost', valgt: false },
  { navn: 'Yoghurt', valgt: false },

  //  Kolonialvarer
  { navn: 'Mel', valgt: false },
  { navn: 'Sukker', valgt: false },
  { navn: 'Salt', valgt: false },
  { navn: 'Peber', valgt: false },
  { navn: 'Gær', valgt: false },
  { navn: 'Ris', valgt: false },
  { navn: 'Pasta', valgt: false },
  { navn: 'Bouillon', valgt: false },
  { navn: 'Olivenolie', valgt: false },
  { navn: 'Rapsolie', valgt: false },
  { navn: 'Tomatpuré', valgt: false },
  { navn: 'Ketchup', valgt: false },
  { navn: 'Mayonnaise', valgt: false },

  //   kød og fisk
  { navn: 'Kylling', valgt: false },
  { navn: 'oksekød', valgt: false },
  { navn: 'Tun (på dåse)', valgt: false },
  { navn: 'Laks', valgt: false },

  //  Grøntsager og frugt
  { navn: 'Kartofler', valgt: false },
  { navn: 'Løg', valgt: false },
  { navn: 'Hvidløg', valgt: false },
  { navn: 'Tomat', valgt: false },
  { navn: 'Agurk', valgt: false },
  { navn: 'Gulerødder', valgt: false },
  { navn: 'Chili', valgt: false },
  { navn: 'Peberfrugt', valgt: false },
  { navn: 'Spinat', valgt: false },
  { navn: 'Citron', valgt: false },
  { navn: 'Banan', valgt: false },
  { navn: 'Æble', valgt: false },
  { navn: 'Appelsin', valgt: false }
])

// adder brugens egne tidligere ingredenser ind i listen
onMounted(() => {
  if (currentUser.value && currentUser.value.egneIngredienser.length > 0) {
    currentUser.value.egneIngredienser.forEach(navn => {
      ingredienser.value.push({ navn, valgt: false })
    })
  }
})

const nyIngrediens = ref('')
const soegeord = ref('')

// Tilføj ingrediens manuelt
function tilfoejIngrediens() {
  const navn = nyIngrediens.value.trim()
  if (navn !== '') {
    ingredienser.value.push({ navn, valgt: true })
    nyIngrediens.value = ''
     // gem i brugerens egne ingredienser
     if (currentUser.value) {
      const findesAllerede = currentUser.value.egneIngredienser.includes(navn)
      if (!findesAllerede) {
      currentUser.value.egneIngredienser.push(navn)
    }
  }
}
}

// Filtrer listen med søgeord
const filtreredeIngredienser = computed(() =>
  ingredienser.value.filter((item) =>
    item.navn.toLowerCase().includes(soegeord.value.toLowerCase())
  )
)

async function gotoopskraft() {
  const valgte = ingredienser.value.filter(i => i.valgt).map(i => i.navn);
  valgteIngredienser.value = valgte;

  // Gem ingredienser
  await fetch('http://localhost:5127/gem-ingredienser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: currentUser.value.userId,
      ingredients: valgte.join(',')
    })
  });

  // Hent forslag
  const res = await fetch('http://localhost:5127/fetch-recipes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: currentUser.value.userId,
      ingredients: valgte.join(',')
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
