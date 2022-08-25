<template>
    <div class="container">
        <br>
        <router-link class="btn btn-primary" :to="{path:'/siswa/tambahsiswa'}"><i class='bx bxs-add-to-queue'></i></router-link>
        <table class="table table-hover table-striped" >
            <thead>
                <tr>
                    <th>NISN</th>
                    <th>Username</th>
                    <th>NIS</th>
                    <th>Nama</th>
                    <th>ID Kelas</th>
                    <th>Alamat</th>
                    <th>No Telp</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="sis in siswa" :key="sis.nisn">
                    <td>{{sis.nisn}}</td>
                    <td>{{sis.username}}</td>
                    <td>{{sis.nis}}</td>
                    <td>{{sis.nama}}</td>
                    <td>{{sis.id_kelas}}</td>
                    <td>{{sis.alamat}}</td>
                    <td>{{sis.no_telp}}</td>
                    <td>
                        <router-link class="btn btn-success" :to="{path:'/siswa/editsiswa/'+sis.nisn}"><i class='bx bxs-edit' ></i></router-link>
                        &nbsp;
                        <a class="btn btn-danger" v-on:click="deletesiswa(sis.nisn)"><i class='bx bx-trash' ></i></a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "Siswa",
    data(){
        return{
            siswa:[],
            message:'',
            style_msg:'',
            error:false,
        }
    },
    methods:{
        tm_siswa:function(){
            var option={
                headers:{
                    'Authorization':'bearer ' + localStorage.getItem("token")
                    }
            }
            this.axios.get("http://localhost/latihan_migrasi/public/api/siswa", option).then((result)=>{
                // console.log(result),
                this.siswa=result.data
            })
        },
        deletesiswa:function(nisn){
            var option={
                headers:{
                    'Authorization':'bearer '+localStorage.getItem("token")
                    }
            }
            if(confirm('yakin?')) {
                this.axios.delete("http://localhost/latihan_migrasi/public/api/delete_siswa/"+nisn, option).then((result)=>{
                console.log(result)
                this.tm_siswa()
                })
            }
        }
    },
    mounted(){
        this.tm_siswa()
    }
}
</script>