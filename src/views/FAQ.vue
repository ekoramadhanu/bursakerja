<template>
  <div class="mt-12 pt-1">
    <div class="d-flex justify-center mb-4">
      <div class="max-width px-4">
        <h2 class="text-center mt-3 mb-2 text-uppercase black--text">
          frequently asked questions
        </h2>
        <h5 class="text-capitalize text-center mb-12" v-if="!skeleton">
          terakhir diperbaharui: {{ dateUpdated }}
        </h5>
        <v-skeleton-loader
          ref="skeleton"
          type="text"
          v-if="skeleton"
        ></v-skeleton-loader>
        <div class="max-width-faq mx-auto" v-html="content" v-if="!skeleton"></div>
        <v-skeleton-loader
          ref="skeleton"
          type="paragraph"
          v-if="skeleton"
        ></v-skeleton-loader>
      </div>
    </div>
    <footer-home />
  </div>
</template>

<script>
import footer from '@/components/Footer.vue';
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
    'footer-home': footer,
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
div >>> li > ol{
  margin: 0px;
}
div >>> li > ul{
  margin: 0px;
}
</style>
