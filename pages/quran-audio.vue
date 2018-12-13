<template>
<div>
{{info}}
</div>
    
</template>

<script>
export default {
    data(){
        return {
            info:''
        }
    },

async asyncData({app,store}){
const getData = (url)=>app.$axios.get(url)
const lang = 'https://api.alquran.cloud/edition/language'
const langEn = 'https://api.alquran.cloud/edition/language/en'
const translation =   'https://api.alquran.cloud/edition/type/translation'
const nameOfSurah = 'https://api.alquran.cloud/juz/30/quran-uthmani'
const {data}   = await getData(nameOfSurah )
return {
    info:data.data
}

}
    
}
</script>




