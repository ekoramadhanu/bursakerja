<template>
  <div class="d-flex justify-center mb-2">
    <div class="max-width">
      <h3 class="text-center my-2 text-capitalize primary--text" @click="text()">
        mitra
        <hr class="line mx-auto" />
      </h3>
      <v-sheet width="100vw" max-width="1366" >
        <v-slide-group v-model="slide" class="pa-4" show-arrows ref="test">
          <v-slide-item v-for="item in mitra" :key="item.id">
            <v-img
              :src="item.image"
              width="180"
              height="80"
              aspect-ratio="1.7"
              contain
            ></v-img>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
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
  }),
  methods: {
    text() {
      this.slide += 1;
      // eslint-disable-next-line no-console
      console.log(this.slide);
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
      });
  },
  updated() {
    // eslint-disable-next-line consistent-return
    if (this.mitra.length !== undefined || this.mitra.length !== null) {
      setTimeout(() => {
        this.interval = setInterval(() => {
          if (this.slide === this.mitra.length - 1) {
            clearInterval(this.interval);
            this.slide = 0;
          } else {
            this.slide += 1;
          }
          // eslint-disable-next-line no-console
          console.log(this.slide);
        }, 8000);
      }, 1000);
    }
  },
  beforeDestroy() {
    this.slide = null;
    this.mitra = null;

    delete this.slide;
    delete this.mitra;
  },
};
</script>

<style scoped>
.line {
  width: 50px;
  border: 1px solid #205faf;
}
.max-width {
  max-width: 1366px;
}
</style>
