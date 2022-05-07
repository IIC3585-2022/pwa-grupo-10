import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc, orderBy, query, serverTimestamp, updateDoc
} from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5o_md5Op4pE8nMWVfpZoccwhWT7S7p-E",
  authDomain: "webg10.firebaseapp.com",
  projectId: "webg10",
  storageBucket: "webg10.appspot.com",
  messagingSenderId: "1048362480638",
  appId: "1:1048362480638:web:dbc73d7b4714209176c6af",
  measurementId: "G-DMFEH25Z0F"
};

// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()


// collection ref
const colRef = collection(db, 'twits')

// queries
const q = query(colRef, orderBy('createdAt'))

// get collection data
onSnapshot(colRef, (snapshot) => {
  let twits = []
  snapshot.docs.forEach(doc => {
    twits.push({ ...doc.data(), id: doc.id })
  })
  console.log(twits)
})


// adding docs
const addTwitForm = document.querySelector('.add') 
addTwitForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addTwitForm.title.value,
    createdAt: serverTimestamp()
  })
  .then(() => {
    addTwitForm.reset()
  })
})

// deleting docs
const deleteTwitForm = document.querySelector('.delete')
deleteTwitForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'twits', deleteTwitForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteTwitForm.reset()
    })
})

// updating a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let docRef = doc(db, 'twits', updateForm.id.value)

  updateDoc(docRef, {
    title: 'updated title'
  })
  .then(() => {
    updateForm.reset()
  })
})




async function fetchBirds() {
  const res = await fetch('https://aves.ninjas.cl/api/birds');
  return await res.json();

}



/* window.addEventListener('load', async e => {
  fetchBirds().then(res => {
    res.forEach(bird => {
      $('.container').append(`<p>${bird.name.spanish}</p>`)
    })
  })
  if ('serviceWorker' in navigator) {
      try {
          navigator.serviceWorker.register('serviceWorker.js');
          console.log('SW registered');

      } catch (error) {
          console.log('SW failed');

      }
  }
}); */