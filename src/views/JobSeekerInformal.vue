<template>
  <div class="mt-12 pt-1">
    <div class="d-flex justify-center mb-2">
      <div class="max-width">
        <v-row class="mt-6">
          <v-col xl="12" lg="12" md="12" sm="12" xs="12">
            <v-card elevation="3" class="rounded-xl" width="100vw">
              <v-card-text class="pa-4">
                <p
                  class=" mb-2 my-1 font-weight-bold text-capitalize text-subtitle-1 black--text"
                >
                  <span class="font-family"> kriteria </span>
                </p>
                <v-form lazy-validation>
                  <v-row class="px-4">
                    <v-col
                      cols="12"
                      xl="6"
                      lg="6"
                      md="6"
                      sm="12"
                      xs="12"
                      class="pa-1"
                    >
                      <p class="mb-0 black--text text-capitalize">
                        <span class="font-family"> kota</span>
                      </p>
                      <v-autocomplete
                        v-model="location"
                        :items="itemsLocation"
                        :loading="isLoadingLocation"
                        :search-input.sync="searchLocation"
                        hide-no-data
                        hide-details
                        hide-selected
                        item-text="name"
                        item-value="name"
                        label="Silahka Ketik Kota"
                        dense
                        outlined
                        single-line
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      xl="6"
                      lg="6"
                      md="6"
                      sm="12"
                      xs="12"
                      class="pa-1"
                    >
                      <p class="mb-0 black--text text-capitalize">
                        <span class="font-family"> pendidikan terakhir</span>
                      </p>
                      <v-autocomplete
                        v-model="school"
                        :items="itemsSchool"
                        dense
                        hide-details
                        hide-no-data
                        label="Pilih Pendidikan Terakhir"
                        item-text="name"
                        item-value="name"
                        outlined
                        single-line
                      />
                    </v-col>
                  </v-row>
                  <v-row class="px-4">
                    <v-col
                      cols="12"
                      xl="11"
                      lg="11"
                      md="11"
                      sm="12"
                      xs="12"
                      class="pa-1"
                    >
                      <p class="mb-0 black--text text-capitalize">
                        <span class="font-family"> Posisi/ Jabatan </span>
                      </p>
                      <v-autocomplete
                        v-model="job"
                        :items="itemsJob"
                        :loading="isLoadingJob"
                        :search-input.sync="searchJob"
                        hide-no-data
                        hide-selected
                        item-text="name"
                        item-value="name"
                        label="Posisi/ Jabatan"
                        persistent-hint
                        hint="Bisa Pilih Lebih Dari Satu"
                        dense
                        outlined
                        single-line
                        multiple
                      >
                        <template v-slot:selection="data">
                          <v-chip
                            v-bind="data.attrs"
                            :input-value="data.selected"
                            text-color="white"
                            color="primary"
                            class="font-family my-1"
                          >
                            {{ data.item.name }}
                          </v-chip>
                        </template>
                        <template v-slot:item="data">
                          <template v-if="data.item.constructor.name.toLowerCase() !== 'object'">
                            <v-list-item-content
                              v-text="data.item"
                            ></v-list-item-content>
                          </template>
                          <template v-else>
                            <v-list-item-content>
                              <v-list-item-title
                                v-html="data.item.name"
                              ></v-list-item-title>
                            </v-list-item-content>
                          </template>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col
                      cols="12"
                      xl="1"
                      lg="1"
                      md="1"
                      sm="12"
                      xs="12"
                      class="pa-1 d-flex align-center"
                    >
                      <v-btn
                        block
                        color="primary font-weight-bold font-family"
                        @click="searchJobSeeker()"
                      >
                        cari
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
            <div v-if="!skeleton" class="mt-4">
              <div v-if="jobSeeker.length > 0">
                <div v-for="item in jobSeeker" :key="item.id">
                  <v-card elevation="3" class="rounded-xl mt-4" width="100vw">
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
                        <v-col
                          cols="12"
                          xl="10"
                          lg="10"
                          md="10"
                          sm="12"
                          xs="12"
                        >
                          <p class="font-weight-bold text-h6 black--text mb-0">
                            <span class="font-family">
                              {{ item.name }}
                            </span>
                          </p>
                          <p class="text-subtitle-2 black--text mb-2">
                            <span class="font-family">
                              {{ item.position }}
                            </span>
                          </p>
                          <p class="black--text mb-1 text-subtitle-2">
                            <v-icon size="15" class="mr-3">$phone</v-icon>
                            <span class="font-family">
                              {{ item.phone }}
                            </span>
                          </p>
                          <p class="black--text mb-1 text-subtitle-2">
                            <v-icon size="15" class="mr-3">$location</v-icon>
                            <span class="font-family">
                              {{ item.location }}
                            </span>
                          </p>
                          <p class="black--text text-subtitle-2 mb-4">
                            <v-icon size="15" class="mr-3">$school</v-icon>
                            <span class="font-family">
                              {{ item.school }}
                            </span>
                          </p>
                          <p class="black--text">
                            <span class="font-family">
                              {{ item.desc }}
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
              <div v-if="jobSeeker.length === 0" class="mt-4">
                <p
                  class="font-weight-bold text-subtitle-1 text-center text-capitalize"
                >
                  <span class="font-family">
                    data belum ada di sistem kami. untuk lebih lanjut silahkan
                    hubungi pihak kami
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
    <footer-home />
  </div>
