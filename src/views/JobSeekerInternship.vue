<template>
  <div class="mt-12 pt-1">
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
                    v-model="location"
                    :items="itemsLocation"
                    :loading="isLoadingLocation"
                    :search-input.sync="searchLocation"
                    hide-no-data
                    hide-selected
                    item-text="name"
                    item-value="name"
                    label="Lokasi Magang"
                    prepend-icon="$location"
                    append-outer-icon="$close"
                    @click:append-outer="resetLocation()"
                    outlined
                    dense
                    persistent-hint
                    hint="jika tidak ada lokasi yang anda cari, silahkan hubungi pihak kami"
                  />
                  <v-autocomplete
                    v-model="job"
                    :items="itemsJob"
                    :loading="isLoadingJob"
                    :search-input.sync="searchJob"
                    hide-no-data
                    hide-selected
                    item-text="name"
                    item-value="name"
                    label="Jabatan Magang"
                    prepend-icon="$job"
                    append-outer-icon="$close"
                    @click:append-outer="resetJob()"
                    outlined
                    dense
                    persistent-hint
                    hint="jika tidak ada jabatan yang anda cari, silahkan hubungi pihak kami"
                  />
                  <v-autocomplete
                    v-model="school"
                    :items="itemsSchool"
                    :loading="isLoadingSchool"
                    :search-input.sync="searchSchool"
                    hide-no-data
                    hide-selected
                    item-text="name"
                    item-value="name"
                    label="Sekolah Terakhir Pekerja Magang"
                    prepend-icon="$school"
                    append-outer-icon="$close"
                    @click:append-outer="resetSchool()"
                    outlined
                    dense
                    persistent-hint
                    hint="jika tidak ada sekolah yang anda cari, silahkan hubungi pihak kami"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions class="pt-0 px-4 pb-4">
                <v-btn
                  class="text-capitalize"
                  block
                  color="primary"
                  @click="searchJobSeeker()"
                >
                  cari pekerja
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" xl="8" lg="8" md="12" sm="12" xs="12">
            <v-card elevation="3">
              <v-card-title class="pa-3 d-flex justify-space-between">
                <p
                  class="text-capitalize ma-0 text-subtitle-1 font-weight-bold"
                >
                  daftar pekerja magang
                </p>
                <p
                  class="text-capitalize ma-0 text-subtitle-2 font-weight-regular"
                  v-if="!skeleton"
                >
                  {{ min }} - {{ max }} dari {{ lengthData }} pekerja
                </p>
              </v-card-title>
            </v-card>
            <div v-if="jobSeeker.length > 0 && !skeleton">
              <div v-for="item in jobSeeker" :key="item.id">
                <transition name="fade" appear>
                  <v-card elevation="3" class="mt-4 pa-3">
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
                        <p class="text-capitalize text-subtitle-2 ma-0">
                          {{ item.position }}
                        </p>
                        <!-- <p
                          class="text-capitalize text-subtitle-2 font-weight-regular ma-0"
                        >
                          <v-icon class="mr-3" size="12">$phone</v-icon>
                          {{ item.phone }}
                        </p> -->
                        <p
                          class="text-capitalize text-subtitle-2 font-weight-regular ma-0"
                        >
                          <v-icon class="mr-2" size="12">$school</v-icon>
                          {{ item.school }}
                        </p>
                        <p
                          class="text-capitalize text-subtitle-2 font-weight-regular ma-0"
                        >
                          <v-icon class="mr-3" size="12">$location</v-icon>
                          {{ item.location }}
                        </p>
                      </div>
                    </div>
                    <div class="mt-2 text-subtitle-2 font-weight-regular">
                      {{ item.desc }}
                    </div>
                  </v-card>
                </transition>
              </div>
            </div>
            <div v-if="!skeleton && jobSeeker.length === 0">
              <v-card elevation="3" class="mt-4 pa-3">
                <typical
                  class="text-center text-capitalize"
                  :steps="[
                    `data belum ada di dalam sistem kami. silahkan hubungi pihak kami
                    untuk bertanya lebih lanjut`,
                    6000,
                  ]"
                  :wrapper="'p'"
                />
              </v-card>
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
                v-if="!skeleton"
                @input="pagination()"
              ></v-pagination>
            </div>
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
import typical from 'vue-typical';

