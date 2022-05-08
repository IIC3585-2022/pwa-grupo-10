import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot, getDoc, getDocs,
  addDoc, deleteDoc, doc, orderBy, query, serverTimestamp, updateDoc, QuerySnapshot
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