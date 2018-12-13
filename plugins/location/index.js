import axios from 'axios'

 class geoLocation {


    constructor(app){
        this.app = app
    }

  guestLocation(){
//const url =' http://ip-api.com/json';
console.log('http://ip-api.com/json')
//const url = 'https://ipapi.co/8.8.8.8/json/'
 //return   this.app.$axios.get(url)


    }




}


export default ({ app }, inject) => {
    inject('location',  {
    
        geoLocation
      
    })
  }
  

