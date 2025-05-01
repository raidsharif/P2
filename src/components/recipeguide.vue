<template>
    <div v-if="opskrift" class="guide-container">
      <h2>{{ opskrift.navn }}</h2>
      <p><strong>Ingredienser:</strong> {{ opskrift.ingredienser.join(', ') }}</p>
      <p><strong>Sådan gør du:</strong></p>
      <p>{{ opskrift.beskrivelse }}</p>
  
      <button @click="router.push('/opskrafterliste')">🔙 Tilbage</button>
      <button @click="tilføjFavorit(opskrift.value)">❤️ Favorit</button>
    </div>
  
    <div v-else class="guide-container">
      <h2>😕 Opskrift ikke fundet</h2>
      <p>Vi kunne ikke finde guiden til denne opskrift.</p>
      <button @click="router.push('/opskrafterliste')">🔙 Gå tilbage</button>
    </div>
  </template>
  
  <script setup>
  import { useRoute, useRouter } from 'vue-router'
  import { opskrifter, currentUser } from '../router/store'
  import { ref, onMounted } from 'vue'
  
  const route = useRoute()
  const router = useRouter()
  
  const opskrift = ref(null)
  
  onMounted(() => {
    const navnFraURL = decodeURIComponent(route.params.navn || '').toLowerCase()
  
    const fundet = opskrifter.value.find(r =>
      r.navn.toLowerCase() === navnFraURL
    )
  
    if (fundet) {
      opskrift.value = fundet
  
      // Tilføj til historik hvis det ikke allerede findes
      if (currentUser.value) {
        const findes = currentUser.value.historik.find(
          h => h.navn === fundet.navn
        )
        if (!findes) {
          currentUser.value.historik.push(fundet)
        }
      }
    }
  })
  
  function tilføjFavorit() {
    if (currentUser.value && opskrift.value) {
      const findes = currentUser.value.favoritter.find(f => f.navn === opskrift.value.navn)
      if (!findes) {
        currentUser.value.favoritter.push(opskrift.value)
        alert(`${opskrift.value.navn} er tilføjet til favoritter!`)
      }
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
  