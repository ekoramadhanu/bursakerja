<template>
  <div class="fullscreen d-flex justify-center align-center">
    <div class="pa-2 card-login">
      <typical
        class="text-h6 text-center text-capitalize"
        :steps="['mohon maaf halaman ini tidak tersedia', 6000]"
        :wrapper="'p'"
      />
      <typical
        v-if="desc"
        class="text-center text-capitalize"
        :steps="[
          `alamat link yang anda gunakan mungkin salah, atau sudah kami ganti.
          silahkan cek kembali alamat link anda`,
          6000,
        ]"
        :wrapper="'p'"
      />
    </div>
  </div>
</template>

<script>
import typical from 'vue-typical';

export default {
  data: () => ({
    desc: false,
  }),
  components: {
    typical,
  },
  created() {
    setTimeout(() => {
      this.desc = true;
    }, 2500);
  },
};
</script>

<style scoped>
.fullscreen {
  width: 100vw;
  height: 100vh;
}
.card-login {
  max-width: 450px;
  width: 450px;
}
.backgorund-repeat {
  background-position: initial;
  background-repeat: space;
  background-size: 90px 90px;
}
</style>
