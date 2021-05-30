<template>
  <div>
    <v-main class="d-flex flex-column justify-center">
      <v-container class="max-width">
        <div v-if="jobSeeker.length > 0 && !skeleton">
          <div v-for="item in jobSeeker" :key="item.id">
            <v-card
              elevation="3"
              class="rounded-xl mt-4"
              width="100vw"
              @click="href(item.id)"
            >
              <v-card-text class="pa-4">
                <v-row>
                  <v-col
                    cols="12"
                    xl="2"
                    lg="2"
                    md="2"
                    sm="12"
                    xs="12"
                    class="d-flex justify-center align-center"
                  >
                    <img
                      :src="item.image"
                      class="preview-img"
                      aspect-ratio="1.7"
                    />
                  </v-col>
                  <v-col cols="12" xl="10" lg="10" md="10" sm="12" xs="12">
                    <p class="font-weight-bold text-h6 black--text mb-0">
                      <span class="font-family">
                        {{ item.name }}
                      </span>
                    </p>
                    <p class="text-subtitle-2 black--text mb-2">
                      <span class="font-family">
                        {{ item.position }}
                      </span>
                    </p>
                    <p class="black--text mb-1 text-subtitle-2">
                      <v-icon size="15" class="mr-3">$location</v-icon>
                      <span class="font-family">
                        {{ item.location }}
                      </span>
                    </p>
                    <p class="black--text text-subtitle-2 mb-4">
                      <v-icon size="15" class="mr-3">$school</v-icon>
                      <span class="font-family">
                        {{ item.school }}
                      </span>
                    </p>
                    <p class="black--text">
                      <span class="font-family">
                        {{ item.desc }}
                      </span>
                    </p>
                  </v-col>
                </v-row>
              </v-card-text>
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
        </div>
        <div v-if="!skeleton && jobSeeker.length === 0">
          <p class="text-capitalize text-center font-family mt-4">
            belum ada karyawan yang melamar
          </p>
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
  methods: {
    href(id) {
      this.$router.push(`/job-seeker-detail/${id}`);
    },
  },
  async beforeCreate() {
    try {
      const response = await axios({
        baseURL: `${this.$store.state.domain}application-job/${this.$route.params.id}/1`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          Authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      });
      if (response.data.data.attributes.length > 0) {
        this.lengthData = response.data.data.total;
        const modulo = response.data.data.total % 10;
        if (modulo === 0) {
          this.pageCount = response.data.data.total / 10;
        } else {
          this.pageCount = (response.data.data.total - modulo) / 10 + 1;
        }
        let counter = 0;
        response.data.data.attributes.forEach((i) => {
          counter += 1;
          this.jobSeeker.push({
            id: i.jobSeeker.id,
            number: counter,
            name: i.jobSeeker.fullname,
            position: JSON.parse(i.jobSeeker.position).join(', '),
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
      this.skeleton = false;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
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
  max-width: 1044px;
}
.cursor {
  cursor: pointer;
}
.preview-img {
  position: relative;
  width: 130px;
  height: 130px;
  overflow: hidden;
  border-radius: 50%;
}
</style>
