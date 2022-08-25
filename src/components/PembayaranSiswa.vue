<template>
    <div class="container">
        <br>

        <table class="table table-hover table-striped data" >
            <thead>
                <tr>
                    <th>ID Pembayaran</th>
                    <th>Nama Petugas</th>
                    <th>Nama Siswa</th>
                    <th>Tanggal Bayar</th>
                    <th>Bulan Bayar</th>
                    <th>Tahun Bayar</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="pem in pembayaran" :key="pem.id_pembayaran">
                    <td>{{pem.id_pembayaran}}</td>
                    <td>
                       <span v-for="pet in petugas.filter((pet) => pem.id_petugas === pet.id_petugas)" :key="pet.id_petugas">
                           {{pet.name}}
                        </span> 
                    </td>
                    <td>
                        <span v-for="sis in siswa.filter((sis) => pem.nisn === sis.nisn)" :key="sis.nisn">
                            {{sis.nama}}
                        </span>
                    </td>
                    <td>{{pem.tgl_bayar}}</td>
                    <td>{{pem.bulan_bayar}}</td>
                    <td>{{pem.tahun_bayar}}</td>
                    <td>{{pem.status}}</td>
                </tr>
            </tbody>
        </table>
        <!-- <button class="btn btn-primary" style="float:right" @click="cetak()" v-if="level !='siswa'"><i class='bx bx-printer'></i></button> -->
    </div>
</template>

<script>
export default {
    name: "PembayaranSiswa",
    data(){
        return{
            pembayaran:[],
            petugas:[],
            siswa:[],
            message:'',
            style_msg:'',
            error:false,
        }
    },
    methods:{
        tm_pembayaran:function(){
            var option={
                headers:{
                    'Authorization':'bearer ' + localStorage.getItem("token")
                    }
            }

            var data = localStorage.getItem('nisn');

            this.axios.get("http://localhost/latihan_migrasi/public/api/pembayaranss/"+ data, option).then((result)=>{
                console.log(result)
                this.pembayaran=result.data
            })
        },
        getpetugas:function() {
            var option = {
                headers:{
                    'Authorization':'bearer ' + localStorage.getItem("token")
                }
            }

            this.axios.get("http://localhost/latihan_migrasi/public/api/users", option).then((result) => {
                // console.log(result)
                this.petugas = result.data
            })
        },

        getsiswa:function() {
            var option = {
                headers:{
                    'Authorization':'bearer ' + localStorage.getItem("token")
                }
            }
            this.axios.get("http://localhost/latihan_migrasi/public/api/siswa", option).then((result) => {
                // console.log(result)
                this.siswa = result.data
            })
        },
        // cetak:function(){
        //     window.print()
        // }    
    },
    mounted(){
        this.tm_pembayaran()
        this.getpetugas()
        this.getsiswa()
    }
}
</script>