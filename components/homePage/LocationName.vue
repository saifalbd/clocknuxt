<template>
<v-flex xs12>
   <div class="locationName">
       <span>
           Prayer Times on 
       </span>
       
       <span>
           {{location.region||location.state_prov || location.regionName}},{{location.city}},{{ location.country_name || location.country}}
       </span>
       
       
   </div>
  
</v-flex>
    
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed:{
    ...mapState('forFilterPrayer',{location: state => state.location})
    
    }
}
</script>

