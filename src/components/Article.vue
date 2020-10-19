<template>
  <div class="d-flex justify-center mb-2">
    <div class="max-width">
      <h3 class="text-center my-2 text-capitalize primary--text">
        artikel
        <hr class="line mx-auto" />
      </h3>
      <!-- <v-form class="px-9">
        <v-text-field v-model="search" label="Pencarian" append-outer-icon="$search" />
      </v-form> -->
      <v-row v-for="i in returnModuleByFour()" :key="i" class="px-9">
        <v-col
          cols="12"
          xl="3"
          lg="3"
          md="3"
          sm="6"
          xs="12"
          v-for="j in returnlist(i)"
          :key="j.id"
        >
          <v-card class="pa-3" elevation="3" :to="`/article-detail/${j.id}`">
            <v-img
              class="white--text align-end"
              height="200px"
              :src="j.image"
              contain
            ></v-img>
            <v-card-title class="text-capitalize d-flex justify-center">{{j.title}}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-canter">
        <v-pagination v-model="page" total-visible="10" :length="pageCount"></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    search: '',
    page: 1,
    article: [],
    pageCount: 0,
    skeleton: true,
  }),
  methods: {
    returnModuleByFour() {
      const payload = this.article.length;
      if (payload % 4 === 0) {
        return payload / 4;
      }
      return Math.floor(payload / 4) + 1;
    },
    returnlist(payload) {
      const counterStart = (payload - 1) * 4;
      const counterEnd = payload * 4;
      return this.article.slice(counterStart, counterEnd);
    },
  },
  beforeCreate() {
    let endpoint = '';
    if (this.$store.state.role === 'UMKM') {
      endpoint = `${this.$store.state.domain}article/umkm/1`;
    } else if (this.$store.state.role === 'Informal'
      || this.$store.state.role === 'Umum'
      || this.$store.state.role === 'Profesional'
      || this.$store.state.role === 'Magang'
    ) {
      endpoint = `${this.$store.state.domain}article/job-seeker/1`;
    } else if (this.$store.state.role === 'Admin 3'
      || this.$store.state.role === 'Admin 1'
      || this.$store.state.role === 'Admin 2'
    ) {
      endpoint = `${this.$store.state.domain}article/admin/1`;
    } else {
      endpoint = `${this.$store.state.domain}article/general/1`;
    }
    axios({
      baseURL: endpoint,
      method: 'get',
      headers: {
        'x-api-key': this.$store.state.apiKey,
        authorization: `Bearer ${this.$cookies.get('token')}`,
      },
    })
      .then((response) => {
        if (response.data.data.article.length > 0) {
          const modulo = response.data.data.total % 12;
          if (modulo === 0) {
            this.pageCount = response.data.data.total / 12;
          } else {
            this.pageCount = (response.data.data.total - modulo) / 12 + 1;
          }
          let counter = 0;
          response.data.data.article.forEach((i) => {
            counter += 1;
            this.article.push({
              id: i.id,
              number: counter,
              title: i.title,
              image: i.image,
              description: i.description,
            });
          });
        } else {
          this.pageCount = 0;
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  },
  beforeDestroy() {
    this.search = null;
    this.page = null;
    this.article = null;
    this.pageCount = null;
    this.skeleton = null;

    delete this.search;
    delete this.page;
    delete this.article;
    delete this.pageCount;
    delete this.skeleton;
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
@media screen and (min-width: 1366px) {
  .max-width {
    max-width: 1366px;
    width: 100vw;
  }
}
</style>
