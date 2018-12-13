import differenceInMinutes from 'date-fns/difference_in_minutes'
import {RemoveZone} from './RemoveZone'
import {ReducePrayer} from './ReducePrayer'


export const ComingPrayer=(data)=>{
if(data){
//&& data.info
//console.log(5)

const {info,today,callId} =data;

  //  console.log(callId) 




const o = ReducePrayer(RemoveZone(info.timings)).mainSalah


const Compare = (d)=>{
    d.date = parseInt( info.date.readable.split(" "))
  // console.log('d.date', d.date,'today.date',today.date)
    const bigger =  new Date(today.year, today.month,  d.date, parseInt(d.hour),parseInt(d.min), 0)
    const smaller = new Date(today.year, today.month, today.date, today.hour, today.min, today.sec)
   // console.log(parseInt(d.date))
    var result = differenceInMinutes(
               bigger,smaller
   
               
             )
   
         if (result>=0) {
            
             return true
         }else {
             return false
         }  
       }
       
       var name,time;
       if(Compare(o['Fajr'])){
       name='Fajr'
       time = o['Fajr'];
       
       }else if(Compare(o['Dhuhr'])){
       name='Dhuhr'
       time =  o['Dhuhr'];
           
       
       }else if(Compare(o['Asr'])){
           name='Asr'
           time =  o['Asr'];
         
       
           
       } else if(Compare(o['Maghrib'])){
       name= 'Maghrib'
           time =  o['Maghrib'];
       
       
       }else if(Compare(o['Isha'])){
       
       name = 'Isha';
       time = o['Isha'];
       
       }
       
       return (name&&time)?{
           name,time
       }:false
       
       
           
           
    }
}





export const ComingPrayerTst =(p,today)=>{

   

  
    const o =p;
  
    const Compare = (d)=>{
 const bigger =  new Date(today.year, today.month,  parseInt(d.date), parseInt(d.hour),parseInt(d.min), 0)
 const smaller = new Date(today.year, today.month, today.date, today.hour, today.min, today.sec)
 console.log(parseInt(d.date))
 var result = differenceInMinutes(
            bigger,smaller

            
          )

      if (result>=0) {
         
          return true
      }else {
          return false
      }  
    }
    
    var name,time;
    if(Compare(o['Fajr'])){
    name='Fajr'
    time = o['Fajr'];
    
    }else if(Compare(o['Dhuhr'])){
    name='Dhuhr'
    time =  o['Dhuhr'];
        
    
    }else if(Compare(o['Asr'])){
        name='Asr'
        time =  o['Asr'];
      
    
        
    } else if(Compare(o['Maghrib'])){
    name= 'Maghrib'
        time =  o['Maghrib'];
    
    
    }else if(Compare(o['Isha'])){
    
    name = 'Isha';
    time = o['Isha'];
    
    }
    
    return (name&&time)?{
        name,time
    }:false
    
    
        
        
      
    }
    