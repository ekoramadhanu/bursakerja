<template>
  <div class="mt-12 pt-1">
    <div class="max-width mb-2 mt-2">
      <v-card elevation="3" class="pa-4 mx-9">
        <div class="d-flex">
          <v-icon class="mr-2 warning--text" size="25">$warning</v-icon>
          <p class="text-capitalize ma-0 text-subtitle-1">
            untuk lampiran akan dikirmkan ke UMKM secara langsung
          </p>
        </div>
      </v-card>
      <v-card elevation="3" class="mt-3 mx-9">
        <v-row>
          <v-col cols="12" xl="3" lg="3" md="3" sm="12" xs="12">
            <v-img
              :src="photo"
              height="472"
              width="354"
              max-height="322"
              max-width="204"
              class="mx-auto"
              v-if="photo !== null"
              contain
            ></v-img>
          </v-col>
          <v-col cols="12" xl="9" lg="9" md="9" sm="12" xs="12">
            <div class="d-flex">
              <p class="ma-1 table1 text-capitalize">nama</p>
              <p class="ma-1 mr-2">:</p>
              <p class="ma-1">{{ fullname }}</p>
            </div>
            <div class="d-flex">
              <p class="ma-1 table1 text-capitalize">tangal lahir</p>
              <p class="ma-1 mr-2">:</p>
              <p class="ma-1">{{ date }}</p>
            </div>
            <div class="d-flex">
              <p class="ma-1 table1 text-capitalize">agama</p>
              <p class="ma-1 mr-2">:</p>
              <p class="ma-1">{{ religi }}</p>
            </div>
            <div class="d-flex">
              <p class="ma-1 table1 text-capitalize">status pernikahan</p>
              <p class="ma-1 mr-2">:</p>
              <p class="ma-1">{{ married }}</p>
            </div>
            <div class="d-flex">
              <p class="ma-1 table1 text-capitalize">kebangsaan</p>
              <p class="ma-1 mr-2">:</p>
              <p class="ma-1">{{ nasionality }}</p>
            </div>
            <div class="d-flex">
              <p class="ma-1 table1 text-capitalize">berat / tinggi</p>
              <p class="ma-1 mr-2">:</p>
              <p class="ma-1">{{ weight }} / {{ height }}</p>
            </div>
            <div class="d-flex">
              <p class="ma-1 table1 text-capitalize">pendidikan terakhir</p>
              <p class="ma-1 mr-2">:</p>
              <p class="ma-1">{{ nameSchool }}</p>
            </div>
            <div class="d-flex">
              <p class="ma-1 table1 text-capitalize">jurusan</p>
              <p class="ma-1 mr-2">:</p>
              <p class="ma-1">{{ majors }}</p>
            </div>
            <div class="d-flex">
              <p class="ma-1 table1 text-capitalize">IPK / nilai ijazah</p>
              <p class="ma-1 mr-2">:</p>
              <p class="ma-1">{{ score }}</p>
            </div>
            <div class="d-flex">
              <p class="ma-1 table1 text-capitalize">tahun lulus</p>
              <p class="ma-1 mr-2">:</p>
              <p class="ma-1">{{ yearsGraduate }}</p>
            </div>
          </v-col>
        </v-row>
      </v-card>
      <v-row class="mx-6">
        <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
          <v-card elevation="3">
            <v-card-title class="primary">
              <v-icon class="white--text mr-2">$experience</v-icon>
              <p class="text-capitalize ma-0 white--text">pengalaman kerja</p>
            </v-card-title>
            <v-card-text class="pa-4" v-html="skill"></v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
          <v-card elevation="3">
            <v-card-title class="primary">
              <v-icon class="white--text mr-2">$language</v-icon>
              <p class="text-capitalize ma-0 white--text">bahasa keahlian</p>
            </v-card-title>
            <v-card-text class="pa-4" v-html="experience"></v-card-text>
          </v-card>
          <v-card elevation="3" class="mt-3">
            <v-card-title class="primary">
              <v-icon class="white--text mr-2">$language</v-icon>
              <p class="text-capitalize ma-0 white--text">ketrrampilan</p>
            </v-card-title>
            <v-card-text class="pa-4" v-html="language"></v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <footer-home />
  </div>
</template>

<script>
import axios from 'axios';
import footer from '@/components/Footer.vue';

export default {
  data: () => ({
    photo: '',
    fullname: '',
    date: '',
    religi: '',
    married: '',
    nasionality: '',
    weight: '',
    height: '',
    nameSchool: '',
    majors: '',
    score: '',
    yearsGraduate: '',
    language: '',
    experience: '',
    skill: '',
  }),
  components: {
    'footer-home': footer,
  },
  beforeCreate() {
    axios({
      baseURL: `${this.$store.state.domain}job-seeker/${this.$route.params.id}`,
      method: 'get',
      headers: {
        'x-api-key': this.$store.state.apiKey,
        authorization: `Bearer ${this.$cookies.get('token')}`,
      },
    })
      .then((response) => {
        if (
          (response.data.data.jobSeeker[0].role.name === 'Magang'
            || response.data.data.jobSeeker[0].role.name === 'Umum')
          && this.$store.state.token === ''
        ) {
          this.$router.push('/login-job-seeker');
        } else if (response.data.data.jobSeeker.length > 0) {
          this.photo = response.data.data.jobSeeker[0].image;
          this.experience = response.data.data.jobSeeker[0].experience;
          this.skill = response.data.data.jobSeeker[0].skill;
          this.language = response.data.data.jobSeeker[0].language;
          this.fullname = response.data.data.jobSeeker[0].fullname;
          this.date = response.data.data.jobSeeker[0].dateOfBirth;
          this.religi = response.data.data.jobSeeker[0].religion;
          this.married = response.data.data.jobSeeker[0].married;
          this.nasionality = response.data.data.jobSeeker[0].nasionality;
          this.weight = response.data.data.jobSeeker[0].weight;
          this.height = response.data.data.jobSeeker[0].height;
          this.phone = response.data.data.jobSeeker[0].phone;
          this.address = response.data.data.jobSeeker[0].address;
          this.district = response.data.data.jobSeeker[0].district;
          this.city = response.data.data.jobSeeker[0].city;
          this.province = response.data.data.jobSeeker[0].province;
          this.postalCode = response.data.data.jobSeeker[0].postalCode;
          this.degreeSchool = response.data.data.jobSeeker[0].degreeSchool;
          this.nameSchool = response.data.data.jobSeeker[0].nameSchool;
          this.typeSchool = response.data.data.jobSeeker[0].typeSchool;
          this.majors = response.data.data.jobSeeker[0].majors;
          this.yearsGraduate = response.data.data.jobSeeker[0].yearsGraduate;
          this.score = response.data.data.jobSeeker[0].score;
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
.line {
  width: 50px;
  border: 1px solid #205faf;
}
.max-width {
  max-width: 100vw;
  width: 100vw;
}
@media screen and (min-width: 1366px) {
  .max-width {
    max-width: 1366px;
    width: 100vw;
  }
}
.table1 {
  width: 200px;
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
