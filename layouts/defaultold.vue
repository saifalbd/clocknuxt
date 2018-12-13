<template>
  <v-app light>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :to="item.to"
          :key="i"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'" />
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"/>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content class="global_page_content" :style="{ backgroundImage: `url(${backgroundUrl})` }">
      <v-container pa-1>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      :right="right"
      v-model="rightDrawer"
      temporary
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
     <ApiLoader/>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import ApiLoader from '@/components/smallCom/apiLoader'


  export default {
components:{
 ApiLoader
},

    data() {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Inspire', to: '/inspire', children:{
            icon: 'bubble_chart', title: 'Inspire', to: '/inspire',
          }},
          { icon: 'bubble_chart', title: 'Asma Al Husna', to: '/asma-al-husna' },
          { icon: 'bubble_chart', title: 'islamicCalender', to: '/islamicCalender' },
          { icon: 'bubble_chart', title: 'quran-audio', to: '/quran-audio' },
          { icon: 'bubble_chart', title: 'name-of-surah', to: '/name-of-surah' },
          { icon: 'bubble_chart', title: 'read-quran', to: '/read-quran' },

          
          
          
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Development Mode',
       backgroundUrl: backgroundUrl
      }
    },
  

  }
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-weight: bold;
  overflow-x: hidden;
  
  min-height: 100vh;
}




#inspire{
background:red;
text-align: center;

background-attachment: fixed;

 background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
}
.monthly-list{
.thead{
  background:#000121;
  font-size: 1.2rem;
  

}

.v-datatable.v-table.theme--light{
background: none;
}
.theme--light.v-table thead th{
  color: #FFEB3B;
}
.tmp{
background: rgba(0, 1, 33, 0.70);
 color: #FFEB3B;

}
.tmpChangeMonth{
 background:#000121;
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffeb3b;
}

.theme--light.v-table tbody tr{
background: rgba(0, 1, 33, 0.76);
color: #CDDC39;
td{
font-size: 1.05rem;
}
}
.theme--light.v-table tbody tr:hover{
background: black;
color: aliceblue;
.tmp{
color: aliceblue;
background: rgba(0, 1, 33, 0.50);

}
}
.theme--light.v-table tbody tr:not(:last-child) {
    border-bottom: 1px solid #FFEB3B;
}
}
</style>

