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
  </div>
</template>

<script>
import axios from 'axios';
import goTo from 'vuetify/es5/services/goto';

export default {
  data: () => ({
    content: '',
    image: '',
    skeleton: true,
  }),
  components: {},
  beforeCreate() {
    axios({
      baseURL: `${this.$store.state.domain}about-us`,
      method: 'GET',
      headers: {
        'x-api-key': this.$store.state.apiKey,
      },
    })
      .then((response) => {
        this.image = response.data.data.aboutUs[0].image;
        this.content = response.data.data.aboutUs[0].description;
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      })
      .finally(() => {
        this.skeleton = false;
      });
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
div >>> ul {
  line-height: 18px !important;
}

div >>> ol {
  line-height: 18px !important;
}
div >>> li > p {
  margin: 3px;
}
.max-width {
  max-width: 1044px;
}
</style>
