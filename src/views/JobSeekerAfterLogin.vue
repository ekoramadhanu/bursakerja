<template>
  <div>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title> Pilih Kriteria </v-card-title>
              <v-card-subtitle>
                Silahkan masukkan kriteria untuk menampilkan lowongan
                berdasarkan lokasi dan posisi. Jika Anda tidak menemukan
                kriteria yang diinginkan, Anda dapat menghubungi kami.
              </v-card-subtitle>
              <v-card-text>
                <v-form lazy-validation>
                  <v-row>
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
                        hide-selected
                        item-text="name"
                        item-value="name"
                        label="Kota"
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
                        hide-no-data
                        label="Pendidikan Terakhir"
                        item-text="name"
                        item-value="name"
                        outlined
                        single-line
                      />
                    </v-col>
                  </v-row>
                  <v-row>
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
                        multiple
                        single-line
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
                          <template v-if="typeof data.item !== 'object'">
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
          </v-col>
          <v-col cols="12">
            <v-card class="mb-4" elevation="0">
              <v-card-text>
                {{ max }} dari {{ lengthData }} pekerja ditemukan
              </v-card-text>
            </v-card>
            <div v-if="jobSeeker.length > 0 && !skeleton">
              <div v-for="item in jobSeeker" :key="item.id">
                <v-card
                  elevation="3"
                  class="rounded-xl mt-4"
                  width="100vw"
                  @click="href(item.id)"
                >
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
                  v-if="!skeleton"
                  @input="pagination()"
                ></v-pagination>
              </div>
            </div>
            <div v-if="!skeleton && jobSeeker.length === 0">
              <p class="font-family text-center">
                data belum ada di dalam sistem kami. silahkan hubungi pihak kami
                untuk bertanya lebih lanjut
              </p>
            </div>
            <div v-if="skeleton">
              <v-skeleton-loader ref="skeleton" type="card" class="mt-2" />
              <v-skeleton-loader ref="skeleton" type="card" class="mt-2" />
              <v-skeleton-loader ref="skeleton" type="card" class="mt-2" />
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
    searchJob: null,
    // autocomplete School
    school: '',
    itemsSchool: [],
    skeleton: true,
  }),
  computed: {
    min() {
      return (this.page - 1) * 10 + 1;
    },
    max() {
      return (this.page - 1) * 10 + this.jobSeeker.length;
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
          res.data.city.forEach((i) => {
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
          type: 'job seeker',
        },
      })
        .then((res) => res.json())
        .then((res) => {
          res.data.tagJob.forEach((i) => {
            this.entriesJob.push({
              name: i.name,
            });
          });
          // eslint-disable-next-line no-console
          console.log(this.entriesJob);
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
      this.methodGetJobSeeker(this.page);
    },
    pagination() {
      this.skeleton = true;
      this.jobSeeker.splice(0, this.jobSeeker.length);
      this.methodGetJobSeeker(this.page);
    },
    capitalizeEachWord(str) {
      return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
      );
    },
    href(id) {
      this.$router.push(`/job-seeker-detail/${id}`);
    },
    // method universal
    methodGetJobSeeker(page) {
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
      axios({
        baseURL: `${this.$store.state.domain}job-seeker/pagination-show/${page}`,
        method: 'get',
        headers: header,
      })
        .then((response) => {
          if (response.data.data.jobSeeker.length > 0) {
            this.lengthData = response.data.data.total;
            const modulo = response.data.data.total % 20;
            if (modulo === 0) {
              this.pageCount = response.data.data.total / 20;
            } else {
              this.pageCount = (response.data.data.total - modulo) / 20 + 1;
            }
            let counter = 0;
            response.data.data.jobSeeker.forEach((i) => {
              counter += 1;
              this.jobSeeker.push({
                id: i.id,
                number: counter,
                name: i.fullname,
                position: JSON.parse(i.position).join(', '),
                desc: i.description,
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
    if (this.$store.state.uploadData) {
      if (this.$store.state.role === 'Pencaker') {
        this.$router.push('/resume-job-seeker');
      } else {
        this.$router.push('/data-umkm');
      }
    } else {
      axios({
        baseURL: `${this.$store.state.domain}job-seeker/pagination-show/1`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
        },
      })
        .then((response) => {
          if (response.data.data.jobSeeker.length > 0) {
            this.lengthData = response.data.data.total;
            const modulo = response.data.data.total % 10;
            if (modulo === 0) {
              this.pageCount = response.data.data.total / 10;
            } else {
              this.pageCount = (response.data.data.total - modulo) / 10 + 1;
            }
            let counter = 0;
            response.data.data.jobSeeker.forEach((i) => {
              counter += 1;
              this.jobSeeker.push({
                id: i.id,
                number: counter,
                name: i.fullname,
                position: JSON.parse(i.position).join(', '),
                desc: i.description,
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
.size-max {
  max-width: 1100px;
}
.preview-img {
  position: relative;
  width: 130px;
  height: 130px;
  overflow: hidden;
  border-radius: 50%;
}
</style>
