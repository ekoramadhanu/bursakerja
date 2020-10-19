<template>
  <div class="mt-12 pt-1 fourth">
    <div class="d-flex justify-center mb-2">
      <div class="d-flex flex-column max-width mx-4">
        <v-card elevation="3" max-width="100vw" class="pa-4" v-if="!skeleton">
          <v-row>
            <v-col cols="12" xl="8" lg="8" md="8" sm="8" xs="12">
              <div class="d-flex">
                <v-img
                  :src="image"
                  aspect-ratio="1.7"
                  width="100vw"
                  max-width="130"
                  height="100vh"
                  max-height="100"
                  contain
                ></v-img>
                <div class="my-auto">
                  <p class="text-capitalize text-h5 ma-0">
                    {{ nameJob }}
                  </p>
                  <p
                    class="text-capitalize cursor text-decoration-underline primary--text"
                    @click="openWebsite()"
                  >
                    {{ nameCompany }}
                  </p>
                </div>
              </div>
            </v-col>
            <v-col
              cols="12"
              xl="4"
              lg="4"
              md="4"
              sm="4"
              xs="12"
              class="d-flex align-center"
            >
              <div>
                <div class="d-flex">
                  <v-icon class="mr-2" size="15">$money</v-icon>
                  <p class="ma-0 text-capitalize">{{ salary }}</p>
                </div>
                <div class="d-flex mt-4">
                  <v-icon class="mr-4" size="15">$location</v-icon>
                  <p class="ma-0 text-capitalize">{{ location }}</p>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
        <v-skeleton-loader
          ref="skeleton"
          type="card"
          v-if="skeleton"
        ></v-skeleton-loader>
        <v-row  v-if="!skeleton">
          <v-col cols="12" lg="6" xl="6" md="6" sm="6" xs="12">
            <v-card elevation="3" class="mt-3">
              <v-card-title class="text-capitalize primary white--text">
                deskripsi lowongan pekerjaan
              </v-card-title>
              <v-card-text class="pa-4">
                <p class="text-capitalize ma-0 text-body-1">
                  deskripsi pekerjaan
                </p>
                <div v-html="description"></div>
                <p class="text-capitalize ma-0 text-body-1">
                  pengalman pekerjaan
                </p>
                <div v-html="exerience"></div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" lg="6" xl="6" md="6" sm="6" xs="12">
            <v-card elevation="3" class="mt-3">
              <v-card-title class="text-capitalize primary white--text">
                identitas perusahaan
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                    <div>
                      <p class="text-capitalize ma-0 text-subtitle-1">
                        pemilik perusahaan
                      </p>
                      <p class="text-capitalize ma-0 text-subtitle-2">{{owner}}</p>
                    </div>
                    <div>
                      <p class="text-capitalize ma-0 text-subtitle-1">
                        bidang usaha
                      </p>
                      <p class="text-capitalize ma-0 text-subtitle-2">{{type}}</p>
                    </div>
                    <div>
                      <p class="text-capitalize ma-0 text-subtitle-1">
                        Jumlah Cabang
                      </p>
                      <p class="text-capitalize ma-0 text-subtitle-2">{{branches}}</p>
                    </div>
                    <div>
                      <p class="text-capitalize ma-0 text-subtitle-1">
                        nomor telepon
                      </p>
                      <p class="text-capitalize ma-0 text-subtitle-2">{{phone}}</p>
                    </div>
                  </v-col>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                    <div>
                      <p class="text-capitalize ma-0 text-subtitle-1">
                        bentuk badan hukum
                      </p>
                      <p class="text-capitalize ma-0 text-subtitle-2">{{legality}}</p>
                    </div>
                    <div>
                      <p class="text-capitalize ma-0 text-subtitle-1">
                        usia perusahaan
                      </p>
                      <p class="text-capitalize ma-0 text-subtitle-2">{{old}}</p>
                    </div>
                    <div>
                      <p class="text-capitalize ma-0 text-subtitle-1">
                        total karyawan
                      </p>
                      <p class="text-capitalize ma-0 text-subtitle-2">{{employee}}</p>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row  v-if="skeleton">
            <v-col cols="12" lg="6" xl="6" md="6" sm="6" xs="12">
                <v-skeleton-loader
                ref="skeleton"
                type="card"
                ></v-skeleton-loader>
            </v-col>
            <v-col cols="12" lg="6" xl="6" md="6" sm="6" xs="12">
                <v-skeleton-loader
                ref="skeleton"
                type="card"
                ></v-skeleton-loader>
            </v-col>
        </v-row>
      </div>
    </div>
    <footer-home/>
  </div>
</template>

<script>
import axios from 'axios';
import footer from '@/components/Footer.vue';

export default {
  data: () => ({
    skeleton: true,
    image: null,
    description: '',
    exerience: '',
    owner: '',
    legality: '',
    nameCompany: '',
    salary: '',
    location: '',
    nameJob: '',
    type: '',
    old: '',
    branches: '',
    employee: '',
    address: '',
    link: '',
    phone: '',
  }),
  methods: {
    openWebsite() {
      window.open(this.link);
    },
  },
  components: {
    'footer-home': footer,
  },
  beforeCreate() {
    axios({
      baseURL: `${this.$store.state.domain}job-vacancy/${this.$route.params.id}`,
      method: 'get',
      headers: {
        'x-api-key': this.$store.state.apiKey,
      },
    })
      .then((response) => {
        if (response.data.data.jobVacancy.length === 1) {
          this.image = response.data.data.jobVacancy[0].company.brand;
          this.description = response.data.data.jobVacancy[0].description;
          this.exerience = response.data.data.jobVacancy[0].experience;
          this.nameJob = response.data.data.jobVacancy[0].name;
          this.salary = response.data.data.jobVacancy[0].salary;
          this.location = response.data.data.jobVacancy[0].company.address;
          this.nameCompany = response.data.data.jobVacancy[0].company.name;
          this.link = response.data.data.jobVacancy[0].company.linkWebsite;
          this.owner = response.data.data.jobVacancy[0].company.owner;
          this.legality = response.data.data.jobVacancy[0].company.legality;
          this.type = response.data.data.jobVacancy[0].company.type;
          this.old = response.data.data.jobVacancy[0].company.old;
          this.branches = response.data.data.jobVacancy[0].company.branches;
          this.employee = response.data.data.jobVacancy[0].company.employee;
          this.phone = response.data.data.jobVacancy[0].company.phone;
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
};
</script>

<style scoped>
.max-width {
  max-width: 1366px;
  width: 100vw;
}
.cursor {
  cursor: pointer;
}
@media screen and (max-width: 600px) {
  .max-width {
    max-width: 600px;
    width: 100vw;
  }
}
div >>> ul{
  line-height: 18px !important;
}
div >>> ol {
  line-height: 18px !important;
}
div >>> li > p {
  margin: 3px !important;
}
</style>
