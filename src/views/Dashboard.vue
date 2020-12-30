<template>
  <v-main class="fourth">
    <v-container fluid>
      <!-- <v-breadcrumbs
        :items="items"
        class="text-capitalize pa-2"
      ></v-breadcrumbs> -->
      <div
        v-if="role === 'Admin 1' || role === 'Admin 2' || role === 'Admin 3'"
      >
        <!-- <v-card class="pa-4"> -->
        <div class="d-flex">
          <v-row align="center" justify="center">
            <v-col class="d-none d-sm-none d-sm-flex" md="4" lg="4">
              <v-img src="@/assets/Connected-rafiki.svg" contain></v-img>
            </v-col>
            <v-col md="6" lg="4">
              <h1>Selamat Datang!</h1>
              <p>
                Selamat datang di dasbor bursa kerja. Dari halaman ini, Anda
                dapat melihat ringkasan aktivitas penggunaan Bursakerja. Apabila
                Anda menemui permasalahan atau memerlukan bantuan, silakan
                hubungi kami di media sosial kami.
              </p>
            </v-col>
          </v-row>
        </div>
        <!-- </v-card> -->
        <v-container>
          <v-row v-if="!sekeletonUMKM">
            <v-col cols="12" xl="4" lg="4"
              ><v-card>
                <v-card-title>Jumlah UMKM Tergabung</v-card-title>
                <v-card-text>
                  <h1 class="text-h3">{{ countUMKM }}</h1>
                  <h2 class="subtitle-1">UMKM</h2>
                </v-card-text>
                <v-divider class="mx-4"></v-divider>
                <v-card-text>
                  <v-chip-group column>
                    <v-chip class="success"
                      >{{ countUMKMActivate }} UMKM Aktif</v-chip
                    >
                    <v-chip class="error"
                      >{{ countUMKMNotActivate }} UMKM Nonaktif</v-chip
                    >
                  </v-chip-group>
                </v-card-text>
              </v-card></v-col
            >
            <v-col cols="12" xl="4" lg="4"
              ><v-card>
                <v-card-title>Jumlah Karyawan Tergabung</v-card-title>
                <v-card-text>
                  <h1 class="text-h3">{{ countJobSeker }}</h1>
                  <h2 class="subtitle-1">Orang</h2>
                </v-card-text>
                <v-divider class="mx-4"></v-divider>
                <v-card-text>
                  <v-chip-group column>
                    <v-chip class="orange white--text"
                      >{{ countInformal }} Pekerja Informal</v-chip
                    >
                    <v-chip class="blue white--text"
                      >{{ countIntern }} Pekerja Magang</v-chip
                    >
                    <v-chip class="purple white--text"
                      >{{ countPro }} Pekerja Profesional</v-chip
                    >
                  </v-chip-group>
                </v-card-text>
              </v-card></v-col
            >
            <v-col cols="12" xl="4" lg="4"
              ><v-card>
                <v-card-title>Jumlah Admin</v-card-title>
                <v-card-text>
                  <h1 class="text-h3">
                    {{
                      parseInt(countAdmin1) +
                      parseInt(countAdmin2) +
                      parseInt(countAdmin3)
                    }}
                  </h1>
                  <h2 class="subtitle-1">Admin</h2>
                </v-card-text>
                <v-divider class="mx-4"></v-divider>
                <v-card-text>
                  <v-chip-group column>
                    <v-chip class="orange white--text"
                      >{{ countAdmin1 }} Admin 1</v-chip
                    >
                    <v-chip class="error white--text"
                      >{{ countAdmin2 }} Admin 2</v-chip
                    >
                    <v-chip class="success white--text"
                      >{{ countAdmin3 }} Admin 3</v-chip
                    >
                  </v-chip-group>
                </v-card-text>
              </v-card></v-col
            >
          </v-row>
        </v-container>
      </div>
        <!-- Past Elements was here -->
      <div v-if="role === 'Perusahaan' || role === 'Pencaker'">
        <v-container>
          <!-- <v-card class="pa-4"> -->
          <div class="d-flex">
            <v-row align="center" justify="center">
              <v-col class="d-none d-sm-none d-sm-flex" md="4" lg="6">
                <v-img src="@/assets/Connected-rafiki.svg" contain></v-img>
              </v-col>
              <v-col md="6" lg="6">
                <h1>Selamat Datang!</h1>
                <p>
                  Selamat datang di dasbor bursa kerja. Dari halaman ini, Anda
                  dapat melihat ringkasan aktivitas penggunaan Bursakerja.
                  Apabila Anda menemui permasalahan atau memerlukan bantuan,
                  silakan hubungi kami di media sosial kami.
                </p>
              </v-col>
            </v-row>
          </div>
          <!-- </v-card> -->
        </v-container>
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
    if (
      this.$store.state.role === 'Admin 1'
      || this.$store.state.role === 'Admin 2'
      || this.$store.state.role === 'Admin 3'
    ) {
      axios({
        baseURL: `${this.$store.state.domain}umkm/count-data`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          Authorization: `Bearer ${this.$cookies.get('token')}`,
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
          Authorization: `Bearer ${this.$cookies.get('token')}`,
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
          Authorization: `Bearer ${this.$cookies.get('token')}`,
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
          Authorization: `Bearer ${this.$cookies.get('token')}`,
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
