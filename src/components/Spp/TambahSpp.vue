<template>
    <div class="container">
        Angkatan
        <input type="text" name="angkatan" v-model="angkatan" class="form-control">
        <br>
        Tahun
        <input type="text" name="tahun" v-model="tahun" class="form-control">
        <br>
        Nominal
        <input type="number" name="nominal" v-model="nominal" class="form-control">
        <br>
        <router-link class="btn btn-secondary" to="/spp">
                <i class='bx bxs-chevron-left button-icon'></i>
                <span class="button-text">Back</span>
            </router-link>
        <button class="btn btn-primary " style="float:right" @click="simpanspp()">SIMPAN</button>
        <br>
        <div v-bind:class="style_msg">
            <div v-if="error==true">
                <div v-for="msg in message" :key="msg.id_spp">
                    <p v-for="m in msg" :key="m.id_spp">{{m}}</p>
                </div>
            </div>
            <p v-else>{{message}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name:"TambahSpp",
    data(){
        return{
            angkatan:'',
            tahun:'',
            nominal:'',
            style_msg:'',
            message:'',
            error:false,
        }
    },
    methods:{
        simpanspp:function(){
            var dataspp = {
                angkatan:this.angkatan,
                tahun:this.tahun,
                nominal:this.nominal,
            }
            var option={
                headers:{
                    'Authorization':'bearer '+localStorage.getItem("token")
                    }
            }
            this.axios.post("http://localhost/latihan_migrasi/public/api/insert_spp", dataspp, option).then((result)=>{
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
                    this.$router.push('/spp')
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