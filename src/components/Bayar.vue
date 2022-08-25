<template>
    <div class="container">
        <!-- Form -->
        <br>
            NISN
            <input type="number" name="nisn" class="form-control" v-model="nisn" placeholder="Masukkan nisn" 
            autocomplete="off">
            <br>
            Bulan Bayar
            <select name="bulan_bayar" class="form-control" v-model="bulan_bayar">
                <option hidden disabled selected value>Pilih bulan bayar</option>
                <option v-for="bln in listbln" :key="bln.key" v-bind:value="bln.key">
                    {{bln.val}}
                </option>
            </select>
            <br>
            Tahun Bayar
            <select name="tahun_bayar" class="form-select" v-model="tahun_bayar">
                <option value="" selected hidden disabled>Pilih tahun spp</option>
                <option v-for="spp in listspp" :key="spp.id_spp" v-bind:value="spp.tahun">{{spp.tahun}}</option>
            </select>
            <br>

            <!-- Button -->
            <button class="btn btn-primary" style="float:right" @click="simpanpembayaran()"><i class='bx bxs-wallet' ></i></button>

            <!-- Notification -->
            <br><br>
            <div v-bind:class="style_msg">
                <div v-if="error == true">
                    <div v-for="msg in message" :key="msg.id_pembayaran">
                        <p v-for="m in msg" :key="m.id_pembayaran">{{m}}</p>
                    </div>
                </div>
                <p v-else>{{message}}</p>
            </div>
        </div>
</template>

<script>
    export default {
        name: "Bayar",
        data() {
            return {
                nisn:'',
                bulan_bayar: '',
                tahun_bayar:'',
                listbln:[
                    {key:"Januari", val:"Januari"}, {key:"Februari", val:"Februari"}, {key:"Maret", val:"Maret"},
                    {key:"April", val:"April"}, {key:"Mei", val:"Mei"}, {key:"Juni", val:"Juni"},
                    {key:"Juli", val:"Juli"}, {key:"Agustus", val:"Agustus"}, {key:"September", val:"September"},
                    {key:"Oktober", val:"Oktober"}, {key:"November", val:"November"}, {key:"Desember", val:"Desember"}
                ],
                listspp:[],
                message: '',
                style_msg: '',
                error:false
            }
        },
        methods: {
            simpanpembayaran:function() {
                var option = {
                    headers:{
                        'Authorization':'bearer ' + localStorage.getItem("token")
                    }
                }
                var datapembayaran = {
                    nisn:this.nisn,
                    bulan_bayar:this.bulan_bayar,
                    tahun_bayar:this.tahun_bayar
                }
                // Admin
                this.axios.post("http://localhost/latihan_migrasi/public/api/insert_pembayaran", datapembayaran, option).then((result) => {
                    console.log(result)
                       
                    if (result.data.status==true){
                        this.error=false
                        this.message=result.data.message
                        this.style_msg="alert alert-success"

                        setTimeout(()=>{
                        this.$router.push('/pembayaran')
                        }, 2000)
                    }else{
                        this.error=true
                        this.message=result.data.message
                        this.style_msg="alert alert-danger"
                    
                    }
                })
                // Petugas
                this.axios.post("http://localhost/latihan_migrasi/public/api/insert_pembayarans", datapembayaran, option).then((result) => {
                    // console.log(result)
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
                    this.$router.push('/pembayaran')
                    }, 2000)
                } 
                })
            },
            getspp:function() {
                var option = {
                    headers:{
                        'Authorization':'bearer ' + localStorage.getItem("token")
                    }
                }
                this.axios.get("http://localhost/latihan_migrasi/public/api/spp", option).then((result) => {
                    console.log(result)
                    this.listspp = result.data
                })
            },
        },
        mounted() {
            this.getspp()
        }
    }
</script>