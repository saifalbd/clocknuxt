<template>
    <div>
     
     
       <div class="surahIndexPage">
    <PageTitle title="Name Of Surah">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veritatis nam a officia. Quia, ducimus! Minus sed id commodi et ex natus quod adipisci explicabo?
    </PageTitle>

      
     <div class="submenu text-xs-center">
       <div class="text-xs-center">
    <v-menu offset-y>
      <v-btn
        slot="activator"
        color="primary"
        dark
      >
   change tranlation
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="(item, index) in Language"
          :key="index"
          @click="readWith = item"
        >
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
      <div>
        Current Tranlation Language  English
      </div>
       </div>   
   <div class="listOfSurahBox">
<div class="surahBox" v-for="(item,index) in surahDetails" :key="index">
<svg width='100%' height='100%' viewBox="0 0 100 15">
  <polyline points="0,14 50,1 100,14" style="fill:none;stroke:#1b5e20;stroke-width:2" />
  Sorry, your browser does not support inline SVG.
</svg>
<div class="surahDetails">
<div class="number">{{item.number}}</div>
<div class="nameAr">
   {{item.name}}
</div>
<div class="nameEn">
  {{item.englishName}}
</div>
<div class="meenig">
  ({{item.englishNameTranslation}})
</div>
<div>
  
     <v-btn depressed small color="primary" :to="getUrl({ surahName: item.lowerNameEng ,lang:readWith.code})">
         read surah with {{readWith.name}}
     </v-btn>
</div>


</div>

               </div>
               
           </div>
      <div class="tagBox">
<div class="tagtitle">TAGS</div>
<div class="languageBox">
<div class="languageBoxItem" v-for="(item,i) in tagList()" :key="i">
<div class="tagtitle">{{item.langName}}</div>
<div class="tagListBox">
<a class="tagLink" 
 v-for="(list , index) in item.suraList" :key="index"
  :href="list.url">[{{index+1}}]: Read Sura {{list.englishName}} in {{item.langName}}</a>

</div>
</div>
</div>
      </div>
       </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';

import {langName}  from '@/plugins/helper/Language/langName'

import PageTitle from '@/components/smallCom/PageTitle'

export default {
components:{
PageTitle
},
head: {
 title: `read Quran arabic with translation in more than 50 languages | ${process.env.appName}`,
  meta: [
     { hid: 'description', name: 'description', 
     content: `Read the Qur'an all of surah with translation in more than 50 languages` },
  ]

},
data(){
  return{
    Language : [],
    readWith:{
 name:'English',
  code:'en'
    },
  
    
  }
},
async asyncData ({app,store}) {
store.dispatch('ReadAndListen/SET_NAMEOFSURAH');
let lang = new langName()
const {data} = await app.$axios.get('https://api.alquran.cloud/edition/type/translation')
const languageCodes = data.data.map(item=>item.language)
const uniqeCode = []
languageCodes.forEach((el,index) => {
if(lang.isCode(el)){if(!uniqeCode.find(item=> item===el)){uniqeCode.push(el)}}});
const obj = uniqeCode.map(item=>{return {code:item,name:lang.getName(item)}})
return {
Language:obj
}

},
computed:{
    ...mapState({
  nameOfSurah:state=>state.ReadAndListen.nameOfSurah,
}),
surahDetails(){


return this.nameOfSurah;

} ,

},
methods:{
  getUrl(arg){
    //{ surahName: val ,lang:'en'}
 let props = this.$router.resolve({ 
  name: 'quran-surah-lang-surahName',
  params: arg,
});

return props.href;
//https://stackoverflow.com/questions/42927637/get-route-by-name-and-params-for-vue-router
},
tagList(){
let lang = new langName();
const result = [];
lang.codeName.forEach((item,index)=>{
if(item.code !='ar'){

let name = item.name.split(";")[0]
name = name.split(",")[0]
let data = {langName:name}
data.suraList =this.nameOfSurah.map((list,i)=>{
 return {
englishName:list.englishName,
url:this.getUrl({ surahName: list.lowerNameEng ,lang:item.code})
 }
})

result.push(data)
}
})

return result;
}
},

    
}
</script>

