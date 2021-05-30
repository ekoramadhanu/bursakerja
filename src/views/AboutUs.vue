/*
  Nama        : Eko Ramadhanu Aryputra
  Log Date    : 30 Januri 2020 -> check data  after change image base 64 to link
                               -> add request every get per item
  Log Note    :-
*/
<template>
  <div class="mt-12">
    <v-container class="max-width">
      <v-skeleton-loader
        class="mx-auto"
        ref="skeleton"
        type="image"
        v-if="skeleton"
        max-height="400"
        max-width="1044"
      ></v-skeleton-loader>
      <v-skeleton-loader
        ref="skeleton"
        type="article"
        v-if="skeleton"
      ></v-skeleton-loader>
      <div v-if="!skeleton" class="d-flex justify-center">
        <v-img
          :src="image"
          height="400"
          max-width="1044"
          aspect-ratio="1.7778"
          contain
        />
      </div>
      <div v-if="!skeleton">
        <div class="py-3 mt-3">
          <v-btn text x-small color="dark grey" class="pa-0 font-family" to="/">
            kembali ke beranda
          </v-btn>
        </div>
        <h1 class="text-h3 mb-4 font-weight-bold">
          <span class="font-family">
            Tentang Kami
          </span>
        </h1>
        <div class="text-justify font-family" v-html="content" v-if="!skeleton"></div>
      </div>
    </v-container>
    <footer-home />
  </div>
</template>

<script>
import axios from 'axios';
import goTo from 'vuetify/es5/services/goto';
import footer from '@/components/Footer.vue';

export default {
  data: () => ({
    content: '',
    image: '',
    skeleton: true,
  }),
  components: {
    'footer-home': footer,
  },
  async beforeCreate() {
    try {
      const response = await axios({
        baseURL: `${this.$store.state.domain}about-us`,
        method: 'GET',
        headers: {
          'x-api-key': this.$store.state.apiKey,
        },
      });
      this.image = response.data.data.attributes[0].image;
      this.content = response.data.data.attributes[0].description.replace('/', '');
      this.skeleton = false;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  },
  created() {
    goTo(0);
  },
  updated() {
    goTo(0);
  },
  beforeDestroy() {
    this.content = null;
    this.image = null;
    this.skeleton = null;

    delete this.content;
    delete this.image;
    delete this.skeleton;
  },
};
</script>

<style scoped>
div >>> ul > li,
div >>> ol > li {
  line-height: 25px !important;
}
div >>> li > p {
  margin-bottom: 0px !important;
  margin-top: 0px !important;
}
div >>> li {
  margin-bottom: 0px;
}
div >>> li > ol,
div >>> li > ul {
  margin: 0px;
}
div >>> p, div >>> h1, div >>> h2, div >>> h3 {
  margin-top: 0px !important;
  margin-bottom: 3px !important;
}
.max-width {
  max-width: 1044px;
}
</style>
