import {surah} from '@/plugins/helper/Page/ReadAndListen/surah'
import {getDetailsData} from '@/plugins/nameOfSurah/fullDetailsSuahName'


const namespaced=true;
const state = {
nameOfSurah:'',
allInformation :false,
surahView:'page', //this for surah View Style
theHead:false,
}

const mutations={
SET_NAMEOFSURAH(state){

state.nameOfSurah = getDetailsData();
},
SET_DetailsOfSurahTxt(state,payload){
const s = new surah(payload)
//state.allInformation =s.PureInfo()
state.allInformation  =s.PureInfoPagination();
state.theHead =s.pageMeta()
},
SET_surahView(state,payload){
state.surahView =payload;
}
}
const actions = {
    SET_surahView({commit},val){
   commit('SET_surahView',val) 
}
,
SET_NAMEOFSURAH({commit}){
commit('SET_NAMEOFSURAH')
}
}

export default {
    state,  namespaced,mutations,actions
}