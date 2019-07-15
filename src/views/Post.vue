<template>
  <div >
    <v-card class="margin_post pa-3" v-if="(loadPost)? true: false">


      <v-btn icon
        @click="deletePost">
        <v-icon >delete</v-icon>
      </v-btn>

      <v-btn icon
        @click="editPost">
        <v-icon >edit</v-icon>
      </v-btn>

      <v-img 
        :src = loadPost.imageUrl
        aspect-ratio="2"
      ></v-img>
     
      

      <v-card-actions>
         <p class="display-1 pt-4 font-weight-bold title_color" >{{loadPost.title}}</p>
         
        <v-spacer></v-spacer>
        <v-btn icon @click="toggleStar">
          <v-icon>favorite</v-icon>
        </v-btn>
         <p v-if="loadPost.stars">{{loadPost.postStars.length}}</p>
        <v-btn icon>
          <v-icon>bookmark</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>share</v-icon>
        </v-btn>
      </v-card-actions>
      <p class="pt-0 pb-2 time_color" >{{loadPost.name}}  <span class="pt-0 pb-2 " >{{loadPost.time}}</span></p>
      <p class="pt-2 pb-4 subheading post_text">{{loadPost.post}}</p>
      </v-card>  

    <commentsPost :postID="id"/>

  </div>
</template>
<script>
import commentsPost from '@/components/commentsPost';
import firebase from 'firebase/app';

export default {
  components: { commentsPost,  },
  data () {
    return {
      id: null,
    }
  },
  mounted() {
    this.id=this.$route.params.id
    this.$store.dispatch('loadPost', this.id);
  },
  methods: {
    deletePost() {
      this.$store.dispatch('deletePost', this.id);
      this.$router.push('/posts/')
    },
    editPost() {

      this.$router.push('/editpost/'+this.id)
    },
    toggleStar () {
      if ( firebase.auth().currentUser ) {
        this.$store.dispatch('addStar', this.id);
      } else {

      }
      
    }
  },
  computed: {
    loadPost() {
      return this.$store.getters.loadPost
    },
  }
}
</script>
<style lang="scss" scoped>
// .v-menu__content theme--light menuable__content__active{
// left: 400px!important;
// }
.post_text{
  line-height: 1.8rem;
  letter-spacing: 0.15px;
}

.time_color{
  color: rgb(192, 192, 192);
}
.title_color{
  color: rgb(155, 155, 155);
}
.margin_cards{
  margin: 20px;
   position: relative;
}

.margin_post{
  margin-top: 100px;
}
</style>
