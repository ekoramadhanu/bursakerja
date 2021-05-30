<template>
  <div class="fullscreen d-flex justify-center align-center">
    <div class="pa-2">
      <img src="@/assets/404-rafiki.svg" alt="Halaman Tidak Ditemukan" />
      <h1 class="text-center">Halaman Tidak Ditemukan</h1>
      <p class="text-center">
        Alamat yang Anda masukkan mungkin salah atau tidak ada
      </p>
      <div class="container d-flex justify-center">
        <v-btn color="primary" href="/" elevation="0">KEMBALI KE BERANDA</v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fullscreen {
  width: 100vw;
  height: 100vh;
}
</style>
