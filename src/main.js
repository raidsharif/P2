// Importerer den funktion der opretter din app (fra Vue-frameworket)
import { createApp } from 'vue'
// Importerer en global CSS-fil (style.css), typisk til basestyles
import './style.css'
// Importerer App.vue -  sender også hele tiden tilbage til forsiden i gennem logoen, når der behov
import App from './App.vue'
// Importerer routeren (som indeholder sider og navigation)
import router from './router';

//opretter en ny Vue-applikation baseret på din App.vue fil.(hoved-komponent)
const app = createApp(App);

// Fortæller appen at den skal bruge routing-systemet (så man kan navigere mellem sider)
app.use(router);

// Monterer (starter) appen og sætter den ind i HTML-filen på elementet med id="app"
app.mount('#app');
