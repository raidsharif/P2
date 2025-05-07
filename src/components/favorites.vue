<template>
  <div class="favoritter">
    <h2>❤️ My Favorites</h2>

    <div v-if="favoritter.length">
      <ul>
        <li v-for="(opskrift, index) in favoritter" :key="index">
          🍽️ {{ opskrift.title }}
          <br/>
          <img :src="opskrift.imageUrl" style="max-width: 150px;">
          <br/>
          <button @click="visGuide(opskrift)">📘 Guide</button>
          <button @click="fjernFavorit(opskrift)">🗑 Fjern</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No Favorites 😢</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { currentUser } from '../router/store'
import { useRouter } from 'vue-router'
const router = useRouter()


const favoritter = ref([])

onMounted(async () => {
  if (currentUser.value) {
    const res = await fetch(`http://localhost:5127/Hent-favoritter/${currentUser.value.userId}`)
    favoritter.value = await res.json()
  }
})

function visGuide(opskrift) {
  router.push(`/guide/${opskrift.recipeId}`);
}

async function fjernFavorit(opskrift) {
  if (!currentUser.value) return;

  const bekræft = confirm(`Er du sikker på, at du vil fjerne "${opskrift.title}" fra dine favoritter?`);
  if (!bekræft) return;

  await fetch(`http://localhost:5127/Fjern-favoritter?userId=${currentUser.value.userId}&recipeId=${opskrift.recipeId}`, {
    method: 'POST'
  });

  favoritter.value = favoritter.value.filter(f => f.recipeId !== opskrift.recipeId);
}

</script>
