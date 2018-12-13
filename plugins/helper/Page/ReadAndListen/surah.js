import { isThisQuarter } from "date-fns";
import {metaInfo}  from '@/plugins/helper/meta/metaInfo'
import {langName}  from '@/plugins/helper/Language/langName'

 export class surah extends metaInfo{

    constructor(data){
    super()
    this.type = data.type ?data.type :false
    this.surah = data.surah ? data.surah :false
    this.translation = data.translation ?  data.translation  :false;
    }


    info(info){
const setInfo = {};
        for (var item in info) {
        if(item!='ayahs'){
        setInfo[item]=info[item]
        }
      
        }



return setInfo;
    }

    surahFilter(){
    if(this.surah){
const {ayahs} = this.surah; //this variable all time top on info
const info =  this.info(this.surah)

return {
info,
ayahs
}


    } else {
    return false
    }
    } //end surahFilter


    translationFilter(){
    if(this.translation){
        const {ayahs} = this.translation; //this variable all time top on info
        const info =  this.info(this.translation)
        
        return {
        info,
        ayahs
        }
        
    
    }else{
        return false
    }
    }

get information(){
return {
    type:this.type,
    data:{
        surah:this.surahFilter(), //all time surah key on top because surah text need on top 
        translation:this.translationFilter(),
       audio:false,
    }
   

}

}
translationMixer(arr){
try{
arr.forEach((item)=>{if(arr[0].length != item.length) throw `main language item and others item length no equal`})
const mainLang = arr[0];
const forMixing = arr.slice(1); // remove 0 index useing 1 create new array
forMixing.forEach((mainItem,index)=>{
mainItem.forEach((item,index)=>{
let fistKey = Object.keys(item.txt)[0];
mainLang[index].txt[fistKey] = item.txt[fistKey]
//item.info.amar ='suna' for test
for(let x in item.info){

    if(mainLang[index].info[x] ==='undefined' || mainLang[index].info[x] !=item.info[x]){
     
        mainLang[index].info[fistKey] = {  [x] :item.info[x] }
    }
}
})

})

return mainLang;
}
catch(err){
console.log(err)
}

}
languageMixer(val){

    const lang =  new langName();
var tansLang ;
if(lang.isCode(val)){
tansLang = lang.getName(val)
}else{
tansLang = val;
}

return tansLang
}

ayahsMixer(allAyahs){
try{
    if(!Array.isArray(allAyahs)) throw allAyahs + 'not type of array'
   
    if(!allAyahs[0]) throw allAyahs + 'is empty array'

const GetDetails =     allAyahs.map((item,index)=>{
                        let itemData = []
                        item.forEach((list)=>{
                        let listData = {
                        info:{},
                        txt:{}
                        }

                        for(let d in list){
                        if(d ==='text'){
                        if(index ===0){
                         listData.txt.main =list[d]
                        }else if(index ===1){
                            listData.txt.translation =list[d]
                        }else{
                            listData.txt.audio =list[d]
                        }
                        }else{
                        listData.info[d]=list[d]
                        } 
                        }
                        itemData.push(listData)
                        })

                        return itemData
                        })

return this.translationMixer(GetDetails) 


}
catch(err){
console.log(err)
}


}
surahMainDataInfo(arr){
try{
    if(!Array.isArray(arr)) throw 'surahMainDataInfo method only argument accept is array'
const mainItem = arr[1]
const mainItemKeys = Object.keys(mainItem) 

if(arr.length>1){
    const forMixing = arr.slice(1);
    forMixing.forEach((item)=>{
   Object.keys(item).forEach(el=>{
    if(!mainItemKeys.includes(el)){
    throw 'first array keys and others array key not match'
    }
   })
   
    })
}
const surahInformation = {}
const editionInformation = {}
arr.forEach((item,index)=>{
for(let x in item){
if(x ==='edition'){

item.edition.langName=  this.languageMixer(item.edition.language)



editionInformation[item.edition.type] = item[x]
} else{
    surahInformation[x] = item[x]
}
}
})

// end of validation



return {
    surahInformation,
    editionInformation ,
}
}
catch(e){

console.log(e)
}

}

PureInfoMixer(data){ 
try{
if(typeof data !='object')  throw `this pratamitar not ar object ayahsMixar(${data}) passing need must be  a object`;
if(!Object.keys(data).length) throw `ayahsMixar(${Object.keys(data)}) passing paramiter ar object but missed key data.translation or data.surah,data.audio must be need minimum one key`

const allAyahs=[];
const info = []
Object.keys(data).forEach((e)=>{

if(!(['translation','surah','audio'].find((item)=>e===item))) throw `${e}object key must be one key translation or surah or audio or translation , surah , audio`

if(data[e] && typeof data[e] !='object') throw `object key if true then must be object`
if(data[e] && !data[e].info) throw e+' info keys missing'
if(data[e] && !data[e].ayahs) throw e+' ayahs keys missing'
if(data[e].ayahs){
    info.push(data[e].info)
    allAyahs.push(data[e].ayahs);
}


//return data[e]
})

return{
mainInfo:this.surahMainDataInfo(info),
ayahs:this.ayahsMixer(allAyahs)
}



}
catch(err) {
    console.error(err)
}

}

PureInfo(){
const info = this.information;
return {
type:info.type,
data:this.PureInfoMixer(info.data)
}

}

PureInfoPagination(){
const incomingData =this.PureInfo()

const firstPageOfSurah = incomingData.data.ayahs[0].info.page-1;
incomingData.data.ayahs.forEach((item,index)=>{
    item.info.pageofSurah =item.info.page-firstPageOfSurah
})
const setPaginationArray = ()=>{
 const totalPage = incomingData.data.ayahs[incomingData.data.ayahs.length-1].info.pageofSurah
 const pageSlugs = []
for (let index = 0; index < totalPage; index++) { pageSlugs[index] = index+1;}
 return {
    totalPage,
    pageSlugs
 }
}
incomingData.pageInfo = setPaginationArray(incomingData.data.ayahs)
return incomingData
//return incomingData.data.ayahs


}

pageMeta(){
const {data} = this.PureInfo();
const {mainInfo} = data;
const {surahInformation,editionInformation} = mainInfo;
const {translation} =editionInformation
//set keywords
for(let x in surahInformation){
if(typeof surahInformation[x] === 'string') this.keywords = surahInformation[x]

}


// set description

const lang =  new langName();
const { englishName } =surahInformation
var tansLang =translation.langName;


this.description = `Surah ${englishName} with translation in ${tansLang}` 

return {
    meta:[this.keywords,this.description]
}

     


}




}