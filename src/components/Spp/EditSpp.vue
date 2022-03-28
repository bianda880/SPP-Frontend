<template>
    <div class="container">
        <input type="hidden" name="id_spp" v-model="id_spp" class="form-control">
        <br>
        Angkatan
        <input type="number" name="angkatan" v-model="angkatan" class="form-control">
        <br>
        Tahun
        <input type="number" name="tahun" v-model="tahun" class="form-control">
        <br>
        Nominal
        <input type="number" name="nominal" v-model="nominal" class="form-control">
        <br>
        <router-link class="btn btn-secondary" to="/spp">
                <i class='bx bxs-chevron-left button-icon'></i>
                <span class="button-text">Back</span>
            </router-link>
        <button class="btn btn-primary " style="float:right" @click="editspp()">EDIT SPP</button>
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
    name: "EditSpp",
    data(){
        return{
            id_spp:'',
            angkatan:'',
            tahun:'',
            nominal:'',
            style_msg:'',
            message:'',
            error:false,
        }
    },
    methods:{
        getdetailspp(id_spp){
            var option={
                headers:{
                    'Authorization':'bearer '+localStorage.getItem("token")
                }
            }
            this.axios.get("http://localhost/latihan_migrasi/public/api/getdetailspp/"+id_spp, option).then((result)=>{
                this.id_spp = result.data.id_spp,
                this.angkatan = result.data.angkatan,
                this.tahun = result.data.tahun,
                this.nominal = result.data.nominal
            })
        },
        editspp:function(){
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
            this.axios.put("http://localhost/latihan_migrasi/public/api/update_spp/"+ this.id_spp, dataspp, option).then((result)=>{
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
    },
    mounted(){
        this.getdetailspp(this.$route.params.id_spp)
    }
}
</script>