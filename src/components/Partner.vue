<template>
  <div class="d-flex justify-center mb-2 mt-3">
    <div class="max-width">
      <p class=" text-h4 text-center mt-16 text-capitalize black--text font-weight-bold">
        Mitra Kami
      </p>
      <v-carousel
        cycle
        height="200"
        :show-arrows="false"
        hide-delimiters
        next-icon="fas fa-chevron-right"
        v-if="!skeleton"
      >
        <v-carousel-item v-for="i in returnModuleByCounter(returnWidth)" :key="i">
          <v-sheet
            color="white"
            height="100%"
            width="100vw"
            max-width="1044"
            class="d-flex align-center"
          >
            <div class="white mx-auto" v-for="item in returnlist(i, returnWidth)" :key="item.id">
              <v-img
                :src="item.image"
                width="128"
                height="42"
                aspect-ratio="1.7"
                class="greyscale mr-12"
                contain
              ></v-img>
            </div>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <div class="d-flex" v-if="skeleton">
        <div v-for="i in 7" :key="i">
          <v-skeleton-loader
            ref="skeleton"
            type="image"
            class="mx-2"
          ></v-skeleton-loader>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    slide: 0,
    interval: 0,
    mitra: [],
    skeleton: true,
    isActive: false,
    windowsWidth: null,
  }),
  computed: {
    returnWidth() {
      if (this.windowsWidth >= 1264) {
        return 6;
      } if (this.windowsWidth >= 960 && this.windowsWidth < 1264) {
        return 4;
      } if (this.windowsWidth >= 600 && this.windowsWidth < 960) {
        return 2;
      }
      return 1;
    },
  },
  methods: {
    returnModuleByCounter(counter) {
      const payload = this.mitra.length;
      if (payload % counter === 0) {
        return payload / counter;
      }
      return Math.floor(payload / counter) + 1;
    },
    returnlist(payload, counter) {
      const counterStart = (payload - 1) * counter;
      const counterEnd = payload * counter;
      return this.mitra.slice(counterStart, counterEnd);
    },
    rezise() {
      this.windowsWidth = window.innerWidth;
      console.log(this.windowsWidth);
    },
  },
  beforeCreate() {
    axios({
      baseURL: `${this.$store.state.domain}partner`,
      method: 'get',
      headers: {
        'x-api-key': this.$store.state.apiKey,
      },
    })
      .then((response) => {
        response.data.data.partner.forEach((i) => {
          this.mitra.push({
            id: i.id,
            name: i.name,
            image: i.image,
          });
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      })
      .finally(() => {
        this.skeleton = false;
      });
  },
  created() {
    window.addEventListener('resize', this.rezise);
    window.addEventListener('load', this.rezise);
    window.addEventListener('DOMContentLoaded', this.rezise);
  },
  destroyed() {
    window.removeEventListener('resize', this.rezise);
    window.removeEventListener('load', this.rezise);
    window.removeEventListener('DOMContentLoaded', this.rezise);
  },
  beforeDestroy() {
    this.slide = null;
    this.mitra = null;
    this.skeleton = null;
    this.isActive = null;

    delete this.slide;
    delete this.mitra;
    delete this.skeleton;
    delete this.isActive;
  },
};
</script>

<style scoped>
.max-width {
  max-width: 1044px;
}
.carousel-width {
  width: 100vw;
  max-width: 1366px;
}
.greyscale{
  -webkit-filter:grayscale(100%);
  -moz-filter:grayscale(100%);
  filter:grayscale(100%);
}
.greyscale:hover{
  -webkit-filter:grayscale(0%);
  -moz-filter:grayscale(0%);
  filter:grayscale(0%);
}

</style>
