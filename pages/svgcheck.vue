<template>
<div>


<no-ssr>
<div class="svgcheker">
    
       <div class="grid"><div class="item" v-for="(i,x) in 100" :key="x"> </div></div> 

<div class="svgBox">
<svg viewBox="0 0 100 100" >
<path d="M0,50  30,50  A35,50 0,0,1 50,50 A60,50 0,0,0 70,50 A0,50 0,0,0 100,50" 
 fill="none"  stroke-width="0.5">
</path>
</svg>





</div>
  
    
</div>
  </no-ssr>
   </div> 
</template>

<script>
import SVG from 'svg.js'

export default {
    mounted() {
         if (process.browser) {
  window.onNuxtReady((app) => {
   console.log(22222222222)


  })
}



    },
    
}
</script>

<style lang="scss" scoped>
$h :1000px;
.svgcheker{
    width: $h ;
    height: $h;
    background:white;
    position: relative;
    .grid{
position: absolute;
width:$h ;
height:$h ;
top: 0;
left: 0;

display: flex;
flex-wrap: wrap;
overflow: hidden;
display: none;
.item{
border:0.05rem solid black;
width: $h /10;
height: $h/10;
}
    }
.svgBox{
position: relative;
z-index: 10;
svg{
    stroke:red;
    border: 1px solid blue;
}
}
}


</style>

