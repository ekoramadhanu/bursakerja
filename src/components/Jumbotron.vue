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
        class="pl-9 pr-1 d-flex align-center"
      >
        <div class="d-flex flex-column">
          <transition name="slideLeft" appear>
            <h2 class="text-capitalize">Bursakerja.biz123</h2>
          </transition>
          <transition name="slideLeft" appear>
            <p class="text-justify">
              Bursakerja.biz adalah portal bursa kerja yang dikelola untuk
              membantu para pengguna, baik perusahaan atau perorangan, menemukan
              Sumber Daya Manusia yang mumpuni dan berintegritas sesuai
              kualifikasi yang diperlukan. Data pencaker dikelompokkan
              sedemikian rupa berdasarkan kota, posisi yang diinginkan, serta
              pendidikan terakhir untuk memudahkan pengguna menemukan SDM yang
              tepat
            </p>
          </transition>
          <transition name="slideLeft" appear>
            <div class="d-flex">
              <v-btn
                width="150"
                height="40"
                class="mr-2 text-capitalize"
                color="primary"
                @click="start()"
                >mulai sekarang</v-btn
              >
            </div>
          </transition>
        </div>
      </v-col>
      <v-col
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="6"
        xs="12"
        class="d-flex align-center"
      >
        <transition name="slideRight" appear>
          <v-img
            src="@/assets/jumbotron.svg"
            max-height="547"
            height="auto"
            aspect-ratio="1.7"
            contain
          ></v-img>
        </transition>
      </v-col>
    </v-row>
    <v-row class="hidden-sm-and-up max-width">
      <v-col cols="12" xs="12" class="pl-6 pr-6 d-flex align-center">
        <div class="d-flex flex-column">
          <transition name="slideLeft" appear>
            <h2 class="text-capitalize">Bursakerja.biz</h2>
          </transition>
          <transition name="slideLeft" appear>
            <p class="text-justify">
              Bursakerja.biz adalah portal bursa kerja yang dikelola untuk
              membantu para pengguna, baik perusahaan atau perorangan, menemukan
              Sumber Daya Manusia yang mumpuni dan berintegritas sesuai
              kualifikasi yang diperlukan. Data pencaker dikelompokkan
              sedemikian rupa berdasarkan kota, posisi yang diinginkan, serta
              pendidikan terakhir untuk memudahkan pengguna menemukan SDM yang
              tepat
            </p>
          </transition>
          <transition name="slideLeft" appear>
            <div class="d-flex flex-column mt-3">
              <v-btn
                width="150"
                height="40"
                class="mr-2 text-capitalize"
                color="primary"
                @click="start()"
                >mulai sekarang</v-btn
              >
            </div>
          </transition>
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
    max-height: 650px;
  }
}
.max-width {
  max-width: 1366px;
}
@media screen and (max-width: 600px) {
  .max-width {
    max-width: 100vw;
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 1, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
