<template>
  <div>
    <div class="justify-center">
      <v-container>
        <v-skeleton-loader
          ref="skeleton"
          type="image"
          v-if="skeleton"
          max-height="400"
        ></v-skeleton-loader>
        <v-skeleton-loader
          ref="skeleton"
          type="article"
          v-if="skeleton"
        ></v-skeleton-loader>
      </v-container>
    </div>
    <v-row v-if="!skeleton">
      <v-img :src="image" height="400"></v-img>
    </v-row>
    <v-col cols="8" offset="2" v-if="!skeleton">
      <v-row>
        <v-container>
          <v-btn
            text
            x-small
            color="dark grey"
            class="pa-0"
            to="/"
            >kembali ke beranda</v-btn
          >
        </v-container>
      </v-row>
      <v-row>
        <v-container v-if="!skeleton">
            <h1 class="display-2 mb-2">Tentang Kami</h1>
          <div
            class="text-justify mt-3"
            v-html="content"
            v-if="!skeleton"
          ></div>
        </v-container>
      </v-row>
    </v-col>
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
