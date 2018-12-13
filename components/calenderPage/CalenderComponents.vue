<template>
    <v-layout row wrap class="celender">
        <v-flex xs12>
            <v-layout  row wrap class="toppart">
                <v-flex xs12 pb-2>
<div>
    <h2>{{ SelectMonth}} {{ SelectYear}}</h2>
    
</div>

<div class="month-ar-title">
    <h3> {{month.name.txt}}</h3>
   
</div>
                </v-flex>
          <v-flex xs12>
<v-layout row wrap justify-center>
     <v-flex xs4 sm3 d-flex>
        <v-select
          :items="monthList"
          v-model="SelectMonth"
          label="Select Month"
          @change="monthDetails()"
        ></v-select>
      </v-flex>
       <v-flex xs3 lg2 d-flex offset-xs1>
        <v-select
          :items="yearList"
          v-model="SelectYear"
          label="Select Year"
@change="monthDetails()"
        ></v-select>
      </v-flex>
        <v-flex xs3 pt-2 >
         <div >
        <v-btn small color="black" dark @click.stop="MonthYearModelDefault">Today</v-btn>
      </div>

    </v-flex>

</v-layout>
                </v-flex>
            </v-layout>
        </v-flex>
        <!--start cleender {{DayNamelist(index)}}-->
        <v-flex xs12>
       <div class="calenderBox">
          <div class="daybox">
             <div class="dayitem" v-for="(day,index) in 7" :key="index" >
                 <span v-if="$vuetify.breakpoint.xsOnly">
 {{DayNamelist({index,sort:true})}} 
                 </span>
            <span v-if="$vuetify.breakpoint.smAndUp">
 {{DayNamelist({index,sort:false})}} 
                 </span>
               
             </div>
            
          </div>
          <div class="dateBox" v-for="(item,index) in month.data" :key="index">
            
              <div class="dateItem" v-for="(list,i) in item" :key="i" v-bind:class="{offbox:list.off,active:list.active,newmonth:list.newmonth}">
          
            <div class="dateItem-inner">
                <span>
                     {{list.en}} 
                </span>
            </div>
            <div  class="dateItem-inner">
                <span v-if="list.newmonth">{{list.newmonth}}</span>
                <span>{{list.ar}}</span>
            </div>
              </div>
          </div>
       </div>
            
        </v-flex>
    </v-layout>
    
</template>
<script>

import {toHijri} from 'hijri-date/lib/safe';

