<script setup>
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()
//test test

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="app-container">
  
      <img
        src="/logo.png"
        alt="Madlogo"
        class="logo"
        @click="goHome"
      />
      <button class="home-button" @click="goHome">Home Page</button>
  

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;  /* Center content horizontally */
  justify-content: center;  /* Center content vertically */
}

.logo {
  width: 120px;
  height: auto;
  cursor: pointer;
  margin-bottom: 1rem;  /* Add some space below the logo */
}

.home-button {
  background-color: white;
  color: #42b883;
  padding: 0.5rem 0.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
}

.home-button:hover {
  background-color: #e0f5ef;
}

.main-content {
  flex: 1;
  padding: 1rem;
}
</style>