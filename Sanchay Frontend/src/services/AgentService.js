import axios from 'axios'

export function generateUniqueReferenceNumber () {
  const randomNumber = Math.floor(Math.random() * 9000000000) + 1000000000 // Generates a random 10-digit number
  return randomNumber.toString() // Convert it to a string
}
