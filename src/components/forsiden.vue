<template>
 <div>
    <!-- Knap til login eller opret -->
<div class = "login-signup" v-if="!setlogin">
 <button @click="gotologinopret"> login/opret </button>   
</div>

 <!-- Knap til søgning af ny opskrift -->
<div class = "searchnew">
 <button @click="gotosearch"> Search for a recipe </button>
 </div>

 <!-- Knap til at vise tidligere brugte opskrifter -->
<div class = "History">
 <button :disabled="!setlogin" @click="gohistorik">
  historik <span v-if="!setlogin">🔒</span>
 </button> 
 </div>

  <!-- Knap til favorit-opskrifter -->
<div class = "Favorite">
<button :disabled="!setlogin" @click="gofavoritter"> 
favorit <span v-if="!setlogin">🔒</span>
</button>
</div>

 </div>
</template>

<style>
/* Positionering af knapper på siden */
.login-signup{
position: absolute;
top: 20px; 
right: 20px;
}

.searchnew{
position: absolute;
top: 40%;
right: 48%; 
}

.history{
position: absolute;
top: 50%;
right: 50%;
}

.favorite{
position: absolute;
top: 60%;
right: 50%;    
}

/* Grå og deaktiveret stil når knapper er låste */
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

</style>





<script setup>
// Importerer router, så vi kan skifte side
import {useRouter} from 'vue-router'
import { setlogin } from '../router/store';

const router = useRouter();

// Funktion der navigerer til login/opret siden
function gotologinopret() {
    router.push('/Loginsignup')
}
function gotosearch() {
    router.push('/Enteringredients')
}

function gohistorik() {
  router.push('/History')
}

function gofavoritter() {
  router.push('/Favorites')
}
</script>



