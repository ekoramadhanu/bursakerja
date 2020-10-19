<template>
  <div class="mt-12 pt-1">
    <div class="d-flex justify-center mb-2">
      <div class="max-width px-4">
        <h3 class="text-center my-2 text-uppercase primary--text">
          frequently asked questions
          <hr class="line mx-auto" />
        </h3>
        <h5 class="text-capitalize text-center mb-12">terakhir diperbaharui: {{dateUpdated}}</h5>
        <div class="max-width-faq" v-html="content">
        </div>
      </div>
    </div>
    <footer-home/>
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
        this.dateUpdated = response.data.data.FAQ[0].date;
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

    delete this.content;
    delete this.lastupdate;
    delete this.dateUpdated;
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
.max-width-faq {
  max-width: 600px;
}
div >>> ul{
  line-height: 18px !important;
}
div >>> ol {
  line-height: 18px !important;
}
div >>> li > p {
  margin: 3px !important;
}
</style>
