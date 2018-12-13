import {Today} from './nowDay'

export class calenderInfo{

    constructor(lang) { //en ro ar
       
        if (lang &&  typeof lang === 'String' ) {
        if(lang=='en' || lang=='ar'){
            this.lang = lang.toLowerCase(); 
        }else{
            this.lang = false;
            new Error('only exepts en or ar');
        }
            
        }else { 
            this.lang = false;
           new Error('constructor prams not define');
        }
        
        
      }

validation(){
    if(this.lang){
        if(this.lang=='en'){
    return 'en'    
        }else if(this.lang=='ar'){
            return 'ar' 
        }
    }  
}


get monthNameEN(){

   const data = {
       en:[
        'JANUARY',
        'FEBRUARY',
        'MARCH',
        'APRIL',
        'MAY',
        'JUNE',
        'JULY',
        'AUGUST',
        'SEPTEMBER',
        'OCTOBER',
        'NOVEMBER',
        'DECEMBER'
    ],
    ar: [
        'JANUARYAR',
        'FEBRUARYAR',
        'MARCHAR',
        'APRILAR',
        'MAYAR',
        'JUNEAR',
        'JULYAR',
        'AUGUSTAR',
        'SEPTEMBERAR',
        'OCTOBERAR',
        'NOVEMBERAR',
        'DECEMBERAR'
    ]
   }  
return this.validation() ? data[this.validation()]:false
}

 


get dayNameEN() {

  const data = {
      en:[
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        
    ],
      ar:[
        'SundayAr',
        'MondayAr',
        'TuesdayAr',
        'WednesdayAR',
        'ThursdayAr',
        'FridayAr',
        'SaturdayAR',
        
    ]
  }
   
  return this.validation() ? data[this.validation()]:false
 }
 dayNameSort(){
const eng = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat' 
    ]
const data = { en:eng,ar:eng}
 return this.validation() ? data[this.validation()]:false
 }
 
 get monthNameAR(){
const arabic = [
    'Muharram',
    'Safar',
    'Rabiul-Awwal',
    'Rabi-uthani',
    'Jumadi-ul-Awwal',
    'Jumadi-uthani',
    'Rajab',
    'Sha’ban',
    'Ramadan',
    'Shawwal',
    'Zhul-Q’ada',
    'Zhul-Hijja'
]
const data = { en:arabic,ar:arabic}
 return this.validation() ? data[this.validation()]:false
 }
 
get prayerName(){
   
    
const pray =  ['Fajr','Dhuhr','Asr','Maghrib','Isha'];
const data = { en:pray,ar:pray}
 return this.validation() ? data[this.validation()]:false
}




}
 