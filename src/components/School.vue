<template>
  <div class="d-flex justify-center mb-2">
    <div class="max-width">
      <v-row class="mt-6">
        <v-col xl="12" lg="12" md="12" sm="12" xs="12">
          <v-card elevation="3" class="rounded-xl" width="100vw">
            <v-card-text class="pa-4">
              <v-form lazy-validation>
                <v-row>
                  <v-col
                    cols="12"
                    lg="2"
                    xl="2"
                    md="2"
                    sm="2"
                    xs="2"
                    class="d-flex align-center"
                  >
                    <p
                      class="mb-0 font-weight-bold text-capitalize text-subtitle-1 black--text"
                    >
                      <span class="font-family"> kriteria </span>
                    </p>
                  </v-col>
                  <v-col cols="12" lg="4" xl="4" md="4" sm="12" xs="12">
                    <v-autocomplete
                      v-model="search"
                      :items="itemsLocation"
                      :loading="isLoading"
                      :search-input.sync="searchLocation"
                      hide-no-data
                      hide-selected
                      item-text="name"
                      item-value="name"
                      label="Lokasi"
                      dense
                    />
                  </v-col>
                  <v-col cols="12" lg="4" xl="4" md="4" sm="12" xs="12">
                    <v-select
                      v-model="category"
                      :items="itemCategory"
                      item-text="name"
                      item-value="name"
                      label="Kategori Sekolah"
                      class="mt-0 pt-0"
                      single-line
                    ></v-select>
                  </v-col>
                  <v-col cols="12" lg="2" xl="2" md="2" sm="12" xs="12">
                    <v-btn color="primary" @click="searchSchool()">
                      cari sekolah
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
          <div v-if="!skeleton" class="mt-4">
            <div v-if="school.length > 0">
              <div v-for="item in school" :key="item.id">
                <v-card elevation="3" class="rounded-xl mt-4" width="100vw" @click="href(item.id)">
                  <v-card-text class="pa-4">
                    <v-row>
                      <v-col
                        cols="12"
                        xl="2"
                        lg="2"
                        md="2"
                        sm="12"
                        xs="12"
                        class="d-flex justify-center align-center"
                      >
                        <img
                          :src="item.image"
                          class="preview-img"
                          aspect-ratio="1.7"
                        />
                      </v-col>
                      <v-col cols="12" xl="10" lg="10" md="10" sm="12" xs="12">
                        <p class="font-weight-bold text-h6 black--text mb-0">
                          <span class="font-family">
                            {{ item.name }}
                          </span>
                        </p>
                        <p class="black--text mb-0">
                          <v-icon size="15" class="mr-3">$location</v-icon>
                          <span class="font-family">
                            {{ item.location }}
                          </span>
                        </p>
                        <p class="black--text">
                          <v-icon size="15" class="mr-3">$tag</v-icon>
                          <span class="font-family">
                            {{ item.category }}
                          </span>
                        </p>
                        <p class="black--text">
                          <span class="font-family">
                            {{ item.description }}
                          </span>
                        </p>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </div>
              <div class="text-canter mt-2">
                <v-pagination
                  v-model="page"
                  total-visible="10"
                  :length="pageCount"
                  @input="pagination()"
                ></v-pagination>
              </div>
            </div>
            <div v-if="school.length === 0" class="mt-4">
              <p class="font-weight-bold text-subtitle-1 text-center text-capitalize">
                <span class="font-family">
                  data belum ada di sistem kami. untuk lebih lanjut silahkan hubungi pihak kami
                </span>
              </p>
            </div>
          </div>
          <div v-if="skeleton" class="mt-4">
            <div v-for="i in 4" :key="i">
              <v-skeleton-loader
                class="mx-auto"
                max-width="1044"
                type="card"
              ></v-skeleton-loader>
            </div>
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
    category: '',
    itemCategory: [],
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
      fetch(`${this.$store.state.domain}city`, {
        headers: {
          'x-api-key': this.$store.state.apiKey,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          res.data.city.forEach((i) => {
            this.entries.push({
              id: i.id,
              name: this.capitalizeEachWord(i.name),
              provinceId: i.provinceId,
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
    capitalizeEachWord(str) {
      return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
      );
    },
    href(id) {
      this.$router.push(`/school-detail/${id}`);
    },
    // method universal
    methodGetSchool(page) {
      const header = {
        'x-api-key': this.$store.state.apiKey,
      };
      if (this.search !== '') {
        header.Location = this.search;
      }

      if (this.category !== '') {
        header.Category = this.category;
      }
      axios({
        baseURL: `${this.$store.state.domain}school/show-all/${page}`,
        method: 'get',
        headers: header,
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
                category: i.category,
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
      // if (this.search === '') {
      //   axios({
      //     baseURL: `${this.$store.state.domain}school/show-all/${page}`,
      //     method: 'get',
      //     headers: {
      //       'x-api-key': this.$store.state.apiKey,
      //     },
      //   })
      //     .then((response) => {
      //       if (response.data.data.school.length > 0) {
      //         this.lengthData = response.data.data.total;
      //         const modulo = response.data.data.total % 20;
      //         if (modulo === 0) {
      //           this.pageCount = response.data.data.total / 20;
      //         } else {
      //           this.pageCount = (response.data.data.total - modulo) / 20 + 1;
      //         }
      //         let counter = (page - 1) * 20;
      //         let nameStatus = '';
      //         response.data.data.school.forEach((i) => {
      //           counter += 1;
      //           if (i.status === '0') {
      //             nameStatus = 'Tidak Ditampilkan';
      //           } else {
      //             nameStatus = 'Ditampilkan';
      //           }
      //           let shortDesc = i.description.replace(/<\/?[^>]+>/gi, ' ');
      //           if (shortDesc.length > 100) {
      //             shortDesc = `${shortDesc.substr(0, 250)}.....`;
      //           }
      //           this.school.push({
      //             id: i.id,
      //             number: counter,
      //             name: i.name,
      //             image: i.image,
      //             status: nameStatus,
      //             location: i.location,
      //             description: shortDesc,
      //             category: i.category,
      //           });
      //         });
      //       } else {
      //         this.pageCount = 0;
      //         this.lengthData = 0;
      //       }
      //     })
      //     .catch((error) => {
      //       // eslint-disable-next-line no-console
      //       console.log(error);
      //     })
      //     .finally(() => {
      //       this.skeleton = false;
      //     });
      // } else {

      // }
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
              shortDesc = `${shortDesc.substr(0, 300)}.....`;
            }
            this.school.push({
              id: i.id,
              number: counter,
              name: i.name,
              image: i.image,
              status: nameStatus,
              location: i.location,
              description: shortDesc,
              category: i.category,
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
  created() {
    this.itemCategory = [...this.$store.state.categorySchool];
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
.max-width {
  max-width: 1044px;
}
.preview-img {
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;
}
</style>
