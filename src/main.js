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
    apiKey: "xxxxxxxxxxxxx4",
    authDomain: "cxxxxxxxxxxxcom",
    databaseURL: "https://xxxxxxxxxxcom",
    projectId: "chxxxxxxxxxxxx3",
    storageBucket: "cxxxxxxxxxxxm",
    messagingSenderId: "4x5",
    appId: "xxxxxxxxxxxxxxa9"
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