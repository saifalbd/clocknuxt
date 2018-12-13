<template>
  <v-flex xs10 md3 justify-center
          align-center  class="homeColunm">
            <div class="todayIs">
            
<div class="titleIs">Today</div>
<div class="textIs">
  {{Today.day}}
</div>
<div class="textIs">
  {{Today.en}}
</div>
<div class="textIs">
  {{Today.ar}}
</div>
<div class="textIs">
  {{Today.time}}
</div>

           



   </div>
        </v-flex>



      

</template>

<script>

import {mapGetters} from 'vuex'
import HijriDate,{toHijri} from 'hijri-date/lib/safe';

export default {
data(){
        return {
upComing:true,
ComingSingle:''
            
        }
},
computed:{
...mapGetters('forFilterPrayer',[
 
  'getTodayPrayer'
 ]),

Today(){
const calender = new this.$helper.DateTime.calenderInfo()
//console.log(calender.todayIs)

//console.log(new this.$helper.tester().find)

let d = new this.$helper.DateTime.Today().nowDate();

let day = calender.dayName[ d.getDay()];
var mon = calender.monthNameEN[d.getMonth()].toLowerCase();

mon =  mon.charAt(0).toUpperCase() + mon.slice(1)

const time =[
d.getHours(),
d.getMinutes(),
d.getSeconds()
].join(' : ')
const en = [
d.getDate(),
mon,
d.getFullYear()
].join('  ')

const ard = toHijri(d);

const ar = [
ard._date-1,
calender.monthNameAR[ard._month-1],
ard._year
].join('  ')

return  {
day,
en,ar,
time
}
}
},

}
    
</script>
