<template>
  <div >

    <div class="color_inp " >
      <v-btn icon>
        <v-icon>publish</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
        <textarea name="text" cols="80" class="texarea" v-model="newMessage"></textarea>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon @click="postNessage">send</v-icon>
      </v-btn>
    </div>

  </div>
</template>
<script>
export default {
  
  data () {
    return {
      newMessage: ''
    }
  },
  methods: {
    postNessage() {
      if( this.newMessage!="" ){
        this.$emit('addMessage', this.newMessage);
        this.newMessage = ''
      }

    }
  }
}
</script>
<style lang="scss" scoped>
textarea{
  background-color: #fff!important;
  color: #000!important;
  padding: 5px;
  border: 2 px solid #000!important;
}
.color_inp{
  background-color: rgb(202, 202, 202);
  display: flex;
  margin: 80vh auto 0 0;
  width: 100%;
      box-shadow: 2px 2px 4px 3px rgba(0,0,0,0.3); 
}
input{
  background-color: rgb(133, 109, 109);
  padding-left: 5px;
  border: 1px solid rgb(82, 82, 82);
  
}

</style>
