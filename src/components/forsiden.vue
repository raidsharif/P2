<template>
 <div>
    <!-- Knap til login eller opret -->
<div class = "login-signup" v-if="!setlogin">
 <button @click="gotologinopret"> Log in/Sign Up </button>   
</div>

 <!-- Knap til søgning af ny opskrift -->
<div class = "searchnew">
 <button @click="gotosearch"> Search for a recipe </button>
 </div>

 <!-- Knap til at vise tidligere brugte opskrifter -->
<div class = "History">
 <button :disabled="!setlogin" @click="gohistorik">
  Recipe History <span v-if="!setlogin">🔒</span>
 </button> 
 </div>

  <!-- Knap til favorit-opskrifter -->
<div class = "Favorite">
<button :disabled="!setlogin" @click="gofavoritter"> 
Favorites <span v-if="!setlogin">🔒</span>
</button>
</div>

 </div>
</template>

<style scoped>
/* Login / Opret øverst til højre på større skærme */
.login-signup {
  position: absolute;
  top: 20px;
  right: 20px;
}

/* På små skærme: flyt login-knappen ind i flowet så den ikke overlapper logo */
@media (max-width: 640px) {
  .login-signup {
    position: static;
    display: block;
    margin: 1rem auto; /* centreret under logo */
  }
}

/* De øvrige knapper i naturligt flow med lodret afstand */
.searchnew,
.history,
.favorite {
  position: static;
  display: block;
  margin: 1rem auto;
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



