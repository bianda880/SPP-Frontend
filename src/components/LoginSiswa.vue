<template>
    <div class="container">
        <br>
        <h1>LOGIN SISWA</h1>
        Username :
        <input type="text" v-model="username" class="form-control" @keyup.enter="loginsiswa" placeholder="Username">
        <br>
        Password :
        <input type="password" v-model="password" class="form-control" @keyup.enter="loginsiswa" placeholder="Password">
        <br>
        <button class="btn btn-success" v-on:click="login" @keyup.enter="loginsiswa">LOGIN</button>
    </div>
</template>

<script>
export default {
    name: "LoginSiswa",
    data() {
        return{
            username:'',
            password:''
        }
    },
    methods:{
        loginsiswa(){
            var dataloginsiswa={
                username:this.username,
                password:this.password
            };
            this.axios.post("http://localhost/latihan_migrasi/public/api/login_siswa", dataloginsiswa).then((result)=>{
                localStorage.setItem('token',result.data.token)
                localStorage.setItem('status', true);
                localStorage.setItem('level', result.data.level);
                localStorage.setItem('nama', result.data.nama);
                localStorage.setItem('nisn', result.data.nisn)

                this.$emit("authenticated",true)
                this.$emit("level", result.data.level)
                this.$emit("nama", result.data.nama)
                this.$emit("nisn", result.data.nisn)

                this.$store.dispatch('setnama', result.data.nama)
                this.$store.dispatch('setnisn', result.data.nisn)
                this.$router.replace({name: "Home"})
            }).catch(error=>{
                console.log(error)
                alert('username atau password anda salah. coba cek dulu')
            })
        }
    },
    mounted(){
        this.$emit('authenticated',false)
    }
}
</script>
