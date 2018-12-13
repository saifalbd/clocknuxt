<template>
<div>
 <no-ssr>

  <div class="monthly-list" >
    <div class="TableToper">
    <div class="svgbox">
<svg id="SvgjsSvg1001" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 492 125" transform="matrix(1,0,0,1,0,7)"><defs id="SvgjsDefs1002"></defs><path id="SvgjsPath1010" d="M1 130.04999997615815C1.3 114.70999997615814 4.13 101.04999997615815 9.62 90.58999997615814C33.38 45.28999997615814 200.86 49.64999997615814 245.78 4.999999976158142C291.18 49.64999997615814 458.65 45.28999997615814 482.38 90.58999997615814C487.87 101.04999997615815 490.71 114.70999997615814 490.99 130.04999997615815L1 130.04999997615815Z " fill="rgba(4, 3, 45, 0.46)" stroke-linejoin="round" stroke-linecap="round" stroke="gold" stroke-width="4" class="droppath-arrow"></path></svg>
    </div>
    <div class="imagebox">
<img src="~/assets/img/mosque-png.png" alt="">
    </div>
    <div class="titlebox">
    
<h4 v-if="this.$vuetify.breakpoint.xs" >
  {{UC(tableTitleEn.monthName)}} ({{tableTitleEn.monthYear}}) PRAYER TIMES 
</h4>

<h3 v-if="
this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.md ">
 {{UC(tableTitleEn.monthName)}} ({{tableTitleEn.monthYear}}) PRAYER TIMES 
</h3>
<h2 v-if="this.$vuetify.breakpoint.xl || this.$vuetify.breakpoint.lg">
  {{UC(tableTitleEn.monthName)}} ({{tableTitleEn.monthYear}}) PRAYER TIMES
</h2>

    </div>
  <div class="titlebox-ar small" v-if="this.$vuetify.breakpoint.xsOnly">
{{tableTitleAr}} 
  </div>
    <div class="titlebox-ar"  v-if="this.$vuetify.breakpoint.smAndUp">
{{tableTitleAr}} 
  </div>
  <div class="change-month small" v-if="this.$vuetify.breakpoint.xsOnly">
     <v-btn fab dark small  color="rgba(103, 58, 183, 0.41)" @click.stop="SET_Dialog(false)">
      <v-icon dark>menu</v-icon>
    </v-btn>
  </div>
 <div class="change-month" v-if="this.$vuetify.breakpoint.smAndUp">
   
    <v-btn @click.stop="SET_Dialog(true)" class="change-month-btn">Change Month</v-btn>
  </div>
  

    </div>
    <v-data-table v-if="fullMonth && monthListInfo"
      :headers="headers"
      :items="fullMonthList"
      
     
      hide-actions
      class="elevation-1"
    >
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
          <span slot="activator">
            {{ props.header.text.toUpperCase() }}
          </span>
          <span>
            {{ props.header.text }}
          </span>
        </v-tooltip>
      </template>

      <template slot="items" slot-scope="props">
      <td class="tmpChangeMonth" colspan="1" v-if="!props.item.d">{{UC(tableTitleEn.monthName)}}</td>
      <td class="tmpChangeMonth" colspan="1" v-if="!props.item.d">{{UC(props.item.ChangeName.monthName)}}</td>
      <td class="tmpChangeMonth" colspan="1" v-if="!props.item.d">WEEKDAY</td>
      <td class="tmpChangeMonth" colspan="5" v-if="!props.item.d"></td>
        <td class="tmp" v-if="props.item.d">{{parseInt(props.item.d.en.day) }}</td>
        <td class="tmp" v-if="props.item.d">{{parseInt(props.item.d.ar.day) }}</td>
        <td class="tmp" v-if="props.item.d">{{ props.item.d.weekday }}</td>

<td class="text-xs-right" v-if="props.item.d">
          
          {{props.item.t.Fajr.hour}}:{{ props.item.t.Fajr.min }}
   
        </td>
        <td class="text-xs-right" v-if="props.item.d">
          
          {{ampm(props.item.t.Dhuhr.hour).hour}}:{{ props.item.t.Dhuhr.min }} {{ampm(props.item.t.Dhuhr.hour).mid}}
        </td>
        <td class="text-xs-right" v-if="props.item.d">
          
          {{ampm(props.item.t.Asr.hour).hour}}:{{ props.item.t.Asr.min }} {{ampm(props.item.t.Asr.hour).mid}}
    
        </td>
        <td class="text-xs-right" v-if="props.item.d">
          
          {{ampm(props.item.t.Maghrib.hour).hour}}:{{ props.item.t.Maghrib.min }} {{ampm(props.item.t.Maghrib.hour).mid}}

        </td>
        <td class="text-xs-right" v-if="props.item.d" >
          
          {{ampm(props.item.t.Isha.hour).hour}}:{{ props.item.t.Isha.min }} {{ampm(props.item.t.Isha.hour).mid}}

        </td>
        
        
      </template>
    </v-data-table>
   
  <ChangeMonthDiolog/>
   
  </div>
  </no-ssr>
  </div>
