<template>
  <v-app light>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
      width="220"
      
    >
    <!--start menu list-->
      <v-list>
      
<div v-for="(url,index) in urls" :key="index">
  

      <v-list-tile
      
        v-if="!url.children" 
         :to="getUrl(url.name)" 
        >
        <v-list-tile-action>
          <v-icon>{{url.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>{{url.txt}}</v-list-tile-title>
      </v-list-tile>

      <v-list-group
        prepend-icon="book"
        value="true"
        
        v-if="url.children"
     
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>{{url.txt}}</v-list-tile-title>
        </v-list-tile>
          <v-list-tile
           v-for="(item,i) in url.children"
             :key="i"
             :to="getUrl(item.name)">
            <v-list-tile-action>
                <v-icon>{{item.icon}}</v-icon>
              </v-list-tile-action>
             <v-list-tile-content>
                <v-list-tile-title>{{item.txt}}</v-list-tile-title>
              </v-list-tile-content>
          </v-list-tile>
          
      </v-list-group>
      </div>
    </v-list>
      <!--end menu list-->
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
      dark
    >
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
        v-if="offIcon"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'" />
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
         v-if="offIcon"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
         v-if="offIcon"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"/>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
        v-if="offIcon"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content class="global_page_content" >
      <v-container pa-1 light>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      :right="right"
      v-model="rightDrawer"
      temporary
      fixed
       v-if="offIcon"
    >
      <v-list >
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
      <span>&copy; 2019</span>
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
        offIcon:false,
        clipped: true,
        drawer: true,
        fixed: false,
       miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Development Mode',
     
        urls: [
        {
          name:'index',
          txt:'home',
          icon:'home'
        },
        {
          name:'asma-al-husna',
          txt:'asma al husna',
          icon:'view_list'
        },
        {
          name:'islamicCalender',
          txt:'Islamic Celender',
          icon:'calendar_today'
        },
        {
          name:'quran-surah',
          txt:'Quran',
          icon:'view_list',
          children:[
            {
              name:'quran-surah',
              txt:'surah',
              icon:'chrome_reader_mode'

            }

          ]
        },
        {
          name:'',
          txt:'connect us',
          icon:'home',
          children:[
           {
          name:'connect-contactus',
          txt:'contact us',
          icon:'note'

        },
          {
          name:'connect-yourSuggestions',
          txt:'your Suggestions',
          icon:'note'

        }

          ]

        },

       
       //quran-surah
      ],
     
       
      }
    },
  methods:{
  getUrl(val){
  if(val){
    let props = this.$router.resolve({ 
  name: val,
});

return props.href;  
  }else{
  return '#'
  }

  }


  }
  

  }
</script>



