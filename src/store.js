import { createStore } from "vuex";

export default createStore({
    state:{
        user:{
            nama: localStorage.getItem('nama'),
            level: localStorage.getItem('level'),
        }
    },
    mutations:{
        KONFIRM_NAMA:(state,nama)=>{
            state.user.nama=nama
        },
        KONFIRM_LEVEL:(state,level)=>{
            state.user.level=level
        }
    },
    actions:{
        setnama({commit}, nama){
            commit('KONFIRM_NAMA', nama)
        },
        setlevel({commit}, level){
            commit('KONFIRM_LEVEL', level)
        }
    }
})