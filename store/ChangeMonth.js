
export default {
    namespaced: true,
    state:{
openDialog:false,
loaderModel:true,
    },
mutations:{
SET_Dialog(state,payload){
state.openDialog =payload;

},

},
actions:{
    SET_Dialog({commit},loader){
      commit('SET_Dialog',loader)
    },
   
}

}