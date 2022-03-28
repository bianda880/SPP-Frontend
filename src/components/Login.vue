<template>
    <div class="container">
        <br>
        <h1>LOGIN</h1>
        Email :
        <input type="text" v-model="email" class="form-control" @keyup.enter="login" placeholder="E-mail">
        <br>
        Password :
        <input type="password" v-model="password" class="form-control" @keyup.enter="login" placeholder="Password">
        <br>
        <button class="btn btn-success" v-on:click="login" @keyup.enter="login">LOGIN</button>
        <br>
        Login Siswa disini!
        <router-link class="link" :to="{path:'/loginsiswa'}">Login siswa</router-link>

    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return{
            email:'',
            password:''
        }
    },
    methods:{
        login(){
            var datalogin={
                email:this.email,
                password:this.password
            };
            this.axios.post("http://localhost/latihan_migrasi/public/api/login", datalogin).then((result)=>{
                localStorage.setItem('token',result.data.token)
                localStorage.setItem('status', true);
                localStorage.setItem('level', result.data.level);
                localStorage.setItem('nama', result.data.nama);
                this.$emit("level", result.data.level)
                this.$emit("nama", result.data.nama)
                this.$emit("authenticated",true)
                this.$store.dispatch('setnama', result.data.nama)
                this.$router.replace({name: "Home"})
            }).catch(error=>{
                console.log(error)
                alert('email atau password anda salah. coba cek dulu')
            })
        }
    },
    mounted(){
        this.$emit('authenticated', false)
    }
}
</script>
