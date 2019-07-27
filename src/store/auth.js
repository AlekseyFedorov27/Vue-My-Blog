import firebase from 'firebase/app'

export default {
  state: {
    userUid: null,
    uid: null
  },
  getters: {

  },
  mutations: {
    userUid(state) {
      state.userUid = firebase.auth().currentUser
    },
    logout(state) {
      state.user = null;
      state.messages = null;
      state.userArr = null;
    },
  },
  actions: {
    //Registration new Users
    async authUser ({commit, dispatch}, authData) {
      try{
        await firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password)

        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          name: authData.name
        })
        commit('userUid', uid);
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async logout({commit}) {
      await firebase.auth().signOut()
       commit('logout')
       localStorage.removeItem ('user')
    },
    async loginUser ({dispatch, commit}, loginData){
      try{
        await firebase.auth().signInWithEmailAndPassword(loginData.email, loginData.password)
        const uid = await dispatch('getUid');
        commit('userUid', uid);
        // console.log(firebase.auth().currentUser)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    getUid(state){
      if ( firebase.auth().currentUser ) {
      const user = firebase.auth().currentUser
      state.uid = user.uid;
      localStorage.setItem ('user', user)
      return user ? user.uid : null
      }

    },
    initAuth ({commit, state}) {
      let user = localStorage.getItem ('user')
      if ( !user ) {
        return false
      }
      state.uid = user;
      commit('userUid');
    }

  },
}