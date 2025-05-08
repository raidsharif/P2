<template>
    <div class="form-container">
      <h2>Login</h2>
  
       <!-- Inputfelter -->
      <input
        type="text"
        v-model="username"
        placeholder="Username"
      />
  
      <input
        type="password"
        v-model="password"
        placeholder="Password"
      />
        <!-- Login-knap -->
      <button @click="login">Login</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import {useRouter} from 'vue-router'
  import { currentUser, setlogin } from '../router/store'
  
  // Inputdata
  const username = ref('')
  const password = ref('')

  const router = useRouter()
  
  


async function login() {
  const response = await fetch('http://localhost:5127/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  })

  const data = await response.json()

  if (data.success) {
    currentUser.value = {
      userId: data.userId,
      username: data.username,
      token: data.token
    }
    setlogin.value = true
    alert("Login succesfuldt!")
    router.push('/')
  } else {
    alert("Fejl: " + data.message)
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