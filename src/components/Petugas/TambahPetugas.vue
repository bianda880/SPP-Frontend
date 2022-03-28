<template>
    <div class="container">
        Nama
        <input type="text" name="nama_petugas" v-model="nama_petugas" class="form-control">
        <br>
        E-mail
        <input type="email" name="email" v-model="email" class="form-control">
        <br>
        Password
        <input type="password" name="password" v-model="password" class="form-control">
        <br>
        Password Confirmation
        <input type="password" name="password_confirmation" v-model="password_confirmation" class="form-control">
        <br>
        Level
        <select name="level" v-model="level" class="form-control">
            <option hidden disabled selected value>pilih level</option>
            <option value="admin">Admin</option>
            <option value="petugas">Petugas</option>
        </select>
        <br>
        <router-link class="btn btn-secondary" to="/petugas">
                <i class='bx bxs-chevron-left button-icon'></i>
                <span class="button-text">Back</span>
            </router-link>
        <button class="btn btn-primary" style="float:right" @click="simpanpetugas()">SIMPAN</button>
        <br>
        <div v-bind:class="style_msg">
            <div v-if="error==true">
                <div v-for="msg in message" :key="msg.id">
                    <p v-for="m in msg" :key="m.id">{{m}}</p>
                </div>
            </div>
            <p v-else>{{message}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name:"TambahSiswa",
    data(){
        return{
            listkelas:[],
            nama_petugas:'',
            email:'',
            password:'',
            password_confirmation:'',
            level:'',
            style_msg:'',
            message:'',
            error:false,
        }
    },
    methods:{
        simpanpetugas:function(){
            var datapetugas = {
                nama_petugas:this.nama_petugas,
                email:this.email,
                password:this.password,
                password_confirmation:this.password_confirmation,
                level:this.level,
            }
            var option={
                headers:{
                    'Authorization':'bearer '+localStorage.getItem("token")
                    }
            }
            this.axios.post("http://localhost/latihan_migrasi/public/api/register", datapetugas, option).then((result)=>{
                console.log(result)
                if(result.request.status==200){
                    if (result.data.status==true){
                        this.error=false
                        this.message=result.data.message
                        this.style_msg="alert alert-success"
                    }else{
                        this.error=true
                        this.message=result.data.message
                        this.style_msg="alert alert-danger"
                    }
                    
                    setTimeout(()=>{
                    this.$router.push('/petugas')
                    }, 2000)
                }else{
                    this.error=true
                    this.style_msg="alert alert-danger"
                    this.message=result.data.status                    
                }
            })
        }
    }
}
</script>