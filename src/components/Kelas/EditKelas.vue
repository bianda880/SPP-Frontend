<template>
    <div class="container">
        <input type="hidden" name="id_kelas" v-model="id_kelas" class="form-control">
        <br>
        Nama Kelas
        <input type="text" name="nama_kelas" v-model="nama_kelas" class="form-control">
        <br>
        Jurusan
        <input type="text" name="jurusan" v-model="jurusan" class="form-control">
        <br>
        Angkatan
        <input type="number" name="angkatan" v-model="angkatan" class="form-control">
        <br>
        <router-link class="btn btn-secondary" to="/kelas">
                <i class='bx bxs-chevron-left button-icon'></i>
                <span class="button-text">Back</span>
            </router-link>
        <button class="btn btn-primary " style="float:right" @click="editkelas()">EDIT KELAS</button>
        <br>
        <div v-bind:class="style_msg">
            <div v-if="error==true">
                <div v-for="msg in message" :key="msg.id_kelas">
                    <p v-for="m in msg" :key="m.id_kelas">{{m}}</p>
                </div>
            </div>
            <p v-else>{{message}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "EditKelas",
    data(){
        return{
            id_kelas:'',
            nama_kelas:'',
            jurusan:'',
            angkatan:'',
            style_msg:'',
            message:'',
            error:false,
        }
    },
    methods:{
        getdetailkelas(id_kelas){
            var option={
                headers:{
                    'Authorization':'bearer '+localStorage.getItem("token")
                    }
            }
            this.axios.get("http://localhost/latihan_migrasi/public/api/getdetailkelas/"+id_kelas, option).then((result)=>{
                this.id_kelas = result.data.id_kelas,
                this.nama_kelas = result.data.nama_kelas,
                this.jurusan = result.data.jurusan,
                this.angkatan = result.data.angkatan
            })
        },
        editkelas:function(){
            var datakelas = {
                nama_kelas:this.nama_kelas,
                jurusan:this.jurusan,
                angkatan:this.angkatan,
            }
            var option={
                headers:{
                    'Authorization':'bearer '+localStorage.getItem("token")
                    }
            }
            this.axios.put("http://localhost/latihan_migrasi/public/api/update_kelas/"+ this.id_kelas, datakelas, option).then((result)=>{
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
                    this.$router.push('/kelas')
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
        this.getdetailkelas(this.$route.params.id_kelas)
    }
}
</script>