<template>
  <div class="d-flex justify-center mb-2 grey py-16">
    <div class="max-width">
      <p
        class="text-center font-family my-2 text-capitalize black--text text-h4 font-weight-bold"
      >
        <span class="font-family"> kategori sumber daya manusia </span>
      </p>
      <p class="text-center my-2 greySecondary--text">
        <span class="font-family">
          Kami membagi kategori sumber daya manusia kedalam empat kategori
        </span>
      </p>
      <v-row class="d-flex justify-center mt-12 max-width">
        <v-col
          cols="12"
          xl="3"
          lg="3"
          md="6"
          sm="6"
          xs="12"
          class="d-flex justify-center"
        >
          <v-card
            elevation="3"
            class="rounded-lg pb-2"
            height="500"
            width="243"
          >
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
              <p class="ma-0 text-h5 text-center black--text text-capitalize">
                <span class="font-family font-weight-bold"> karyawan </span>
              </p>
              <p class="mb-0 mt-2 text-subtitle-2 text-center">
                <span class="font-family">
                  Rekrut kandidat anda berdasarkan kota, tingkat pendidikan
                  serta posisi yang diinginkan
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
                <p class="my-auto font-family font-weight-bold">
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
          md="6"
          sm="6"
          xs="12"
          class="d-flex justify-center"
        >
          <v-card
            elevation="3"
            class="rounded-lg pb-2"
            height="500"
            width="243"
          >
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
              <p class="ma-0 text-h5 text-center text-capitalize black--text">
                <span class="font-family font-weight-bold">
                  tenaga profesional
                </span>
              </p>
              <p class="mb-0 mt-2 text-subtitle-2 text-center">
                <span class="font-family">
                  Anda dapat menggunakan jasa tenaga profesional yang memiliki
                  keahlian khusus, seperti montir, Tukang Batu, Ahli Taman, Ahli
                  AC, Ahli Sumur, Ahli Kelistrikan dan sebagainya di sini
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
                <p class="my-auto font-family font-weight-bold">
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
          md="6"
          sm="6"
          xs="12"
          class="d-flex justify-center"
        >
          <v-card
            elevation="3"
            class="rounded-lg pb-2"
            height="500"
            width="243"
          >
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
                <span class="font-family font-weight-bold">
                  Tenaga Informal
                </span>
              </p>
              <p class="mb-0 mt-2 text-subtitle-2 text-center">
                <span class="font-family">
                  Tenaga Informal seperti asisten rumah tangga, pengasuh bayi,
                  tukang kebun dapa anda temukan di sini
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
                <p class="my-auto font-family font-weight-bold">
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
          md="6"
          sm="6"
          xs="12"
          class="d-flex justify-center"
        >
          <v-card
            elevation="3"
            class="rounded-lg pb-2"
            height="500"
            width="243"
          >
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
                <span class="font-family font-weight-bold">
                  Tenaga Magang
                </span>
              </p>
              <p class="mb-0 mt-2 text-subtitle-2 text-center">
                <span class="font-family">
                  Program magang perusahaan merupakan salah satu metode efisien
                  dan Low Risk untuk mendapatkan SDM yang tepat. Temukan mereka
                  di sini
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
                <p class="my-auto font-family font-weight-bold">
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
  }),
  watch: {},
  computed: {},
  methods: {
    rezise() {
      this.windowsWidth = window.innerWidth;
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

    delete this.isActive;
    delete this.windowsWidth;
  },
  destroyed() {
    window.removeEventListener('resize', this.rezise);
    window.removeEventListener('load', this.rezise);
  },
};
</script>

<style scoped>
@media screen and (min-width: 1264px) {
  .max-width {
    max-width: 1044px;
    width: 100vw;
  }
}
@media screen and (max-width: 1263px) and (min-width: 960px) {
  .max-width {
    max-width: 960px;
    width: 100vw;
  }
}
.max-width-text {
  max-width: 1000px;
  width: 100vw;
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