export default {
  data: () => ({
    search: '',
    page: 1,
    jobSeeker: [],
    pageCount: 0,
    lengthData: 0,
    // autocomplete location
    location: '',
    entriesLocation: [],
    isLoadingLocation: false,
    searchLocation: null,
    // autocomplete jabatan
    job: '',
    entriesJob: [],
    isLoadingJob: false,
    searchJob: null,
    // autocomplete School
    school: '',
    entriesSchool: [],
    isLoadingSchool: false,
    searchSchool: null,
    skeleton: true,
  }),
  computed: {
    min() {
      return (this.page - 1) * 20 + 1;
    },
    max() {
      return (this.page - 1) * 20 + this.jobSeeker.length;
    },
    itemsLocation() {
      return this.entriesLocation.map((entry) => {
        const { name } = entry;
        return { ...entry, name };
      });
    },
    itemsJob() {
      return this.entriesJob.map((entry) => {
        const { name } = entry;
        return { ...entry, name };
      });
    },
    itemsSchool() {
      return this.entriesSchool.map((entry) => {
        const { name } = entry;
        return { ...entry, name };
      });
    },
  },
  components: {
    'footer-home': footer,
    typical,
  },
  watch: {
    searchLocation() {
      // Items have already been loaded
      if (this.itemsLocation.length > 0) return;

      // Items have already been requested
      if (this.isLoadingLocation) return;

      this.isLoadingLocation = true;

      // Lazily load input items
      fetch(`${this.$store.state.domain}internship/location`, {
        headers: {
          'x-api-key': this.$store.state.apiKey,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          res.data.location.forEach((i) => {
            this.entriesLocation.push({
              name: i.name,
            });
          });
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        })
        // eslint-disable-next-line no-return-assign
        .finally(() => (this.isLoadingLocation = false));
    },
    searchJob() {
      // Items have already been loaded
      if (this.itemsJob.length > 0) return;

      // Items have already been requested
      if (this.isLoadingJob) return;

      this.isLoadingJob = true;

      // Lazily load input items
      fetch(`${this.$store.state.domain}internship/position`, {
        headers: {
          'x-api-key': this.$store.state.apiKey,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          res.data.position.forEach((i) => {
            this.entriesJob.push({
              name: i.name,
            });
          });
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        })
        // eslint-disable-next-line no-return-assign
        .finally(() => (this.isLoadingJob = false));
    },
    searchSchool() {
      // Items have already been loaded
      if (this.itemsSchool.length > 0) return;

      // Items have already been requested
      if (this.isLoadingSchool) return;

      this.isLoadingSchool = true;

      // Lazily load input items
      fetch(`${this.$store.state.domain}internship/school`, {
        headers: {
          'x-api-key': this.$store.state.apiKey,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          res.data.school.forEach((i) => {
            this.entriesSchool.push({
              name: i.name,
            });
          });
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        })
        // eslint-disable-next-line no-return-assign
        .finally(() => (this.isLoadingSchool = false));
    },
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
    resetLocation() {
      this.location = '';
    },
    resetJob() {
      this.job = '';
    },
    resetSchool() {
      this.school = '';
    },
    searchJobSeeker() {
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
      const header = {
        'x-api-key': this.$store.state.apiKey,
      };
      if (this.job !== '') {
        header.position = this.job;
      }

      if (this.location !== '') {
        header.location = this.location;
      }

      if (this.school !== '') {
        header.school = this.school;
      }
      axios({
        baseURL: `${this.$store.state.domain}internship/pagination-show/${page}`,
        method: 'get',
        headers: header,
      })
        .then((response) => {
          if (response.data.data.internship.length > 0) {
            this.lengthData = response.data.data.total;
            const modulo = response.data.data.total % 10;
            if (modulo === 0) {
              this.pageCount = response.data.data.total / 10;
            } else {
              this.pageCount = (response.data.data.total - modulo) / 10 + 1;
            }
            let counter = 0;
            response.data.data.internship.forEach((i) => {
              counter += 1;
              let shortDesc = i.desc.replace(/<\/?[^>]+>/gi, ' ');
              if (shortDesc.length > 100) {
                shortDesc = `${shortDesc.substr(0, 250)}.....`;
              }
              this.jobSeeker.push({
                id: i.id,
                number: counter,
                name: i.name,
                position: i.position,
                desc: shortDesc,
                phone: i.phone,
                school: i.school,
                location: i.location,
                image: i.image,
              });
            });
          } else {
            this.lengthData = 0;
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
      baseURL: `${this.$store.state.domain}internship/pagination-show/1`,
      method: 'get',
      headers: {
        'x-api-key': this.$store.state.apiKey,
      },
    })
      .then((response) => {
        if (response.data.data.internship.length > 0) {
          this.lengthData = response.data.data.total;
          const modulo = response.data.data.total % 10;
          if (modulo === 0) {
            this.pageCount = response.data.data.total / 10;
          } else {
            this.pageCount = (response.data.data.total - modulo) / 10 + 1;
          }
          let counter = 0;
          response.data.data.internship.forEach((i) => {
            counter += 1;
            let shortDesc = i.desc.replace(/<\/?[^>]+>/gi, ' ');
            if (shortDesc.length > 100) {
              shortDesc = `${shortDesc.substr(0, 250)}.....`;
            }
            this.jobSeeker.push({
              id: i.id,
              number: counter,
              name: i.name,
              position: i.position,
              desc: shortDesc,
              phone: i.phone,
              school: i.school,
              location: i.location,
              image: i.image,
            });
          });
        } else {
          this.lengthData = 0;
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
    this.jobSeeker = null;
    this.pageCount = null;
    this.lengthData = null;
    this.location = null;
    this.entriesLocation = null;
    this.isLoadingLocation = null;
    this.searchLocation = null;
    this.job = null;
    this.entriesJob = null;
    this.isLoadingJob = null;
    this.searchJob = null;
    this.school = null;
    this.entriesSchool = null;
    this.isLoadingSchool = null;
    this.searchSchool = null;
    this.skeleton = null;

    delete this.search;
    delete this.page;
    delete this.jobSeeker;
    delete this.pageCount;
    delete this.lengthData;
    delete this.location;
    delete this.entriesLocation;
    delete this.isLoadingLocation;
    delete this.searchLocation;
    delete this.job;
    delete this.entriesJob;
    delete this.isLoadingJob;
    delete this.searchJob;
    delete this.school;
    delete this.entriesSchool;
    delete this.isLoadingSchool;
    delete this.searchSchool;
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
    width: 90vw;
  }
}
</style>
