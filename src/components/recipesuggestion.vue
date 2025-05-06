<template>
  <div class="suggestion-container">
    <h2>Opskriftsforslag ud fra dine ingredienser</h2>

    <div v-if="!setlogin">
      <p class="hint">🔓 Log ind for at få flere opskrifter fra databasen!</p>
    </div>

    <p>Du har valgt:</p>
    <ul>
      <li v-for="(item, index) in valgteIngredienser" :key="index">
        ✅ {{ item }}
      </li>
    </ul>

    <h3>Vi foreslår:</h3>
    <ul>
      <li v-for="recipe in matchedeOpskrifter" :key="recipe.navn">
        <img :src="recipe.billede" alt="Billede af retten" width="200" />
        <h4>{{ recipe.navn }}</h4>
        <small>Kræver: {{ recipe.ingredienser.join(', ') }}</small>
        <br />
        <button @click="visGuide(recipe.id)">📘 Guide</button>
        <button v-if="setlogin" @click="tilføjFavorit(recipe)">❤️ Favorit</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { valgteIngredienser, opskrifter, currentUser, setlogin } from '../router/store'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(async () => {
  if (currentUser.value) {
    const res = await fetch('http://localhost:5127/opskrifter')
    const data = await res.json()

    opskrifter.value = data.map(r => ({
    navn: r.title,
    ingredienser: r.ingredients.split(', '),
    beskrivelse: r.instructions,
    id: r.recipeId,
    billede: r.imageUrl
    }));
  }
})

const matchedeOpskrifter = computed(() =>
  opskrifter.value.filter(opskrift =>
    opskrift.ingredienser.some(ing =>
      valgteIngredienser.value.some(valgt =>
        ing.toLowerCase().includes(valgt.toLowerCase())
      )
    )
  )
);

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
