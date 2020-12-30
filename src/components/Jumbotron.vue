<template>
  <div class="fullscreen d-flex justify-center">
    <v-row class="ma-0 max-width hidden-xs-only">
      <v-col
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="6"
        xs="12"
        class="pr-1 d-flex align-center"
      >
        <div class="d-flex flex-column font-family">
          <!-- <h2 class="text-capitalize">Bursakerja.biz123</h2>
          <p class="text-justify">
            Bursakerja.biz adalah portal bursa kerja yang dikelola untuk
            membantu para pengguna, baik perusahaan atau perorangan, menemukan
            Sumber Daya Manusia yang mumpuni dan berintegritas sesuai
            kualifikasi yang diperlukan. Data pencaker dikelompokkan sedemikian
            rupa berdasarkan kota, posisi yang diinginkan, serta pendidikan
            terakhir untuk memudahkan pengguna menemukan SDM yang tepat
          </p> -->
          <p class="text-capitalize text-h3">
            <span class="font-family font-weight-bold">
              temukan kandidat anda!
            </span>
          </p>
          <p class="text-subtitle-1 font-weight-regular">
            <span class="font-family line-height">
              <span class="font-weight-bold">Bursakerja.net</span>
              adalah portal bursa kerja yang dikelola untuk membantu para
              pengguna, baik perusahaan atau perorangan, menemukan Sumber Daya
              Manusia yang mumpuni dan berintegritas sesuai kualifikasi yang
              diperlukan. Data pencaker dikelompokkan sedemikian rupa
              berdasarkan kota, posisi yang diinginkan, serta pendidikan
              terakhir untuk memudahkan pengguna menemukan SDM yang tepat
            </span>
          </p>
          <v-btn
            width="155"
            height="53"
            class="mt-6"
            color="primary font-weight-bold"
            @click="start()"
          >
            mulai sekarang
          </v-btn>
        </div>
      </v-col>
      <v-col
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="6"
        xs="12"
        class="d-flex align-center justify-center"
      >
        <v-img
          src="@/assets/Job hunt-rafiki.svg"
          max-height="452"
          max-width="452"
          height="100%"
          width="100%"
          aspect-ratio="1.7"
          contain
        ></v-img>
      </v-col>
    </v-row>
    <v-row class="hidden-sm-and-up max-width">
      <v-col cols="12" xs="12" class="pr-6 d-flex align-center">
        <div class="d-flex flex-column">
          <p class="text-capitalize text-h3 font-weight-bold">
            temukan kandidat anda!
          </p>
          <p class="text-subtitle-2 font-weight-regular">
            <span class="font-weight-bold">Bursakerja.net</span>
            adalah portal bursa kerja yang dikelola untuk membantu para
            pengguna, baik perusahaan atau perorangan, menemukan Sumber Daya
            Manusia yang mumpuni dan berintegritas sesuai kualifikasi yang
            diperlukan. Data pencaker dikelompokkan sedemikian rupa berdasarkan
            kota, posisi yang diinginkan, serta pendidikan terakhir untuk
            memudahkan pengguna menemukan SDM yang tepat
          </p>
          <v-btn
            width="155"
            height="53"
            class="mt-6"
            color="primary font-weight-bold"
            @click="start()"
          >
            mulai sekarang
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import goTo from 'vuetify/es5/services/goto';

export default {
  data: () => ({
    outlined: true,
  }),
  components: {},
  methods: {
    changeOutlined() {
      this.outlined = !this.outlined;
    },
    start() {
      const height = window.innerHeight;
      if (height > 800) {
        goTo(650);
      } else {
        goTo(height - 70);
      }
    },
  },
  beforeDestroy() {
    this.outlined = null;

    delete this.outlined;
  },
};
</script>

<style scoped>
.fullscreen {
  height: 100vh;
  width: 100vw;
  /* max-width: 100vw;
  max-height: 571px; */
}
@media screen and (min-height: 800px) {
  .fullscreen {
    height: 100vh;
    width: 100vw;
    max-width: 100vw;
    max-height: 736px;
  }
}
.max-width {
  max-width: 1044px;
}
@media screen and (max-width: 600px) {
  .max-width {
    max-width: 100vw;
  }
}
.line-height{
  line-height: normal;
}
</style>
