import { ref } from 'vue'

// Login-status
export const setlogin = ref(false)

// Aktuel bruger efter login
export const currentUser = ref(null)  // { userId, username, token }

// Valgte ingredienser
export const valgteIngredienser = ref([])

// Opskrifter der vises i appen
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
    navn: 'Pepperoni pizza',
    ingredienser: ['peporoni', 'dej'],
    beskrivelse: 'Ring til abi nede i den lokale.'
  }
])
