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
              <v-icon size="15" class="mr-2">$arrowLeft</v-icon>
              Kembali
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xl="8" lg="8" md="12" sm="12" xs="12">
            <v-card elevation="3" class="mt-3 rounded-xl">
              <v-card-title
                class="text-capitalize font-weight-bold text-h6 pb-0"
              >
                <span class="font-family">
                  {{ nameJob }}
                </span>
              </v-card-title>
              <v-card-subtitle class="font-family pb-0 mt-2">
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
                      class="mb-0 text-capitalize font-weight-bold text-subtitle-2"
                    >
                      <span class="font-family greySecondary--text">
                        nama perusahaan
                      </span>
                    </p>
                    <p class="mb-1 black--text text0subtitle-2">
                      <span class="font-family">
                        {{ nameCompany }}
                      </span>
                    </p>
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
                      class="mb-0 text-capitalize font-weight-bold text-subtitle-2"
                    >
                      <span class="font-family greySecondary--text">
                        kota
                      </span>
                    </p>
                    <p class="mb-1 black--text text0subtitle-2">
                      <span class="font-family">
                        {{ city }}
                      </span>
                    </p>
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
                      class="mb-0 text-capitalize font-weight-bold text-subtitle-2"
                    >
                      <span class="font-family greySecondary--text">
                        pendidikan
                      </span>
                    </p>
                    <p class="mb-1 black--text text0subtitle-2">
                      <span class="font-family">
                        {{ academic }}
                      </span>
                    </p>
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
                      class="mb-0 text-capitalize font-weight-bold text-subtitle-2"
                    >
                      <span class="font-family greySecondary--text">
                        tipe pekerjaan
                      </span>
                    </p>
                    <p class="mb-1 black--text text0subtitle-2">
                      <span class="font-family">
                        {{ typeJob }}
                      </span>
                    </p>
                  </v-col>
                </v-row>
              </v-card-subtitle>
              <v-card-text class="">
                <p
                  class="mb-0 text-capitalize font-weight-bold text-subtitle-2"
                >
                  <span class="font-family greySecondary--text">
                    Deskripsi Pekerjaan
                  </span>
                </p>
                <div v-html="description" class="font-family mb-3"></div>
                <div v-html="exerience" class="font-family"></div>
              </v-card-text>
            </v-card>
            <v-card elevation="3" class="mt-3">
              <v-img
                :src="brousure"
                aspect-ratio="1.7"
                width="672"
                max-width="672"
                height="672"
                max-height="672"
                contain
                class="mx-auto"
              />
            </v-card>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="12" sm="12" xs="12">
            <v-btn
              color="primary"
              class="mt-3"
              block
              @click="dialogApplication = true"
            >
              kirim lamaran /CV
            </v-btn>
            <v-card elevation="3" class="mt-3 rounded-xl">
              <v-card-title
                class="text-capitalize text-h6 font-weight-bold py-2"
              >
                <span class="font-family"> identitas perusahaan </span>
              </v-card-title>
              <v-card-text>
                <v-img
                  :src="image"
                  aspect-ratio="1.7"
                  width="150"
                  max-width="110"
                  height="150"
                  max-height="110"
                  contain
                  class="mx-auto"
                ></v-img>
                <p
                  class="mb-0 text-capitalize font-weight-bold text-subtitle-2"
                >
                  <span class="font-family greySecondary--text">
                    deskripsi singkat
                  </span>
                </p>
                <p class="mb-1 black--text text0subtitle-2">
                  <span class="font-family">
                    {{ descriptionCompany }}
                  </span>
                </p>
                <p
                  class="mb-0 text-capitalize font-weight-bold text-subtitle-2"
                >
                  <span class="font-family greySecondary--text">
                    website
                  </span>
                </p>
                <p class="mb-1 black--text text0subtitle-2" @click="openWebsite()">
                  <span class="font-family text-decoration-underline primary--text cursor">
                    {{ link }}
                  </span>
                </p>
                <p
                  class="mb-0 text-capitalize font-weight-bold text-subtitle-2"
                >
                  <span class="font-family greySecondary--text">
                    alamat
                  </span>
                </p>
                <p class="mb-1 black--text text0subtitle-2">
                  <span class="font-family">
                    {{ location }}
                  </span>
                </p>
                <p
                  class="mb-0 text-capitalize font-weight-bold text-subtitle-2"
                >
                  <span class="font-family greySecondary--text">
                    jumlah cabang
                  </span>
                </p>
                <p class="mb-1 black--text text0subtitle-2">
                  <span class="font-family">
                    {{ branches }}
                  </span>
                </p>
                <p
                  class="mb-0 text-capitalize font-weight-bold text-subtitle-2"
                >
                  <span class="font-family greySecondary--text">
                    pemilik perusahaan
                  </span>
                </p>
                <p class="mb-1 black--text text0subtitle-2">
                  <span class="font-family">
                    {{ owner }}
                  </span>
                </p>
                <p
                  class="mb-0 text-capitalize font-weight-bold text-subtitle-2"
                >
                  <span class="font-family greySecondary--text">
                    usia perusahaan
                  </span>
                </p>
                <p class="mb-1 black--text text0subtitle-2">
                  <span class="font-family">
                    {{ old }}
                  </span>
                </p>
                <p
                  class="mb-0 text-capitalize font-weight-bold text-subtitle-2"
                >
                  <span class="font-family greySecondary--text">
                    jumlah karyawan
                  </span>
                </p>
                <p class="mb-1 black--text text0subtitle-2">
                  <span class="font-family">
                    {{ employee }}
                  </span>
                </p>
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
    brousure: null,
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
          Authorization: `Bearer ${this.$cookies.get('token')}`,
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
          this.brousure = response.data.data.jobVacancy[0].image;
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
  width: 1044px;
}

.cursor {
  cursor: pointer;
}
div >>> ul > li {
  line-height: 25px !important;
}
div >>> ol > li {
  line-height: 25px !important;
}
div >>> li > p {
  margin-bottom: 5px !important;
}
div >>> li {
  margin-bottom: 10px;
}
div >>> li > ol {
  margin: 0px;
}
div >>> li > ul {
  margin: 0px;
}
</style>
