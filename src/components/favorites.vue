<template>
    <div class="favoritter">
      <h2>❤️ Mine Favoritter</h2>
  
      <div v-if="currentUser?.favoritter?.length">
        <ul>
          <li v-for="(opskrift, index) in currentUser.favoritter" :key="index">
            🍽️ {{ opskrift.navn }}
            <br/>
            <button @click="visGuide(opskrift.navn)">📘 Vis Guide</button>
            <button @click="fjernFraFavoritter(opskrift)">❌ Fjern</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Du har ingen favoritter endnu 😢</p>
      </div>
  
      <!-- ✅ Grøn besked når en ret fjernes -->
      <p v-if="fjernBesked" class="success-message">{{ fjernBesked }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { currentUser } from '../router/store'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const fjernBesked = ref('')  // <-- Her gemmes besked midlertidigt
  
  function visGuide(navn) {
    router.push(`/guide/${encodeURIComponent(navn)}`)
  }
  
  function fjernFraFavoritter(opskrift) {
    if (currentUser.value) {
      currentUser.value.favoritter = currentUser.value.favoritter.filter(f => f.navn !== opskrift.navn)
      fjernBesked.value = `✅ "${opskrift.navn}" er fjernet fra favoritter!`
  
      // Fjern besked igen efter 3 sekunder
      setTimeout(() => {
        fjernBesked.value = ''
      }, 3000)
    }
  }
  </script>
  
  <style scoped>
  .favoritter {
    max-width: 600px;
    margin: 60px auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .success-message {
    margin-top: 20px;
    color: green;
    font-weight: bold;
  }
  </style>
  