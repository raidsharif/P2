import { ref } from 'vue'

// Login-status
export const setlogin = ref(false)

// Aktuel bruger efter login
export const currentUser = ref(null)  // { userId, username, token }

// Valgte ingredienser
export const valgteIngredienser = ref([])
