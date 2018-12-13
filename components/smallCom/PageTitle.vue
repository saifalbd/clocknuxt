<template>
  <div class="headlineBox">
        <h2 class="headLine">
          {{title}}
        </h2>
        <div class="bottomLine">
      <svg viewBox="0 0 100 100" >
<path d="M0,50  30,50  A50,50 0,0,1 50,50 A50,50 0,0,0 70,50 A0,50 0,0,0 100,50" 
 fill="none">
</path>

</svg>

        </div>
        <p class="headLineTxt">
          <slot>
          </slot>
        </p>
      </div>
    
</template>

<script>
export default {
props:{
    title:{
        require :true,
        type:String
    }
}

    
}
</script>
