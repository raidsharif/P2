<template>
<div>

    <!-- Knap til login -->
    <div class = "login">
 <button @click="gotologin"> login </button>  
</div>

<!-- Knap til at oprette bruger -->
<div class = "signup"> 
 <button @click="gotoopret"> opret </button>  
</div>

</div>
</template>


<style>
/* Position af knapper */
.login{
    position: absolute;
top: 400px; 
left: 50%;
}

.signup{
    position: absolute;
top: 300px; 
left: 50%;   
}
</style> 


<script setup>
// Bruger router til at navigere til login eller signup
import {useRouter} from 'vue-router'
const router = useRouter();

function gotologin() {
    router.push('/log-in')
}
function gotoopret() {
    router.push('/sign-up')
}

</script>
