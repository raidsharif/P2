<template>
  <div class="historik">
    <h2>🕘 My History</h2>

    <div v-if="historik.length">
      <ul>
        <li v-for="(opskrift, index) in historik" :key="index">
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


const historik = ref([])
const router = useRouter()

function visGuide(opskrift) {
  router.push(`/guide/${opskrift.recipeId}`);
}

onMounted(async () => {
  if (currentUser.value) {
    const res = await fetch(`http://localhost:5127/Henter-historik/${currentUser.value.userId}`)
    historik.value = await res.json()
    console.log("Historikdata:", historik.value)

  }
})
</script>
