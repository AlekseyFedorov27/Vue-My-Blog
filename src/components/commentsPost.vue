<template>
  <div class="viewDial dial"  >

      <div  v-for="item in loadCommentPost" :key="item.id" class="">
        <div class="flex" >
         <!-- <img :src="item.avatar" alt="" > -->
          <v-btn icon class="color_avatar">
            {{item.name.substr(0,2)}}
          </v-btn>
          <div class="dialog_text">
            <strong><p>{{item.name}}</p></strong>
            <p>{{item.newComment}}</p>
            <p class="time">{{item.time}}</p>
          </div>
        </div>
      </div>

      <div class="color_inp "  v-if="$store.state.user">
        <v-spacer></v-spacer>
        <textarea name="text" cols="50" class="textarea" v-model="newComment"></textarea>
        
        <v-btn icon>
          <v-icon @click="addCommentPost">send</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </div>


  </div>
</template>
<script>
import inputMess from '@/components/inputMessage'

  export default {
    components: { inputMess },
    props: ['postID'],
    data () {
      return {
        newComment: '',
        id: null
      }
    },
    created () {
      this.id=this.$route.params.id
      this.$store.dispatch('ClearCommentPost');
      this.$store.dispatch('loadCommentPost', this.id);
    },
    methods: {
      addCommentPost(newComment) {
        let comment = {
          newComment: this.newComment,
          postID: this.id,
          name: this.$store.state.user[0].info.name,
          time: new Date().toLocaleString("ru", {
            month: 'numeric',  day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'
          })
        }
        if (this.newComment !== '') {
          this.$store.dispatch('addCommentPost', comment);
          this.newComment = '';
        }
      }
    },
    computed: {
      loadCommentPost() {
        return this.$store.getters.CommentPost
      },
    }
  }
</script>
<style lang="scss" scoped>
.textarea{
  background-color: #fff!important;
  color: #000!important;
  padding: 5px;
  border: 1px solid rgb(177, 177, 177)!important;
}
.color_inp{
  display: flex;
  width: 100%;
  margin-top: 40px;
}
.dial{
  margin-bottom: 80px;
  margin-top: 40px;
}
.time{
  font-size: 10px;
  color: rgb(145, 145, 145);
}
.color_avatar{
  background-color: rgb(46, 206, 81);
  color: #fff!important;
}
p{
  margin: 0px;
}
.flex{
  display: flex;
  margin-bottom: 10px;
  margin-top: 10px;
}
.dialog_text{
  background-color: rgb(233, 233, 233);
  border-radius: 10px;
  padding: 7px 12px;
  margin-left: 7px;
  border: 1px solid rgb(192, 192, 192);
}
img{
  width: 40px;
  height: 40px;
  border-radius: 50px;
}

</style>
