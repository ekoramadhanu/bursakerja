<template>
  <div class="d-flex justify-center mb-2 mt-3">
    <v-lazy
      v-model="isActive"
      :options="{
        threshold: 1,
      }"
      transition="fadeUp"
    >
      <div class="max-width">
        <h2 class="text-center my-2 text-capitalize primaryText--text">
          perusahaan mitra
        </h2>
        <v-carousel
          cycle
          height="200"
          hide-delimiters
          :show-arrows="false"
          next-icon="fas fa-chevron-right"
          eager
          v-if="!skeleton"
        >
          <v-carousel-item v-for="i in returnModuleByCounter(7)" :key="i">
            <v-sheet
              color="white"
              height="100%"
              width="100vw"
              max-width="1366"
              class="d-flex align-center"
            >
              <div class="white" v-for="item in returnlist(i,7)" :key="item.id">
                <v-img
                  :src="item.image"
                  width="180"
                  height="80"
                  aspect-ratio="1.7"
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
    </v-lazy>
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
  }),
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
  max-width: 1366px;
}
.carousel-width {
  width: 100vw;
  max-width: 1366px;
}
</style>
