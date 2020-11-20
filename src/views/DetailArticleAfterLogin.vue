<template>
  <div>
    <v-main>
      <v-container class="d-flex flex-column justify-center size-max">

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
          class="text-uppercase mb-0 mt-3 text-center text-h5"
          v-if="!skeleton"
        >
          {{ title }}
        </p>
        <v-skeleton-loader
          ref="skeleton"
          type="sentences"
          v-if="skeleton"
          class="mx-auto"
        ></v-skeleton-loader>
        <p class="text-capitalize mb-0 mt-3" v-if="!skeleton">
          dibuat : {{ date }}
        </p>
        <v-skeleton-loader
          ref="skeleton"
          type="sentences"
          v-if="skeleton"
          class="mx-auto"
        ></v-skeleton-loader>
        <div class="text-justify mt-3" v-html="content" v-if="!skeleton"></div>
        <v-skeleton-loader
          ref="skeleton"
          type="paragraph"
          v-if="skeleton"
          class="mx-auto"
        ></v-skeleton-loader>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import axios from 'axios';
import goTo from 'vuetify/es5/services/goto';

export default {
  data: () => ({
    items: [
      {
        text: 'artikel',
        disabled: false,
        to: '/article-user',
      },
      {
        text: 'artikel',
        disabled: true,
      },
    ],
    content: '',
    image: '',
    title: '',
    date: '',
    skeleton: true,
  }),
  beforeCreate() {
    axios({
      baseURL: `${this.$store.state.domain}article/${this.$route.params.id}`,
      method: 'get',
      headers: {
        'x-api-key': this.$store.state.apiKey,
      },
    })
      .then((response) => {
        if (response.data.data.article.length > 0) {
          this.image = response.data.data.article[0].image;
          this.title = response.data.data.article[0].title;
          this.date = response.data.data.article[0].createAt;
          this.content = response.data.data.article[0].description;
          this.items.splice(1, 1, {
            text: response.data.data.article[0].title,
            disabled: true,
          });
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
.size-max{
    max-width: 1100px;
}
</style>
