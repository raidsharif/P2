<template>
    <div class="form-container">
      <h2>Register User</h2>

       <!-- Inputfelter til brugernavn og adgangskoder -->
      <input
        type="tekst"
        v-model="username"
        placeholder="Username"
      />
  
      <input
        type="password"
        v-model="password"
        placeholder="Password"
      />

      <input
        type="password"
        v-model="password2"
        placeholder="Repeat password"
      />
        <!-- Knap til oprettelse -->
      <button @click="signup">Create User</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import {useRouter} from 'vue-router'

  const router = useRouter()

  // input-felter
  const username = ref('')
  const password = ref('')
  const password2 = ref('')

  
  async function signup() {
  if (password.value !== password2.value) {
    alert("Adgangskoderne matcher ikke");
    return;
  }

  const res = await fetch('http://localhost:5127/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  });

  const data = await res.json();

  if (data.success) {
    alert("Bruger oprettet!");
    router.push('/log-in');
  } else {
    alert("Fejl: " + data.message);
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



