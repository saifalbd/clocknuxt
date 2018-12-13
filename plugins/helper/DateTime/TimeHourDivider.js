
const Time12Hour = (val)=>{
 
    const x = parseInt(val);
   
    if(x>12){
    return {
    mid:'PM',
    hour:x-12
    }
    }else{
    return{
        mid:'AM',
        hour:x
    }
       
    }
    
    }
    
  const Time24Hour = (val)=>{
    return val;
    }
export {
    Time12Hour,Time24Hour
}