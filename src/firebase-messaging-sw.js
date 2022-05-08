importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyB5o_md5Op4pE8nMWVfpZoccwhWT7S7p-E",
  authDomain: "webg10.firebaseapp.com",
  databaseURL: "https://webg10-default-rtdb.firebaseio.com",
  projectId: "webg10",
  storageBucket: "webg10.appspot.com",
  messagingSenderId: "1048362480638",
  appId: "1:1048362480638:web:8d00e71faa159c9376c6af",
  measurementId: "G-636XWBWYM2"
};
firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Notificación';
  const notificationOptions = {
    body: payload.data.text,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});