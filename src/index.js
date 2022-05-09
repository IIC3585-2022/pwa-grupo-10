import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import {
  getFirestore, collection, onSnapshot, getDoc, getDocs,
  addDoc, deleteDoc, doc, orderBy, query, serverTimestamp, updateDoc, QuerySnapshot,where
} from 'firebase/firestore'

import {showNotification} from './ui';

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

const sendMessage = async (token, payload) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "key=AAAA9BdF8_4:APA91bHA44Gu9cQYcXF65XFTdqIG8eq1uV8rndADMf2Fl0ZLYUla-LkfGDmr19n8DemVp82v8YGg3Eh2nCB1_jHxmmvB_ibbTRkTjMlgq_XVjnoAQYTlm48o-Qd2zdyxvhzurWGVCmhr");

  const raw = JSON.stringify({
  "data": payload,
  "to": token,
  "direct_boot_ok": true
});

  const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
}
const saveToken = (token) => {
  const tokensRef = collection(db, "tokens");
  const q = query(tokensRef, where("value", "==", token));
  onSnapshot(q, (snapshot) => {
    const exists = snapshot.docs.length
    if (!exists) {
      const timestamp = new Date().toLocaleString();
      addDoc(collection(db, "tokens"), {value:token, timestamp});
    }
  })
}

// init firebase app
const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app);
  getToken(messaging, { vapidKey: 'BMkAUfZsZYDY78Kd35zFvwkXAU7gnEE-awpwsL7FVIXlyRonFucIzTHFzxxCOCDuiyzcwGL-BZSSNZJmfiesY7I' }).then((currentToken) => {
    if (currentToken) {
      saveToken(currentToken)
      sendMessage(currentToken, {text:'Bienvenido a la TodoApp'})
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  showNotification('Notificación', {body:payload.data.text})
  // ...
});
// init services
const db = getFirestore()

//------------------------------
const taskForm = document.getElementById("task-form");
const taskFormEdit = document.getElementById("task-form-edit");
const tasksContainer = document.getElementById("tasks-container");

let editStatus = false;
let id = "";
//-----------------------------
// Funciones
const saveTask = (title) =>
  addDoc(collection(db, "tasks"), {title});
  
const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);


const getTask = (id) => getDoc(doc(db, "tasks", id));
const getTasks = () => getDocs(collection(db, "tasks"));
const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));
const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tasks", id), newFields);
//------------------------------

window.addEventListener("DOMContentLoaded", async () => {
  onSnapshot(collection(db,"tasks"), (querySnapshot) => {

    let html = "";

    querySnapshot.forEach((doc)=> {
      const task = doc.data();
      html +=    `
      <div class="card-panel todo white row data-id=${task.id}">
        <div class="todo-content">
          <div class="todo-title">${task.title}</div>
        </div>
          <div>
          <button class="btn btn-primary btn-delete" data-id="${doc.id}">
          🗑 Delete
          </button>
          
          <button class="sidenav-trigger btn btn-secondary btn-edit" data-target="side-form-edit" data-id="${doc.id}">
            🖉 Edit
          </button>

        </div> 
      </div>
      `;
    });
    tasksContainer.innerHTML = html;
    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");

    btnsDelete.forEach(btn =>{
      btn.addEventListener('click', (e) =>{
        deleteTask(e.target.dataset.id)
      })
    });

    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach(btn =>{
      btn.addEventListener('click', async (e) => {
        const doc = await getTask(e.target.dataset.id)
        const task = doc.data()
        taskFormEdit['task-title'].value = task.title;

        editStatus = true;
        id = e.target.dataset.id;
        })
    })
    
  });
  
  
});

//------------------------------

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = taskForm["task-title"];
  try {
    await saveTask(title.value);
    taskForm.reset();
    title.focus();
  } catch (error) {
    console.log(error);
  }
});

taskFormEdit.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = taskFormEdit["task-title"];
  try {
    await updateTask(id, {
      title: title.value,});
    editStatus = false;
    id = "";
    taskFormEdit.reset();
    title.focus();
  } catch (error) {
    console.log(error);
  }
});





/* window.addEventListener('load', async e => {
  if ('serviceWorker' in navigator) {
      try {
          navigator.serviceWorker.register('serviceWorker.js');
          console.log('SW registered');

      } catch (error) {
          console.log('SW failed');

      }
  }
}); */


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('firebase-messaging-sw.js')
      .then(reg => console.log('Firebase worker registered'))
      .catch(err => console.log('Firebase worker not registered', err));
    navigator.serviceWorker.register('serviceWorker.js')
      .then(reg => console.log('Cache worker registered'))
      .catch(err => console.log('Cache worker not registered', err));
    
}