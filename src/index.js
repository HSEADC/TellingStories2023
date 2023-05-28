import './index.css'

import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, set } from 'firebase/database'
import Cookies from 'js-cookie'
import { generateHash, sample } from './javascript/utilities.js'
import { emojis } from './javascript/emojis.js'

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
const db = getDatabase()

let uid, emoji

function writeTouchData(x, y) {
  const touchListRef = ref(db, 'touches')
  const newTouchRef = push(touchListRef)

  // console.log('writeTouchData', uid, x, y)

  set(newTouchRef, {
    uid,
    emoji,
    x,
    y
  })
}

function getCursorData(e) {
  const { pageX, pageY } = e
  const { innerWidth, innerHeight } = window
  const x = pageX / ((innerWidth / 100) * 1)
  const y = pageY / ((innerHeight / 100) * 1)

  writeTouchData(x, y)
}

function getOrSetCookie() {
  uid = Cookies.get('uid')
  emoji = Cookies.get('emoji')

  if (uid == undefined) {
    uid = generateHash()
    emoji = sample(emojis)
    Cookies.set('uid', uid)
    Cookies.set('emoji', emoji)
  }
}

function updateCursorCors(x, y) {
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

window.addEventListener('DOMContentLoaded', () => {
  getOrSetCookie()

  const { innerWidth, innerHeight } = window
  const newX = (innerWidth / 100) * 50 - 20
  const newY = (innerHeight / 100) * 50 - 20
  updateCursorCors(newX, newY)
})

window.addEventListener('mousemove', (e) => {
  getCursorData(e)
  updateCursorCors(e.pageX, e.pageY)
})

window.addEventListener('touchmove', (e) => {
  getCursorData(e)
  updateCursorCors(e.pageX, e.pageY)
})
