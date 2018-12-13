<template>
    <v-layout row wrap>
    <v-flex xs12>
        <div @click="openDialog">
Change  Surah
        </div>
       
    </v-flex>
    <v-flex xs12 sm8 offset-sm2 md6 offset-md3 >
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
     
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Privacy Policy
        </v-card-title>

        <v-card-text>
        <!--Start Form-->
        <v-layout row wrap>    
<v-flex xs12>

  <v-autocomplete
        v-model="model.nameOfSurah.set"
        :hint="!isEditing ? 'Click the icon to edit' : 'Click the icon to save'"
        :items="model.nameOfSurah.get"
        :readonly="!isEditing"
        :label="`State — ${isEditing ? 'Editable' : 'Readonly'}`"
        persistent-hint
      
      >
        <v-slide-x-reverse-transition
          slot="append-outer"
          mode="out-in"
        >
          <v-icon
            :color="isEditing ? 'success' : 'info'"
            :key="`icon-${isEditing}`"
            @click="isEditing = !isEditing"
            v-text="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"
          ></v-icon>
        </v-slide-x-reverse-transition>
      </v-autocomplete>




    
</v-flex>
<v-flex xs12>
    <v-layout row wrap>
        <v-flex xs12>
            <h3>
                translation
            </h3>
        </v-flex>
      
    <v-flex xs12 d-flex>
        <v-select
          :items="model.language.get"
          label="setLanguage"
        v-model="model.language.set"
        
        ></v-select>
      </v-flex>
    </v-layout>
</v-flex>
    <v-flex xs12 d-flex>
        <v-select
          :items="model.translator.get"
          label="setTranslator"
          v-model="model.translator.set"
        
        ></v-select>
      </v-flex>
   

        </v-layout>
        <!--end from-->
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            
            @click="Submit()"
          >
           Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
        
    </v-flex>

    </v-layout>
</template>


<script>
  import axios from 'axios'
  import {mapActions} from 'vuex'

  export default {
    data: () => ({
 
        dialog: false,
        isEditing:true,
        nameOfSurah:[],
        nameOfEdition:[],
        model:{
            nameOfSurah:{
                get:[],
                set:''
            },
            language:{
                get:[],
                set:''
            },
            translator:{
                get:[],
                set:''
            }
        
        },
        
      valid: true,
    
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
   
     
     
    }),

    methods: {
...mapActions('ChangeMonth',
{off_LoaderModel:'SET_LoaderModel'}
),

  async  openDialog(){
const nameOfSurahUrl = 'https://api.alquran.cloud/surah'

const nameOfEditionUrl = 'https://api.alquran.cloud/edition?format=text'
const getData = (url)=>this.$axios.get(url)

if(this.nameOfEdition[0] && this.nameOfSurah[0]){
this.setInformation();
this.dialog =true
}else{
var NameOfSurah;

if(this.$store.state.ReadAndListen.nameOfSura){
NameOfSurah ={data:{data:this.$store.state.ReadAndListen.nameOfSura}}
}else{
const  getNameOfSurah =  getData(nameOfSurahUrl);
 NameOfSurah = await getNameOfSurah;
}

const getNameOfEdition =  getData(nameOfEditionUrl);
const NameOfEdition =  await getNameOfEdition;
if(NameOfSurah && NameOfEdition){
if(NameOfSurah.data && NameOfEdition.data){
if(NameOfSurah.data.data &&  NameOfEdition.data.data ){
this.nameOfEdition = NameOfEdition.data.data ;
this.nameOfSurah = NameOfSurah.data.data;
this.setInformation();
this.dialog =true

}

}

} //end if(NameOfSurah && NameOfEdition)

}


return true
    },
setInformation(){
const surah = this.nameOfSurah;
const edition = this.nameOfEdition.filter((e)=> e.type!="tafsir")

this.model.nameOfSurah.get =  surah.map(e=>e.englishName);
this.model.nameOfSurah.set = this.model.nameOfSurah.get[0];

const findLang = edition.filter((e,i,arr)=>{
let finderLang = this.codesOfLanguages(
    {setType:'code',set:e.language,get:'code'}
    )
    
 let findAlredy =  arr.findIndex(function(item,i,arr)
 {e.language===item.language});
if(e.language===finderLang && findAlredy<0){
return e.language;
}
})


this.model.language.get = findLang.map(e=>{
//return e.language

return this.codesOfLanguages({setType:'code',set:e.language,get:'name'})



});
this.model.language.set =this.model.language.get[0]

edition.forEach(e => {
let getcode = this.codesOfLanguages({
    setType:'name',
    set:this.model.language.set,
    get:'code'})
    
if(e.language ===getcode){

this.model.translator.get.push(e.englishName) 
}
})
this.model.translator.set = this.model.translator.get[0]




},

   async   Submit () {
        var surah = this.model.nameOfSurah.set;
       var language = this.model.language.set;
        var translator = this.model.translator.set;

       
        if(surah&&language&&translator){  
        this.dialog =false;
        this.$store.dispatch('PreLoader/preLoad',true)
        
        

        language = this.codesOfLanguages(
    {setType:'name',set:language,get:'code'}
    )
const numberof = ()=>{
let x = this.nameOfSurah.filter(e=>{
    return e.englishName === surah;
})

return x[0] ? x[0].number:false;
}
const identifier = ()=>{
const x = this.nameOfEdition.filter(e=>{
if(e.language === language && e.englishName === translator){
return true;
}
})
return x[0]?x[0].identifier:false

}

if(numberof() && identifier()){
try{
const getData = (url)=>this.$axios.get(url)
const translationUrl = `https://api.alquran.cloud/surah/${numberof()}/${identifier()}`
const surahUrl = `https://api.alquran.cloud/surah/${numberof()}`
const fetchTranslation = getData(translationUrl)
const fetchSurah = getData(surahUrl);
const PromiseFetchT = await fetchTranslation;
const PromiseFetchSurah = await fetchSurah;

if(PromiseFetchT && PromiseFetchSurah){

this.$store.commit('ReadAndListen/SET_DetailsOfSurahTxt',{
type:'surah',
translation:PromiseFetchT.data.data,
surah:PromiseFetchSurah.data.data
})
this.$store.dispatch('PreLoader/preLoad',false)
}


console.log(PromiseFetchT.data)

}
catch(e){
console.error(e)
}



}



        }


      },
      clear () {
        this.$refs.form.reset()
      },

codesOfLanguages(arg){
const {langName} =this.$helper.Language

 const data =  new langName().codeName

const {setType,set,get} =arg;
if(setType==='code'){
let x = data.findIndex(e=>{
return e.code === set;
})
return x>-1 ? data[x][get] : false;
}else if(setType==='name'){
let x = data.findIndex(e=>{
return e.name === set;
})
return x>-1 ? data[x][get] : false;

}

}//end codesOfLanguages


    },
computed:{

  },
 watch: {
'model.language.set':function(val, oldVal){
if(val){
const edition = this.nameOfEdition.filter((e)=> e.type!="tafsir");
this.model.translator.get=[]
edition.forEach(e => {
let getcode = this.codesOfLanguages({
    setType:'name',
    set:this.model.language.set,
    get:'code'})
    
if(e.language ===getcode){

this.model.translator.get.push(e.englishName) 
}
})
this.model.translator.set = this.model.translator.get[0]

}
}




},
mounted() {
  this.$store.dispatch('ReadAndListen/SET_NAMEOFSURAH');
},
 
  

}
</script>

<style lang="scss" scoped>

</style>


