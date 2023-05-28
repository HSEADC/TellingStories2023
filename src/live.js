import './index.css'

import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import { getDatabase, ref, onValue } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyDqimTmakt06ffzYo6L5srxAgvoWQsbAGA',
  authDomain: 'tellingstories2023.firebaseapp.com',
  databaseURL:
    'https://tellingstories2023-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'tellingstories2023',
  storageBucket: 'tellingstories2023.appspot.com',
  messagingSenderId: '334637896574',
  appId: '1:334637896574:web:afeaec595ced8dc867992f',
  measurementId: 'G-5NXEBL5C2D'
}

const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
const db = getDatabase()
const touchesCountRef = ref(db, 'touches')

console.log('touchesCountRef', touchesCountRef)

function updateCursorCors(uid, emoji, x, y) {
  let cursor = document.getElementById(`cursor_${uid}`)
  // console.log('cursor', cursor, cursor != undefined)

  if (cursor == undefined) {
    cursor = document.createElement('div')
    cursor.classList.add('cursor')
    cursor.id = `cursor_${uid}`
    cursor.innerText = emoji
    document.body.appendChild(cursor)
  }

  cursor.style.transform = `translate(${x}px, ${y}px)`
}

onValue(touchesCountRef, (snapshot) => {
  const { innerWidth, innerHeight } = window
  const data = snapshot.val()
  const keys = Object.keys(data)
  const length = keys.length
  const lastKey = Object.keys(data)[length - 1]
  const { uid, emoji, x, y } = data[lastKey]
  const newX = (innerWidth / 100) * 1 * x
  const newY = (innerHeight / 100) * 1 * y

  // console.log(uid, x, y)

  updateCursorCors(uid, emoji, newX, newY)
})

document.addEventListener('DOMContentLoaded', () => {})
