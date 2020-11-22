<template>
  <div>
    <v-main class="grey">
      <v-container class="d-flex flex-column justify-center max-width">
        <v-row>
          <v-col cols="12">
            <v-btn
              x-small
              text
              color="dark grey"
              @click="$router.go(-1)"
              class="pa-0"
            >
              Kembali
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xl="8" lg="8" md="12" sm="12" xs="12">
            <v-card elevation="3" class="mt-3">
              <v-card-title class="text-capitalize font-weight-bold text-h5">
                {{ nameJob }}
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="dialogApplication = true">
                  kirim CV
                </v-btn>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="">
                <v-row>
                  <v-col
                    cols="12"
                    lg="3"
                    xl="3"
                    md="3"
                    sm="12"
                    xs="12"
                    class="pa-2"
                  >
                    <p
                      class="mb-0 text-capitalize font-weight-bold text-subtitle-1"
                    >
                      nama perusahaan :
                    </p>
                    <p class="mb-1">{{ nameCompany }}</p>
                  </v-col>
                  <v-col
                    cols="12"
                    lg="3"
                    xl="3"
                    md="3"
                    sm="12"
                    xs="12"
                    class="pa-2"
                  >
                    <p
                      class="mb-0 text-capitalize font-weight-bold text-subtitle-1"
                    >
                      Kota:
                    </p>
                    <p>{{ city }}</p>
                  </v-col>
                  <v-col
                    cols="12"
                    lg="3"
                    xl="3"
                    md="3"
                    sm="12"
                    xs="12"
                    class="pa-2"
                  >
                    <p
                      class="mb-0 text-capitalize font-weight-bold text-subtitle-1"
                    >
                      pendidikan :
                    </p>
                    <p>{{ academic }}</p>
                  </v-col>
                  <v-col
                    cols="12"
                    lg="3"
                    xl="3"
                    md="3"
                    sm="12"
                    xs="12"
                    class="pa-2"
                  >
                    <p
                      class="mb-0 text-capitalize font-weight-bold text-subtitle-1"
                    >
                      tipe pekerjaan :
                    </p>
                    <p>{{ typeJob }}</p>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-card elevation="3" class="mt-3">
              <v-card-title> Deskripsi Pekerjaan </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="">
                <div v-html="description"></div>
                <div v-html="exerience"></div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="12" sm="12" xs="12">
            <v-card elevation="3" class="mt-3">
              <v-card-title class="text-capitalize">
                identitas perusahaan
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-img
                  :src="image"
                  aspect-ratio="1.7"
                  width="150"
                  max-width="150"
                  height="150"
                  max-height="150"
                  contain
                  class="mx-auto"
                ></v-img>
                <p
                  class="text-capitalize text-subtitle-1 font-weight-bold mb-1"
                >
                  deskripsi singkat
                </p>
                <p>{{ descriptionCompany }}</p>
                <p
                  class="text-capitalize text-subtitle-1 font-weight-bold mb-1"
                >
                  website
                </p>
                <p
                  class="text-decoration-underline primary--text cursor"
                  @click="openWebsite()"
                >
                  {{ link }}
                </p>
                <p
                  class="text-capitalize text-subtitle-1 font-weight-bold mb-1"
                >
                  alamat
                </p>
                <p>{{ location }}</p>
                <p
                  class="text-capitalize text-subtitle-1 font-weight-bold mb-1"
                >
                  jumlah cabang
                </p>
                <p>{{ branches }}</p>
                <p
                  class="text-capitalize text-subtitle-1 font-weight-bold mb-1"
                >
                  pemilik perusahaan
                </p>
                <p>{{ owner }}</p>
                <p
                  class="text-capitalize text-subtitle-1 font-weight-bold mb-1"
                >
                  usia perusahaan
                </p>
                <p class="text-capitalize">{{ old }}</p>
                <p
                  class="text-capitalize text-subtitle-1 font-weight-bold mb-1"
                >
                  jumlah karyawan
                </p>
                <p>{{ employee }} orang</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-dialog v-model="dialogApplication" persistent max-width="550">
          <v-card>
            <v-card-title class="headline primary white--text text-capitalize">
              kirim CV ke lowongan kerja
            </v-card-title>
            <v-card-text>
              <div class="d-flex justify-start align-center pa-2">
                <v-icon size="80" class="error--text mr-4">$warning</v-icon>
                <p class="ma-0 black--text">
                  Apakah anda yakin ingin melamar di lowongan ini ? Jika "iya"
                  silahkan pilih tombol iya
                </p>
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                elevation="3"
                class="text-capitalize"
                @click="dialogApplication = false"
              >
                tidak
              </v-btn>
              <v-btn color="primary" @click="sendApplication()">
                <v-progress-circular
                  indeterminate
                  color="white"
                  v-if="loadingApplication"
                />
                <p
                  class="my-auto white--text text-capitalize"
                  v-if="!loadingApplication"
                >
                  iya
                </p>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-snackbar
          v-model="hasSaved"
          :timeout="4000"
          top
          right
          color="white"
          max-width="250px"
        >
          <div class="d-flex">
            <v-icon
              :class="
                status === false ? 'mr-2 error--text' : 'mr-2 success--text'
              "
              >{{ icon }}</v-icon
            >
            <p class="text-capitalize black--text ma-0 text-subtitle-1">
              {{ message }}
            </p>
          </div>
        </v-snackbar>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    items: [
      {
        text: 'lowongan kerja',
        disabled: false,
        to: '/job-vacancy-job-seeker',
      },
      {
        text: 'nama',
        disabled: true,
      },
    ],
    skeleton: true,
    image: null,
    description: '',
    descriptionCompany: '',
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
    city: '',
    academic: '',
    typeJob: '',
    link: '',
    phone: '',
    dialogApplication: false,
    loadingApplication: false,
    hasSaved: false,
    status: null,
    icon: '',
    message: '',
  }),
  methods: {
    openWebsite() {
      window.open(this.link);
    },
    sendApplication() {
      this.loadingApplication = true;
      axios({
        baseURL: `${this.$store.state.domain}application-job`,
        method: 'post',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
        data: {
          jobVacancy: this.$route.params.id,
        },
      })
        .then((response) => {
          if (
            response.data.data.message
            === 'Application Job Is Successfully Created'
          ) {
            this.hasSaved = true;
            this.status = true;
            this.message = 'data berhasil terkirim ke perusahaan';
            this.icon = '$success';
          } else {
            this.hasSaved = true;
            this.status = false;
            this.message = 'data tidak berhasil dikirim';
            this.icon = '$warning';
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        })
        .finally(() => {
          this.loadingApplication = false;
          this.dialogApplication = false;
        });
    },
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
          // eslint-disable-next-line no-console
          console.log(response.data);
          this.image = response.data.data.jobVacancy[0].company.brand;
          this.description = response.data.data.jobVacancy[0].description;
          this.exerience = response.data.data.jobVacancy[0].experience;
          this.nameJob = response.data.data.jobVacancy[0].name;
          this.salary = response.data.data.jobVacancy[0].salary;
          this.location = `${response.data.data.jobVacancy[0].company.address}, 
          ${response.data.data.jobVacancy[0].company.city}, ${response.data.data.jobVacancy[0].company.province}`;
          this.city = response.data.data.jobVacancy[0].company.city;
          this.academic = response.data.data.jobVacancy[0].academic;
          this.typeJob = response.data.data.jobVacancy[0].typeJob;
          this.nameCompany = response.data.data.jobVacancy[0].company.name;
          this.link = response.data.data.jobVacancy[0].company.linkWebsite;
          this.owner = response.data.data.jobVacancy[0].company.owner;
          this.legality = response.data.data.jobVacancy[0].company.legality;
          this.type = response.data.data.jobVacancy[0].company.type;
          this.old = response.data.data.jobVacancy[0].company.old;
          this.branches = response.data.data.jobVacancy[0].company.branches;
          this.employee = response.data.data.jobVacancy[0].company.employee;
          this.phone = response.data.data.jobVacancy[0].company.phone;
          this.descriptionCompany = response.data.data.jobVacancy[0].company.description;
          this.items.splice(1, 1, {
            text: response.data.data.jobVacancy[0].name,
            disabled: true,
          });
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
  width: 90vw;
}
@media screen and (min-width: 1366px) {
  .max-width {
    max-width: 1100px;
    width: 90vw;
  }
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
div >>> ul {
  line-height: 18px !important;
}
div >>> ol {
  line-height: 18px !important;
}
div >>> li > p {
  margin: 3px !important;
}
</style>