</template>

<script>

import {mapGetters,mapActions} from 'vuex'
import ChangeMonthDiolog from '@/components/smallCom/changeMonthDiolog'
import SelectMonth from '@/components/smallCom/selectItnpuMonth'

//import {Latitude,Longitude,location} from '@/plugins/geolocation/index'
  export default {
    components:{
SelectMonth,ChangeMonthDiolog
    },
    data () {
      
      return {
       nextPrev:false,
       monthList:'',
        search: '',
        pagination: {
          page:1
        },
        selected: [],
        monthName:'',
        tableTitleEn:'',
      
        headers: [
          {
            text: 'monthen',
            value: 'monthen',
            sortable: false,
             class:'thead',
          },
          { text: 'monthar', value: 'monthar' , class:'thead', sortable: false, },
          { text: 'weekday', value: 'weekday', class:'thead', sortable: false, },
          { text: 'Fajr', value: 'Fajr', class:'thead', sortable: false, },
          { text: 'Dhuhr', value: 'Dhuhr', class:'thead', sortable: false, },
          { text: 'Asr', value: 'Maghrib', class:'thead', sortable: false, },
          { text: 'Maghrib', value: 'Maghrib', class:'thead', sortable: false, },
          { text: 'Isha', value: 'Isha', class:'thead', sortable: false, }
        ],
       
      }
    },
    methods:{
ampm(v){

let x = this.$helper.DateTime.TimeHourDivider.Time12Hour(v)

return x;

},
UC(x){return typeof x === 'string'?x.toUpperCase():x;},

...mapActions('ChangeMonth',
{SET_Dialog:'SET_Dialog'}
)


    },
    mounted(){
  
    },

    
    computed: {
...mapGetters('fullMonthPrayer',['fullMonth']),
tableTitleAr(){
if(this.fullMonth){
let x = this.fullMonth.info.month
const {first,second} = this.fullMonth.info.month.ar;
var txt;
if(first.monthYear !=second.monthYear){
txt = first.monthName +` (${first.monthYear}) - `+ second.monthName +` (${second.monthYear})`; 
}else{
txt = first.monthName +' - '+ second.monthName +` (${first.monthYear}) `
}

return txt.toUpperCase();
}
},
 monthListInfo(){
if(this.fullMonth){
this.$store.dispatch('PreLoader/preLoad',false)
const x = this.fullMonth.info;
this.tableTitleEn = x.month.en
this.headers[0].text = x.month.en.monthName
this.pagination.sortBy =x.month.en.monthName
this.headers[0].value =x.month.en.monthName
this.headers[1].text = x.month.ar.first.monthName
this.headers[1].value = x.month.ar.first.monthName
return true;
}else{
return false
}


},
      fullMonthList(){
      if(this.fullMonth){  
return this.fullMonth.data;
      }else{
      return {}
      }
      },
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    }
  }
</script>

<style lang="scss" scoped>


.TableToper{
position: relative;
color: black;
.svgbox{
position: relative;
top: 0;
left: 0;
right: 0;

}
.imagebox{
position: absolute;
top:8%;
width: 100%;
img{
border-radius: 100%;
width:15%;
}
}
.titlebox{
color: #FFC107;
position: absolute;
bottom:30%;
width: 100%;
left:50%;
transform: translateX(-50%)

}
.titlebox-ar{
position: absolute;
color: #FFC107;
bottom:20%;
width: 100%;
left:50%;
transform: translateX(-50%);
font-size: 1.2rem;
color: rgb(158, 251, 255);
&.small{
bottom:5%;
font-size: 0.9rem;
color: rgb(0, 255, 255);

}
}
.change-month{
position: absolute;
right:1%;
bottom:0%;
left: 1%;
display: flex;
justify-content: center;
align-items: center;
.v-btn.v-btn--small.theme--light{
margin: 0;

}
.change-month-btn{
background-color: #060010;
color: #f9ed84;
border: 1px solid #f1efdd;
&:hover{
background-color: #2d0017;
border:1px solid gold;
}
}
&.small{
justify-content:flex-end;

.v-btn.v-btn--small{
margin: 0;
transform: translateX(-40%)
}
}
}

}
</style>
