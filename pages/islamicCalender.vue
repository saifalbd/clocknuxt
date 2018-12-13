<template>
<div class="calenderPage">
<no-ssr>  
 <PageTitle title="Islamic Calender">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veritatis nam a officia. Quia, ducimus! Minus sed id commodi et ex natus quod adipisci explicabo?
    </PageTitle>
<CalenderComponent/>

 <PageTitle title="Date Converter">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veritatis nam a officia. Quia, ducimus! Minus sed id commodi et ex natus quod adipisci explicabo?
    </PageTitle>
    <DateConverter/>

</no-ssr> 
</div>


</template>

<script>
import CalenderComponent from '@/components/calenderPage/CalenderComponents'
import PageTitle from '@/components/smallCom/PageTitle'
import DateConverter from '@/components/calenderPage/DateConverter'


export default {
components:{
CalenderComponent,PageTitle,DateConverter
}  
,
head: {
 title: 'Find out your desired Hijri date or Gregorian date and easily.',
  meta: [
     { hid: 'description', name: 'description', content: 'Find your desired date of Hijri or Gregorian date and easily leave the date of Hijri from Gregorian date or Gregorian date' },
     { name:"keywords",content:`islamic Calander,Gregorian Calander, islamic Calander ${new Date().getFullYear()} , islamic date Converter`}
  ]

},


mounted() {


 
},
}
</script>


