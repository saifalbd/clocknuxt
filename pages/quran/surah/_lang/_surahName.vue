<template>
<div class="readQuranPage">


<div v-if="setInformation">
 


    <div class="infoBox">
        <div class="infoBox-innar">
            <div class="numberBox">
                <div class="circleBox">
                    <div class="setNumber">{{setInformation.surahInformation.number}}</div>
                </div>
            </div>
            <div class="textInfo">
            <div class="infoNameAr">
                {{setInformation.surahInformation.name}}
            </div>
            <div class="infoNameEn">
               Name of English: {{setInformation.surahInformation.englishName}}
            </div>
            <div class="infoRevelationType">
               Type of Revelation: {{setInformation.surahInformation.revelationType}}
            </div>
            <div class="infoNumberOfAyahs">
               Number Of Ayahs: {{setInformation.surahInformation.numberOfAyahs}}

            </div>
        </div>
       <div class="textInfoTenslation">
 <fieldset>
  <legend>Translation:</legend>
  <div>
Language: {{setInformation.editionInformation.translation.langName}}
  </div>
 <div>
 Translator : {{setInformation.editionInformation.translation.englishName}}
 </div>
<div>
Translation Format : {{setInformation.editionInformation.translation.format}}
</div>

 </fieldset>
        </div>
        <div class="changeSurah">
<ChangeMonth/>
        </div>
  
        </div>
    
    </div>
  


  

<!--Start Tab-->

  <v-tabs
        
      
        centered
        color="deep-purple darken-4"
        slider-color="yellow accent-1"
        class="filterTabs"
        active-class="active"
       dark
      >
       
        <v-tab  @click="changeTab('page')">Page View</v-tab>
         <v-tab @click="changeTab('full')">View Full Surah</v-tab>
        <v-tab  @click="changeTab('side')">Side View</v-tab>
       
    </v-tabs>
<!--end tab -->

<ReadQuranText/>

</div>
</div>
</template>

<script>

import ChangeMonth from  '@/components/readQuranPage/ChangeSurah'
import ReadQuranText from  '@/components/readQuranPage/ReadQuranText'
import {getDetailsData} from '@/plugins/nameOfSurah/fullDetailsSuahName'
import {langName}  from '@/plugins/helper/Language/langName'

export default {
components:{
ChangeMonth,ReadQuranText
},
 head() {
    const {meta} = this.$store.state.ReadAndListen.theHead;
  return {
    title: 'Read Quran',
    meta
  }
  },
data(){
    return {
       
        view:1,
        on:false,
        information:'',
        infos:'',
        ayahs:''

    }
},
  validate ({ params }) {
    // Must be a number
  
   if(params.surahName && params.lang){
    const  {surahName,lang}  =params ;
  const checkLang = lang !='ar' && new langName().isCode(lang) ? true :false;
  const  x =  getDetailsData().find(item=>item.lowerNameEng === surahName)
  
if(checkLang && x && x.number){
return true
}

   }else{
       return false;
   }

   
    
  },

 async  fetch({app,store,params}){
 const  {surahName,lang}  =params ;
const  x =  getDetailsData().find(item=>item.lowerNameEng === surahName)

const slug = x && x.number ? x.number : 1;
const langString = lang ? lang : 'en'

const getData = (url)=>app.$axios.get(url)
const langEdition = `https://api.alquran.cloud/edition/language/${langString}`
const fetchLangEdition  = await getData(langEdition);
const fetchLData =fetchLangEdition.data;
const translationUrl = `https://api.alquran.cloud/surah/${slug}/${fetchLData.data[0].identifier}`
const surahUrl = `https://api.alquran.cloud/surah/${slug}`

const fetchTranslation = getData(translationUrl)
const fetchSurah = getData(surahUrl);
const PromiseFetchT = await fetchTranslation;
const PromiseFetchSurah = await fetchSurah;

store.commit('ReadAndListen/SET_DetailsOfSurahTxt',{
type:'surah',
translation:PromiseFetchT.data.data,
surah:PromiseFetchSurah.data.data
})




},
computed:{

setInformation(){

const {allInformation,setMeta,surahView} = this.$store.state.ReadAndListen;

if(allInformation){
return allInformation.data.mainInfo;
}


//data
},





},
methods:{

changeTab(val){
 this.$store.dispatch('ReadAndListen/SET_surahView',val)

this.view = val
}

}  
}
</script>

<style lang="scss" scoped>
.test{
    background: white;
}
</style>


