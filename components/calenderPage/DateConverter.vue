<template>
   <v-layout row wrap>
    <v-flex xs12>
        <v-layout row wrap justify-space-around text-center>
        <v-flex xs10 offset-xs1 md4 offset-md1 d-flex justify-center>
          <v-checkbox
                v-model="check.toAr"
              label="Gregorian to Hijri Converter"
              color="indigo"
          
              hide-details
            ></v-checkbox>
            
          
        </v-flex>
       <v-flex xs10 offset-xs1 md4 offset-md1>
          <v-checkbox
              v-model="check.toEn"
              label="Hijri to Gregorian Converter"
              color="indigo"
              
              hide-details
            ></v-checkbox>
       </v-flex>
          
        </v-layout>
    </v-flex>
  
    <v-flex xs12>
         <v-container fluid grid-list-xl>
        <v-layout row wrap justify-center>
            <v-flex xs12>
        Select a date to convert
    </v-flex>
             <v-flex xs4 sm3 md2 d-flex>
        <v-select
          :items="theDate"
          v-model="model.date"
         
      
        ></v-select>
      </v-flex>
       <v-flex xs4 d-flex>
        <v-select
          :items="theMonth"
          v-model="model.month"
          v-if="model.year"
    
        ></v-select>
      </v-flex>
       <v-flex xs4 sm3 md2 d-flex>
        <v-select
          :items="theYear"
         
         v-model="model.year"
        ></v-select>
      </v-flex>
      <v-flex xs12>
         <v-btn color="primary" @click="covert">
Convert

               </v-btn>
        
      </v-flex>
      <v-flex xs12>
      
        <h1>{{conInfo.topTxt}}</h1>
        <h1>{{conInfo.dayIs}}</h1>

      </v-flex>
            
        </v-layout>
         </v-container>
        
    </v-flex>
   </v-layout>
    
</template>

<script>

 import HijriDate,{toHijri} from 'hijri-date/lib/safe'



  export default {
    data: () => ({
    dateRole:true,
    check:{
      toAr:true,
      toEn:false,
    },
    conInfo :{
      dayIs :'',
      topTxt:''
    },
    model:{
        year:'',
        month:'',
        date:''
    },
    
    })
    ,
    computed:{
        theYear(){
        var y;
        var result = []
        if(this.dateRole){
        
 y = new  this.$helper.DateTime.Today().year;
        }else{
      
        y = new  HijriDate()._year;
        }
      this.model.year =  y
       for (let index = 0; index < 100; index++) {result.push(y-(30-index))}
        return result;
        },
        theMonth(){
        const cal = new  this.$helper.DateTime.calenderInfo();
        if(this.dateRole){
this.model.month = cal.monthNameEN[cal.month]

return cal.monthNameEN

        }else { 
        
const nowHijri = toHijri(new Date())

this.model.month = cal.monthNameAR[nowHijri. _month-1]
            return cal.monthNameAR
        }
      
        },
        theDate(){
const {year,month} =  this.model;
if(year && month){
  if(this.dateRole){
  this.model.date = new Date().getDate();
  }else{
  this.model.date  = new HijriDate()._date;
  }
 return this.lastDate()

        }
      
        }
    },
    methods:{
lastDate(){
const {year,month,date } =  this.model;
if(year && month){
const rr = [];
if(this.dateRole){
 const findIn = new this.$helper.DateTime.calenderInfo().monthNameEN.findIndex((item)=>item===month)
let monNum =   new Date(year, findIn+1, 0).getDate();

for (let index = 0; index < monNum; index++) {
  rr.push(index+1)

}



}else {
const findInAr = new this.$helper.DateTime.calenderInfo().monthNameAR.findIndex((item)=>item===month)
const monNum = new HijriDate(year, findInAr+1, 1)._month;
//;
for (let index = 0; index < 35; index++) {
let x = new HijriDate(year, findInAr+1, index+1).addDay();
  if(x._month ===monNum){
  rr.push(index+1)
  }
  
}


}
return rr;
}

},
defaultDate(){
  const cal = new  this.$helper.DateTime.calenderInfo();
 if(this.dateRole){
  this.model.date = new Date().getDate();
this.model.month = cal.monthNameEN[cal.month]
this.model.year = new Date().getFullYear();

  }else{
  this.model.date  = new HijriDate()._date;
  this.model.month = cal.monthNameAR[nowHijri. _month-1]
 this.model.year = new  HijriDate()._year;
  }

return true;

},
covert(){
const {
   year,month,date 
} = this.model;
const finder = new this.$helper.DateTime.calenderInfo();
if(year&&month&&date){
const rr = {
day:'',
month:'',
year:'',
date:'',
role:''
}
if(this.dateRole){
const findIn = finder.monthNameEN.findIndex((item)=>item===month)
const dateis = new Date(year,findIn,date);
const entoHijri = toHijri(dateis)

rr.day = dateis.getDay();
rr.month = finder.monthNameAR[entoHijri._month];
rr.date = entoHijri._date;
rr.year =  entoHijri._year;
rr.role = 'ar'

}else{
const findInAR = finder.monthNameAR.findIndex((item)=>item===month)
const hijriToEn = new HijriDate( year,findInAR+1,date).toGregorian()
rr.month = finder.monthNameEN[hijriToEn.getMonth()];
rr.day = hijriToEn.getDay()
rr.date = hijriToEn.getDate();
rr.year =  hijriToEn.getFullYear();
rr.role = 'en'
}

this.addText(rr)
//console.log(rr)
}

},
addText(arg){
const {day,date,month,year,role} = arg;
const finder = new this.$helper.DateTime.calenderInfo();
this.conInfo.dayIs = finder.dayName[day];
this.conInfo.topTxt = `${date} ${month} ${year}`


}

    },
watch:{
'check.toEn':function(val){
this.check.toAr = val?false:true;
this.dateRole = val?false:true;
},
'check.toAr':function(val){
this.check.toEn = val?false:true;
this.dateRole = val?true:false;

}



},
mounted() {
  if(this.defaultDate()){this.covert()}

    
},
  }
</script>
