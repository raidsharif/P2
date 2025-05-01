<template>
  <div class="suggestion-container">
    <!-- Overskrift -->
    <h2>Opskriftsforslag ud fra dine ingredienser</h2>

    <!-- Viser listen af ingredienser brugeren har valgt -->
    <p>Du har valgt:</p>
    <ul>
      <li v-for="(item, index) in valgteIngredienser" :key="index">
        ✅ {{ item }}
      </li>
    </ul>

    <!-- Viser de opskrifter som matcher de valgte ingredienser -->
    <h3>Vi foreslår:</h3>
    <ul>
      <li v-for="recipe in matchedeOpskrifter" :key="recipe.navn">
        🍽️ {{ recipe.navn }}
        <br />
        <small>Kræver: {{ recipe.ingredienser.join(', ') }}</small>
        <br />
        <!-- Knap til at gå til guide for denne opskrift -->
        <button @click="visGuide(recipe.navn)">📘 Guide</button>
        <!-- Knap til at tilføje opskriften som favorit -->
        <button @click="tilføjFavorit(recipe)">❤️ Favorit</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
// Importerer nødvendige ting
import { valgteIngredienser, opskrifter } from '../router/store'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { currentUser } from '../router/store'

// Opretter router så vi kan skifte side
const router = useRouter()

// Funktion til at vise guiden for en bestemt opskrift
function visGuide(navn) {
  // Finder opskriften ud fra navnet
  const recipe = opskrifter.value.find(r => r.navn === navn)

  if (currentUser.value && recipe) {
    // Hvis brugeren er logget ind og opskriften ikke allerede er i historik
    const findes = currentUser.value.historik.find(h => h.navn === recipe.navn)
    if (!findes) {
      // Tilføjer opskriften til historik
      currentUser.value.historik.push(recipe)
    }
  }
  // Navigerer videre til guide-siden for opskriften
  router.push(`/guide/${encodeURIComponent(recipe.navn)}`)
}

// Computed property til at finde de opskrifter som matcher valgte ingredienser
const matchedeOpskrifter = computed(() =>
  opskrifter.value.filter((opskrifter) =>
    // Kun opskrifter hvor alle ingredienser findes i brugerens valgte ingredienser
    opskrifter.ingredienser.every(ing =>
      valgteIngredienser.value.includes(ing)
    )
  )
)

// Funktion til at tilføje en opskrift til favoritter
function tilføjFavorit(recipe) {
  if (currentUser.value) {
    // Tjekker om opskriften allerede findes i favoritter
    const findes = currentUser.value.favoritter.find(f => f.navn === recipe.navn)
    if (!findes) {
      // Hvis ikke, så tilføjes opskriften til favoritter
      currentUser.value.favoritter.push(recipe)
      alert(`${recipe.navn} er tilføjet til favoritter!`)
    }
  }
}
</script>

<style scoped>
/* Styling af containeren for forslagene */
.suggestion-container {
  max-width: 600px;
  margin: 60px auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Fjerner standard bullets fra lister */
ul {
  list-style: none;
  padding: 0;
}

/* Giver lidt afstand mellem hver opskrift */
li {
  margin-bottom: 0.5rem;
}
</style>