</template>

<script>
import axios from 'axios';
import footer from '@/components/Footer.vue';

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
    itemsSchool: [],
    skeleton: true,
  }),
  components: {
    'footer-home': footer,
  },
  computed: {
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
  },
  watch: {
    searchLocation() {
      // Items have already been loaded
      if (this.itemsLocation.length > 0) return;

      // Items have already been requested
      if (this.isLoadingLocation) return;

      this.isLoadingLocation = true;

      // Lazily load input items
      fetch(`${this.$store.state.domain}city`, {
        headers: {
          'x-api-key': this.$store.state.apiKey,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          res.data.attributes.data.forEach((i) => {
            this.entriesLocation.push({
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
        .finally(() => (this.isLoadingLocation = false));
    },
    searchJob() {
      // Items have already been loaded
      if (this.itemsJob.length > 0) return;

      // Items have already been requested
      if (this.isLoadingJob) return;

      this.isLoadingJob = true;

      // Lazily load input items
      fetch(`${this.$store.state.domain}tag-job/type`, {
        headers: {
          'x-api-key': this.$store.state.apiKey,
          type: 'Informal',
        },
      })
        .then((res) => res.json())
        .then((res) => {
          res.data.attributes.forEach((i) => {
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
  },
  methods: {
    searchJobSeeker() {
      this.skeleton = true;
      this.page = 1;
      this.jobSeeker.splice(0, this.jobSeeker.length);
      this.methodGetJobSeeker();
    },
    pagination() {
      this.skeleton = true;
      this.jobSeeker.splice(0, this.jobSeeker.length);
      this.methodGetJobSeeker();
    },
    capitalizeEachWord(str) {
      return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
      );
    },
    // method universal
    async methodGetJobSeeker() {
      try {
        const header = {
          'x-api-key': this.$store.state.apiKey,
        };
        if (this.job !== '') {
          header.position = JSON.stringify(this.job);
        }

        if (this.location !== '') {
          header.location = this.location;
        }

        if (this.school !== '') {
          header.school = this.school;
        }

        const response = await axios({
          baseURL: `${this.$store.state.domain}informal/pagination-show/${this.page}`,
          method: 'get',
          headers: header,
        });

        if (response.data.data.attributes.length > 0) {
          this.lengthData = response.data.data.total;
          const modulo = response.data.data.total % 10;
          if (modulo === 0) {
            this.pageCount = response.data.data.total / 10;
          } else {
            this.pageCount = (response.data.data.total - modulo) / 10 + 1;
          }
          let counter = 0;
          response.data.data.attributes.forEach((i) => {
            counter += 1;
            const shortDesc = i.desc.replace(/<\/?[^>]+>/gi, ' ');
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
        this.skeleton = false;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
  },
  async beforeCreate() {
    try {
      const response = await axios({
        baseURL: `${this.$store.state.domain}informal/pagination-show/1`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
        },
      });
      if (response.data.data.attributes.length > 0) {
        this.lengthData = response.data.data.total;
        const modulo = response.data.data.total % 10;
        if (modulo === 0) {
          this.pageCount = response.data.data.total / 10;
        } else {
          this.pageCount = (response.data.data.total - modulo) / 10 + 1;
        }
        let counter = 0;
        response.data.data.attributes.forEach((i) => {
          counter += 1;
          const shortDesc = i.desc.replace(/<\/?[^>]+>/gi, ' ');
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
      this.skeleton = false;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  },
  created() {
    this.itemsSchool = [...this.$store.state.itemsSchool];
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
.max-width {
  max-width: 1044px;
}
.preview-img {
  position: relative;
  width: 130px;
  height: 130px;
  overflow: hidden;
  border-radius: 50%;
}
</style>
