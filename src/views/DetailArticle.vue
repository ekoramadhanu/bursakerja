<template>
  <div class="mt-12">
    <v-container class="max-width mx-auto">
      <v-skeleton-loader
        ref="skeleton"
        type="image"
        v-if="skeleton"
        max-height="1044"
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
          contain
          aspect-ratio="1.7778"
        />
      </div>
      <div v-if="!skeleton">
        <div class="py-3 mt-3">
          <v-btn
            text
            x-small
            color="dark grey"
            class="pa-0 mb-6"
            @click="$router.go(-1)"
          >
            <span class="font-family"> kembali ke daftar artikel </span>
          </v-btn>
        </div>
        <h3 class="text-h3 font-weight-bold">
          <span class="font-family">
            {{ title }}
          </span>
        </h3>
        <div class="mt-2 pa-0 mb-4 d-flex">
          <p
            class="text-capitalize text-subtitle-2 font-weight-regular mb-0 mr-4"
          >
            <v-icon size="13" class="mr-1">$jobSeeker</v-icon>
            <span class="font-family"> admin </span>
          </p>
          <p class="text-capitalize text-subtitle-2 font-weight-regular ma-0">
            <v-icon size="13" class="mr-1">$calendar</v-icon>
            <span class="font-family">
              {{ formatDate(date) }}
            </span>
          </p>
        </div>
        <div
          class="text-justify mt-3 font-family"
          v-html="content"
          v-if="!skeleton"
        ></div>
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
import goTo from 'vuetify/es5/services/goto';
import moment from 'moment';

export default {
  data: () => ({
    content: '',
    image: '',
    title: '',
    date: '',
    skeleton: true,
  }),
  components: {},
  async beforeCreate() {
    try {
      const response = await axios({
        baseURL: `${this.$store.state.domain}article/${this.$route.params.id}`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
        },
      });
      if (response.data.data.attributes.length > 0) {
        this.image = response.data.data.attributes[0].image;
        this.title = response.data.data.attributes[0].title;
        this.date = response.data.data.attributes[0].createAt;
        this.content = response.data.data.attributes[0].description;
      }
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
    this.nameSchool = null;
    this.locationSchool = null;
    this.skeleton = null;

    delete this.content;
    delete this.image;
    delete this.nameSchool;
    delete this.locationSchool;
    delete this.skeleton;
  },
  methods: {
    formatDate(value) {
      return moment(value, 'DD-MM-YYYY').locale('id').format('dddd, LL');
    },
  },
};
</script>

<style scoped>
.max-width {
  max-width: 1044px;
}
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
.image-cover {
  object-fit: cover;
}
</style>
