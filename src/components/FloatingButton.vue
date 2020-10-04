<template>
  <div>
    <v-fab-transition>
      <v-btn
        fixed
        fab
        bottom
        right
        color="white"
        elevation="3"
        v-show="scrollY > 0"
        @click="scrollToTop"
      >
        <v-icon class="primary--text">$arrowUp</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import goTo from 'vuetify/es5/services/goto';

export default {
  data: () => ({
    scrollY: 0,
  }),
  methods: {
    scrollToTop() {
      goTo(0);
    },
    handleScroll() {
      this.scrollY = window.scrollY;
    },
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    this.scrollY = null;

    delete this.scrollY;
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped>
</style>
