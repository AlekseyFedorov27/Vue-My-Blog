<template>
  <div>
    <v-list two-line class="listGroup">
          <template v-for="(item, index) in users">
            <v-subheader 
              v-if="item.header"
              :key="item.header"
            >
            </v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider>

            <v-list-tile
              v-else
              :key="item.title"
              avatar
              @click=""
            >
              <v-list-tile-avatar  v-if='item.avatar'>
                <img :src="item.avatar">
              </v-list-tile-avatar>

              <v-list-tile-avatar v-else>
                <v-btn icon class="color_avatar">
                  {{item.info.name.substr(0,2)}}
                </v-btn>
              </v-list-tile-avatar>

              <v-list-tile-content class="list_user" @click="goDialog(item.id)">
                <v-list-tile-title v-html="item.info.name"></v-list-tile-title>
                <!-- <v-list-tile-sub-title v-html="item.id"></v-list-tile-sub-title> -->
              </v-list-tile-content>


            </v-list-tile>
          </template>
        </v-list>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        // items: [
        //   { header: 'Today' },
        //   {
        //     avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        //     title: 'Brunch this weekend?',
        //     subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to ha ergerg regre rj rthrt th rt rt rthrthrt h thrtng out?"
        //   },
        //   { divider: true, inset: true },
        //   {
        //     avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        //     title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        //     subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        //   },
        //   { divider: true, inset: true },
        //   {
        //     avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        //     title: 'Oui oui',
        //     subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
        //   }
        // ],
      }
    },
    created () {
      this.$store.dispatch('getUser', this.users);
      
    },
    computed: {
      users() {
        return this.$store.getters.users
      },
    },
    methods:{
      goDialog(id){
        this.$router.push(`/dialog/${id}`)
      }
    }

  }
</script>
<style lang="scss">
.listGroup{
  margin-top: 60px;
}
.color_avatar{
  background-color: #1976D2;
  color: #fff!important;
}
.v-list__tile__title, .v-list__tile__sub-title{
  white-space: normal!important;

}
a{
  text-decoration: none!important;
  overflow: hidden;
}
</style>

