import firebase from 'firebase/app'


export default {
  state: {
    image:null,
    posts: null,
    post: null,
    CommentPost: null
  },
  getters: {
    loadPosts(state) {
      return state.posts
    },
    loadPost(state) {
      return state.post
    },
    CommentPost(state) {
      return state.CommentPost
    },
  },
  mutations: {
    addNewPost({state}, payload) {
      state.image = payload
    },
    loadPosts(state, payload) {
      state.posts = payload
    },
    loadPost(state, payload) {
      state.post = payload
    },
    loadCommentPost(state, payload) {
      state.CommentPost = payload
    },
    ClearCommentPost(state) {
      state.CommentPost = null
    },
  },
  actions: {
    async addNewPost({commit}, payload){
      try{
        // const uid = await dispatch('getUid')
        const NewPost = {
          title: payload.postTitle,
          post: payload.post,
          name: payload.name,
          // userID: payload.userID,
          image: payload.image,
          time: new Date().toLocaleString("ru", {
            month: 'numeric',  day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'
          })
        }
        let imageUrl
        let key
        await firebase.database().ref(`/posts/`).push(payload)
        .then((data) => {

          key = data.key
          return key
        })
        .then (key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))

          return firebase.storage().ref('/posts/' + key + '.' + ext ).put(payload.image).then(fileData => {
            const imageUrl = fileData.ref.getDownloadURL().then(function(url) {
              return firebase.database().ref('/posts/').child(key).update({ imageUrl: url })
            })
          })
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async loadPosts({commit}){
      try{
        // const uid =await dispatch('getUid')
        const posts = (await firebase.database().ref(`posts`).once('value')).val();
        const postsArr = [];
        for (let key in posts) {
          postsArr.push( {...posts[key], id: key} )
        }
        // console.log(posts)
        commit ('loadPosts', postsArr)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async loadPost({commit}, payload){
      try{
        const post = (await firebase.database().ref(`/posts/${payload}`).once('value')).val();

        const postStars = [];
        for (let key in post.stars) {
        console.log(postStars)
        postStars.push( {...post[key], id: key} )
        }
        console.log(postStars)

        commit ('loadPost', {...post, postStars})
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async editPost({commit}, payload){
      try{
        const post = (await firebase.database().ref(`/posts/${payload.idPost}`).update({...payload}))
        commit ('loadPost', post)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deletePost({commit}, idPost) {
      try{
        const post = (await firebase.database().ref(`/posts/${idPost}`).remove());
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async addStar({commit, getters}, idPost){
      try{
        let userID = getters.userID
        const post = (await firebase.database().ref(`/posts/${idPost}/stars/${userID}`).update({userID}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async addCommentPost({commit, getters}, payload){
      try{
        // const uid = await dispatch('getUid')

        await firebase.database().ref(`/posts/${payload.postID}/comments`).push(payload).key;
        // dispatch('loadMessage')
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async loadCommentPost({commit, getters}, postID){
      try{
        //отслеживание новых сообщений в реальном времени от сервера
        var mess = firebase.database().ref(`/posts/${postID}/comments`)
            mess.on('value', function(snapshot) {
                    // console.log(snapshot.val())
              //обработка сообщений
              const allComments = []
              for (let key in snapshot.val()) {
                allComments.push( {...snapshot.val()[key], id: key} )
                commit ('loadCommentPost', allComments);
              }
          });
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    ClearCommentPost({commit}) {
      commit ('ClearCommentPost');
    }

  }
}