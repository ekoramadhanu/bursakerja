<template>
  <div class="d-flex justify-center mb-2 grey py-16">
    <div class="max-width">
      <p
        class="text-center font-family my-2 text-capitalize black--text text-h4 font-weight-bold"
      >
        <span class="font-family">
          kategori sumber daya manusia
        </span>
      </p>
      <p class="text-center my-2 greySecondary--text">
        <span class="font-family">
          Kami membagi kategori sumber daya manusia menjadi 4 macam
        </span>
      </p>
      <v-row class="d-flex justify-center mt-12">
        <v-col
          cols="12"
          xl="3"
          lg="3"
          md="12"
          sm="12"
          xs="12"
          class="card-column"
        >
          <v-card elevation="3" class="rounded-xl" height="445" width="243">
            <v-card-text class="pa-2 size-card-text">
              <v-img
                src="@/assets/Resume-rafiki.svg"
                height="100%"
                width="100%"
                max-height="243"
                max-width="243"
                aspect-ratio="1.7"
                contain
                class="mx-auto"
              ></v-img>
              <p
                class="ma-0 text-h5 text-center black--text text-capitalize"
              >
                <span class="font-family">
                  karyawan
                </span>
              </p>
              <p class="mb-0 mt-2 text-subtitle-2 text-center">
                <span class="font-family">
                  Rekrut karyawan sesuai kota saat ini, posisi yang diinginkan,
                  dan pendidikan terakhir
                </span>
              </p>
            </v-card-text>
            <v-card-actions
              class="d-flex justify-center align-end size-card-action"
            >
              <v-btn
                color="primary"
                to="/job-seeker"
                width="185"
                height="44"
                class="text-subtitle-2"
              >
                <p class="my-auto font-family">
                  lihat selengkapnya
                </p>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          xl="3"
          lg="3"
          md="12"
          sm="12"
          xs="12"
          class="card-column"
        >
          <v-card elevation="3" class="rounded-xl" height="445" width="243">
            <v-card-text class="pa-2 size-card-text">
              <v-img
                src="@/assets/Electrician-rafiki.svg"
                height="100%"
                width="100%"
                max-width="243"
                max-height="243"
                aspect-ratio="1.7"
                contain
                class="mx-auto"
              ></v-img>
              <p class="ma-0 text-h5 text-center text-capitalize black--text ">
                <span class="font-family">
                  tenaga profesional
                </span>
              </p>
              <p class="mb-0 mt-2 text-subtitle-2 text-center">
                <span class="font-family">
                  Anda dapat merekrut tenaga profesional yang memiliki kepandaian
                  atau keahlian khusus
                </span>
              </p>
            </v-card-text>
            <v-card-actions
              class="d-flex justify-center align-end size-card-action"
            >
              <v-btn
                color="primary"
                width="185"
                height="44"
                class="text-subtitle-2"
                to="/job-seeker-professional"
              >
                <p class="my-auto font-family">
                  lihat selengkapnya
                </p>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          xl="3"
          lg="3"
          md="12"
          sm="12"
          xs="12"
          class="card-column"
        >
          <v-card elevation="3" class="rounded-xl" height="445" width="243">
            <v-card-text class="pa-2 size-card-text">
              <v-img
                src="@/assets/Gardening-rafiki.svg"
                height="100%"
                width="100%"
                max-height="243"
                max-width="243"
                aspect-ratio="1.7"
                contain
                class="mx-auto"
              ></v-img>
              <p class="ma-0 text-h5 text-center text-capitalize black--text">
                <span class="font-family">
                  Tenaga Informal
                </span>
              </p>
              <p class="mb-0 mt-2 text-subtitle-2 text-center">
                <span class="font-family">
                  Tenaga informal mencakup tenaga kerja seperti asisten rumah
                  tangga, pengasuh bayi, dan sebagainya
                </span>
              </p>
            </v-card-text>
            <v-card-actions
              class="d-flex justify-center align-end size-card-action"
            >
              <v-btn
                color="primary"
                width="185"
                height="44"
                class="text-subtitle-2"
                to="/job-seeker-informal"
              >
                <p class="my-auto font-family">
                  lihat selengkapnya
                </p>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          xl="3"
          lg="3"
          md="12"
          sm="12"
          xs="12"
          class="card-column"
        >
          <v-card elevation="3" class="rounded-xl" height="445" width="243">
            <v-card-text class="pa-2 size-card-text">
              <v-img
                src="@/assets/Working-rafiki.svg"
                height="100%"
                width="100%"
                max-height="243"
                max-width="243"
                aspect-ratio="1.7"
                contain
                class="mx-auto"
              ></v-img>
              <p class="ma-0 text-h5 text-center text-capitalize black--text">
                <span class="font-family">
                  Tenaga Magang
                </span>
              </p>
              <p class="mb-0 mt-2 text-subtitle-2 text-center">
                <span class="font-family">
                  Tenaga magang dapat menerapkan disiplin ilmu atau keahliannya di
                  perusahaan Anda
                </span>
              </p>
            </v-card-text>
            <v-card-actions
              class="d-flex justify-center align-end size-card-action"
            >
              <v-btn
                color="primary"
                width="185"
                height="44"
                class="text-subtitle-2"
                to="/job-seeker-internship"
              >
                <p class="my-auto font-family">
                  lihat selengkapnya
                </p>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
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
  computed: {},
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
.card-column {
  max-height: 445px;
  max-width: 243px;
}
</style>
