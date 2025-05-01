import { ref } from 'vue'
// Reaktiv værdi der holder styr på om man er logget ind
export const setlogin = ref(false)

// Reaktiv liste med brugere og koder (som en "database")
export const brugerdatabase = ref([
  { username: 'albert', password: '1234',
    favoritter: [], historik: [], egneIngredienser: []}
])
export const currentUser = ref(null)

 // her gemmer vi dem man har valgt af indgredienser
export const valgteIngredienser = ref([])


// En lille "test-database" med opskrifter

export const opskrifter = ref([
  {
    navn: 'Pandekager',
    ingredienser: ['Æg', 'Mel', 'Mælk', 'Sukker'],
    beskrivelse: 'Pisk æg, mælk og mel sammen. Steg på pande til gylden.'
  },
  {
    navn: 'Kylling med ris',
    ingredienser: ['Kylling', 'Ris', 'Løg'],
    beskrivelse: 'Kog ris. Steg kylling og løg. Bland det hele sammen.'
  },
  {
    navn: 'Grøntsagssuppe',
    ingredienser: ['Gulerødder', 'Løg', 'Bouillon'],
    beskrivelse: 'Hak grønt, kog i bouillon i 20 minutter.'
  },
  {
    navn: 'Tun sandwich',
    ingredienser: ['Tun (på dåse)', 'Mayonnaise', 'Agurk', 'Tomat'],
    beskrivelse: 'Bland tun og mayo. Læg i sandwich med agurk og tomat.'
  },
  {
   navn: 'peporoni pizza',
   ingredienser: ['peporoni','dej'],
   beskrivelse: 'ring til abi ned i den lokale.'

  }
  


])