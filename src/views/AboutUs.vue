<template>
  <div class="mt-12 pt-1">
    <div class="d-flex justify-center mb-2">
      <div class="max-width px-4">
        <v-img
          :src="image"
          aspect-ratio="1.7"
          width="100vw"
          max-width="970"
          max-height="220"
          class="mb-6 mt-3"
          contain
          v-if="!skeleton"
        ></v-img>
        <v-skeleton-loader
          ref="skeleton"
          type="image"
          class="mb-6 mt-3"
          v-if="skeleton"
        ></v-skeleton-loader>
        <div
          class="max-width-about-us mx-auto text-justify"
          v-html="content"
          v-if="!skeleton"
        ></div>
        <v-skeleton-loader
          ref="skeleton"
          type="paragraph"
          v-if="skeleton"
        ></v-skeleton-loader>
      </div>
    </div>
    <footer-home />
  </div>
</template>

<script>
import footer from '@/components/Footer.vue';
import axios from 'axios';
import goTo from 'vuetify/es5/services/goto';

export default {
  data: () => ({
    content: '',
    image: '',
    skeleton: true,
  }),
  components: {
    'footer-home': footer,
  },
  beforeCreate() {
    axios({
      baseURL: `${this.$store.state.domain}about-us`,
      method: 'get',
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
.line {
  width: 50px;
  border: 1px solid #205faf;
}
.max-width {
  width: 90vw;
}
@media screen and (min-width: 1366px) {
  .max-width {
    max-width: 1100px;
    width: 100vw;
  }
}
.max-width-about-us {
  max-width: 650px;
}
</style>
