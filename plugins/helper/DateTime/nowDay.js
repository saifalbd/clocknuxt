
   
 export class Today {

    
    constructor(x=false){
      this.increaseDecrease = x;
    }

   nowDate(){
    //  let d = [2018, 11, 30].toString();
      let r = new Date()
    //r.setHours(10)
    //r.setDate(30)
      if(this.increaseDecrease && this.increaseDecrease instanceof Object){
        const x = this.increaseDecrease;
        if(x.upDate){ r.setDate(r.getDate()+x.upDate)}
        if(x.upMonth){r.setMonth(r.getMonth()+x.upMonth);}
        if(x.upYear){r.setDate(r.getFullYear()+x.upYear)}
      }
     
      return  r

      }

  get DateTime()  {
    return this.nowDate()
  }
  get sec(){
   return this.nowDate().getSeconds();
  }
     
  get min(){
    return this.nowDate().getSeconds();
   }
  get hour(){
    return this.nowDate().getHours();
  }
  get day(){
    return this.nowDate().getDay();
  }
get date(){
  return this.nowDate().getDate()
}
get month(){
   return this.nowDate().getMonth()
  }
get year(){
  return this.nowDate().getFullYear()
}


get todayIs()
{
 return {
    year:this.year,
    month:this.month,
    date:this.date,
    day:this.day,
    hour:this.hour,
    min:this.hour,
    sec:this.sec
  
  }

}








get lastDate(){

return  new Date(this.year, this.month +1, 0).getDate();
}

get isLastDate(){
  return this.date==this.lastDate ? true :false
}

get isFirstDate(){
return this.date ==1 ? true :false
}


  }