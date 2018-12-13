<template>

<v-layout row wrap class="contactusPage">
<v-flex xs12>
      <PageTitle title="Your Suggestions">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veritatis nam a officia. Quia, ducimus! Minus sed id commodi et ex natus quod adipisci explicabo?
    </PageTitle>

</v-flex>
<v-flex xs12 class="contactFormBox">
<v-layout row wrap>
    <v-flex xs12>
        
    </v-flex>
    <v-flex xs12 lg8 offset-lg2>
  
<!--start form--> 
 <v-container fluid grid-list-xl>
     <v-form v-model="valid">
    <v-layout wrap align-center pb-0 >
    
    <!--start input-->
      <v-flex xs12 sm6 d-flex>
    <v-text-field
      v-model="name"
      :rules="nameRules"
      :counter="20"
      label="Name"
      required
    ></v-text-field>
      </v-flex>
    <!--end input-->
    <!--start input-->
      <v-flex xs12 sm6 d-flex>
    <v-text-field
       v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
      </v-flex>
    <!--end input-->
   

    <!--start input-->
      <v-flex xs12 d-flex>
    <v-textarea
      v-model="message"
      :rules="messagetRules"
      :counter="360"
      label="Message"
      required
    ></v-textarea>
      </v-flex>
    <!--end input-->

       <!--start input-->
      <v-flex xs12 d-flex text-center pb-0>
    <div class="text">
         <v-btn
          outline 
        color="indigo" 
           :loading="loading" 
      :disabled="loading" mb-0 
      @click="contactSubmit" 
      >
           Send Suggestions
        </v-btn>
    </div>
      </v-flex>
    <!--end input-->


    

    </v-layout>
     </v-form>
  </v-container>


<!--end form--> 
  </v-flex>
    
</v-layout>

</v-flex>



   <v-dialog
      v-model="dialog"
      max-width="300"
    >
      <v-card>
     
        <v-card-text>
          {{success}}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

         

          <v-btn
            
           dark
            @click="dialog = false"
            small
          >
           CLOSE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>




</v-layout>



</template>

<script>
import PageTitle from '@/components/smallCom/PageTitle'

export default {
components:{
PageTitle
},
head: {
 title: `suggestion us. | ${process.env.appName}`,
 
},



    
data: () => ({
      valid: false,
      loading:false,
      dialog:false,
      success:'',
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 20 || 'Name must be less than 20 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
     
     message: '',
    messagetRules: [
        v => !!v || 'Message is required',
        v => v.length <= 360 || 'Message must be less than 360 characters'
      ],
    }),

    methods:{
async   contactSubmit(){
        if(this.valid){
        
        try{
this.loading = true;
const fromData = {
      name:this.name,
      to:this.email,
      text:this.message
    }
const urls = './api/suggestion'

    const getData = (params)=>{
      return this.$axios.post(urls,fromData);
        };

        
    const resolve = await getData();
if(resolve.status ===200){
this.success = resolve.data;
this.dialog = true
this.loading = false;
}
       
        console.log(resolve)
}
catch(e){
  console.error(e)
}

        }


        }
    },
  mounted() {
  
  
},

  }
  
</script>