export default {
    data(){
        return {
        calender:new this.$helper.DateTime.calenderInfo(),
        SelectMonth:'',
        SelectYear:'', 
          month:{
              name:{
                ar:{first:{m:'',y:''},second:{m:'',y:''}}
              },
              data:[]
          }
        }
  
    },

computed:{
monthList(){
return this.calender.monthNameEN
},
yearList(){
const r=[];
let y = new Date().getFullYear();
for (let index = 0; index < 100; index++) {r.push((y-50)+index);}
return r;
}
},
methods:{
MonthYearModelDefault(){
let d= new Date();
this.SelectMonth = this.calender.monthNameEN[d.getMonth()]
this.SelectYear = d.getFullYear();

this.monthDetails()
},
DayNamelist(x){
if(x.sort){
return  this.calender.dayNameSort[x.index];
}else{
return this.calender.dayName[x.index]
}

},
monthDetails(){
var a = this.calender.monthNameEN.indexOf(this.SelectMonth);
this.month.data = [];
const result = [];
const my = { m:a,y:this.SelectYear}
let d = new Date(my.y,my.m+1,0);
let lastDay = d.getDate();
let fistGap = new Date(my.y,my.m,1).getDay();
for (let i = 1; i <=fistGap; i++) {
    let t = new Date(my.y,my.m,1);
    t.setDate(t.getDate()-(fistGap+1-i))
    const H = toHijri(t);
    result.push({en:t.getDate(),ar:H._date,off:true})
  
}
var armonth = false;
for (let index = 0; index < lastDay; index++) {
let s = new Date(my.y,my.m,index+1);
    const H = toHijri(s);
    const pdata = {en:index+1,ar:H._date,off:false}
     if(!index){
   this.month.name.ar.first.m=H._month
   this. month.name.ar.first.y=H._year
}
pdata.active = this.istoday(index+1) ? true :false
    
if(!armonth){
if(this.month.name.ar.first.m != H._month ){
this. month.name.ar.second.m=H._month
this. month.name.ar.second.y=H._year
pdata.newmonth = this.calender.monthNameAR[H._month-1] ;
armonth = true;
}
}

result.push(pdata);
}


let dif = 34-(lastDay+fistGap)+1;

if(dif<0){
dif = 7+dif;
}

for (let index = 0; index < dif; index++) {
let t = new Date(my.y,my.m,1);
t.setDate(index+1)
  const H = toHijri(t);
    result.push({en:t.getDate(),ar:H._date,off:true})
     
}

let marname1 =this.calender.monthNameAR[this.month.name.ar.first.m-1] 
let marname2 =this.calender.monthNameAR[this.month.name.ar.second.m-1] 

this.month.name.txt= marname1 +` (${this.month.name.ar.first.y}) - `+ marname2 +` (${this.month.name.ar.second.y})`


for (let index = 0; index < result.length; index+=7) {
 var c =result.slice(index,index+7);
this.month.data.push(c)
}

return true

},
istoday(x){
const d = new Date();
let day = d.getDate();
let m = d.getMonth(); 
let y = d.getFullYear();
let m1 =this.calender.monthNameEN.indexOf(this.SelectMonth);
let y1 = this.SelectYear;
if(y==y1 && m==m1 && day==x){
return true
}else{
return false
}

}

},
mounted(){
this.MonthYearModelDefault();



}

    
}
</script>

<style lang="scss" scoped>
.celender{
background-color:rgb(251, 250, 242);
.toppart{
.month-ar-title{
color: rgba(181, 5, 111, 0.99);
}
>.flex{
&:nth-child(2){
background-color: rgba(205, 220, 57, 0.42);

}
}
}
.calenderBox{
.daybox{
width: 100%;
display: grid;
 grid-template-columns: repeat(7, 1fr);
.dayitem{
background-color: black;
color: aliceblue;
padding: 7px 0;
&:not(:last-child){border-right: 1px solid rgba(103, 58, 183, 0.35);}

}
}
.dateBox{
display: grid;
grid-template-columns: repeat(7, 1fr);
&:not(:last-child){
border-bottom:1px solid rgba(103, 58, 183, 0.35);
}
.dateItem{
&:not(:last-child){border-right: 1px solid rgba(103, 58, 183, 0.35);}
display: grid;
grid-template-columns: repeat(1, 1fr);
min-height: 75px;
background: rgba(237, 241, 198, 0.40);
position: relative;
.dateItem-inner{
display: flex;
justify-content: center;
align-items: center;
&:first-child{
color: rgba(8, 8, 8,1);
font-size: 1.4rem;
}
&:nth-child(2){color: rgba(181, 5, 111, 0.99);
font-size: 1.1rem;
}

}
&.offbox{
background: rgba(237, 241, 198, 0);
.dateItem-inner{
&:first-child{color: rgba(8, 8, 8,0.25);}
&:nth-child(2){color: rgba(181, 5, 111, 0.25);}
}
}
&.active{
background-color: rgba(11, 3, 84, 0.90);
.dateItem-inner{
&:first-child{color: rgb(255, 235, 59); font-size: 1.5rem;}
&:nth-child(2){color: rgb(193, 239, 141); font-size: 1.2rem;}
}
&:hover{
background-color: rgba(11, 3, 84, 0.98);
}
}
&.newmonth{
.dateItem-inner{

&:nth-child(2){
display: flex;
justify-content: space-around;
flex-wrap: wrap;
color: rgb(193, 239, 141); font-size: 1.2rem;
background-color: rgb(43, 10, 36);
span{
padding:0 3px;
}
}
}
}
&:hover:not(.offbox):not(.active){ background-color:rgba(0, 255, 255, 0.1);}



}
}
}
}

</style>

