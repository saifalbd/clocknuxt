
<template>

    <v-layout row wrap class="homePage">
    <div class="svgStyle">
    <div class="svgitemOne"></div>
    <div class="svgitemTwo"></div>
    </div>
     <v-flex xs12>
       <v-layout row wrap class="topLayout">
        <LocationName/>
            <!--comming Prayer hear-->
         <ComingPrayer/>
         <TodayIs/>
         
         <v-flex xs12 md5 class="homeColunm">
            <no-ssr>
            <SvgClock/>
            </no-ssr>

        </v-flex>
    <!--today Prayer List -->
      <TodayPrayer/>
       </v-layout>
       
     </v-flex>
      
        <v-flex >
            <fullMonthList/>
        </v-flex>
        
    </v-layout>
</template>

<script>
import SvgClock from '@/components/homePage/SvgClock'
import ComingPrayer from '@/components/homePage/commingPrayer'
import TodayPrayer from '@/components/homePage/todayPrayer'
import fullMonthList from '@/components/homePage/fullMonthList.vue'
import TodayIs from '@/components/homePage/TodayIs'
import LocationName from '@/components/homePage/LocationName'

import isBefore from 'date-fns/is_before'
import {mapGetters} from 'vuex'
import HijriDate,{toHijri} from 'hijri-date/lib/safe';


export default {
  components: {
    fullMonthList,
     ComingPrayer,
     TodayPrayer,
     SvgClock,
     TodayIs,
     LocationName
 
  },
  data () {
    return {
      
       project: 'default',
       onoff:false,
       upComing:false,
        }
  },
 async asyncData ({req,app,store}) {
const helper = app.$helper

//const ip =req.connection.remoteAddress;

var loc;
var longitude,latitude;
//const x = await app.$axios.get('https://api.ipify.org/?format=json')



loc = await app.$axios.get('https://ipapi.co/json')
longitude = loc.data.longitude;
latitude = loc.data.longitude;




const locData = loc.data


//console.log(locData)

const url = 'https://api.aladhan.com/v1/calendar'
const getDateToday = (x=false)=> new helper.DateTime.Today(x) //function
const today = getDateToday()

const  getData = (infoData)=> app.$axios.get(url,{params:infoData});


const addInfo=(info,today)=>{
  
  return {
   loc:locData,
    info:info,
    todayIs:today.todayIs
  }
};

const CurrentMonthInfo =(info)=>{

store.commit('fullMonthPrayer/SetFullMonth',info)
}

const forFilterInfo  =(filterInfo)=>{

store.commit('forFilterPrayer/SetForFilter',filterInfo)
return {
 // x:filterInfo,
  m:y.data

} 
} 
 const data = {
        method:10,
        month:today.month+1,
        year:today.year,
        latitude:longitude,
        longitude:longitude
    }
return await getData(data).then(r=>{

CurrentMonthInfo(addInfo(r.data.data,today));

if(today.isLastDate){

let x = r.data.data[r.data.data.length-1].timings;
let h = helper.Filter.RemoveZone(x).Isha
let timeNow = new Date(today.year,today.month,today.date,today.hour,today.min,today.sec)
let prayTime = new Date(today.year,today.month,today.date,parseInt(h.hour),parseInt(h.min));

if(isBefore(
  timeNow,
prayTime
)){ // is prayar time is gratter 

return forFilterInfo(addInfo(r.data.data,today));
//frist call data true
}else{
// if frist call filter result false fatch again hear
const dd = getDateToday({upDate:1});
data.month = dd.month+1
data.year = dd.year

return getData(data).then(res=>{
return forFilterInfo(addInfo(res.data.data,dd));
})



}

}else{
  // if today not last date
return forFilterInfo(addInfo(r.data.data,today));
}
    
    })




  },
computed:{
...mapGetters('forFilterPrayer',[
 
  'getTodayPrayer'
 ]),








},
methods:{

},
 mounted(){

  },
}
</script>
