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
                <v-btn text x-small color="dark grey" class="pa-0" to="/"
                  >kembali ke beranda</v-btn
                >
              </v-container>
            </v-row>
            <v-row class="mt-4">
              <v-container>
                <h1 class="display-2 mb-2">Frequently Asked Questions</h1>
                <h2 class="subtitle-1">Diperbarui: {{ dateUpdated }}</h2>
              </v-container>
            </v-row>
            <v-row>
              <v-container>
                <div
                  class="text-justify mt-3"
                  v-html="content"
                  v-if="!skeleton"
                ></div>
              </v-container>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import goTo from 'vuetify/es5/services/goto';

export default {
  data: () => ({
    content: '',
    lastupdate: '',
    dateUpdated: '',
    skeleton: true,
  }),
  components: {
  },
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
  created() {
    goTo(0);
  },
  updated() {
    goTo(0);
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
div >>> ul > li {
  line-height: 25px !important;
}
div >>> ol > li {
  line-height: 25px !important;
}
div >>> li > p {
  margin-bottom: 5px !important;
}
div >>> li {
  margin-bottom: 10px;
}
div >>> li > ol {
  margin: 0px;
}
div >>> li > ul {
  margin: 0px;
}
</style>
