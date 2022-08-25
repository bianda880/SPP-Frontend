<template>
    <div class="container">
        <br>
        <router-link class="btn btn-primary" :to="{path:'/petugas/tambahpetugas'}"><i class='bx bxs-add-to-queue'></i></router-link>
        <table class="table table-hover table-striped" >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>ID Petugas</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Level</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="pet in petugas" :key="pet.id">
                    <td>{{pet.id}}</td>
                    <td>{{pet.id_petugas}}</td>
                    <td>{{pet.name}}</td>
                    <td>{{pet.email}}</td>
                    <td>{{pet.level}}</td>
                    <td>
                        <router-link class="btn btn-success" :to="{path:'/petugas/editpetugas/'+pet.id}"><i class='bx bxs-edit' ></i></router-link>
                        &nbsp;
                        <a class="btn btn-danger" v-on:click="deletepetugas(pet.id)"><i class='bx bx-trash' ></i></a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "Petugas",
    data(){
        return{
            petugas:[],
            message:'',
            style_msg:'',
            error:false,
        }
    },
    methods:{
        tm_petugas:function(){
            var option={
                headers:{
                    'Authorization':'bearer ' + localStorage.getItem("token")
                    }
            }
            this.axios.get("http://localhost/latihan_migrasi/public/api/users", option).then((result)=>{
                console.log(result),
                this.petugas=result.data
            })
        },
        deletepetugas:function(id){
            var option={
                headers:{
                    'Authorization':'bearer '+localStorage.getItem("token")
                    }
            }
            if(confirm('yakin?')) {
                this.axios.delete("http://localhost/latihan_migrasi/public/api/delete_user/"+id, option).then((result)=>{
                console.log(result)
                this.tm_petugas()
                })
            }
        }
    },
    mounted(){
        this.tm_petugas()
    }
}
</script>