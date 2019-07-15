<template>
<div class="new_post">

    <v-form ref="form" v-model="form" class="pa-3 pt-4 ">

      <p class="headline mb-2">Add new post</p>

        <v-layout column class="mb-4">

              <v-btn  icon class="mr-3" @click="onPickFile">
                <v-icon>edit</v-icon>
              </v-btn>
              <input 
              type="file" 
              style="display: none" 
              ref="fileInput" 
              accept="image/*"
              @change="onFilePicked">


              <v-layout row style="display: none">
                <v-flex xs12 sm6 offset-sm3>
                  <v-text-field 
                    name="imageUrl"
                    label="Image URL"
                    id="image-url"
                    v-model="imageUrl"
                    required></v-text-field>
                </v-flex>
              </v-layout>

          <v-img :src="imageUrl" aspect-ratio="4" contain></v-img>
        </v-layout>

      <v-text-field 
        v-model="postTitle"
        box
        color="deep-purple"
        label="Post title"
        type="email"
      ></v-text-field>

      <v-textarea
        v-model="post"
        auto-grow
        box
        color="deep-purple"
        label="Post"
        rows="1"
      ></v-textarea>

    </v-form>

    <div class="text-xs-center">
      <v-btn large color="primary" dark @click="createNewPost">save</v-btn>
    </div>

  </div>
</template>
<script>
import { fromNumber } from 'long';
  export default {
    data: () => ({
      image: null,
      imageUrl: '',
      post: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts',
      postTitle: 'My weekend',
      form: false,
    }),
    methods: {
       onPickFile(){
        this.$refs.fileInput.click();
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        if ( filename.lastIndexOf('.') <= 0 ) {
          return alert ( 'Please add a valid file!' )
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      },
      createNewPost() {
        let NewPost = {
          title: this.postTitle,
          post: this.post,
          name: this.$store.state.user[0].info.name,
          userID: this.$store.getters.userID,
          image: this.image,
          time: new Date().toLocaleString("ru", {
            month: 'numeric',  day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'
          })
        }
      //  console.log(this.$store.getters.userID)
        this.$store.dispatch('addNewPost', NewPost);
        // console.log(NewPost)
      }
    }
  }
</script>
<style lang="scss" scoped>
.title_new_post{
  font-size: 20px;
  text-align: center;
}

.new_post{
  margin-top: 60px;
}
</style>
