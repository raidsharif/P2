// Importerer siderne
import { createRouter, createWebHistory } from 'vue-router';
import forsiden from '../components/forsiden.vue';
import loginsignup from '../components/loginsignup.vue';
import login from '../components/log-in.vue';
import signup from '../components/sign-up.vue';
import enteringredients from '../components/enteringredients.vue';
import recipeSuggestion from '../components/recipesuggestion.vue';
import RecipeGuide from '../components/recipeguide.vue'
import favorites from '../components/favorites.vue'
import history from '../components/history.vue'


// Opretter router med stier til siderne
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'forside',
      component: forsiden,
    },
    {
      path: '/loginsignup',
      name: 'loginsignup',
      component: loginsignup,
    },

    { path:'/log-in',
      name:'login',
      component: login,
    },
    { path:'/sign-up',
      name:'signup',
      component: signup,
    },
    { path:'/enteringredients',
      name:'enteringredients',
      component: enteringredients,
    },

    {
    path: '/opskrafterliste',
    name: 'opskrafterliste',
    component: recipeSuggestion
    },
    {
      path: '/guide/:id',
      name: 'guide',
      component: RecipeGuide
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: favorites
    },
    {
      path: '/history',
      name: 'history',
      component: history
    }
    
  ],
});

export default router;




