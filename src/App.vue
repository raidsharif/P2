<script setup>
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="app-container">
    <header class="topbar">
      <img
        src="/logo.png"
        alt="Madlogo"
        class="logo"
        @click="goHome"
      />
      <button class="home-button" @click="goHome">🏠 Forside</button>
    </header>

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
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #42b883;
  padding: 1rem 2rem;
  color: white;
}

.logo {
  height: 60px;
  cursor: pointer;
}

.home-button {
  background-color: white;
  color: #42b883;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.home-button:hover {
  background-color: #e0f5ef;
}

.main-content {
  flex: 1;
  padding: 1rem;
}
</style>
