<template>
  <div class="mt-12 pt-1">
    <div class="d-flex justify-center mb-2">
      <div class="max-width">
        <h3 class="text-center my-2 text-capitalize primary--text">
          daftar profesional
          <hr class="line mx-auto" />
        </h3>
        <v-card elevation="1" class="mx-9 px-3">
          <v-form>
            <v-text-field
              v-model="search"
              label="Pencarian Jabatan"
              append-icon="$search"
              @click:append="serachJobSeeker()"
            />
          </v-form>
        </v-card>
        <div v-if="!skeleton">
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
              <v-card class="pa-3" elevation="3" :to="`/job-seeker-detail/${j.id}`">
                <v-img
                  class="mx-auto"
                  width="150"
                  max-width="150"
                  height="120"
                  max-height="120"
                  :src="j.photo"
                  contain
                ></v-img>
                <v-card-title
                  class="text-capitalize d-flex justify-center pa-2"
                >
                  {{ j.fullname }}
                </v-card-title>
                <v-card-text class="text-capitalize d-flex justify-center pa-2">
                  {{j.desiredPosition}}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
        <div class="text-canter">
          <v-pagination
            v-model="page"
            total-visible="10"
            :length="pageCount"
            @input="pagination()"
          ></v-pagination>
        </div>
        <v-row v-if="skeleton">
          <v-col cols="12" xl="3" lg="3" md="3" sm="6" xs="12">
            <v-skeleton-loader ref="skeleton" type="card"></v-skeleton-loader>
          </v-col>
          <v-col cols="12" xl="3" lg="3" md="3" sm="6" xs="12">
            <v-skeleton-loader ref="skeleton" type="card"></v-skeleton-loader>
          </v-col>
          <v-col cols="12" xl="3" lg="3" md="3" sm="6" xs="12">
            <v-skeleton-loader ref="skeleton" type="card"></v-skeleton-loader>
          </v-col>
          <v-col cols="12" xl="3" lg="3" md="3" sm="6" xs="12">
            <v-skeleton-loader ref="skeleton" type="card"></v-skeleton-loader>
          </v-col>
        </v-row>
      </div>
    </div>
    <footer-home />
  </div>
</template>

<script>
import footer from '@/components/Footer.vue';
import axios from 'axios';

export default {
  data: () => ({
    search: '',
    page: 1,
    jobSeeker: [],
    pageCount: 0,
    skeleton: true,
  }),
  components: {
    'footer-home': footer,
  },
  methods: {
    returnModuleByFour() {
      const payload = this.jobSeeker.length;
      if (payload % 4 === 0) {
        return payload / 4;
      }
      return Math.floor(payload / 4) + 1;
    },
    returnlist(payload) {
      const counterStart = (payload - 1) * 4;
      const counterEnd = payload * 4;
      return this.jobSeeker.slice(counterStart, counterEnd);
    },
    serachJobSeeker() {
      this.skeleton = true;
      this.page = 1;
      this.jobSeeker.splice(0, this.jobSeeker.length);
      this.methodGetJobSeeker(this.page);
    },
    pagination() {
      this.skeleton = true;
      this.jobSeeker.splice(0, this.jobSeeker.length);
      this.methodGetJobSeeker(this.page);
    },
    // method universal
    methodGetJobSeeker(page) {
      if (this.search === '') {
        axios({
          baseURL: `${this.$store.state.domain}job-seeker/show-role/${page}`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            role: this.$route.params.role,
          },
        })
          .then((response) => {
            // eslint-disable-next-line no-console
            console.log(response.data);
            if (response.data.data.jobSeeker.length > 0) {
              const modulo = response.data.data.total % 12;
              if (modulo === 0) {
                this.pageCount = response.data.data.total / 12;
              } else {
                this.pageCount = (response.data.data.total - modulo) / 12 + 1;
              }
              let counter = (page - 1) * 12;
              response.data.data.jobSeeker.forEach((i) => {
                counter += 1;
                this.jobSeeker.push({
                  id: i.id,
                  number: counter,
                  fullname: i.fullname,
                  photo: i.photo,
                  desiredPosition: i.desiredPosition,
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
      } else {
        axios({
          baseURL: `${this.$store.state.domain}job-seeker/search-role/${this.search}/${page}`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            role: this.$route.params.role,
          },
        })
          .then((response) => {
            // eslint-disable-next-line no-console
            console.log(response.data);
            if (response.data.data.jobSeeker.length > 0) {
              const modulo = response.data.data.total % 12;
              if (modulo === 0) {
                this.pageCount = response.data.data.total / 12;
              } else {
                this.pageCount = (response.data.data.total - modulo) / 12 + 1;
              }
              let counter = (page - 1) * 12;
              response.data.data.jobSeeker.forEach((i) => {
                counter += 1;
                this.jobSeeker.push({
                  id: i.id,
                  number: counter,
                  fullname: i.fullname,
                  photo: i.photo,
                  desiredPosition: i.desiredPosition,
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
      }
    },
  },
  beforeCreate() {
    axios({
      baseURL: `${this.$store.state.domain}job-seeker/show-role/1`,
      method: 'get',
      headers: {
        'x-api-key': this.$store.state.apiKey,
        role: this.$route.params.role,
      },
    })
      .then((response) => {
        if (response.data.data.jobSeeker.length > 0) {
          const modulo = response.data.data.total % 12;
          if (modulo === 0) {
            this.pageCount = response.data.data.total / 12;
          } else {
            this.pageCount = (response.data.data.total - modulo) / 12 + 1;
          }
          let counter = 0;
          response.data.data.jobSeeker.forEach((i) => {
            counter += 1;
            this.jobSeeker.push({
              id: i.id,
              number: counter,
              fullname: i.fullname,
              photo: i.photo,
              desiredPosition: i.desiredPosition,
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
        // eslint-disable-next-line no-console
        console.log(this.jobSeeker);
        this.skeleton = false;
      });
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
