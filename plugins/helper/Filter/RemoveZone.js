

 export  const  RemoveZone =(timings)=>{

        const obj =  Object.entries(timings);
        obj.map(item=>{
          item[1] =  item[1].split(" ")[0];
          item[1] = {
            hour:item[1].split(":")[0],
            min:item[1].split(":")[1],
          }
           return item;
        })
        const newObj = new Object();
        obj.forEach(e => {
            newObj[e[0]] =e[1]
           
        });
        
        return newObj;
        


    }





