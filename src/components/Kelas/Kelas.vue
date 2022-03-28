<template>
    <div class="container">
        <br>
        <router-link class="btn btn-primary" :to="{path:'/kelas/tambahkelas'}"><i class='bx bxs-add-to-queue'></i></router-link>
        <table class="table table-hover table-striped" >
            <thead>
                <tr>
                    <th>ID Kelas</th>
                    <th>Nama Kelas</th>
                    <th>Jurusan</th>
                    <th>Angkatan</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="kel in kelas.data" :key="kel.id_kelas">
                    <td>{{kel.id_kelas}}</td>
                    <td>{{kel.nama_kelas}}</td>
                    <td>{{kel.jurusan}}</td>
                    <td>{{kel.angkatan}}</td>
                    <td>
                        <router-link class="btn btn-success" :to="{path:'/kelas/editkelas/'+kel.id_kelas}"><i class='bx bxs-edit' ></i></router-link>
                        &nbsp;
                        <a class="btn btn-danger" v-on:click="deletekelas(kel.id_kelas)"><i class='bx bx-trash' ></i></a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "Kelas",
    data(){
        return{
            kelas:[],
            message:'',
            style_msg:'',
            error:false,
        }
    },
    methods:{
        tm_kelas:function(){
            var option={
                headers:{
                    'Authorization':'bearer '+localStorage.getItem("token")
                    }
            }
            this.axios.get("http://localhost/latihan_migrasi/public/api/kelas", option).then((result)=>{
                console.log(result)
                this.kelas=result.data
            })
        },
        deletekelas:function(id_kelas){
            var option={
                headers:{
                    'Authorization':'bearer '+localStorage.getItem("token")
                    }
            }
            if(confirm('yakin?')) {
                this.axios.delete("http://localhost/latihan_migrasi/public/api/delete_kelas/"+id_kelas, option).then((result)=>{
                console.log(result)
                this.tm_kelas()
                })
            }
        }
    },
    mounted(){
        this.tm_kelas()
    }
}
</script>