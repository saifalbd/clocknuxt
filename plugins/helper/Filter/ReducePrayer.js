


 export const   ReducePrayer =(prayer)=>{
//if Filter.RemoveZone ok then
        const mainSalah={}
        const moreSalah = prayer;
        const x = ['Fajr','Dhuhr','Asr','Maghrib','Isha'];
        
        mainSalah[x[0]] = prayer[x[0]];
        mainSalah[x[1]] = prayer[x[1]];
        mainSalah[x[2]] = prayer[x[2]];
        mainSalah[x[3]] = prayer[x[3]];
        mainSalah[x[4]] = prayer[x[4]];
        delete moreSalah[x[0]];
        delete moreSalah[x[1]];
        delete moreSalah[x[2]];
        delete moreSalah[x[3]];
        delete moreSalah[x[4]];
        
        return {
            mainSalah,
            moreSalah
        }
        
        }




