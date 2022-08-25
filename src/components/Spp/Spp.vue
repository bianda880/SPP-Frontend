<template>
    <div class="container">
        <br>
        <router-link class="btn btn-primary" :to="{path:'/spp/tambahspp'}"><i class='bx bxs-add-to-queue'></i></router-link>
        <table class="table table-hover table-striped" >
            <thead>
                <tr>
                    <th>ID SPP</th>
                    <th>Angkatan</th>
                    <th>Tahun</th>
                    <th>Nominal</th>
                    <th>Aksi</th>
                </tr>
            </thead>  
            <tbody>
                <tr v-for="sp in spp" :key="sp.id_spp">
                    <td>{{sp.id_spp}}</td>
                    <td>{{sp.angkatan}}</td>
                    <td>{{sp.tahun}}</td>
                    <td>{{sp.nominal}}</td>
                    <td>
                        <router-link class="btn btn-success" :to="{path:'/spp/editspp/'+sp.id_spp}"><i class='bx bxs-edit' ></i></router-link>
                        &nbsp;
                        <a class="btn btn-danger" v-on:click="deletespp(sp.id_spp)"><i class='bx bx-trash' ></i></a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "Spp",
    data(){
        return{
            spp:[],
            message:'',
            style_msg:'',
            error:false,
        }
    },
    methods:{
        tm_spp:function(){
            var option={
                headers:{
                    'Authorization':'bearer '+localStorage.getItem("token")
                    }
            }
            this.axios.get("http://localhost/latihan_migrasi/public/api/spp", option).then((result)=>{
                console.log(result),
                this.spp=result.data
            })
        },
        deletespp:function(id_spp){
            var option={
                headers:{
                    'Authorization':'bearer '+localStorage.getItem("token")
                    }
            }
            if(confirm('yakin?')) {
                this.axios.delete("http://localhost/latihan_migrasi/public/api/delete_spp/"+id_spp, option).then((result)=>{
                console.log(result)
                this.tm_spp()
                })
            }
        }
    },
    mounted(){
        this.tm_spp()
    }
}
</script>