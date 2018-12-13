<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
     
      <v-card>
        <v-card-title
          class="headline grey lighten-1"
          primary-title
        >
          Select month
        </v-card-title>

       <v-layout wrap align-center pt-2>
      <v-flex xs10  d-flex offset-xs1>
        <v-select
          :items="MonthList"
          label="Select Month" 
         v-model="MonthSelect"
          outline
        ></v-select>
      </v-flex>
      <v-flex xs10 d-flex  offset-xs1>
        <v-select
          :items="YearLists"
          label="Select Year"
        v-model="YearSelect"
          outline
        ></v-select>
      </v-flex>
      
       </v-layout>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialogFrom"
          >
           Accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
//import {Latitude,Longitude,location} from '@/plugins/geolocation/index'

  export default {
    data () {
      return {
        MonthSelect:'',
        YearSelect:'',
        MonthList:new this.$helper.DateTime.calenderInfo().monthNameEN,
        YearLists:[],
      }
    },

computed:{
...mapState({
  dialogget:state=>state.ChangeMonth.openDialog,
}),
dialog: {
  get: function() {
      return this.dialogget;
		},
		set: function() {
      
    if(this.dialogget){
    this.SET_Dialog(false);
    }else{
      this.SET_Dialog(true);
    }

		}}

},
methods:{
...mapActions('ChangeMonth',{SET_Dialog:'SET_Dialog'}),
...mapActions('fullMonthPrayer',{FetchNewFullMonth:'FetchNewFullMonth'}),
dialogFrom(){
//monthNameEN
const calenderInfo = new this.$helper.DateTime.calenderInfo()
const month = calenderInfo.numberOfMonth(this.MonthSelect)

this.SET_Dialog(false);
this.$store.dispatch('PreLoader/preLoad',true)
const Latitude=25.235044700000003
const Longitude= 51.4298639;

 const data = {
        method:10,
        month: calenderInfo.numberOfMonth(this.MonthSelect),
        year:this.YearSelect,
        latitude:Latitude,
        longitude:Longitude
    }


this.FetchNewFullMonth(data)

},

YearList(){
const d = new Date();
this.MonthSelect = this.MonthList[d.getMonth()]
this.YearSelect = d.getFullYear()

for (let i = 0; i < 30; i++) {
let x = d.getFullYear();
x = x+(-10+i)
this.YearLists.push(x)   
}
}
},
mounted(){
this.YearList()
},

  }
</script>