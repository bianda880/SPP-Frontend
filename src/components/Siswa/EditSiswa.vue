<template>
    <div class="container">
        <input type="hidden" name="nisn" v-model="nisn" class="form-control">
        <br>
        Username
        <input type="text" name="username" v-model="username" class="form-control">
        <br>
        NIS
        <input type="number" name="nis" v-model="nis" class="form-control">
        <br>
        Nama Siswa
        <input type="text" name="nama" v-model="nama" class="form-control">
        <br>
        ID Kelas
        <select name="id_kelas" v-model="id_kelas" class="form-control">
            <option></option>
            <option v-for="kelas in listkelas.data" :key="kelas.id_kelas" v-bind:value="kelas.id_kelas">{{kelas.nama_kelas}}</option>
        </select>
        <br>
        Alamat
        <textarea name="alamat" rows="4" v-model="alamat" class="form-control"></textarea>
        <br>
        No. Telpon
        <input type="tel" name="no_telp" v-model="no_telp" class="form-control">
        <br>
        <router-link class="btn btn-secondary" to="/siswa">
                <i class='bx bxs-chevron-left button-icon'></i>
                <span class="button-text">Back</span>
            </router-link>
        <button class="btn btn-primary " style="float:right" @click="editsiswa()">EDIT SISWA</button>
        <br>
        <div v-bind:class="style_msg">
            <div v-if="error==true">
                <div v-for="msg in message" :key="msg.nisn">
                    <p v-for="m in msg" :key="m.nisn">{{m}}</p>
                </div>
            </div>
            <p v-else>{{message}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "EditSiswa",
    data(){
        return{
            listkelas:[],
            nisn:'',
            username:'',
            nis:'',
            nama:'',
            id_kelas:'',
            alamat:'',
            no_telp:'',
            style_msg:'',
            message:'',
            error:false,
        }
    },
    methods:{
        tkelas:function(){
            var option={
                headers:{
                    'Authorization':'bearer '+localStorage.getItem("token")
                    }
            }
            this.axios.get("http://localhost/latihan_migrasi/public/api/kelas", option).then((result)=>{
                this.listkelas=result.data
            })
        },
        getdetailsiswa(nisn){
            var option={
                headers:{
                    'Authorization':'bearer '+localStorage.getItem("token")
                    }
            }
            this.axios.get("http://localhost/latihan_migrasi/public/api/getdetailsiswa/"+nisn, option).then((result)=>{
                this.nisn = result.data.nisn,
                this.username = result.data.username,
                this.nis = result.data.nis,
                this.nama = result.data.nama,
                this.id_kelas = result.data.id_kelas,
                this.alamat = result.data.alamat,
                this.no_telp = result.data.no_telp
            })
        },
        editsiswa:function(){
            var datasiswa = {
                username:this.username,
                nis:this.nis,
                nama:this.nama,
                id_kelas:this.id_kelas,
                alamat:this.alamat,
                no_telp:this.no_telp,
            }
            var option={
                headers:{
                    'Authorization':'bearer '+localStorage.getItem("token")
                }
            }
            this.axios.put("http://localhost/latihan_migrasi/public/api/update_siswa/"+ this.nisn, datasiswa, option).then((result)=>{
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
                    this.$router.push('/siswa')
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
        this.tkelas()
        this.getdetailsiswa(this.$route.params.nisn)
    }
}
</script>