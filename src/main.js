import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from './store'

import {createWebHistory, createRouter} from 'vue-router'
import Login from './components/Login.vue'
import LoginSiswa from './components/LoginSiswa.vue'

import Home from './components/Home.vue'

import Kelas from './components/Kelas/Kelas.vue'
import TambahKelas from './components/Kelas/TambahKelas.vue'
import EditKelas from './components/Kelas/EditKelas.vue'

import Siswa from './components/Siswa/Siswa.vue'
import TambahSiswa from './components/Siswa/TambahSiswa.vue'
import EditSiswa from './components/Siswa/EditSiswa.vue'

import Spp from './components/Spp/Spp.vue'
import TambahSpp from './components/Spp/TambahSpp.vue'
import EditSpp from './components/Spp/EditSpp.vue'

import Petugas from './components/Petugas/Petugas.vue'
import TambahPetugas from './components/Petugas/TambahPetugas.vue'
import EditPetugas from './components/Petugas/EditPetugas.vue'

import Pembayaran from './components/Pembayaran.vue'
import PembayaranSiswa from './components/PembayaranSiswa.vue'
import PembayaranPetugas from './components/PembayaranPetugas.vue'

import Bayar from './components/Bayar.vue'

import NotFound from './components/NotFound.vue'

const router = createRouter({
    history : createWebHistory(),
    routes : [
        {path : '/login', name:"Login", component : Login},
        {path : '/loginsiswa', name:"LoginSiswa", component : LoginSiswa},
        
        {path : '/', name:"Home", component : Home},

        {path : '/kelas', name:"Kelas", component : Kelas},
        {path : '/kelas/tambahkelas', name:"TambahKelas", component : TambahKelas},
        {path : '/kelas/editkelas/:id_kelas', name:"EditKelas", component : EditKelas},
        
        {path : '/siswa', name:"Siswa", component : Siswa},
        {path : '/siswa/tambahsiswa', name:"TambahSiswa", component : TambahSiswa},
        {path : '/siswa/editsiswa/:nisn', name:"EditSiswa", component : EditSiswa},
        
        {path : '/spp', name:"Spp", component : Spp},
        {path : '/spp/tambahspp', name:"TambahSpp", component : TambahSpp},
        {path : '/spp/editspp/:id_spp', name:"EditSpp", component : EditSpp},
        
        {path : '/petugas', name:"Petugas", component : Petugas},
        {path : '/petugas/tambahpetugas', name:"TambahPetugas", component : TambahPetugas},
        {path : '/petugas/editpetugas/:id', name:"EditPetugas", component : EditPetugas},
        
        {path : '/pembayaran', name:"Pembayaran", component : Pembayaran},
        {path : '/pembayaransiswa', name:"PembayaranSiswa", component : PembayaranSiswa},
        {path : '/pembayaranpetugas', name:"PembayaranPetugas", component : PembayaranPetugas},
        
        {path : '/bayar', name:"Bayar", component : Bayar},
        
        {path : '/notfound', name:"NotFound", component : NotFound},
    ],
    base : '/'
})

const app = createApp(App)
app.use(store)
app.use(router)
app.config.globalProperties.axios = axios
app.mount('#app')