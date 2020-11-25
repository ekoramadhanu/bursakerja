<template>
  <div class="mt-12 pt-1">
    <div class="d-flex justify-center mb-2">
      <div class="max-width px-4">
        <v-img
          :src="image"
          aspect-ratio="1.7"
          width="100vw"
          max-width="230"
          height="100vh"
          max-height="200"
          class="mx-auto"
          v-if="!skeleton"
          contain
        ></v-img>
        <v-skeleton-loader
          ref="skeleton"
          type="image"
          v-if="skeleton"
          class="mx-auto"
        ></v-skeleton-loader>
        <p
          class="mb-0 mt-6 text-h5 font-weight-bold"
          v-if="!skeleton"
        >
          <span class="font-family">
            {{ nameSchool }}
          </span>
        </p>
        <v-skeleton-loader
          ref="skeleton"
          type="sentences"
          v-if="skeleton"
          class="mx-auto"
        ></v-skeleton-loader>
        <p
          class="mt-4 text-subtitle-1"
          v-if="!skeleton"
        >
          <v-icon size="15" class="mr-1">$location</v-icon>
          <span class="font-family">
            {{ locationSchool }}
          </span>
        </p>
        <v-skeleton-loader
          ref="skeleton"
          type="sentences"
          v-if="skeleton"
          class="mx-auto"
        ></v-skeleton-loader>
        <div
          class="text-justify mt-6  font-family"
          v-html="content"
          v-if="!skeleton"
        ></div>
        <v-skeleton-loader
          ref="skeleton"
          type="paragraph"
          v-if="skeleton"
          class="mx-auto"
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
    nameSchool: '',
    locationSchool: '',
    skeleton: true,
  }),
  components: {
    'footer-home': footer,
  },
  beforeCreate() {
    axios({
      baseURL: `${this.$store.state.domain}school/${this.$route.params.id}`,
      method: 'get',
      headers: {
        'x-api-key': this.$store.state.apiKey,
      },
    })
      .then((response) => {
        if (response.data.data.school.length > 0) {
          this.image = response.data.data.school[0].image;
          this.nameSchool = response.data.data.school[0].name;
          this.locationSchool = response.data.data.school[0].location;
          this.content = response.data.data.school[0].description;
        }
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
    this.nameSchool = null;
    this.locationSchool = null;
    this.skeleton = null;

    delete this.content;
    delete this.image;
    delete this.nameSchool;
    delete this.locationSchool;
    delete this.skeleton;
  },
};
</script>

<style scoped>
.max-width {
  max-width: 1044px;
}
div >>> ul > li {
  line-height: 25px !important;
}
div >>> ol > li {
  line-height: 25px !important;
}
div >>> li > p {
  margin-bottom: 5px !important;
}
div >>> li {
  margin-bottom: 10px;
}
div >>> li > ol {
  margin: 0px;
}
div >>> li > ul {
  margin: 0px;
}
</style>
