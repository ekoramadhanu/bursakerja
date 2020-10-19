<template>
  <div class="d-flex justify-center mb-2">
    <div class="max-width">
      <h3 class="text-center my-2 text-capitalize primary--text">
        lowongan kerja
        <hr class="line mx-auto" />
      </h3>
      <v-card elevation="1" class="mx-9 px-3">
        <v-form>
          <v-text-field
            v-model="search"
            label="Pencarian Nama Pekerjaan"
            append-icon="$search"
            @click:append="serachjobVacancy()"
          />
        </v-form>
      </v-card>
      <div v-if="pageCount === 0">
        <p class="text-capitalize text-center my-2 text-subtitle-1">
          lowongan kerja belum ada, silahkan hubungi pihak bursa kerja jika
          mengalami kendala
        </p>
      </div>
      <div v-if="!skeleton">
        <div v-for="item in jobVacancy" :key="item.id">
          <v-card elevation="3" class="my-2 mx-9 pa-2" :to="`/detail-job-vacancy/${item.id}`">
            <v-row>
              <v-col cols="12" xl="2" lg="2" md="2" sm="0" xs="0"  class="hidden-sm-and-down">
                <v-img
                  :src="item.image"
                  width="100vw"
                  max-width="130"
                  height="100vh"
                  max-height="100"
                  class="mx-auto"
                  contain
                ></v-img>
              </v-col>
              <v-col cols="12" xl="10" lg="10" md="10" sm="12" xs="12" >
                <p class="text-capitalize text-body-1 primary--text ma-0">
                  {{ item.name }}
                </p>
                <p class="text-capitalize text-body-2 mb-2">
                  {{ item.companyName }}
                </p>
                <p class="text-capitalize text-body-2 my-0 ml-3">
                  <v-icon class="mr-3" size="15">$location</v-icon>
                  {{ item.address }}
                </p>
                <p class="text-capitalize text-body-2 ml-3" v-if="isLogin">
                  <v-icon class="mr-2" size="15">$money</v-icon>
                  {{ item.salary }}
                </p>
                <p class="text-capitalize text-body-2 ml-3" v-if="!isLogin">
                  <v-icon class="mr-2" size="15">$money</v-icon>
                  <router-link
                    to="/login-job-seeker"
                  >silahkan masuk / login terlebih dahulu</router-link>
                </p>
              </v-col>
            </v-row>
            <p class="text-capitalize text-body-2">{{ item.description }}</p>
            <p class="text-capitalize text-caption ma-0">
              diposting: {{ item.date }}
            </p>
          </v-card>
        </div>
      </div>
      <div v-if="skeleton">
        <v-skeleton-loader
          ref="skeleton"
          class="mx-9 px-3"
          type="card"
        ></v-skeleton-loader>
        <v-skeleton-loader
          ref="skeleton"
          class="mx-9 px-3"
          type="card"
        ></v-skeleton-loader>
        <v-skeleton-loader ref="skeleton" type="card"></v-skeleton-loader>
      </div>
      <div class="text-canter">
        <v-pagination
          v-if="pageCount > 0"
          v-model="page"
          total-visible="10"
          :length="pageCount"
          @input="pagination()"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    search: '',
    jobVacancy: [],
    skeleton: true,
    page: 1,
    pageCount: null,
    isLogin: null,
  }),
  methods: {
    pagination() {
      this.skeleton = true;
      this.jobVacancy.splice(0, this.jobVacancy.length);
      this.methodGetJobVacancy(this.page);
    },
    serachjobVacancy() {
      this.skeleton = true;
      this.page = 1;
      this.jobVacancy.splice(0, this.jobVacancy.length);
      this.methodGetJobVacancy(this.page);
    },
    // method universal
    methodGetJobVacancy(page) {
      if (this.search === '') {
        axios({
          baseURL: `${this.$store.state.domain}job-vacancy/show-pagination/${page}`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
          },
        })
          .then((response) => {
            if (response.data.data.jobVacancy.length > 0) {
              const modulo = response.data.data.total % 12;
              if (modulo === 0) {
                this.pageCount = response.data.data.total / 12;
              } else {
                this.pageCount = (response.data.data.total - modulo) / 12 + 1;
              }
              let counter = (page - 1) * 12;
              let shortDesc = '';
              response.data.data.jobVacancy.forEach((i) => {
                shortDesc = i.description.replace(/<\/?[^>]+>/gi, ' ');
                if (shortDesc.length > 100) {
                  shortDesc = `${shortDesc.substr(0, 100)}...`;
                }
                counter += 1;
                this.jobVacancy.push({
                  id: i.id,
                  number: counter,
                  name: i.name,
                  companyName: i.company.name,
                  description: shortDesc,
                  salary: i.salary,
                  address: i.company.address,
                  date: i.date,
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
          baseURL: `${this.$store.state.domain}job-vacancy/show-search/${this.search}/${page}`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
          },
        })
          .then((response) => {
            if (response.data.data.jobVacancy.length > 0) {
              const modulo = response.data.data.total % 12;
              if (modulo === 0) {
                this.pageCount = response.data.data.total / 12;
              } else {
                this.pageCount = (response.data.data.total - modulo) / 12 + 1;
              }
              let counter = (page - 1) * 12;
              let shortDesc = '';
              response.data.data.jobVacancy.forEach((i) => {
                shortDesc = i.description.replace(/<\/?[^>]+>/gi, ' ');
                if (shortDesc.length > 100) {
                  shortDesc = `${shortDesc.substr(0, 100)}...`;
                }
                counter += 1;
                this.jobVacancy.push({
                  id: i.id,
                  number: counter,
                  name: i.name,
                  companyName: i.company.name,
                  description: shortDesc,
                  salary: i.salary,
                  address: i.company.address,
                  date: i.date,
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
      baseURL: `${this.$store.state.domain}job-vacancy/show-pagination/1`,
      method: 'get',
      headers: {
        'x-api-key': this.$store.state.apiKey,
      },
    })
      .then((response) => {
        if (response.data.data.jobVacancy.length > 0) {
          const modulo = response.data.data.total % 12;
          if (modulo === 0) {
            this.pageCount = response.data.data.total / 12;
          } else {
            this.pageCount = (response.data.data.total - modulo) / 12 + 1;
          }
          let counter = 0;
          let shortDesc = '';
          response.data.data.jobVacancy.forEach((i) => {
            shortDesc = i.description.replace(/<\/?[^>]+>/gi, ' ');
            if (shortDesc.length > 100) {
              shortDesc = `${shortDesc.substr(0, 100)}...`;
            }
            counter += 1;
            this.jobVacancy.push({
              id: i.id,
              number: counter,
              name: i.name,
              companyName: i.company.name,
              description: shortDesc,
              salary: i.salary,
              address: i.company.address,
              image: i.company.image,
              date: i.date,
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
  created() {
    if (this.$store.state.token === '') {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  },
  update() {
    if (this.$store.state.token === '') {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  },
  beforeDestroy() {
    this.search = null;
    this.jobVacancy = null;
    this.skeleton = null;
    this.page = null;
    this.pageCount = null;
    this.isLogin = null;

    delete this.search;
    delete this.jobVacancy;
    delete this.skeleton;
    delete this.page;
    delete this.pageCount;
    delete this.isLogin;
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
