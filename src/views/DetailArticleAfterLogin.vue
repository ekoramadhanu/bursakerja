<template>
  <div>
    <v-main>
      <v-container class="size-max">
        <div v-if="skeleton">
          <v-skeleton-loader
            ref="skeleton"
            type="image"
            max-height="400"
          ></v-skeleton-loader>
          <v-skeleton-loader ref="skeleton" type="article"></v-skeleton-loader>
        </div>
        <v-row v-if="!skeleton">
          <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12" class="pa-0">
            <v-img :src="image" height="400" contain></v-img>
            <v-row>
              <v-container>
                <v-btn
                  text
                  small
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
      </v-container>
    </v-main>
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
  methods: {
    formatDate(value) {
      return moment(value, 'DD-MM-YYYY').locale('id').format('dddd, LL');
    },
  },
};
</script>

<style scoped>
.size-max {
  max-width: 1044px;
}
div >>> ul > li,
div >>> ol > li {
  line-height: 25px !important;
}
div >>> li > p {
  margin-bottom: 5px !important;
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
  margin-bottom: 10px !important;
}
</style>
