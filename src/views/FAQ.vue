/*
  Nama        : Eko Ramadhanu Aryputra
  Log Date    : 30 Januri 2020 -> check data  after change image base 64 to link
                               -> add request every get per item
  Log Note    :-
*/
<template>
  <div>
    <div class="justify-center">
      <v-container>
        <v-skeleton-loader
          ref="skeleton"
          type="image"
          v-if="skeleton"
          max-height="400"
        ></v-skeleton-loader>
        <v-skeleton-loader
          ref="skeleton"
          type="article"
          v-if="skeleton"
        ></v-skeleton-loader>
      </v-container>
      <div v-if="!skeleton">
        <v-row class="mt-4">
          <v-col cols="8" offset="2">
            <v-row>
              <v-container>
                <v-btn text x-small color="dark grey" class="pa-0 font-family" to="/">
                  kembali ke beranda
                </v-btn>
              </v-container>
            </v-row>
            <v-row class="mt-4">
              <v-container>
                <h3 class="text-h3 mb-2 font-weight-bold">
                  <span class="font-family">
                    Frequently Asked Questions
                  </span>
                </h3>
                <p class="textsubtitle-1">
                  <span class="font-family">
                    Diperbarui: {{ dateUpdated }}
                  </span>
                </p>
              </v-container>
            </v-row>
            <v-row>
              <v-container>
                <div
                  class="text-justify mt-3 font-family"
                  v-html="content"
                  v-if="!skeleton"
                ></div>
              </v-container>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </div>
    <footer-home/>
  </div>
</template>

<script>
import axios from 'axios';
import footer from '@/components/Footer.vue';

export default {
  components: {
    'footer-home': footer,
  },
  data: () => ({
    content: '',
    lastupdate: '',
    dateUpdated: '',
    skeleton: true,
  }),
  beforeCreate() {
    axios({
      baseURL: `${this.$store.state.domain}faq`,
      method: 'get',
      headers: {
        'x-api-key': this.$store.state.apiKey,
      },
    })
      .then((response) => {
        const date = response.data.data.FAQ[0].date.split('-');
        this.dateUpdated = `${date[0]} ${
          this.$store.state.month[parseInt(date[1], 10) - 1]
        } ${date[2]}`;
        this.content = response.data.data.FAQ[0].description;
      })
      .catch(() => {
        this.status = false;
        this.message = 'server mengalami error';
        this.icon = '$warning';
      })
      .finally(() => {
        this.skeleton = false;
      });
  },
  beforeDestroy() {
    this.content = null;
    this.lastupdate = null;
    this.dateUpdated = null;
    this.skeleton = null;

    delete this.content;
    delete this.lastupdate;
    delete this.dateUpdated;
    delete this.skeleton;
  },
};
</script>

<style scoped>
.line {
  width: 50px;
  border: 1px solid #205faf;
}
.max-width {
  width: 90vw;
}
@media screen and (min-width: 1366px) {
  .max-width {
    max-width: 1100px;
    width: 100vw;
  }
}
.max-width-faq {
  max-width: 750px;
}
div >>> ul > li,
div >>> ol > li {
  line-height: 25px !important;
}
div >>> li > p {
  margin-bottom: 0px !important;
  margin-top: 0px !important;
}
div >>> li {
  margin-bottom: 0px;
}
div >>> li > ol,
div >>> li > ul {
  margin: 0px;
}
div >>> p, div >>> h1, div >>> h2, div >>> h3 {
  margin-top: 0px !important;
  margin-bottom: 3px !important;
}
</style>
