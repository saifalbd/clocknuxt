<template>
<v-layout row wrap class="asmaAlHasnaPage">
    <PageTitle title="Asma Al Husna">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veritatis nam a officia. Quia, ducimus! Minus sed id commodi et ex natus quod adipisci explicabo?
    </PageTitle>
    <v-flex xs12>
        <div row wrap pa-0 class="asma-al-hasna-inner">
              <div xs3 v-for="(item,i) in info" :key="i" class="name-box"  > <!--:style="{backgroundColor:randcolor()}"-->
        <div class="number">
           {{item.number}}  
        </div>
        <div class="name-ar">
  {{item.name}}
        </div>
        <div class="transliteration">
          {{item.transliteration}}  
        </div>
        <div class="meaning">
          meaning:  {{item.en.meaning}}
        </div>
     
    </div>

        </div>
    </v-flex>
  
</v-layout>
    
</template>

<script>
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
import PageTitle from '@/components/smallCom/PageTitle'

export default {

head: {
 title: `read Quran arabic with translation in more than 50 languages`,
  meta: [
     { hid: 'description', name: 'description', 
     content: `Read the Qur'an all of surah with translation in more than 50 languages` },
  ]

},



components:{
PageTitle
},
  async    asyncData ({app,store}) {
const url = 'https://api.aladhan.com/asmaAlHusna'
 const  {data} =  await  app.$axios.get(url);
 //store.commit('AsmaAlHusma/SetFullMonth',info)

 return {
     info:data.data
 }



     } 
     ,
     computed:{
//...mapState({info:state=>state.AsmaAlHusma.Info})
}
}

</script>

