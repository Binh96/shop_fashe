importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyDPQL91G9oJTw4HVQJ9dMj9i5tgJVyzTbE",
    authDomain: "upload-image-10c58.firebaseapp.com",
    projectId: "upload-image-10c58",
    storageBucket: "upload-image-10c58.appspot.com",
    messagingSenderId: "592382421817",
    appId: "1:592382421817:web:64aa733ae367e333a6d6e8",
    measurementId: "G-V2ZC8H4XRG"
  };

const messaging = firebase.messaging();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
    }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
    }); 
}