<template>
    <div class="form-container">
      <h2>Opret Bruger</h2>

       <!-- Inputfelter til brugernavn og adgangskoder -->
      <input
        type="tekst"
        v-model="username"
        placeholder="lav et brugernavn"
      />
  
      <input
        type="password"
        v-model="password"
        placeholder="lav en adgangskode"
      />

      <input
        type="password"
        v-model="password2"
        placeholder="gentage adgangskode"
      />
        <!-- Knap til oprettelse -->
      <button @click="signup">Opret Bruger</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import {useRouter} from 'vue-router'
  import { brugerdatabase } from '../router/store'

  const router = useRouter()

  // input-felter
  const username = ref('')
  const password = ref('')
  const password2 = ref('')

 

  function signup() {
    
    // Viser hvad brugeren forsøger at oprette
    alert(`Du prøver at oprette dig med:\nbrugernavn: ${username.value}\nKode: ${password.value}`)
    
    // Tjek om adgangskoder matcher
    if (password.value !== password2.value) {
      alert("Adgangskoderne mastcer ikke")
      return
    }

    // Tjek om brugernavn allerede findes
    const eksisterer = brugerdatabase.value.find(
      (bruger) => bruger.username === username.value
    )
  
    // Hvis det findes, vis besked – ellers gem brugeren
  if (eksisterer) {
    alert("brugernavnet er allerede i brug")
  } else {
    brugerdatabase.value.push({
      username: username.value,
      password: password.value,
    })
    alert("bruger oprettet!")
    router.push('/') // Gå til forsiden
  }
}
  </script>
  
  <style scoped>
  /* Styling af formen */
  .form-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 300px;
    margin: 100px auto;
  }
  
  input {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    padding: 10px;
    background-color: #42b883;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
  }
  button:hover {
    background-color: #2d8c6e;
  }
  </style>



