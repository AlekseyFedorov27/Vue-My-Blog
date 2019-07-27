import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import posts from './posts'
import firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    userArr: [],
    messages: [],
    user: null
  },
  mutations: {
    getUsers(state, payload) {
      state.userArr = payload
    },
    getUser(state, payload) {
      state.user = payload
    },
    loadMessage(state, payload) {
      state.messages = payload
    },
    clearMessage(state) {
      //проработать чтобы не удалять сообщения в будущем
      state.messages = []
    },
  },
  actions: {
    async getUser({dispatch, commit}){
      try{
        const uid = await dispatch('getUid')
        // const info = (await firebase.database().ref(`/users`).once('value')).val()
        const info = await firebase.database().ref(`/users`).on('value', function(snapshot) {
          // console.log( snapshot.val())
          //получаем всех юзеров
          const allUsers = []
          for (let key in snapshot.val()) {
            allUsers.push( {...snapshot.val()[key], id: key} )
          }
          //оставляем всех юзеров кроме себя
          let userArr = allUsers.filter(y => y.id !== uid)
          //получаем своего юзера
          let user= allUsers.filter(x => x.id == uid)
          commit ('getUsers', userArr);
          commit ('getUser', user)
        });  
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async addMessage({commit, getters}, payload){
      try{
        // const uid = await dispatch('getUid')
        await firebase.database().ref(`/messages/${getters.userID}/${payload.id}`).push(payload).key;
        await firebase.database().ref(`/messages/${payload.id}/${getters.userID}`).push(payload).key;
        // dispatch('loadMessage')
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async loadMessage({commit, getters}, payload){
      try{
        //отслеживание новых сообщений в реальном времени от сервера
        var mess = firebase.database().ref(`/messages/${getters.userID}/${payload}`)
            mess.on('value', function(snapshot) {
                    // console.log(snapshot.val())
              //обработка сообщений
              const allMessages = []
              for (let key in snapshot.val()) {
                allMessages.push( {...snapshot.val()[key], id: key} )
                commit ('loadMessage', allMessages);
              }
          });
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    clearMessage({commit}, payload) {
      commit('clearMessage', payload)
    },
  },
  getters: {
    loadMessage( state ) {
      return state.messages
    },
    userID( state ) {
      return state.user[0].id
    },
    users: s => s.userArr,
  },
  modules: {
    auth,
    posts
  }
})
