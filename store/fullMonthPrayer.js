
import DateTime from '@/plugins/helper/DateTime'
import Filter from '@/plugins/helper/Filter'

const namespaced=true;

const state ={
fullMonthInfo:false
}

const mutations={
SetFullMonth(state,payload){
state.fullMonthInfo =payload;
},
FetchNewFullMonth(state,payload){
state.fullMonthInfo.info= payload;
state.fullMonthInfo.todayIs = new DateTime.Today().todayIs

}
}
const actions = {
FetchNewFullMonth({commit},data){
const self =this;
 const url = 'http://api.aladhan.com/v1/calendar'
 this.$axios.$get(url,{
     params:data
    }
     ).then(r=>{
        commit('FetchNewFullMonth',r.data)
       
     })



}//end FetchNewFullMonth

}
const getters= {
    fullMonth(state){
    
     const { monthNameAR}=new DateTime.calenderInfo('en')
      if(state.fullMonthInfo && state.fullMonthInfo.info){
        const data = state.fullMonthInfo.info;
        const Result={};
        
        if(data[1]){
            
           

      // return  monthNameAR[data[0].date.hijri.month.number-1] 
       
    
        Result.info={
            month:{
            
            en:{
                monthName:data[0].date.gregorian.month.en,
                monthYear:data[1].date.gregorian.year
            },
            ar:{
                first:{monthName:monthNameAR[data[0].date.hijri.month.number-1],
                    monthYear:data[1].date.hijri.year},
                second:''}
            },
        
        
        };
        Result.data= []
        
        var monthChange = false;
        
        data.forEach((e,i) => {
        var d={
        weekday:e.date.gregorian.weekday.en,
        en:{
        date:e.date.gregorian.date,
        day:e.date.gregorian.day,
        month:e.date.gregorian.month.en
        },
        
        ar:{
        date:e.date.hijri.date,
        day:e.date.hijri.day,
        month:e.date.hijri.month.en
        }
        
        }
        
        if(Result.info.month.ar.first.monthName !=monthNameAR[e.date.hijri.month.number-1]){
        if(!monthChange){
        Result.info.month.ar.second ={
            
            monthName:monthNameAR[e.date.hijri.month.number-1],
            monthYear:e.date.hijri.year
            
        } 
        Result.info.month.ar.ChangeIndex = i
        
        }
        monthChange= true;
        }
        //console.log(d)
        const zoneRemove =Filter.RemoveZone(e.timings)
        const cc = DateTime.TimeHourDivider
       // console.log(cc)
        const t = {
            Fajr:zoneRemove.Fajr,
            Dhuhr:zoneRemove.Dhuhr,
            Asr:zoneRemove.Asr,
            Maghrib:zoneRemove.Maghrib,
            Isha:zoneRemove.Isha  
        
        }
        
        Result.data.push({
        d,t
        })
        
        
            
        });
        
        let x ={
        ChangeName:Result.info.month.ar.second,
        }
        Result.data.splice(Result.info.month.ar.ChangeIndex, 0, x);
        //console.log(Result)
        return Result;
        }

    }
        
        
        
        
            } //end fullMonth
}

export default {
    namespaced, state, mutations, actions, getters 
}