<template>
  <div class="text-xs-center">
    <v-menu offset-y>
      <v-btn
        slot="activator"
        color="primary"
        dark
      >
   change tranlation
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="(item, index) in items"
          :key="index"
          
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  export default {
   



computed:{

    items(){
const lang = new this.$helper.Language.langName()
//console.log(lang.codeName)
     return   [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' }
      ]
    }

}
  }
</script>