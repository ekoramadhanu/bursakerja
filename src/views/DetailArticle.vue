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
    <v-row v-if="!skeleton">
      <v-col cols="8" offset="2">
        <v-row>
          <v-container>
            <v-btn
              text
              x-small
              color="dark grey"
              class="pa-0"
              @click="$router.go(-1)"
              >kembali ke daftar artikel</v-btn
            >
          </v-container>
        </v-row>
        <v-row class="mt-4">
          <v-container>
            <h1 class="display-2 mb-2">{{ title }}</h1>
            <h2 class="subtitle-1">
              {{ formatDate(date) }}
            </h2>
          </v-container>
        </v-row>
        <v-row>
          <v-container>
            <div
              class="text-justify mt-3"
              v-html="content"
              v-if="!skeleton"
            ></div>
          </v-container>
        </v-row>
      </v-col>
    </v-row>
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
  methods: {
    formatDate(value) {
      return moment(value, 'DD-MM-YYYY').locale('id').format('dddd, LL');
    },
  },
};
</script>

<style scoped>
.line {
  width: 50px;
  border: 1px solid #205faf;
}
.max-width {
  max-width: 100vw;
  width: 100vw;
}
@media screen and (min-width: 600px) {
  .max-width {
    max-width: 600px;
    width: 100vw;
  }
}
.max-width-about-us {
  max-width: 600px;
}
div >>> ul {
  line-height: 18px !important;
}
div >>> ol {
  line-height: 18px !important;
}
div >>> li > p {
  margin: 3px !important;
}
</style>
