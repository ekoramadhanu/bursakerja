<template>
  <div>
    <v-main>
      <v-container class="d-flex flex-column justify-center size-max mb-8">
        <v-row>
          <v-col cols="12" xl="12" lg="12" sm="12" md="12" xs="12">
            <v-container>
              <v-btn
                text
                x-small
                color="dark grey"
                class="pa-0 mb-4"
                @click="$router.go(-1)"
              >
                <v-icon size="15" class="mr-2">$arrowLeft</v-icon>
                kembali
              </v-btn
              >
              <h1 class="display-2 mb-2">{{ title }}</h1>
              <div v-html="content"></div>
            </v-container>
          </v-col>
        </v-row>
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
    if (this.$store.state.role === 'Pencaker') {
      axios({
        baseURL: `${this.$store.state.domain}broadcast/job-seekers/${this.$route.params.id}`,
        method: 'patch',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          Authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
    } else {
      axios({
        baseURL: `${this.$store.state.domain}broadcast/umkm/${this.$route.params.id}`,
        method: 'patch',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          Authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .catch((error) => {
        // eslint-disable-next-line no-console
          console.log(error);
        });
    }
    axios({
      baseURL: `${this.$store.state.domain}announcement/${this.$route.params.id}`,
      method: 'get',
      headers: {
        'x-api-key': this.$store.state.apiKey,
        Authorization: `Bearer ${this.$cookies.get('token')}`,
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
.size-max {
  max-width: 1044px;
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
