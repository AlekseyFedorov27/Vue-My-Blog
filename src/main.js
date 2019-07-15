import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'



import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

Vue.config.productionTip = false


  // Your web app's Firebase configuration
  firebase.initializeApp({
    apiKey: "AIzaSyANowKJcqbMpqHLlr3Ya5lUl_4lOWn5MS4",
    authDomain: "chat-82aa3.firebaseapp.com",
    databaseURL: "https://chat-82aa3.firebaseio.com",
    projectId: "chat-82aa3",
    storageBucket: "chat-82aa3.appspot.com",
    messagingSenderId: "47896472115",
    appId: "1:47896472115:web:8f909e105b6f80a9"
  });
  // Initialize Firebase
 

  let app

  firebase.auth().onAuthStateChanged(() => {
    if (!app) {
      app = new Vue({
        router,
        store,
        
        render: h => h(App)
      }).$mount('#app')
    }
  })