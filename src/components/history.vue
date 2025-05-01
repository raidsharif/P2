<template>
    <div class="historik">
      <h2>🕘 Min Historik</h2>
  
      <div v-if="currentUser?.historik?.length">
        <ul>
          <li v-for="(opskrift, index) in currentUser.historik" :key="index">
            {{ opskrift.navn }}
            <button @click="visGuide(opskrift.navn)">📘 Vis Guide</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Du har ikke kigget på nogen opskrifter endnu 😴</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { currentUser } from '../router/store'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  function visGuide(navn) {
    router.push(`/guide/${encodeURIComponent(navn)}`)
  }
  </script>
  
  <style scoped>
  .historik {
    max-width: 600px;
    margin: 60px auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  </style>
  