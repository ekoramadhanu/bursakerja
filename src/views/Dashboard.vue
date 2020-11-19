<template>
  <v-main class="fourth">
    <v-container fluid>
      <v-breadcrumbs
        :items="items"
        class="text-capitalize pa-2"
      ></v-breadcrumbs>
      <div
        v-if="role === 'Admin 1' || role === 'Admin 2' || role === 'Admin 3'"
      >
        <p class="text-capitalize ma-0 pa-2 grey--text">UMKM</p>
        <v-row v-if="!sekeletonUMKM">
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
            <v-card elevation="4" color="primary" class="rounded-lg">
              <v-card-title class="d-flex justify-space-around mb-3">
                <v-icon size="50" class="mr-2 white--text">$UMKM</v-icon>
                <p class="subtitle-1 ma-0 white--text text-capitalize">
                  {{countUMKM}} katu bursa
                </p>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-subtitle class="primaryDark pa-1 d-flex align-center">
                <p
                  class="subtitle-2 white--text text-capitalize ma-0 ml-5 my-1"
                >
                  jumlah kartu bursa UMKM
                </p>
              </v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
            <v-card elevation="4" color="primary" class="rounded-lg">
              <v-card-title class="d-flex justify-space-around mb-3">
                <v-icon size="50" class="mr-2 white--text">$UMKM</v-icon>
                <p class="subtitle-1 ma-0 white--text text-capitalize">
                  {{countUMKMActivate}} kartu
                </p>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-subtitle class="primaryDark pa-1 d-flex align-center">
                <p
                  class="subtitle-2 white--text text-capitalize ma-0 ml-5 my-1"
                >
                  jumlah umkm yang bergabung
                </p>
              </v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
            <v-card elevation="4" color="primary" class="rounded-lg">
              <v-card-title class="d-flex justify-space-around mb-3">
                <v-icon size="50" class="mr-2 white--text">$UMKM</v-icon>
                <p class="subtitle-1 ma-0 white--text text-capitalize">
                  {{countUMKMNotActivate}} kartu
                </p>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-subtitle class="primaryDark pa-1 d-flex align-center">
                <p
                  class="subtitle-2 white--text text-capitalize ma-0 ml-5 my-1"
                >
                  jumlah kartu umkm tidak aktif
                </p>
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-if="sekeletonUMKM">
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
             <v-skeleton-loader
              ref="skeleton"
              type="card"
              height="342"
            ></v-skeleton-loader>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
             <v-skeleton-loader
              ref="skeleton"
              type="card"
              height="342"
            ></v-skeleton-loader>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
             <v-skeleton-loader
              ref="skeleton"
              type="card"
              height="342"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </div>
      <div
        v-if="role === 'Admin 1' || role === 'Admin 2' || role === 'Admin 3'"
      >
        <p class="text-capitalize ma-0 pa-2 grey--text">karyawan</p>
        <v-row v-if="!sekeletonJobSeeker">
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
            <v-card elevation="4" color="primary" class="rounded-lg">
              <v-card-title class="d-flex justify-space-around mb-3">
                <v-icon size="50" class="mr-2 white--text">$jobSeeker</v-icon>
                <p class="subtitle-1 ma-0 white--text text-capitalize">
                  {{countJobSeker}} katu bursa
                </p>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-subtitle class="primaryDark pa-1 d-flex align-center">
                <p
                  class="subtitle-2 white--text text-capitalize ma-0 ml-5 my-1"
                >
                  jumlah kartu bursa karyawan
                </p>
              </v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
            <v-card elevation="4" color="primary" class="rounded-lg">
              <v-card-title class="d-flex justify-space-around mb-3">
                <v-icon size="50" class="mr-2 white--text">$jobSeeker</v-icon>
                <p class="subtitle-1 ma-0 white--text text-capitalize">
                  {{countJobSekerActivate}} kartu
                </p>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-subtitle class="primaryDark pa-1 d-flex align-center">
                <p
                  class="subtitle-2 white--text text-capitalize ma-0 ml-5 my-1"
                >
                  jumlah karyawan yang bergabung
                </p>
              </v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
            <v-card elevation="4" color="primary" class="rounded-lg">
              <v-card-title class="d-flex justify-space-around mb-3">
                <v-icon size="50" class="mr-2 white--text">$jobSeeker</v-icon>
                <p class="subtitle-1 ma-0 white--text text-capitalize">
                  {{countJobSekerNotActivate}} kartu
                </p>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-subtitle class="primaryDark pa-1 d-flex align-center">
                <p
                  class="subtitle-2 white--text text-capitalize ma-0 ml-5 my-1"
                >
                  jumlah kartu karyawan tidak aktif
                </p>
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-if="sekeletonJobSeeker">
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
             <v-skeleton-loader
              ref="skeleton"
              type="card"
              height="342"
            ></v-skeleton-loader>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
             <v-skeleton-loader
              ref="skeleton"
              type="card"
              height="342"
            ></v-skeleton-loader>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
             <v-skeleton-loader
              ref="skeleton"
              type="card"
              height="342"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </div>
      <div
        v-if="role === 'Admin 1' || role === 'Admin 2' || role === 'Admin 3'"
      >
        <p class="text-capitalize ma-0 pa-2 grey--text">tipe karyawan</p>
        <v-row v-if="!sekeletonJobSeeker">
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
            <v-card elevation="4" color="primary" class="rounded-lg">
              <v-card-title class="d-flex justify-space-around mb-3">
                <v-icon size="50" class="mr-2 white--text">$jobSeeker</v-icon>
                <p class="subtitle-1 ma-0 white--text text-capitalize">
                  {{countIntern}} katu bursa
                </p>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-subtitle class="primaryDark pa-1 d-flex align-center">
                <p
                  class="subtitle-2 white--text text-capitalize ma-0 ml-5 my-1"
                >
                  jumlah magang
                </p>
              </v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
            <v-card elevation="4" color="primary" class="rounded-lg">
              <v-card-title class="d-flex justify-space-around mb-3">
                <v-icon size="50" class="mr-2 white--text">$jobSeeker</v-icon>
                <p class="subtitle-1 ma-0 white--text text-capitalize">
                  {{countPro}} kartu
                </p>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-subtitle class="primaryDark pa-1 d-flex align-center">
                <p
                  class="subtitle-2 white--text text-capitalize ma-0 ml-5 my-1"
                >
                  jumlah profesional
                </p>
              </v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
            <v-card elevation="4" color="primary" class="rounded-lg">
              <v-card-title class="d-flex justify-space-around mb-3">
                <v-icon size="50" class="mr-2 white--text">$jobSeeker</v-icon>
                <p class="subtitle-1 ma-0 white--text text-capitalize">
                  {{countInformal}} kartu
                </p>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-subtitle class="primaryDark pa-1 d-flex align-center">
                <p
                  class="subtitle-2 white--text text-capitalize ma-0 ml-5 my-1"
                >
                  jumlah informal
                </p>
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-if="sekeletonJobSeeker">
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
             <v-skeleton-loader
              ref="skeleton"
              type="card"
              height="342"
            ></v-skeleton-loader>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
             <v-skeleton-loader
              ref="skeleton"
              type="card"
              height="342"
            ></v-skeleton-loader>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
             <v-skeleton-loader
              ref="skeleton"
              type="card"
              height="342"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </div>
      <div v-if="role === 'Admin 3'">
        <p class="text-capitalize ma-0 pa-2 grey--text">admin</p>
        <v-row v-if="!sekeletonAdmin">
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
            <v-card elevation="4" color="primary" class="rounded-lg">
              <v-card-title class="d-flex justify-space-around mb-3">
                <v-icon size="50" class="mr-2 white--text">$admin</v-icon>
                <p class="subtitle-1 ma-0 white--text text-capitalize">
                {{countAdmin1}} user
                </p>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-subtitle class="primaryDark pa-1 d-flex align-center">
                <p
                  class="subtitle-2 white--text text-capitalize ma-0 ml-5 my-1"
                >
                  jumlah kadmin 1
                </p>
              </v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
            <v-card elevation="4" color="primary" class="rounded-lg">
              <v-card-title class="d-flex justify-space-around mb-3">
                <v-icon size="50" class="mr-2 white--text">$admin</v-icon>
                <p class="subtitle-1 ma-0 white--text text-capitalize">
                  {{countAdmin2}} user
                </p>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-subtitle class="primaryDark pa-1 d-flex align-center">
                <p
                  class="subtitle-2 white--text text-capitalize ma-0 ml-5 my-1"
                >
                  jumlah admin 2
                </p>
              </v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
            <v-card elevation="4" color="primary" class="rounded-lg">
              <v-card-title class="d-flex justify-space-around mb-3">
                <v-icon size="50" class="mr-2 white--text">$admin</v-icon>
                <p class="subtitle-1 ma-0 white--text text-capitalize">
                  {{countAdmin3}} user
                </p>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-subtitle class="primaryDark pa-1 d-flex align-center">
                <p
                  class="subtitle-2 white--text text-capitalize ma-0 ml-5 my-1"
                >
                  jumlah admin 3
                </p>
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-if="sekeletonAdmin">
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
             <v-skeleton-loader
              ref="skeleton"
              type="card"
              height="342"
            ></v-skeleton-loader>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
             <v-skeleton-loader
              ref="skeleton"
              type="card"
              height="342"
            ></v-skeleton-loader>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
             <v-skeleton-loader
              ref="skeleton"
              type="card"
              height="342"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </div>
      <div v-if="role === 'Admin 3'">
        <p class="text-capitalize ma-0 pa-2 grey--text">daftar hitam</p>
        <v-row  v-if="!sekeletonBlacklist">
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
            <v-card elevation="4" color="primary" class="rounded-lg">
              <v-card-title class="d-flex justify-space-around mb-3">
                <v-icon size="50" class="mr-2 white--text">$blacklist</v-icon>
                <p class="subtitle-1 ma-0 white--text text-capitalize">
                  {{countblacklist}} user
                </p>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-subtitle class="primaryDark pa-1 d-flex align-center">
                <p
                  class="subtitle-2 white--text text-capitalize ma-0 ml-5 my-1"
                >
                  jumlah daftar hitam
                </p>
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-if="sekeletonBlacklist">
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="6">
             <v-skeleton-loader
              ref="skeleton"
              type="card"
              height="342"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </div>
      <div
        v-if="
          role === 'Perusahaan' ||
          role === 'Pencaker'
        "
      >
        <p class="text-capitalize ma-0 pa-2 grey--text">catatan</p>
        <v-card elevation="3" class="pa-4">
          <div class="d-flex">
            <v-icon class="mr-2 warning--text" size="25">$warning</v-icon>
            <p class="text-capitalize ma-0 text-subtitle-1">
              website atau portal ini hanya mendata karyawan dan UMKM untuk
              lebih lanjut akan dilakukan secara offline
            </p>
          </div>
        </v-card>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: true,
      },
    ],
    role: '',
    countUMKM: 0,
    countUMKMActivate: 0,
    countUMKMNotActivate: 0,
    countJobSeker: 0,
    countJobSekerActivate: 0,
    countJobSekerNotActivate: 0,
    countIntern: 0,
    countInformal: 0,
    countPro: 0,
    countAdmin1: 0,
    countAdmin2: 0,
    countAdmin3: 0,
    countblacklist: 0,
    sekeletonUMKM: true,
    sekeletonJobSeeker: true,
    sekeletonAdmin: true,
    sekeletonBlacklist: true,
  }),
  beforeCreate() {
    if (this.$store.state.role === 'Admin 1' || this.$store.state.role === 'Admin 2' || this.$store.state.role === 'Admin 3') {
      axios({
        baseURL: `${this.$store.state.domain}umkm/count-data`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          this.countUMKM = response.data.data.total;
          this.countUMKMActivate = response.data.data.totalActivate;
          this.countUMKMNotActivate = response.data.data.totalNotActivate;
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        })
        .finally(() => {
          this.sekeletonUMKM = false;
        });
      axios({
        baseURL: `${this.$store.state.domain}job-seeker/count-data`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          this.countJobSeker = response.data.data.total;
          this.countJobSekerActivate = response.data.data.totalActivate;
          this.countJobSekerNotActivate = response.data.data.totalNotActivate;
          this.countIntern = response.data.data.totalIntern;
          this.countInformal = response.data.data.totalInformal;
          this.countPro = response.data.data.totalPro;
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        })
        .finally(() => {
          this.sekeletonJobSeeker = false;
        });
    }
    if (this.$store.state.role === 'Admin 3') {
      axios({
        baseURL: `${this.$store.state.domain}admin/count-data`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          this.countAdmin1 = response.data.data.totalAdmin1;
          this.countAdmin2 = response.data.data.totalAdmin2;
          this.countAdmin3 = response.data.data.totalAdmin3;
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        })
        .finally(() => {
          this.sekeletonAdmin = false;
        });
      axios({
        baseURL: `${this.$store.state.domain}blacklist/count-data`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          this.countblacklist = response.data.data.total;
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        })
        .finally(() => {
          this.sekeletonBlacklist = false;
        });
    }
  },
  created() {
    this.role = this.$store.state.role;
  },
};
</script>

<style scoped>
</style>
