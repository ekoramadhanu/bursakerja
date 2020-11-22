<template>
  <div class="d-flex justify-center mb-2 mt-4">
    <div class="max-width">
      <v-row>
        <v-col xl="9" lg="9" md="12" sm="12" xs="12">
          <div v-if="!skeleton">
            <div v-for="item in article" :key="item.id">
              <transition name="fade" appear>
                <v-card elevation="3" class="mt-4 pa-2">
                  <v-card-title
                    ><router-link
                      :to="`/article-detail/${item.id}`"
                      class="text-decoration-none"
                      >{{ item.title }}
                    </router-link></v-card-title
                  >
                  <v-card-subtitle
                    ><span
                      class="text-capitalize text-subtitle-2 font-weight-regular mb-0 mr-2"
                    >
                      <v-icon size="13" class="mr-1">$jobSeeker</v-icon>
                      admin
                    </span>
                    <span
                      class="text-capitalize text-subtitle-2 font-weight-regular ma-0"
                    >
                      <v-icon size="13" class="mr-1">$calendar</v-icon>
                      {{ item.date }}
                    </span></v-card-subtitle
                  >
                  <v-card-text>
                    {{ item.description }}
                  </v-card-text>
                  <v-card-action class="d-flex">
                    <v-btn :to="`/article-detail/${item.id}`" text color="primary">
                      Baca Selengkapnya
                    </v-btn>
                  </v-card-action>
                </v-card>
              </transition>
            </div>
          </div>
          <div class="text-canter mt-2">
            <v-pagination
              v-model="page"
              total-visible="10"
              :length="pageCount"
              @input="pagination()"
              v-if="!skeleton"
            ></v-pagination>
          </div>
        </v-col>
      </v-row>
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
    pagination() {
      this.skeleton = true;
      this.article.splice(0, this.article.length);
      this.methodGetArticle(this.page);
    },
    // method universal
    methodGetArticle(page) {
      axios({
        baseURL: `${this.$store.state.domain}article/general/${page}`,
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
              const date = i.date.split('-');
              let shortDesc = i.description.replace(/<\/?[^>]+>/gi, ' ');
              if (shortDesc.length > 100) {
                shortDesc = `${shortDesc.substr(0, 250)}.....`;
              }
              counter += 1;
              this.article.push({
                id: i.id,
                number: counter,
                title: i.title,
                image: i.image,
                description: shortDesc,
                date: `${date[0]} ${
                  this.$store.state.month[parseInt(date[1], 10) - 1]
                } ${date[2]}`,
              });
            });
          } else {
            this.pageCount = 0;
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
  },
  beforeCreate() {
    axios({
      baseURL: `${this.$store.state.domain}article/general/1`,
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
            const date = i.date.split('-');
            let shortDesc = i.description.replace(/<\/?[^>]+>/gi, ' ');
            if (shortDesc.length > 100) {
              shortDesc = `${shortDesc.substr(0, 250)}.....`;
            }
            counter += 1;
            this.article.push({
              id: i.id,
              number: counter,
              title: i.title,
              image: i.image,
              description: shortDesc,
              date: `${date[0]} ${
                this.$store.state.month[parseInt(date[1], 10) - 1]
              } ${date[2]}`,
            });
          });
        } else {
          this.pageCount = 0;
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
  width: 90vw;
}
@media screen and (min-width: 1366px) {
  .max-width {
    max-width: 1100px;
    width: 100vw;
  }
}
</style>
