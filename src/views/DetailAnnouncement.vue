<template>
  <div>
    <v-main>
      <v-container class="d-flex flex-column justify-center size-max">
        <v-breadcrumbs
          :items="items"
          class="text-capitalize pa-2"
        ></v-breadcrumbs>
        <div class="mt-2">
          <p class="text-center text-h5">{{title}}</p>
          <div v-html="content"></div>
        </div>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    items: [
      {
        text: 'pengumuman',
        disabled: false,
        to: '/announcement-panel',
      },
      {
        text: 'pengumuman',
        disabled: false,
      },
    ],
    title: '',
    content: '',
  }),
  beforeCreate() {
    axios({
      baseURL: `${this.$store.state.domain}broadcast/${this.$route.params.id}`,
      method: 'patch',
      headers: {
        'x-api-key': this.$store.state.apiKey,
        authorization: `Bearer ${this.$cookies.get('token')}`,
      },
    })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
    axios({
      baseURL: `${this.$store.state.domain}announcement/${this.$route.params.id}`,
      method: 'get',
      headers: {
        'x-api-key': this.$store.state.apiKey,
        authorization: `Bearer ${this.$cookies.get('token')}`,
      },
    })
      .then((response) => {
        // // eslint-disable-next-line no-console
        // console.log(response.data);
        this.title = response.data.data.announcement[0].title;
        this.content = response.data.data.announcement[0].description;
        this.items.splice(1, 1, {
          text: response.data.data.announcement[0].title,
          disabled: false,
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
};
</script>

<style scoped>
.size-max{
  max-width: 1100px;
}
div >>> ul {
  line-height: 18px !important;
}
div >>> ol {
  line-height: 18px !important;
}
div >>> li > p {
  margin: 3px !important;
}
</style>
