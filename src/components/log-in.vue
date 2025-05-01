<template>
    <div class="form-container">
      <h2>Login</h2>
  
       <!-- Inputfelter -->
      <input
        type="text"
        v-model="username"
        placeholder="skriv dit brugernavn"
      />
  
      <input
        type="password"
        v-model="password"
        placeholder="skriv din adgangskode"
      />
        <!-- Login-knap -->
      <button @click="login">Login</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import {useRouter} from 'vue-router'
  import { setlogin, brugerdatabase, currentUser } from '../router/store'
 
  
  // Inputdata
  const username = ref('')
  const password = ref('')

  const router = useRouter()
  
  
  function login() {
    alert(`Du prøver at login som:\nbrugernavn: ${username.value}\nKode: ${password.value}`)
    // Her kan du senere lave rigtig signup-logik
    
    // Tjek om brugernavn og kode findes i databasen
    const bruger = brugerdatabase.value.find( 
      (bruger) => bruger.username === username.value 
      && bruger.password === password.value
    )

    if (bruger) {
    setlogin.value = true // 🔓 Brugeren er nu logget ind!
    alert("login godkendt")
    currentUser.value = bruger // 💚 gem hvem der er logget ind
    router.push('/')
  } else {
  alert("forket navn eller kode!");
        }
  }

  
  </script>
  
  <style scoped>
  /* Samme styling som i sign-up */
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