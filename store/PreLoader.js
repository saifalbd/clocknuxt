export default {
    namespaced: true,
    state:{
loaderModel:false,
    },
mutations:{

SET_LoaderModel(state,loader){
state.loaderModel = loader
}
},
actions:{
  
    preLoad({commit},loader){
        commit('SET_LoaderModel',loader)
    }
}

}