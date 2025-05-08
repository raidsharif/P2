<template>
  <div class="history">
    <h2>🕘 My History</h2>

    <div v-if="history.length">
      <ul>
        <li v-for="(opskrift, index) in history" :key="index">
          {{ opskrift.title }} ({{ opskrift.viewedAt }})
          <br />
          <img :src="opskrift.imageUrl" style="max-width: 150px;">
          <br />
          <button @click="visGuide(opskrift)">📘 Guide</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No recipes yet😴</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { currentUser } from '../router/store'
import { useRouter } from 'vue-router'


const history = ref([])
const router = useRouter()

function visGuide(opskrift) {
  router.push(`/guide/${opskrift.recipeId}`);
}

onMounted(async () => {
  if (currentUser.value) {
    const res = await fetch(`http://localhost:5127/Henter-historik/${currentUser.value.userId}`)
    history.value = await res.json()
    console.log("Historikdata:", history.value)

  }
})
</script>
