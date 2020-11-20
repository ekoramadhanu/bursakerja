<template>
  <div class="d-flex justify-center mb-2">
    <div class="max-width">
      <p class="text-center my-2 text-capitalize black--text text-h4 font-weight-bold">
        kategori sumber daya manusia
      </p>
      <p class="text-center my-2 ">
        Kami membagi kategori sumber daya manusia menjadi 4 macam
      </p>
      <!-- <v-lazy
        v-model="isActive"
        :options="{
          threshold: 1,
        }"
        transition="slideUp"
      >
        <div class="max-width-text mx-auto">
          <p class="text-center">
            Kami akan membantu perusahaan terutama UMKM untuk mendapatkan
            karyawan yang berkualitas dan bagi masyarakat yang bergabung akan
            mendapatkan pemberdayaan untuk mendapatkan pekerjaan. Oleh karena
            itu kami menyediakan beberapa layanan sebagai berikut
          </p>
        </div>
      </v-lazy> -->
      <v-lazy
        v-model="isActive"
        :options="{
          threshold: 1,
        }"
      >
        <v-row class="mx-2">
          <v-col cols="12" xl="3" lg="3" md="6" sm="6" xs="12">
            <transition name="fadeUp" appear>
              <v-card
                elevation="3"
                class="rounded-xl"
                :height="getWindowsWidth"
              >
                <v-card-text class="pa-2 size-card-text">
                  <v-img
                    src="@/assets/candidateJobSeeker.svg"
                    height="150"
                    width="150"
                    aspect-ratio="1.7"
                    contain
                    class="mx-auto"
                  ></v-img>
                  <p class="ma-0 text-h6 text-center text-capitalize">
                    karyawan
                  </p>
                  <p class="mb-0 mt-2 text-subtitle-1 text-center">
                    Anda dapat memilih dan merekrut Karyawan sesuai yang anda
                    inginkan berdasarkan kota, formasi maupun pendidikan
                    terakhir
                  </p>
                </v-card-text>
                <v-card-actions
                  class="d-flex justify-center align-end size-card-action"
                >
                  <v-btn
                    color="primary"
                    class="text-capitalize"
                    to="/job-seeker"
                  >
                    lihat selengkapnya
                  </v-btn>
                </v-card-actions>
              </v-card>
            </transition>
          </v-col>
          <v-col cols="12" xl="3" lg="3" md="6" sm="6" xs="12">
            <transition name="fadeUp" :appear="delayOne()">
              <v-card
                elevation="3"
                class="rounded-xl"
                :height="getWindowsWidth"
                v-if="animateOne"
              >
                <v-card-text class="pa-2 size-card-text">
                  <v-img
                    src="@/assets/professional.svg"
                    height="150"
                    width="150"
                    aspect-ratio="1.7"
                    contain
                    class="mx-auto"
                  ></v-img>
                  <p class="ma-0 text-h6 text-center text-capitalize">
                    tenaga profesional
                  </p>
                  <p class="mb-0 mt-2 text-subtitle-1 text-center">
                    profesional adalah SDM yang memiliki kepandaian atau
                    keahlian khusus seperti dokter, pengacara, Master Ceremoni
                    (MC), Ahli Sumur, Montir, Tukang AC,
                  </p>
                </v-card-text>
                <v-card-actions
                  class="d-flex justify-center align-end size-card-action"
                >
                  <v-btn
                    color="primary"
                    class="text-capitalize"
                    to="/job-seeker-professional"
                  >
                    lihat selengkapnya
                  </v-btn>
                </v-card-actions>
              </v-card>
            </transition>
          </v-col>
          <v-col cols="12" xl="3" lg="3" md="6" sm="6" xs="12">
            <transition name="fadeUp" :appear="delayTwo()">
              <v-card
                elevation="3"
                class="rounded-xl"
                :height="getWindowsWidth"
                v-if="animateTwo"
              >
                <v-card-text class="pa-2 size-card-text">
                  <v-img
                    src="@/assets/informalv2.svg"
                    height="150"
                    width="150"
                    aspect-ratio="1.7"
                    contain
                    class="mx-auto"
                  ></v-img>
                  <p class="ma-0 text-h6 text-center text-capitalize">
                    Tenaga Informal
                  </p>
                  <p class="mb-0 mt-2 text-subtitle-1 text-center">
                    Tenaga informal Adalah tenaga kerja seperti asisten rumah
                    tangga, babby sitter, tukang rumput, tukang kebun, tukang
                    ojek, dll
                  </p>
                </v-card-text>
                <v-card-actions
                  class="d-flex justify-center align-end size-card-action"
                >
                  <v-btn
                    color="primary"
                    class="text-capitalize"
                    to="/job-seeker-informal"
                  >
                    lihat selengkapnya
                  </v-btn>
                </v-card-actions>
              </v-card>
            </transition>
          </v-col>
          <v-col cols="12" xl="3" lg="3" md="6" sm="6" xs="12">
            <transition name="fadeUp" :appear="delayThree()">
              <v-card
                elevation="3"
                class="rounded-xl"
                :height="getWindowsWidth"
                v-if="animateThree"
              >
                <v-card-text class="pa-2 size-card-text">
                  <v-img
                    src="@/assets/internship.svg"
                    height="150"
                    width="150"
                    aspect-ratio="1.7"
                    contain
                    class="mx-auto"
                  ></v-img>
                  <p class="ma-0 text-h6 text-center text-capitalize">
                    Tenaga Magang
                  </p>
                  <p class="mb-0 mt-2 text-subtitle-1 text-center">
                    Tenaga magang adalah para lulusan smk, sarjana, umum yang
                    membutuhkan perusahaan tempat untuk menerapkan
                    keahlian/disiplin keilmuannya
                  </p>
                </v-card-text>
                <v-card-actions
                  class="d-flex justify-center align-end size-card-action"
                >
                  <v-btn
                    color="primary"
                    class="text-capitalize"
                    to="/job-seeker-internship"
                  >
                    lihat selengkapnya
                  </v-btn>
                </v-card-actions>
              </v-card>
            </transition>
          </v-col>
        </v-row>
      </v-lazy>
      <!-- <v-lazy
        v-model="isActive"
        :options="{
          threshold: 1,
        }"
      >
        <v-row class="mx-2">
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="12">
            <transition name="fadeUp" :appear="delayThree()">
              <v-card
                elevation="3"
                class="rounded-xl"
                :height="getWindowsWidth"
                v-if="animateThree"
              >
                <v-card-text class="pa-2 size-card-text">
                  <v-img
                    src="@/assets/internship.svg"
                    height="150"
                    width="150"
                    aspect-ratio="1.7"
                    contain
                    class="mx-auto"
                  ></v-img>
                  <p class="ma-0 text-h6 text-center text-capitalize">
                    karyawan magang
                  </p>
                  <p class="mb-0 mt-2 text-subtitle-1 text-center">
                    bagi perusahaan terutama UMKM yang terdaftar di sistem,
                    dapat memilih karyawan magang dengan cepat dan mudah.
                  </p>
                </v-card-text>
                <v-card-actions
                  class="d-flex justify-center align-end size-card-action"
                >
                  <v-btn color="primary" class="text-capitalize" to='/job-seeker-internship'>
                    lihat selengkapnya
                  </v-btn>
                </v-card-actions>
              </v-card>
            </transition>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="12">
            <transition name="fadeUp" :appear="delayFour()">
              <v-card
                elevation="3"
                class="rounded-xl"
                :height="getWindowsWidth"
                v-if="animateFour"
              >
                <v-card-text class="pa-2 size-card-text">
                  <v-img
                    src="@/assets/propose.svg"
                    height="150"
                    width="150"
                    aspect-ratio="1.7"
                    contain
                    class="mx-auto"
                  ></v-img>
                  <p class="ma-0 text-h6 text-center text-capitalize">
                    cari lowongan kerja
                  </p>
                  <p class="mb-0 mt-2 text-subtitle-1 text-center">
                    bagi karyawan yang terdaftar, dapat memilih berbagai macam
                    lowongan perusahaan terutama UMKM di berbagai daerah dengan
                    cepat.
                  </p>
                </v-card-text>
                <v-card-actions
                  class="d-flex justify-center align-end size-card-action"
                >
                  <v-btn color="primary" class="text-capitalize" to='/job-vacancy'>
                    lihat selengkapnya
                  </v-btn>
                </v-card-actions>
              </v-card>
            </transition>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="12">
            <transition name="fadeUp" :appear="delayFive()">
              <v-card
                elevation="3"
                class="rounded-xl"
                :height="getWindowsWidth"
                v-if="animateFive"
              >
                <v-card-text class="pa-2 size-card-text">
                  <v-img
                    src="@/assets/job vacancy.svg"
                    height="150"
                    width="150"
                    aspect-ratio="1.7"
                    contain
                    class="mx-auto"
                  ></v-img>
                  <p class="ma-0 text-h6 text-center text-capitalize">
                    pasang lowongan kerja
                  </p>
                  <p class="mb-0 mt-2 text-subtitle-1 text-center">
                    bagi perusahaan terutama UMKM yang terdaftar di sistem,
                    dapat memasanng lowongan kepada karyawan yang terdaftar
                    dalam sistem kami.
                  </p>
                </v-card-text>
                <v-card-actions
                  class="d-flex justify-center align-end size-card-action"
                >
                  <v-btn color="primary" class="text-capitalize" to='/upload-job-vacancy'>
                    lihat selengkapnya
                  </v-btn>
                </v-card-actions>
              </v-card>
            </transition>
          </v-col>
        </v-row>
      </v-lazy> -->
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isActive: false,
    windowsWidth: null,
    animateOne: false,
    animateTwo: false,
    animateThree: false,
    animateFour: false,
    animateFive: false,
  }),
  watch: {},
  computed: {
    getWindowsWidth() {
      if (this.windowsWidth >= 1264) {
        return 386;
      }
      if (this.windowsWidth >= 960 && this.windowsWidth < 1264) {
        return 390;
      }
      if (this.windowsWidth >= 900 && this.windowsWidth < 960) {
        return 422;
      }
      if (this.windowsWidth >= 700 && this.windowsWidth < 900) {
        return 454;
      }
      if (this.windowsWidth >= 600 && this.windowsWidth < 700) {
        return 540;
      }
      return null;
    },
  },
  methods: {
    rezise() {
      this.windowsWidth = window.innerWidth;
    },
    delayOne() {
      window.setTimeout(() => {
        this.animateOne = true;
      }, 500);
    },
    delayTwo() {
      window.setTimeout(() => {
        this.animateTwo = true;
      }, 1000);
    },
    delayThree() {
      window.setTimeout(() => {
        this.animateThree = true;
      }, 2000);
    },
    delayFour() {
      window.setTimeout(() => {
        this.animateFour = true;
      }, 2500);
    },
    delayFive() {
      window.setTimeout(() => {
        this.animateFive = true;
      }, 3000);
    },
  },
  created() {
    window.addEventListener('resize', this.rezise);
    window.addEventListener('load', this.rezise);
    window.addEventListener('DOMContentLoaded', this.rezise);
  },
  updated() {
    if (this.windowsWidth === null) {
      this.windowsWidth = window.innerWidth;
    }
  },
  beforeDestroy() {
    this.isActive = null;
    this.windowsWidth = null;
    this.animateOne = null;
    this.animateTwo = null;
    this.animateThree = null;
    this.animateFour = null;
    this.animateFive = null;
    this.widthCard = null;

    delete this.isActive;
    delete this.windowsWidth;
    delete this.animateOne;
    delete this.animateTwo;
    delete this.animateThree;
    delete this.animateFour;
    delete this.animateFive;
    delete this.widthCard;
  },
  destroyed() {
    window.removeEventListener('resize', this.rezise);
    window.removeEventListener('load', this.rezise);
    window.removeEventListener('DOMContentLoaded', this.rezise);
  },
};
</script>

<style scoped>
.max-width {
  max-width: 100vw;
  width: 100vw;
}
.max-width-text {
  max-width: 1000px;
  width: 100vw;
}
@media screen and (min-width: 1366px) {
  .max-width {
    max-width: 1366px;
    width: 100vw;
  }
}
.size-card-action {
  height: 15%;
}
.size-card-text {
  height: 85%;
}
</style>
