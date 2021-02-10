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
              </v-btn>
              <h3 class="text-h3 font-weight-bold black--text">
                <span class="font-family">
                  {{ title }}
                </span>
              </h3>
              <div class="mt-2 pa-0 mb-4 d-flex">
                <p
                  class="text-capitalize text-subtitle-2 font-weight-regular mb-0 mr-4"
                >
                  <v-icon size="13" class="mr-1">$user</v-icon>
                  <span class="font-family"> admin </span>
                </p>
                <p
                  class="text-capitalize text-subtitle-2 font-weight-regular ma-0"
                >
                  <v-icon size="13" class="mr-1">$calendar</v-icon>
                  <span class="font-family">
                    {{ dateNow }}
                  </span>
                </p>
              </div>
              <div
                class="text-justify font-family black--text"
                v-html="content"
              ></div>
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
    title: '',
    content: '',
    date: '',
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
      }).catch((error) => {
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
        this.title = response.data.data.announcement[0].title;
        this.content = response.data.data.announcement[0].description;
        this.date = response.data.data.announcement[0].create;
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
