<template>
    <div class="container">
        <input type="hidden" name="id" v-model="id" class="form-control">
        <br>
        Nama
        <input type="text" name="name" v-model="name" class="form-control">
        <br>
        Email
        <input type="email" name="email" v-model="email" class="form-control">
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
        <button class="btn btn-primary" style="float:right" @click="editpetugas()">EDIT PETUGAS</button>
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
    name: "EditPetugas",
    data(){
        return{
            id:'',
            name:'',
            password:'',
            email:'',
            level:'',
            style_msg:'',
            message:'',
            error:false,
        }
    },
    methods:{
        getdetailuser(id){
            var option={
                headers:{
                    'Authorization':'bearer '+localStorage.getItem("token")
                    }
            }
            this.axios.get("http://localhost/latihan_migrasi/public/api/getdetailuser/"+id, option).then((result)=>{
                this.id = result.data.id,
                this.name = result.data.name,
                this.password = result.data.password,
                this.email = result.data.email,
                this.level = result.data.level
            })
        },
        editpetugas:function(){
            var datapetugas = {
                name:this.name,
                email:this.email,
                level:this.level,
            }
            var option={
                headers:{
                    'Authorization':'bearer '+localStorage.getItem("token")
                }
            }
            this.axios.put("http://localhost/latihan_migrasi/public/api/update_user/"+ this.id, datapetugas, option).then((result)=>{
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
    },
    mounted(){
        this.getdetailuser(this.$route.params.id)
    }
}
</script>