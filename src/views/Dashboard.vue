<template>
  <v-main class="fourth">
    <v-container fluid>
      <div
        v-if="role === 'Admin 1' || role === 'Admin 2' || role === 'Admin 3'"
      >
        <div class="d-flex">
          <v-row class="d-flex justify-center align-center">
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
        <v-container>
          <v-row v-if="role === 'Admin 3'">
            <v-col cols="12" xl="4" lg="4" md="12" sm="12" xs="12">
              <v-card v-if="!skeleton" elevation="3" min-height="280">
                <v-card-title>Jumlah Kartu Perusahaan </v-card-title>
                <v-card-text>
                  <h1 class="text-h3">{{ countUMKM }}</h1>
                  <h2 class="subtitle-1">Kartu</h2>
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
              </v-card>
              <v-skeleton-loader
                ref="skeleton"
                type="card"
                v-if="skeleton"
              ></v-skeleton-loader>
            </v-col>
            <v-col cols="12" xl="4" lg="4" md="12" sm="12" xs="12">
              <v-card v-if="!skeleton" elevation="3" min-height="280">
                <v-card-title>Jumlah Kartu Pencaker</v-card-title>
                <v-card-text>
                  <h1 class="text-h3">
                    {{ totalJobSeeker }}
                  </h1>
                  <h2 class="subtitle-1">Kartu</h2>
                </v-card-text>
                <v-divider class="mx-4"></v-divider>
                <v-card-text>
                  <v-chip-group column>
                    <v-chip class="success"
                      >{{ countJobSekerActivate }} Kartu Pencaker Aktif</v-chip
                    >
                    <v-chip class="error"
                      >{{ countJobSekerNotActivate }} Kartu Pencaker Nonaktif</v-chip
                    >
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
              </v-card>
              <v-skeleton-loader
                ref="skeleton"
                type="card"
                v-if="skeleton"
              ></v-skeleton-loader>
            </v-col>
            <v-col cols="12" xl="4" lg="4" md="12" sm="12" xs="12"
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
          <v-row v-if="role === 'Admin 2'">
            <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
              <v-card v-if="!skeleton" elevation="3" min-height="280">
                <v-card-title>Jumlah Kartu Perusahaan </v-card-title>
                <v-card-text>
                  <h1 class="text-h3">{{ countUMKM }}</h1>
                  <h2 class="subtitle-1">Kartu</h2>
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
              </v-card>
              <v-skeleton-loader
                ref="skeleton"
                type="card"
                v-if="skeleton"
              ></v-skeleton-loader>
            </v-col>
            <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
              <v-card v-if="!skeleton" elevation="3" min-height="280">
                <v-card-title>Jumlah Kartu Pencaker</v-card-title>
                <v-card-text>
                  <h1 class="text-h3">
                    {{ totalJobSeeker }}
                  </h1>
                  <h2 class="subtitle-1">Kartu</h2>
                </v-card-text>
                <v-divider class="mx-4"></v-divider>
                <v-card-text>
                  <v-chip-group column>
                    <v-chip class="success"
                      >{{ countJobSekerActivate }} Kartu Pencaker Aktif</v-chip
                    >
                    <v-chip class="error"
                      >{{ countJobSekerNotActivate }} Kartu Pencaker Nonaktif</v-chip
                    >
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
              </v-card>
              <v-skeleton-loader
                ref="skeleton"
                type="card"
                v-if="skeleton"
              ></v-skeleton-loader>
            </v-col>
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
    role: '',
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
    skeleton: true,
  }),
  computed: {
    totalJobSeeker() {
      const total = parseInt(this.countJobSekerActivate, 10) + parseInt(this.countIntern, 10)
      + parseInt(this.countInformal, 10) + parseInt(this.countPro, 10)
      + parseInt(this.countJobSekerNotActivate, 10);
      return total;
    },
    countUMKM() {
      return parseInt(this.countUMKMActivate, 10) + parseInt(this.countUMKMNotActivate, 10);
    },
  },
  beforeCreate() {
    const array = [];
    if (this.$store.state.role === 'Admin 3') {
      array.push(
        axios({
          baseURL: `${this.$store.state.domain}admin/count-data`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        }),
      );
    }
    if (
      this.$store.state.role === 'Admin 1'
      || this.$store.state.role === 'Admin 2'
      || this.$store.state.role === 'Admin 3'
    ) {
      array.push(
        axios({
          baseURL: `${this.$store.state.domain}umkm/count-data`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        }),
        axios({
          baseURL: `${this.$store.state.domain}job-seeker/count-data`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        }),
      );
      Promise.all(array)
        .then((response) => {
          if (this.$store.state.role === 'Admin 3') {
            this.countAdmin1 = response[0].data.data.totalAdmin1;
            this.countAdmin2 = response[0].data.data.totalAdmin2;
            this.countAdmin3 = response[0].data.data.totalAdmin3;
            this.countUMKMActivate = response[1].data.data.totalActivate;
            this.countUMKMNotActivate = response[1].data.data.totalNotActivate;
            this.countJobSekerActivate = response[2].data.data.totalActivate;
            this.countJobSekerNotActivate = response[2].data.data.totalNotActivate;
            this.countIntern = response[2].data.data.totalIntern;
            this.countInformal = response[2].data.data.totalInformal;
            this.countPro = response[2].data.data.totalPro;
          } else {
            this.countUMKMActivate = response[0].data.data.totalActivate;
            this.countUMKMNotActivate = response[0].data.data.totalNotActivate;
            this.countJobSekerActivate = response[1].data.data.totalActivate;
            this.countJobSekerNotActivate = response[1].data.data.totalNotActivate;
            this.countIntern = response[1].data.data.totalIntern;
            this.countInformal = response[1].data.data.totalInformal;
            this.countPro = response[1].data.data.totalPro;
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        })
        .finally(() => {
          this.skeleton = false;
        });
    }
  },
  created() {
    this.role = this.$store.state.role;
  },
  beforeDestroy() {
    this.role = null;
    this.countUMKMActivate = null;
    this.countUMKMNotActivate = null;
    this.countJobSeker = null;
    this.countJobSekerActivate = null;
    this.countJobSekerNotActivate = null;
    this.countIntern = null;
    this.countInformal = null;
    this.countPro = null;
    this.countAdmin1 = null;
    this.countAdmin2 = null;
    this.countAdmin3 = null;
    this.countblacklist = null;
    this.skeleton = null;

    delete this.role;
    delete this.countUMKMActivate;
    delete this.countUMKMNotActivate;
    delete this.countJobSeker;
    delete this.countJobSekerActivate;
    delete this.countJobSekerNotActivate;
    delete this.countIntern;
    delete this.countInformal;
    delete this.countPro;
    delete this.countAdmin1;
    delete this.countAdmin2;
    delete this.countAdmin3;
    delete this.countblacklist;
    delete this.skeleton;
  },
};
</script>

<style scoped>
</style>
