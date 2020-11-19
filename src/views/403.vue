<template>
  <div class="fullscreen d-flex justify-center align-center">
    <div class="pa-2 card-login">
      <p class="text-h3 text-center">403</p>
      <typical
        class="text-h6 text-center text-capitalize"
        :steps="['akses di blok oleh sistem', 6000]"
        :wrapper="'p'"
      />
      <typical
        v-if="desc"
        class="text-center text-capitalize"
        :steps="['silahkan hubungi pihak bursa kerja untuk menyelesaikan masalah ini', 6000]"
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
    }, 2000);
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
