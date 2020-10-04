<template>
  <div class="d-flex justify-center mb-2">
    <div class="max-width">
      <h3 class="text-center my-2 text-capitalize primary--text">
        daftar sekolah
        <hr class="line mx-auto" />
      </h3>
      <v-form class="px-9">
        <v-text-field
          v-model="search"
          label="Pencarian Berdasarkan Nama"
          append-icon="$search"
          @click:append="searchSchool()"
        />
      </v-form>
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
            <v-card class="pa-3" elevation="3" :to="`/school-detail/${j.id}`">
              <v-img
                class="mx-auto"
                width="150"
                max-width="150"
                height="120"
                max-height="120"
                :src="j.image"
                contain
              ></v-img>
              <v-card-title class="text-capitalize d-flex justify-center pa-2">{{
                j.name
              }}</v-card-title>
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
          <v-skeleton-loader
            ref="skeleton"
            type="card"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="12" xl="3" lg="3" md="3" sm="6" xs="12">
          <v-skeleton-loader
            ref="skeleton"
            type="card"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="12" xl="3" lg="3" md="3" sm="6" xs="12">
          <v-skeleton-loader
            ref="skeleton"
            type="card"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="12" xl="3" lg="3" md="3" sm="6" xs="12">
          <v-skeleton-loader
            ref="skeleton"
            type="card"
          ></v-skeleton-loader>
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
    school: [],
    pageCount: 0,
    skeleton: true,
  }),
  methods: {
    returnModuleByFour() {
      const payload = this.school.length;
      if (payload % 4 === 0) {
        return payload / 4;
      }
      return Math.floor(payload / 4) + 1;
    },
    returnlist(payload) {
      const counterStart = (payload - 1) * 4;
      const counterEnd = payload * 4;
      return this.school.slice(counterStart, counterEnd);
    },
    searchSchool() {
      this.skeleton = true;
      this.page = 1;
      this.school.splice(0, this.school.length);
      this.methodGetSchool(this.page);
    },
    pagination() {
      this.skeleton = true;
      this.school.splice(0, this.school.length);
      this.methodGetSchool(this.page);
    },
    // method universal
    methodGetSchool(page) {
      if (this.search === '') {
        axios({
          baseURL: `${this.$store.state.domain}school/show-all/${page}`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
          },
        })
          .then((response) => {
            if (response.data.data.school.length > 0) {
              const modulo = response.data.data.total % 12;
              if (modulo === 0) {
                this.pageCount = response.data.data.total / 12;
              } else {
                this.pageCount = (response.data.data.total - modulo) / 12 + 1;
              }
              let counter = (page - 1) * 12;
              let nameStatus = '';
              response.data.data.school.forEach((i) => {
                counter += 1;
                if (i.status === '0') {
                  nameStatus = 'Tidak Ditampilkan';
                } else {
                  nameStatus = 'Ditampilkan';
                }
                this.school.push({
                  id: i.id,
                  number: counter,
                  name: i.name,
                  image: i.image,
                  status: nameStatus,
                  location: i.location,
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
          })
          .finally(() => {
            this.skeleton = false;
          });
      } else {
        axios({
          baseURL: `${this.$store.state.domain}school/search-show-all/${this.search}/${page}`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
          },
        })
          .then((response) => {
            if (response.data.data.school.length > 0) {
              const modulo = response.data.data.total % 12;
              if (modulo === 0) {
                this.pageCount = response.data.data.total / 12;
              } else {
                this.pageCount = (response.data.data.total - modulo) / 12 + 1;
              }
              let counter = (page - 1) * 12;
              let nameStatus = '';
              response.data.data.school.forEach((i) => {
                counter += 1;
                if (i.status === '0') {
                  nameStatus = 'Tidak Ditampilkan';
                } else {
                  nameStatus = 'Ditampilkan';
                }
                this.school.push({
                  id: i.id,
                  number: counter,
                  name: i.name,
                  image: i.image,
                  status: nameStatus,
                  location: i.location,
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
          })
          .finally(() => {
            this.skeleton = false;
          });
      }
    },
  },
  beforeCreate() {
    axios({
      baseURL: `${this.$store.state.domain}school/show-all/1`,
      method: 'get',
      headers: {
        'x-api-key': this.$store.state.apiKey,
      },
    })
      .then((response) => {
        if (response.data.data.school.length > 0) {
          const modulo = response.data.data.total % 12;
          if (modulo === 0) {
            this.pageCount = response.data.data.total / 12;
          } else {
            this.pageCount = (response.data.data.total - modulo) / 12 + 1;
          }
          let counter = 0;
          let nameStatus = '';
          response.data.data.school.forEach((i) => {
            counter += 1;
            if (i.status === '0') {
              nameStatus = 'Tidak Ditampilkan';
            } else {
              nameStatus = 'Ditampilkan';
            }
            this.school.push({
              id: i.id,
              number: counter,
              name: i.name,
              image: i.image,
              status: nameStatus,
              location: i.location,
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
      })
      .finally(() => {
        this.skeleton = false;
      });
  },
  beforeDestroy() {
    this.search = null;
    this.page = null;
    this.school = null;
    this.pageCount = null;
    this.skeleton = null;

    delete this.search;
    delete this.page;
    delete this.school;
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
