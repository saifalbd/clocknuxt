<template>
    <div class="readQuranText" v-if="getAyahs">

<div class="OnOffLang">
<div class="ar">
    <v-switch :label="`Quran: ${onOffModify(onOff.quran)}`" v-model="onOff.quran"></v-switch>

</div>

<div class="tans">
      <v-switch  :label="`Tranlation: ${onOffModify(onOff.translation)}`" v-model="onOff.translation"></v-switch>
    
</div>
<div class="tans" v-if="sideView">
      <v-switch  :label="`Show Full Surah: ${onOffModify(sideViewShowFullSurah)}`" v-model="sideViewShowFullSurah"></v-switch>

    
</div>
<div class="infos">
      <v-switch  :label="`infos: ${onOffModify(onOff.infos)}`" v-model="onOff.infos"></v-switch>

</div>
</div>



    <v-layout row wrap v-for="(item,index) in getAyahs" :key="index">
        
        <v-flex xs12 v-if="onOff.infos">
            <ul class="readSingleAyasInfo">
<li v-if="item.info.number !='undefined'">
  Ayah of Quran  
  <span class="number">
      {{item.info.number}}
   </span>
</li>
<li v-if="item.info.numberInSurah  !='undefined' ">
    Ayah of Surah  
      <span class="number">
      {{item.info.numberInSurah}}
   </span>
</li>
<li v-if="item.info.page  !='undefined'">
   page Of Quran
      <span class="number">
      {{item.info.page}}
   </span>
</li>
<li v-if="item.info.juz  !='undefined'">
 number of juz  
  <span class="number">
     {{item.info.juz}} 
   </span>
</li>
<li v-if="item.info.manzil !='undefined'">
  number of manzil 
    <span class="number">
     {{item.info.manzil}} 
   </span>
</li>

<!--{ "number": 5994, "numberInSurah": 1, "juz": 30, "manzil": 7, "page": 593, "ruku": 531, "hizbQuarter": 237, "sajda": false }-->
            </ul>
            
        </v-flex>
    <v-layout row wrap  v-if="sideView">
  
  

        <v-flex class="xs12" v-if="onOff.quran" :class="widthBinding">
<div class="readSingleAyasMain fullView">
 

 

            <span v-for="(list,index) in item.txt.main" :key="index" class="textLine">
       
<VerseSing v-if="Number.isInteger(list)">{{list}}</VerseSing>
<template v-else>
      {{list}}
</template>
     


    </span>
   

            </div>
        </v-flex>
        <v-flex xs12 v-if="onOff.translation" :class="widthBinding">
<div class="readSingleAyasTanslation fullView">
    <span v-for="(list,index) in item.txt.translation" :key="index" class="textLine">
<VerseSing v-if="Number.isInteger(list)">{{list}}</VerseSing>
<template v-else>
      {{list}}
</template>   
              
    </span>
    

            </div>        
        </v-flex>
    </v-layout>
    <v-layout row wrap pt-2 pb-2 v-if="!sideView">
           <v-flex xs12 v-if="item.txt && item.txt.main && onOff.quran">
            <div class="readSingleAyasMain">
{{item.txt.main}}
            </div>
              
        </v-flex>
        <v-flex xs12 v-if="item.txt && item.txt.translation && onOff.translation">
            <div class="readSingleAyasTanslation">
 {{item.txt.translation}}
            </div>
           
        </v-flex>
 
    </v-layout>
    
    </v-layout>
<div class="text-xs-center">
  
      <v-layout justify-center wrap v-if="totalPage">
       
        <v-flex xs12 sm10 md8>
          <v-card>
           
            <v-card-text>
            <div>
                Number Of Page {{page}}
            </div>
              <v-pagination
                v-model="page"
                :length="totalPage"
              ></v-pagination>
            </v-card-text>
          </v-card>
        </v-flex>
      
      </v-layout>
  
  </div>
    </div>
</template>

<script>
import VerseSing from '@/components/smallCom/VerseSing.vue'
export default {
components:{
VerseSing
},

data(){
    return {
    sideView:false
    ,
    sideViewShowFullSurah:false
    ,
     onOff:{
            quran:true,
            translation:true,
            infos:true
        },
    pagination:true,
    totalPage:0,
    page:1

    }
},
computed:{
widthBinding(){
const {quran,translation} = this.onOff

return quran && translation ? 'lg6' :'lg12'
},
getAyahs(){

if(this.$store.state.ReadAndListen.allInformation){
const {allInformation,surahView} = this.$store.state.ReadAndListen;
console.log('allInformation',surahView)
if(surahView==='side'){
this.sideView = true;
if(!this.sideViewShowFullSurah){

const arr = allInformation.data.ayahs.filter(list=>{

 return  list.info.pageofSurah === this.page
})
this.totalPage =  allInformation.pageInfo.totalPage
return this.setSideView(arr);
}else{
this.totalPage = 0;
return this.setSideView(allInformation.data.ayahs);
}


}else if(surahView==='page'){
this.sideView = false
return this.doPaginate(allInformation);
}else if(surahView==='full'){
this.sideView = false;
this.totalPage = 0;
return allInformation.data.ayahs
}




}
}
},
methods:{
onOffModify(val){
return val? 'on':'off';
},
doPaginate(data){
this.totalPage =  data.pageInfo.totalPage
return data.data.ayahs.filter(list=>{
return list.info.pageofSurah ===this.page
})

},
setSideView(arr){
try{
if(!Array.isArray(arr)) throw 'setSideView function argument not are array'
if(!arr[0])   throw 'array is empty'
if(!arr[0].info)  throw 'array info are missing'
if(!arr[0].txt)  throw 'array txt are missing'


const firstInfo = arr[0].info;
const lastInfo = arr[arr.length-1].info;
const fistTxt = arr[0].txt;
const infoList = {}

Object.keys(firstInfo).forEach((key,index)=>{
if(firstInfo[key] && lastInfo[key]){
if(Number.isInteger(firstInfo[key]) && Number.isInteger(lastInfo[key])){
if(firstInfo[key] ===lastInfo[key]){
infoList[key] = firstInfo[key];
}else{
infoList[key] =`${firstInfo[key]} - ${lastInfo[key]}`;
}

}}


});



var main = []
var translation = []
arr.forEach((item,index) => {
let {txt,info} = item;

if(txt.main){
let t = txt.main.split(" ")
t.unshift(info.numberInSurah)
t.forEach(list=>{main.push(list)})}

if(txt.translation){
let t = txt.translation.split(" ")
t.unshift(info.numberInSurah)
t.forEach(list=>{translation.push(list)})}
});

return [{
    info:infoList,
    txt:{
      main,translation  
    }
}]
}
catch(err){
console.error(err)
}
}
},
watch:{
'onOff.quran':function(val){
if(!this.onOff.translation && !val){
this.onOff.translation = true;
}
},
'onOff.translation':function(val){
if(!this.onOff.quran && !val){
this.onOff.quran = true;
}
}
}
}
</script>





<style scoped>
.test{
    background: lime;
}
</style>
