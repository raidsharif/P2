<template>
  <div class="suggestion-container">
    <h2>Recipe suggestions based on your ingredients</h2>

    <div v-if="!setlogin">
      <p class="hint">🔓 Log in to get more recipes from the database!</p>
    </div>

    <p>You have chosen:</p>
    <ul>
      <li v-for="(item, index) in valgteIngredienser" :key="index">
        ✅ {{ item }}
      </li>
    </ul>

    <h3>We suggest:</h3>
    <ul>
      <li v-for="recipe in matchedeOpskrifter" :key="recipe.navn">
        <img :src="recipe.billede" alt="Billede af retten" width="200" />
        <h4>{{ recipe.navn }}</h4>
        <p><strong>⏱ Tid:</strong> {{ recipe.tid }} minutter</p>
        <p><strong>🍽 Portioner:</strong> {{ recipe.portioner }}</p>
        <small>Kræver: {{ recipe.ingredienser.join(', ') }}</small>
        <br />
        <button @click="visGuide(recipe.id)">📘 Guide</button>
        <button v-if="setlogin" @click="tilføjFavorit(recipe)">❤️ Favorit</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { valgteIngredienser, currentUser, setlogin } from '../router/store'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const opskrifter = ref([])
const router = useRouter()

onMounted(async () => {
    const res = await fetch('http://localhost:5127/opskrifter')
    const data = await res.json()

    opskrifter.value = data.map(r => ({
      navn: r.title,
      ingredienser: r.ingredients?.split(', ') ?? [],
      beskrivelse: r.instructions,
      id: r.recipeId,
      billede: r.imageUrl,
      tid: r.prepTimeMinutes,
      portioner: r.servings
    }));
});

const matchedeOpskrifter = computed(() => {
  return opskrifter.value
    .map(opskrift => {
      // Calculate matched ingredients count
      const matchedCount = opskrift.ingredienser.filter(ing =>
        valgteIngredienser.value.some(valgt =>
          ing.toLowerCase().includes(valgt.toLowerCase())
        )
      ).length;

      return {
        ...opskrift,
        matchedCount
      };
    })
    .filter(opskrift => opskrift.matchedCount > 0) // Include only recipes with matches
    .sort((a, b) => b.matchedCount - a.matchedCount) // Sort by number of matched ingredients
    .slice(0, 10); // Limit to 10 recipes
});

function visGuide(id) {
  router.push(`/guide/${id}`)
}

async function tilføjFavorit(recipe) {
  if (currentUser.value) {
    await fetch('http://localhost:5127/Marker-favoritter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: currentUser.value.userId,
        recipeId: recipe.id
      })
    })
    alert(`${recipe.navn} er tilføjet til favoritter!`)
  }
}
</script>

<style scoped>
.suggestion-container {
  max-width: 600px;
  margin: 60px auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 0.5rem;
}
.hint {
  background-color: #fff3cd;
  padding: 0.8rem;
  border: 1px solid #ffeeba;
  border-radius: 5px;
  color: #856404;
}
</style>
