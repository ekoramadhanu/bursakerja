<template>
  <div>
    <v-main class="grey d-flex flex-column justify-center">
      <v-container class="max-width">

        <v-card elevation="3">
          <v-card-title class="pa-3 d-flex justify-space-between">
            <p class="text-capitalize ma-0 text-subtitle-1 font-weight-bold">
              daftar lamaran
            </p>
            <p
              class="text-capitalize ma-0 text-subtitle-2 font-weight-regular"
              v-if="!skeleton"
            >
              {{ min }} - {{ max }} dari {{ lengthData }} pekerja
            </p>
          </v-card-title>
        </v-card>
        <div v-if="jobSeeker.length > 0 && !skeleton">
          <div v-for="item in jobSeeker" :key="item.id">
            <transition name="fade" appear>
              <v-card elevation="3" class="mt-4 pa-3">
                <v-card-text class="pa-2">
                  <div class="d-flex">
                    <v-img
                      width="150"
                      max-width="150"
                      height="120"
                      max-height="120"
                      :src="item.image"
                      contain
                      class="mr-2"
                    ></v-img>
                    <div>
                      <p class="text-capitalize ma-0 text-h6">
                        {{ item.name }}
                      </p>
                      <p class="text-capitalize text-subtitle-2 ma-0">
                        {{ item.position }}
                      </p>
                      <p
                        class="text-capitalize text-subtitle-2 font-weight-regular ma-0"
                      >
                        <v-icon class="mr-3" size="12">$phone</v-icon>
                        {{ item.phone }}
                      </p>
                      <p
                        class="text-capitalize text-subtitle-2 font-weight-regular ma-0"
                      >
                        <v-icon class="mr-2" size="12">$school</v-icon>
                        {{ item.school }}
                      </p>
                      <p
                        class="text-capitalize text-subtitle-2 font-weight-regular ma-0"
                      >
                        <v-icon class="mr-3" size="12">$location</v-icon>
                        {{ item.location }}
                      </p>
                    </div>
                  </div>
                  <div class="mt-2 text-subtitle-2 font-weight-regular">
                    {{ item.desc }}
                  </div>
                </v-card-text>
                <v-card-actions class="d-flex justify-end pa-1">
                  <v-btn
                    text
                    color="primary"
                    class="text-capitalize"
                    :to="`/job-seeker-detail/${item.id}`"
                  >
                    selengkapnya
                  </v-btn>
                </v-card-actions>
              </v-card>
            </transition>
          </div>
        </div>
        <div v-if="!skeleton && jobSeeker.length === 0">
          <v-card elevation="3" class="mt-4 pa-3">
            <typical
              class="text-center text-capitalize"
              :steps="[
                `data belum ada di dalam sistem kami. silahkan hubungi pihak kami
                    untuk bertanya lebih lanjut`,
                6000,
              ]"
              :wrapper="'p'"
            />
          </v-card>
        </div>
        <div class="text-canter mt-2">
          <v-pagination
            v-model="page"
            total-visible="10"
            :length="pageCount"
            v-if="!skeleton"
            @input="pagination()"
          ></v-pagination>
        </div>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import axios from 'axios';
import typical from 'vue-typical';

export default {
  data: () => ({
    items: [
      {
        text: 'lowongan kerja',
        disabled: false,
        to: '/upload-job-vacancy',
      },
      {
        text: 'nama',
        disabled: true,
      },
    ],
    page: 1,
    jobSeeker: [],
    pageCount: 0,
    lengthData: 0,
    skeleton: true,
  }),
  computed: {
    min() {
      return (this.page - 1) * 20 + 1;
    },
    max() {
      return (this.page - 1) * 20 + this.jobSeeker.length;
    },
  },
  components: {
    typical,
  },
  beforeCreate() {
    axios({
      baseURL: `${this.$store.state.domain}application-job/${this.$route.params.id}/1`,
      method: 'get',
      headers: {
        'x-api-key': this.$store.state.apiKey,
        authorization: `Bearer ${this.$cookies.get('token')}`,
      },
    })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response.data);
        if (response.data.data.application.length > 0) {
          this.lengthData = response.data.data.total;
          const modulo = response.data.data.total % 10;
          if (modulo === 0) {
            this.pageCount = response.data.data.total / 10;
          } else {
            this.pageCount = (response.data.data.total - modulo) / 10 + 1;
          }
          let counter = 0;
          response.data.data.application.forEach((i) => {
            counter += 1;
            this.jobSeeker.push({
              id: i.jobSeeker.id,
              number: counter,
              name: i.jobSeeker.fullname,
              position: i.jobSeeker.position,
              desc: i.jobSeeker.description,
              phone: i.jobSeeker.phone,
              school: i.jobSeeker.school,
              location: i.jobSeeker.location,
              image: i.jobSeeker.photo,
            });
          });
        } else {
          this.lengthData = 0;
          this.pageCount = 0;
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      })
      .finally(() => {
        this.skeleton = false;
      });
    axios({
      baseURL: `${this.$store.state.domain}job-vacancy/${this.$route.params.id}`,
      method: 'get',
      headers: {
        'x-api-key': this.$store.state.apiKey,
      },
    })
      .then((response) => {
        if (response.data.data.jobVacancy.length === 1) {
          this.items.splice(1, 1, {
            text: response.data.data.jobVacancy[0].name,
            disabled: true,
          });
        }
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
.max-width {
  width: 90vw;
  min-height: 100vh;
}
@media screen and (min-width: 1366px) {
  .max-width {
    max-width: 1100px;
    width: 90vw;
  }
}
.cursor {
  cursor: pointer;
}
@media screen and (max-width: 600px) {
  .max-width {
    max-width: 600px;
    width: 100vw;
  }
}
</style>
