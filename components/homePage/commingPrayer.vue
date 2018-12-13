<template>
  <v-flex xs12 class="commingBar">
        <div class="commingTitle">
        <div class="svgArrow">
           <svg viewBox="0 0 1000 50" preserveAspectRatio="none" width="100%" height="50">
   <polyline points="0,3 900,3 995,25 900,47 0,47" style="fill:none;stroke:#161e4a;stroke-width:6" />
  Sorry, your browser does not support inline SVG.
</svg>
</div>
UpComming Prayer
        </div>
        
          <div class="prayerName">{{getTodayPrayer.ComingPrayer.name}}</div>
        <div class="times">
    <div class="svgArrow">
           <svg viewBox="0 0 1000 50" preserveAspectRatio="none" width="100%" height="50">
   <polyline points="1000,3  100,3 5,25 100,47 1000,47" style="fill:none;stroke:#161e4a;stroke-width:6" />
  Sorry, your browser does not support inline SVG.
</svg>
</div>
{{ComingSingle}}
        </div>
        
        </v-flex>
</template>

<script>
import {mapGetters} from 'vuex'
import differenceInSeconds from 'date-fns/difference_in_seconds'
export default {
data(){
  return {
    ComingSingle:''
  }
},
computed:{
...mapGetters('forFilterPrayer',[
 
  'getTodayPrayer'
 ]),
},
  methods:{
addZeor(t){

let x = Math.floor(t)
return (x<10)?'0'+x:x.toString();
},
getComingSingle(){
  const {time} = this.getTodayPrayer.ComingPrayer;
  let d = new this.$helper.DateTime.Today();
let left = new Date(d.year,d.month,time.date,time.hour,time.min,0)
let right =d.DateTime
let dif = differenceInSeconds(left, right);
let conMinis = Math.floor(dif/60);
let conHour =Math.floor(conMinis/60);
let conMin =conMinis -(conHour*60);
let conSec = dif - conMinis*60;

this.ComingSingle = `${this.addZeor(conHour)}:${this.addZeor(conMin)}:${this.addZeor(conSec)}`
}
},
mounted() {

  if (process.browser) {
  window.onNuxtReady((app) => {
   setTimeout(setInterval(()=>{
    this.getComingSingle();
   },1000),3000)
  })
}
  
}
}
</script>

