
import Filter from '@/plugins/helper/Filter'


const namespaced=true;
 
const state ={
forFilterPrayer:false,
location:false,
helper :false
}

const mutations={
SetForFilter(state,payload){
 state.helper =this.helper; 

state.forFilterPrayer =payload;
state.location = payload.loc;

}
}
const actions = {

}
const    getters= {
getTodayPrayer(state){
const data =  state.forFilterPrayer;

if(data && data.info && data.todayIs && data.info[0].timings ){
const {year,month,date,day,hour,min,sec} = data.todayIs;
const info = data.info;
const TodayInfo = data.info[date-1]; //for index
const todayPray = Filter.ReducePrayer(Filter.RemoveZone(TodayInfo.timings))

const pray = (indexDate)=>{
    const TodayInfo = data.info[indexDate-1]; //for index
    if(TodayInfo){

    const todayPray = Filter.ReducePrayer(Filter.RemoveZone(TodayInfo.timings))
   const ComingPrayer = Filter.ComingPrayer({
        info:TodayInfo,
        today:data.todayIs,
        callId:false
    })
   // console.log(ComingPrayer)
    if(ComingPrayer){
        
        return {
            todayPray,ComingPrayer
        }
    }else{
        return false;
    }
}
}//end pray type of function

var getPray = pray(date)
if(getPray){
return getPray
}else{
return pray(date+1);
}

}
},



}

export default {
    namespaced, state, mutations, actions, getters 
}