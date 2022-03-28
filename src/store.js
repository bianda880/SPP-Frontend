import { createStore } from "vuex";

export default createStore({
    state:{
        user:{
            nama: localStorage.getItem('nama'),
        }
    },
    mutations:{
        KONFIRM_NAMA:(state,nama)=>{
            state.user.nama=nama
        }
    },
    actions:{
        setnama({commit}, nama){
            commit('KONFIRM_NAMA', nama)
        }
    }
})