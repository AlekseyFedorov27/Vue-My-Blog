<template>
  <div class="viewDial dial" v-if="loadMes" >

      <div  v-for="item in loadMes" :key="item.id" class="">
        <div class="flex" v-bind:class="{ active: item.name == $store.state.user[0].info.name }">
         <!-- <img :src="item.avatar" alt="" > -->
          <v-btn icon class="color_avatar">
            {{item.name.substr(0,2)}}
          </v-btn>
          <div class="dialog_text">
            <strong><p>{{item.name}}</p></strong>
            <p>{{item.message}}</p>
            <p class="time">{{item.time}}</p>
          </div>
        </div>
      </div>


      <div class="messag_inp">
        <inputMess @addMessage="addMessage"/>
      </div>

  </div>
</template>
<script>
import inputMess from '@/components/inputMessage'

  export default {
    components: { inputMess },
    data () {
      return {
        message: null,
        frend: null,
        // items: [
        //   {
        //     avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        //     title: 'Brunch this weekend?',
        //     subtitle: "Ali Connors"
        //   },

        //   {
        //     avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        //     title: 'Summer BBQ ',
        //     subtitle: "to Alex, Scott, Jennifer"
        //   },

        //   {
        //     avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        //     title: 'Oui oui',
        //     subtitle: "Sandra Adams"
        //   },

        //   {
        //     avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        //     title: 'Birthday gift',
        //     subtitle: "Trevor Hansen"
        //   },

        //   {
        //     avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        //     title: 'Recipe to try',
        //     subtitle: "Britta Holt"
        //   }
        // ]
      }
    },
    created () {
      let id=this.$route.params.id
      this.$store.dispatch('clearMessage');
      //получение данных собеседника
      this.frend = this.$store.state.userArr.filter(z => z.id == id);
      // console.log(user)
      this.$store.dispatch('loadMessage', id);
    },
    methods: {
      addMessage(message) {
        let post = {
          message: message,
          id: this.frend[0].id,
          name: this.$store.state.user[0].info.name,
          time: new Date().toLocaleString("ru", {
            month: 'numeric',  day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'
          })
        }
        // console.log(this.loadMessages)
        this.$store.dispatch('addMessage', post);
      }
      
    },
    computed: {
      loadMes() {
        return this.$store.getters.loadMessage
      },
    }
  }
</script>
<style lang="scss" scoped>
.dial{
  margin-bottom: 230px;
  margin-top: 80px;
}
.messag_inp{
  z-index: 199;
  bottom: 0px;
  position: absolute;
  left: 0px;
  width: 100%;
  position: fixed;
}
.active{
  display: flex;
  // justify-content: end!important;
  flex-direction:  row-reverse;
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
