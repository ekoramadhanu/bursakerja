<template>
  <div class="d-flex justify-center mb-2">
    <div class="max-width">
      <v-row>
        <v-col cols="12" xl="4" lg="4" md="12" sm="12" xs="12">
          <v-card elevation="3">
            <v-card-title
              class="text-capitalize pa-3 text-subtitle-1 font-weight-bold"
            >
              pilih kriteria
            </v-card-title>
            <v-card-text class="pb-0">
              <v-form lazy-validation>
                <v-autocomplete
                  v-model="search"
                  :items="itemsLocation"
                  :loading="isLoading"
                  :search-input.sync="searchLocation"
                  hide-no-data
                  hide-selected
                  item-text="name"
                  item-value="name"
                  label="Lokasi Sekolah"
                  prepend-icon="$location"
                  append-outer-icon="mdi-close"
                  @click:append-outer="resetLocation()"
                  outlined
                  dense
                  persistent-hint
                  hint="jika tidak ada lokasi yang anda cari, silahkan hubungi pihak kami"
                />
              </v-form>
            </v-card-text>
            <v-card-actions class="pt-0 px-4 pb-4">
              <v-btn
                class="text-capitalize"
                block
                color="primary"
                @click="searchSchool()"
              >
                cari sekolah
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" xl="8" lg="8" md="12" sm="12" xs="12">
          <v-card elevation="3">
            <v-card-title class="pa-3 d-flex justify-space-between">
              <p class="text-capitalize ma-0 text-subtitle-1 font-weight-bold">
                data sekolah ungulan
              </p>
              <p
                class="text-capitalize ma-0 text-subtitle-2 font-weight-regular"
                v-if="!skeleton"
              >
                {{ min }} - {{ max }} dari {{ lengthData }} sekolah
              </p>
            </v-card-title>
          </v-card>
          <div v-if="!skeleton">
            <div v-for="item in school" :key="item.id">
              <transition name="fade" appear>
                <v-card elevation="3" class="mt-4 pa-3">
                  <v-card-text class="pa-2">
                    <div class="d-flex">
                      <v-img
                        width="150"
                        max-width="150"
                        height="120"
                        max-height="120"
                        :src="item.image"
                        contain
                        class="mr-2"
                      ></v-img>
                      <div>
                        <p class="text-capitalize ma-0 text-h6">
                          {{ item.name }}
                        </p>
                        <p
                          class="text-capitalize text-subtitle-2 font-weight-regular ma-0"
                        >
                          {{ item.location }}
                        </p>
                      </div>
                    </div>
                    <div class="mt-2 text-subtitle-2 font-weight-regular">
                      {{ item.description }}
                    </div>
                  </v-card-text>
                  <v-card-actions class="d-flex justify-end pa-1">
                    <v-btn
                      text
                      color="primary"
                      class="text-capitalize"
                      :to="`/school-detail/${item.id}`"
                    >
                      selengkapnya
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </transition>
            </div>
          </div>
          <div v-if="skeleton">
            <v-skeleton-loader ref="skeleton" type="card" class="mt-2" />
            <v-skeleton-loader ref="skeleton" type="card" class="mt-2" />
            <v-skeleton-loader ref="skeleton" type="card" class="mt-2" />
          </div>
          <div class="text-canter mt-2">
            <v-pagination
              v-model="page"
              total-visible="10"
              :length="pageCount"
              @input="pagination()"
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
    school: [],
    pageCount: 0,
    skeleton: true,
    // add atribute
    lengthData: 0,
    entries: [],
    isLoading: false,
    searchLocation: null,
  }),
  computed: {
    min() {
      return (this.page - 1) * 20 + 1;
    },
    max() {
      return (this.page - 1) * 20 + this.school.length;
    },
    itemsLocation() {
      return this.entries.map((entry) => {
        const { name } = entry;
        return { ...entry, name };
      });
    },
  },
  watch: {
    searchLocation() {
      // Items have already been loaded
      if (this.itemsLocation.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      fetch(`${this.$store.state.domain}school/location`, {
        headers: {
          'x-api-key': this.$store.state.apiKey,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          res.data.location.forEach((i) => {
            this.entries.push({
              name: i.name,
            });
          });
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        })
        // eslint-disable-next-line no-return-assign
        .finally(() => (this.isLoading = false));
    },
  },
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
    resetLocation() {
      this.search = '';
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
              this.lengthData = response.data.data.total;
              const modulo = response.data.data.total % 20;
              if (modulo === 0) {
                this.pageCount = response.data.data.total / 20;
              } else {
                this.pageCount = (response.data.data.total - modulo) / 20 + 1;
              }
              let counter = (page - 1) * 20;
              let nameStatus = '';
              response.data.data.school.forEach((i) => {
                counter += 1;
                if (i.status === '0') {
                  nameStatus = 'Tidak Ditampilkan';
                } else {
                  nameStatus = 'Ditampilkan';
                }
                let shortDesc = i.description.replace(/<\/?[^>]+>/gi, ' ');
                if (shortDesc.length > 100) {
                  shortDesc = `${shortDesc.substr(0, 250)}.....`;
                }
                this.school.push({
                  id: i.id,
                  number: counter,
                  name: i.name,
                  image: i.image,
                  status: nameStatus,
                  location: i.location,
                  description: shortDesc,
                });
              });
            } else {
              this.pageCount = 0;
              this.lengthData = 0;
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
              this.lengthData = response.data.data.total;
              const modulo = response.data.data.total % 20;
              if (modulo === 0) {
                this.pageCount = response.data.data.total / 20;
              } else {
                this.pageCount = (response.data.data.total - modulo) / 20 + 1;
              }
              let counter = (page - 1) * 20;
              let nameStatus = '';
              response.data.data.school.forEach((i) => {
                counter += 1;
                if (i.status === '0') {
                  nameStatus = 'Tidak Ditampilkan';
                } else {
                  nameStatus = 'Ditampilkan';
                }
                let shortDesc = i.description.replace(/<\/?[^>]+>/gi, ' ');
                if (shortDesc.length > 100) {
                  shortDesc = `${shortDesc.substr(0, 250)}.....`;
                }
                this.school.push({
                  id: i.id,
                  number: counter,
                  name: i.name,
                  image: i.image,
                  status: nameStatus,
                  location: i.location,
                  description: shortDesc,
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
          this.lengthData = response.data.data.total;
          const modulo = response.data.data.total % 20;
          if (modulo === 0) {
            this.pageCount = response.data.data.total / 20;
          } else {
            this.pageCount = (response.data.data.total - modulo) / 20 + 1;
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
            let shortDesc = i.description.replace(/<\/?[^>]+>/gi, ' ');
            if (shortDesc.length > 100) {
              shortDesc = `${shortDesc.substr(0, 250)}.....`;
            }
            this.school.push({
              id: i.id,
              number: counter,
              name: i.name,
              image: i.image,
              status: nameStatus,
              location: i.location,
              description: shortDesc,
            });
          });
        } else {
          this.pageCount = 0;
          this.lengthData = 0;
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
  width: 90vw;
}
@media screen and (min-width: 1366px) {
  .max-width {
    max-width: 1100px;
    width: 100vw;
  }
}
</style>
