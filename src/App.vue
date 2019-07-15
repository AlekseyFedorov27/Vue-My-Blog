<template>
  <v-layout row class="view">
    <v-flex xs12 sm6 offset-sm3 lg-12>
      <v-card>

        <v-toolbar fixed color="cyan" dark class="">
          <v-toolbar-side-icon @click="show=!show"></v-toolbar-side-icon>

          <v-toolbar-title>Inbox</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down">

            <v-btn flat to="/new_post" v-if="$store.state.user">Add post<v-icon >add_photo_alternate</v-icon></v-btn>
            <v-btn flat to="/posts">Posts<v-icon>collections</v-icon></v-btn>

            <v-btn flat to="/" v-if="$store.state.user">List<v-icon >group</v-icon></v-btn>

              <v-btn flat
              @click="logaut"
              to="/login"
            >
              Log out
              <v-icon >exit_to_app</v-icon>
            </v-btn>

          </v-toolbar-items>
        </v-toolbar>

        <v-app>
        <v-content>
          <div v-if="show" class="setting_cont">
            <settings />
          </div>
          
          <transition name="fade">
            <router-view/>
          </transition>


        </v-content>
        </v-app>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import settings from '@/components/settings'

export default {
  components: { settings },
  name: 'App',

  data () {
    return {
      show: false
    }
  },
    methods: {
    logaut() {
      this.$store.dispatch('logout')
    }
  }
}
</script>
<style lang="scss" scoped>
// .v-card{
//     box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.2), 
// }
  
.fade-leave-active{
  transition: opacity .2s;
}
.fade-enter-active {
  transition: opacity .5s;
}
.fade-leave-to{
  transition: opacity .5s;
opacity: 0;
}
.fade-enter /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.v-sheet{
  font-family: 'Roboto', sans-serif!important;
}
.v-toolbar__content, .v-toolbar__extension{
  position: fixed!important;
  
}
.view{
  height: 100vh;
}

</style>

