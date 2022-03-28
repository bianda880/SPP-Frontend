<template>
  <body>
    <nav v-if="authenticated">
      <label class="logo" >SPP</label>
      <ul class="nav__links" > 
        <li><router-link class="active" to="/">Home</router-link></li>
          
        <li v-if="level=='admin'"><router-link to="/kelas">Kelas</router-link></li>
        <li v-if="level=='admin'"><router-link to="/siswa">Siswa</router-link></li>
        <li v-if="level=='admin'"><router-link to="/spp">SPP</router-link></li>
        <li v-if="level=='admin'"><router-link to="/petugas">Petugas</router-link></li>
        <li v-if="level=='admin'"><router-link to="/pembayaran">History</router-link></li>
        <li v-if="level=='admin'"><router-link to="/bayar">Transaksi</router-link></li>

        <li v-if="level=='petugas'"><router-link to="/pembayaran">History</router-link></li>
        <li v-if="level=='petugas'"><router-link to="/bayar">Transaksi</router-link></li>
      
        <li v-if="level=='siswa'"><router-link to="/pembayaran">History</router-link></li>

        <router-link class="logout" to="/login" v-on:click="logout()"><i class='bx bx-power-off'></i></router-link>
      </ul>
      <label id="icon">
        <i class="fas fa-bars"></i>
      </label>
    </nav>
    <section></section>
  </body>

    <router-view @authenticated="setAuthenticated" @level="setlevel" @nama="setnama"></router-view>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      authenticated:JSON.parse(localStorage.getItem('status')),
      level:localStorage.getItem("level"),
      nama:localStorage.getItem("nama"),
    }
  },
  mounted(){
    if(!this.authenticated){
      this.$router.replace({name :"Login"});
    }
  },
  methods:{
    setAuthenticated(status){
      this.authenticated=status
    },
    setlevel(status){
      this.level=status
    },
    setnama(status){
      this.nama=status
    },
    logout(){
      this.authenticated=false
      localStorage.removeItem('status')
      localStorage.removeItem('token')
      localStorage.removeItem('level')
      localStorage.removeItem('nama')
    }
  }
}

</script>

<style>
  @import './assets/style.css';
</style>