<template>
    
      
            <v-flex xs10 offset-xs-1 md4 offset-md-0 justify-center align-center > <!--v-if="getTodayPrayer && getTodayPrayer.todayPray"-->
            <div class="allSalah">
                <div v-if="getTodayPrayer && getTodayPrayer.todayPray">
                     {{getTodayPrayer.todayPray.mainSalah}}
                </div>
            <div class="titleIs">
Todays Parayer
            </div>
   
            <ul v-if="getTodayPrayer && getTodayPrayer.todayPray">
                <li v-for="(item , index) in getTodayPrayer.todayPray.mainSalah" :key="index">
                    <span>{{index}}</span>
                    <span>{{item.hour}}:{{item.min}} </span>
                    <span>arabic</span>
                </li>
            <li class="moreSalah" v-if="!moreSalah" @click.stop="moreSalah = !moreSalah">
                 <v-btn small  dark>More</v-btn>
            
            </li>
            <li v-if="moreSalah" v-for="(e , i) in getTodayPrayer.todayPray.moreSalah" :key="i">
                <span>{{i}}</span>
                    <span>{{e.hour}}:{{e.min}}</span>
                    <span>arabic</span>
            </li>
            <li class="moreSalah" v-if="moreSalah" @click.stop="moreSalah = !moreSalah">
                <v-btn small  dark>Hide</v-btn>

            </li>
            </ul>
            </div>
        </v-flex>
    
</template>

<script>
import {mapGetters} from 'vuex'
    export default {
data(){
    return { 
        moreSalah:false
    }
},
computed:{
...mapGetters('forFilterPrayer',[
 
  'getTodayPrayer'
 ]),
}

    }

</script>


