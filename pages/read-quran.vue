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
        <v-tab @click="changeTab('full')">View Full Surah</v-tab>
        <v-tab active-class="active" @click="changeTab('page')">Page View</v-tab>
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
    
   if(params.id){
    const x =  /^\d+$/.test(params.id);
  
    if(x && parseInt(params.id) <=114){
        
     return x
    }else{
        return false;
    }
   
   }else{
       return true;
   }

   
    
  },

 async  fetch({app,store,params}){


const slug = params && params.id && Number.isInteger(parseInt(params.id)) ? params.id : 1;

const getData = (url)=>app.$axios.get(url)

const translationUrl = `https://api.alquran.cloud/surah/${slug}/en.asad`
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



infoFilter(){
const infos = this.infos;

return infos;
return infos.filter(item=>{
    
//return item.page ==3;
})

},
ayahsFilter(){
const ayahs = this.ayahs;

return  ayahs.filter(item=>{
    
return item.page ==3;
})

}
},
methods:{

changeTab(val){
 this.$store.dispatch('ReadAndListen/SET_surahView',val)

this.view = val
}
,
typeCheck(v,type){
return 'amamam'
return typeof v === type
//undefined
//string
//boolean
//number
//object
}
}  
}
</script>




