<template>
  <div>
    <v-main>
      <v-container>
        <v-row>
          <v-col xl="12" lg="12" md="12" sm="12" xs="12">
            <v-card elevation="3" class="rounded-xl" width="100vw">
              <v-card-title class="font-family font-weight-bold">
                Pilih Kriteria
              </v-card-title>
              <v-card-subtitle class="font-family pb-0">
                Silahkan masukkan kriteria untuk menampilkan lowongan
                berdasarkan lokasi dan posisi. Jika Anda tidak menemukan
                kriteria yang diinginkan, Anda dapat menghubungi kami.
              </v-card-subtitle>
              <v-card-text class="py-2 px-4">
                <v-form lazy-validation>
                  <v-row>
                    <v-col cols="12" xl="5" lg="5" md="5" sm="12" xs="12">
                      <p class="mb-0 black--text text-capitalize">
                        <span class="font-family">lokasi</span>
                      </p>
                      <v-autocomplete
                        v-model="location"
                        :items="itemsLocation"
                        :loading="isLoadingLocation"
                        :search-input.sync="searchLocation"
                        hide-no-data
                        hide-selected
                        item-text="name"
                        item-value="name"
                        label="Silahkan Ketik Lokasi"
                        dense
                        outlined
                        single-line
                        class="font-family"
                      />
                    </v-col>
                    <v-col cols="12" xl="5" lg="5" md="5" sm="12" xs="12">
                      <p class="mb-0 black--text text-capitalize">
                        <span class="font-family">jabatan</span>
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
                        label="Silahkan Ketik Jabatan"
                        dense
                        outlined
                        single-line
                        class="font-family"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      xl="2"
                      lg="2"
                      md="2"
                      sm="12"
                      xs="12"
                      class="d-flex align-center"
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
                  <v-card
                    elevation="3"
                    class="rounded-xl mt-4"
                    width="100vw"
                    @click="href(item.id)"
                  >
                    <v-card-text class="pa-4">
                      <v-row>
                        <!-- <v-col
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
                        </v-col> -->
                        <v-col
                          cols="12"
                          xl="12"
                          lg="12"
                          md="12"
                          sm="12"
                          xs="12"
                        >
                          <p class="font-weight-bold text-h6 black--text mb-0">
                            <span class="font-family">
                              {{ item.position }}
                            </span>
                          </p>
                          <p class="text-subtitle-2 black--text mb-2">
                            <span class="font-family">
                              {{ item.company }}
                            </span>
                          </p>
                          <p class="black--text mb-1 text-subtitle-2">
                            <v-icon size="15" class="mr-3">$location</v-icon>
                            <span class="font-family">
                              {{ item.location }}
                            </span>
                          </p>
                          <p class="black--text text-subtitle-2 mb-4">
                            <v-icon size="15" class="mr-3">$calendar</v-icon>
                            <span class="font-family">
                              {{ item.date }}
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
      </v-container>
    </v-main>
  </div>
</template>

<script>
import axios from 'axios';

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
    skeleton: true,
    searchJob: null,
  }),
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
          type: 'UMKM',
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
    href(id) {
      this.$router.push(`/detail-job-vacancy/${id}`);
    },
    // method universal
    async methodGetJobSeeker() {
      const header = {
        'x-api-key': this.$store.state.apiKey,
      };
      if (this.job !== '') {
        header.position = this.job;
      }

      if (this.location !== '') {
        header.location = this.location;
      }
      try {
        const response = await axios({
          baseURL: `${this.$store.state.domain}job-vacancy/show-pagination/${this.page}`,
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
            const date = i.date.split('-');
            const shortDesc = i.description.replace(/<\/?[^>]+>/gi, ' ');
            this.jobSeeker.push({
              id: i.id,
              number: counter,
              position: i.name,
              desc: shortDesc,
              company: i.company.name,
              location: `${i.company.address}, ${i.company.city}, ${i.company.province}`,
              date: `${date[0]} ${
                this.$store.state.month[parseInt(date[1], 10) - 1]
              } ${date[2]}`,
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
    if (this.$store.state.uploadData) {
      if (this.$store.state.role === 'Pencaker') {
        this.$router.push('/resume-job-seeker');
      } else {
        this.$router.push('/data-umkm');
      }
    } else {
      try {
        const response = await axios({
          baseURL: `${this.$store.state.domain}job-vacancy/show-pagination/1`,
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
            const date = i.date.split('-');
            const shortDesc = i.description.replace(/<\/?[^>]+>/gi, ' ');
            this.jobSeeker.push({
              id: i.id,
              number: counter,
              position: i.name,
              desc: shortDesc,
              company: i.company.name,
              location: `${i.company.address}, ${i.company.city}, ${i.company.province}`,
              date: `${date[0]} ${
                this.$store.state.month[parseInt(date[1], 10) - 1]
              } ${date[2]}`,
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
    }
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
    delete this.skeleton;
  },
};
</script>

<style scoped>
.max-width {
  width: 1044px;
}
.preview-img {
  max-width: 176.83px;
  max-height: 176.83px;
}
</style>
