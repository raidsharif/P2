<template>
  <div v-if="opskrift" class="guide-container">
    <h2>{{ opskrift.title }}</h2>
    <img :src="opskrift.imageUrl" style="max-width: 300px;" />
    <p><strong>⏱ Tid:</strong> {{ opskrift.prepTimeMinutes }} minutter</p>
    <p><strong>🍽 Portioner:</strong> {{ opskrift.servings }}</p>
    <p><strong>Ingredienser:</strong></p>
    <ul>
      <li v-for="(ing, i) in opskrift.ingredienser" :key="i">🧂 {{ ing }}</li>
    </ul>
    <p><strong>Sådan gør du:</strong></p>
    <p>{{ opskrift.instructions }}</p>

    <button @click="router.push('/opskrafterliste')">🔙 Tilbage</button>
    <button v-if="currentUser" @click="tilføjFavorit">❤️ Favorit</button>
  </div>

  <div v-else class="guide-container">
    <h2>😕 Opskrift ikke fundet</h2>
    <p>Vi kunne ikke finde guiden til denne opskrift.</p>
    <button @click="router.push('/opskrafterliste')">🔙 Gå tilbage</button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { currentUser } from '../router/store'

const route = useRoute()
const router = useRouter()
const opskrift = ref(null)

onMounted(async () => {
  const recipeId = Number(route.params.id)

  // Hent alle opskrifter
  const res = await fetch('http://localhost:5127/opskrifter')
  const allRecipes = await res.json()

  const match = allRecipes.find(r => r.recipeId === recipeId)


  if (match) {
  opskrift.value = {
    ...match,
    ingredienser: match.ingredients?.split(', ') ?? []
  }

  if (currentUser.value) {
    await fetch('http://localhost:5127/fetch-recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: currentUser.value.userId,
        ingredients: ""
      })
    })
  }
}
})
  
async function tilføjFavorit() {
  if (currentUser.value && opskrift.value) {
    await fetch('http://localhost:5127/Marker-favoritter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: currentUser.value.userId,
        recipeId: opskrift.value.recipeId
      })
    })
    alert(`${opskrift.value.title} tilføjet til favoritter!`)
  }
}
</script>


<style scoped>
.guide-container {
  max-width: 600px;
  margin: 60px auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
