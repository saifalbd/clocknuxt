<template>
 
    <v-layout wrap align-center>
      <v-flex xs5 d-flex>
        <v-select
          :items="items"
          label="Select Month"
        ></v-select>
      </v-flex>
          <v-flex xs3 d-flex>
        <v-select
          :items="items"
          label="Standard"
        ></v-select>
      </v-flex>
    <v-flex xs4 align-center justify-center  d-flex>
    <div>
<v-btn small color="primary">Primary</v-btn>
    </div>

    </v-flex>
    </v-layout>
 
</template>

<script>
  export default {
    data: () => ({
      items: ['Foo', 'Bar', 'Fizz', 'Buzz']
    })
  }
</script>