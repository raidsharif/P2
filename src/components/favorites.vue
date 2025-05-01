<template>
  <div class="favoritter">
    <h2>❤️ Mine Favoritter</h2>

    <div v-if="favoritter.length">
      <ul>
        <li v-for="(opskrift, index) in favoritter" :key="index">
          🍽️ {{ opskrift.title }}
          <br/>
          <img :src="opskrift.imageUrl" style="max-width: 150px;">
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Du har ingen favoritter endnu 😢</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { currentUser } from '../router/store'

const favoritter = ref([])

onMounted(async () => {
  if (currentUser.value) {
    const res = await fetch(`http://localhost:5127/Hent-favoritter/${currentUser.value.userId}`)
    favoritter.value = await res.json()
  }
})
</script>
