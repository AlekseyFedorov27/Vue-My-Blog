 <template>
  <v-layout class="margin_posts">
    <v-flex xs12 sm8 offset-sm2 class="list">

      <div v-for="post in loadPosts" :key="post.id" >

      <v-card class="margin_cards">

        <v-img
          class="white--text"
          height="200px"
          :src=post.imageUrl
        >
          <v-container fill-height fluid class='z_index'>
            <v-layout fill-height>
              <v-flex xs12 md4 align-end flexbox>
                <span class="headline title_color">{{post.title}}</span>
              </v-flex>



            </v-layout>
          </v-container>
        </v-img>

        <v-card-title>
          <div>
            <span class="grey--text ">{{post.time}}</span><br>


            <span >{{post.post.substring(0,100)}}...</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange" :to="'/post/'+post.id">Read more</v-btn>
          <v-btn flat color="green">Autor: {{post.name}}</v-btn>
        </v-card-actions>

        <v-spacer></v-spacer>
        <v-btn icon >
          <v-icon v-bind:class="{ active: post.Stars.findIndex(i => i.id == userID) == 0 }">star</v-icon>
          <p v-if="post.Stars" >{{post.Stars.length}}</p>
        </v-btn>

      </v-card>

      </div>

    </v-flex>
  </v-layout>
</template>

<script>
import firebase from 'firebase/app'

export default {
  created () {
    this.$store.dispatch('loadPosts');

  },
  computed: {
    loadPosts() {
      return this.$store.getters.loadPosts
    },
    userID() {
      if (firebase.auth().currentUser) {
        return this.$store.getters.userID
      } else {
        return false
      }
       
    },

  },
  // methods: {
  //   toggleStar (idPost) {
  //     this.$store.dispatch('toggleStar', idPost);
  //   }
  // }
}
</script>
<style lang="scss" scoped>
.active{
  color: red!important;
}
.title_color{
  color: rgb(255, 255, 255);
  background-color: rgb(107, 107, 107);
}
.margin_cards{
  margin: 20px;
   position: relative;
 
}
.z_index{
  z-index: 100;
  position: relative;
}
// .margin_cards::before {
//   content: '';
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0,0,0,0.5);  
//   z-index: 1;
// }
.margin_posts{
  margin-top: 80px;

}
.list{
    display: flex;
   flex-direction:column-reverse;
}
</style>
