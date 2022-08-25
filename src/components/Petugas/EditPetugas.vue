<template>
  <div class="container">
    <input type="hidden" name="id" v-model="id" class="form-control" />
    <input
      type="hidden"
      name="id_petugas"
      v-model="id_petugas"
      class="form-control"
    />
    Nama
    <input
      type="text"
      name="nama_petugas"
      class="form-control"
      v-model="nama_petugas"
      placeholder="Masukkan nama"
      autocomplete="off"
    />
    <br />
    E-mail
    <input
      type="email"
      name="email"
      class="form-control"
      v-model="email"
      placeholder="Masukkan email"
      autocomplete="off"
    />
    <br />
    Password
    <input
      type="password"
      name="password"
      class="form-control"
      v-model="password"
      placeholder="Masukkan password"
      autocomplete="off"
    />
    <br />
    Password Confirmation
    <input
      type="password"
      name="password_confirmation"
      class="form-control"
      v-model="password_confirmation"
      placeholder="Ulangi password"
      autocomplete="off"
    />
    <br />
    Level
    <select name="level" class="form-control" v-model="level">
      <option value="" selected hidden disabled>Pilih level</option>
      <option value="admin">Admin</option>
      <option value="petugas">Petugas</option>
    </select>
    <br />
    <router-link class="btn btn-secondary" to="/petugas">
      <i class="bx bxs-chevron-left button-icon"></i>
      <span class="button-text">Back</span>
    </router-link>
    <button class="btn btn-primary" style="float: right" @click="editpetugas()">
      EDIT PETUGAS
    </button>
    <br />
    <div v-bind:class="style_msg">
      <div v-if="error == true">
        <div v-for="msg in message" :key="msg.id">
          <p v-for="m in msg" :key="m.id">{{ m }}</p>
        </div>
      </div>
      <p v-else>{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditPetugas",
  data() {
    return {
      id: "",
      nama_petugas: "",
      email: "",
      password: "",
      password_confirmation: "",
      level: "",
      id_petugas: "",
      style_msg: "",
      message: "",
      error: false,
    };
  },
  methods: {
    getdetailuser(id_petugas) {
      var option = {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      };
      this.axios
        .get(
          "http://localhost/latihan_migrasi/public/api/getdetailpetugas/" +
            id_petugas,
          option
        )
        .then((result) => {
          (this.id = result.data.id),
            (this.nama_petugas = result.data.name),
            (this.password = result.data.password),
            (this.email = result.data.email),
            (this.level = result.data.level),
            (this.id_petugas = result.data.id_petugas);
        });
    },
    editpetugas: function () {
      var datapetugas = {
        nama_petugas: this.nama_petugas,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
        level: this.level,
        id_petugas: this.id_petugas,
      };
      var option = {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      };
      this.axios
        .put(
          "http://localhost/latihan_migrasi/public/api/update_petugas/" + this.id_petugas,
          datapetugas,
          option
        )
        .then((result) => {
          console.log(result);
          if (result.request.status == 200) {
            if (result.data.status == true) {
              this.error = false;
              this.message = result.data.message;
              this.style_msg = "alert alert-success";
            } else {
              this.error = true;
              this.message = result.data.message;
              this.style_msg = "alert alert-danger";
            }

            setTimeout(() => {
              this.$router.push("/petugas");
            }, 2000);
          } else {
            this.error = true;
            this.style_msg = "alert alert-danger";
            this.message = result.data.status;
          }
        });
        // .catch(error => {
        //     console.error(error.response.data);
        // });
    },
  },
  mounted() {
    this.getdetailuser(this.$route.params.id);
  },
};
</script>