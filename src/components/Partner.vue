<template>
  <div class="d-flex justify-center mb-2">
    <div class="max-width">
      <h3 class="text-center my-2 text-capitalize primary--text">
        mitra
        <hr class="line mx-auto" />
      </h3>
      <v-sheet width="100vw" max-width="1366" >
        <v-slide-group v-model="slide" class="pa-4" show-arrows>
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
    slide: null,
    mitra: [],
  }),
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
