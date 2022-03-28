<template>
    <div class="container text">
        <br>
        <h1>Selamat Datang di Website Kami</h1>
        <a>Hai, {{this.$store.state.user.level}} {{this.$store.state.user.nama}} </a>
    </div>
</template>

<script>
export default {
    name: "Home"
}
</script>
