<template>
<div class="nameOfSurahPage">
    <no-ssr>

<PageTitle title="Name Of Surah">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veritatis nam a officia. Quia, ducimus! Minus sed id commodi et ex natus quod adipisci explicabo?
    </PageTitle>


<v-card>
     <v-card>
    <v-card-title>
      Nutrition
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
 </v-card>
 
<v-layout row wrap   class="nameListBox" v-if="infoFilter" v-for="(list,i) in infoFilter" :key="i"  >
 
    <v-flex xs12 >
    <div class="numberBox">
<div class="numberCircle" > {{list.number}}</div>
    </div>

    </v-flex>
    <v-flex xs6 lg1 class="item one">
        <router-link 
        :to="{name:'quran-surah-surahName',
        params: { surahName: list.lowerNameEng}}">
      <v-card  height="100%" class="itemCard" >
      
         <v-icon dark x-large>chrome_reader_mode</v-icon>
         
          <span>
              Read
          </span>
         
      </v-card>
       </router-link>
    </v-flex>
      <v-flex xs6 lg1 order-lg3 class="item three">
         <v-card  height="100%" class="itemCard">
           <v-icon dark x-large>play_arrow</v-icon>
           <span>
               Play
           </span>
      </v-card>
    </v-flex>
    <v-flex xs12 lg10 class="item two">
  <v-card   height="100%" >
       <v-layout width="100%" row wrap >
          <v-flex :class="{xs12:!$vuetify.breakpoint.lg}"  v-for="(item,index) in Object.keys(list)" :key="index" v-if="item !='lowerNameEng' && item !='number'">
              <v-card class="itemCard" height="100%">
                 <v-layout row wrap>

                     <v-flex xs12 sm6 md6 lg12 pt-1 pb-1>
                         
<v-tooltip left>
     <span  slot="activator"
        color="primary"> {{ item | FilterTitle }}</span>
      <span> {{ item  }}</span>
     
    </v-tooltip>   
                     </v-flex>
                       <v-flex xs12 sm6 md6 lg12  pt-1 pb-1>
                         {{list[item]}}
                     </v-flex>
                 </v-layout> 
              </v-card>
          </v-flex> 
       </v-layout>   


      </v-card>
    </v-flex>
  

</v-layout>
</v-card>

    </no-ssr>
</div>

</template>

<script>
import SVG from 'svg.js'
import {mapState} from 'vuex'
import PageTitle from '@/components/smallCom/PageTitle'

export default {
components:{
PageTitle
},

data(){
    return { 
        search:'',
        infos:''
    }
},

computed:{
...mapState({
  nameOfSurah:state=>state.ReadAndListen.nameOfSurah,
}),

    infoFilter(){
       // console.log(this.$store)
const info = this.nameOfSurah

//let x = false;
if(info){
if(this.search){
const search= this.search;
return this.searchInputfilter({
info,
search
})

}else{
 return info
}
      
}
        
    }
},
methods:{

searchInputfilter(data){
const  {info,search} =data;

const fristIndexKey = Object.keys(info[0]);

return info.filter((item)=>{
var result;
Object.keys(item).forEach(e=>{
console.log(typeof item[e])
let loawer = (val) =>{
if(typeof val == 'string'){
return val.toLowerCase()
}else{
return val.toString();
}

}

if(loawer(item[e]).search(loawer(search))>-1){
result =true;
}

})

if(result){
return item;
}



})


},


svgPath(){
var draw = SVG('num1').size()

var path = draw.path('M10,50 A50,30 0 1,0 90,50 V80 H10 Z')
path.fill('none')
path.stroke({ color: '#f06', width: 4, linecap: 'round', linejoin: 'round' })



}
},
mounted() {
const self =this;
this.$store.dispatch('ReadAndListen/SET_NAMEOFSURAH');
if (process.browser) {
  window.onNuxtReady((app) => {
    console.log('Nuxt ready!')
    window.onload=()=>{
//self.svgPath()
    }
    
  })
}

   
},
filters: {
FilterTitle(value){
var x;
switch(value){
    
 
 
        case 'name' : x = 'Name'
    break
   
        case 'numberOfAyahs' : x = 'num Of Ayahs'
    break
   
         case 'numberOfAyahs' : x = 'num Of Ayahs'
    break
         case 'revelationType' : x = 'rev Type'
    break
         case 'englishName' : x = 'Eng Name'
    break
         case 'englishNameTranslation' : x = 'Eng Name Trans'
      
      
 
    

 
     break
    default:
    x= value;



}
return x
}
}
    
}
</script>



