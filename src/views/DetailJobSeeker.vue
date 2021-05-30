<template>
  <div>
    <v-main class="grey">
      <v-container class="d-flex flex-column justify-center max-width grey">

        <v-card elevation="3" class="pa-4 mx-9">
          <div class="d-flex">
            <v-icon class="mr-2 warning--text" size="25">$warning</v-icon>
            <p class="text-capitalize ma-0 text-subtitle-1">
              untuk lampiran akan dikirimkan ke perusahaan secara langsung
            </p>
          </div>
        </v-card>
        <v-card elevation="3" class="mt-3 mx-9 pa-2" v-if="!skeleton">
          <v-row>
            <v-col cols="12" xl="3" lg="3" md="3" sm="12" xs="12">
              <v-img
                :src="photo"
                width="200"
                max-width="200"
                height="200"
                max-height="2000"
                class="mx-auto"
                v-if="photo !== null"
                contain
              ></v-img>
            </v-col>
            <v-col cols="12" xl="9" lg="9" md="9" sm="12" xs="12">
              <div class="size-description">
                <p class="text-capitalize ma-0 text-h6">{{ fullname }}</p>
                <p class="text-capitalize text-subtitle-1 ma-0">
                  {{ position }}
                </p>
                <p class="text-capitalize text-subtitle-2 ma-0">
                  {{ nameSchool }}, {{ majors }}
                </p>
                <p class="text-capitalize text-subtitle-2 ma-0">
                  lulus tahun {{ yearsGraduate }}
                </p>
                <p class="text-capitalize text-subtitle-2 ma-0">
                  ingin bekerja di {{ region }} dan sekitarnya
                </p>
              </div>
              <!-- <div class="size-button">
                <pdf-create class="d-flex justify-end" :data="jobSeeker[0]" />
              </div> -->
            </v-col>
          </v-row>
        </v-card>
        <v-card elevation="3" class="pa-2 mx-9 mt-3">
          <v-card-title class="text-capitalize font-weight-regular">
            deskripsi singkat
          </v-card-title>
          <v-card-text class="black--text">
            {{ aboutMe }}
          </v-card-text>
        </v-card>
        <v-card elevation="3" class="pa-2 mx-9 mt-3" v-if="!skeleton">
          <v-card-title class="text-capitalize font-weight-regular">
            identitas
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
                <p
                  class="mb-0 text-capitalize text-subtitle-2 font-weight-regular black--text"
                >
                  nama lengkap
                </p>
                <p
                  class="text-capitalize text-subtitle-2 black--text"
                >
                  {{fullname}}
                </p>
                <p
                  class="mb-0 text-capitalize text-subtitle-2 font-weight-regular black--text"
                >
                  tempat / tgl. lahir
                </p>
                <p
                  class="text-capitalize text-subtitle-2 black--text"
                >
                  {{date}}
                </p>
                <p
                  class="mb-0 text-capitalize text-subtitle-2 font-weight-regular black--text"
                >
                  jenis kelamin
                </p>
                <p
                  class="text-capitalize text-subtitle-2 black--text"
                >
                  {{gender}}
                </p>
                <p
                  class="mb-0 text-capitalize text-subtitle-2 font-weight-regular black--text"
                >
                  agama
                </p>
                <p
                  class="text-capitalize text-subtitle-2 black--text"
                >
                  {{religi}}
                </p>
                <p
                  class="mb-0 text-capitalize text-subtitle-2 font-weight-regular black--text"
                >
                  status pernikahan
                </p>
                <p
                  class="text-capitalize text-subtitle-2 black--text"
                >
                  {{married}}
                </p>
                <p
                  class="mb-0 text-capitalize text-subtitle-2 font-weight-regular black--text"
                >
                  kewarganegaraan
                </p>
                <p
                  class="text-capitalize text-subtitle-2 black--text"
                >
                  {{nasionality}}
                </p>
                <p
                  class="mb-0 text-capitalize text-subtitle-2 font-weight-regular black--text"
                >
                  tinggi/berat badan
                </p>
                <p
                  class="text-capitalize text-subtitle-2 black--text"
                >
                  {{height}} cm / {{weight}} kg
                </p>
                <p
                  class="mb-0 text-capitalize text-subtitle-2 font-weight-regular black--text"
                >
                  nomor HP
                </p>
                <p
                  class="text-capitalize text-subtitle-2 black--text"
                >
                  {{phone}}
                </p>
                <p
                  class="mb-0 text-capitalize text-subtitle-2 font-weight-regular black--text"
                >
                  alamat
                </p>
                <p
                  class="text-capitalize text-subtitle-2 black--text"
                >
                  {{address}}
                </p>
              </v-col>
              <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
                <p
                  class="mb-0 text-capitalize text-subtitle-2 font-weight-regular black--text"
                >
                  tingkat pendidikan
                </p>
                <p
                  class="text-capitalize text-subtitle-2 black--text"
                >
                  {{degreeSchool}}
                </p>
                <p
                  class="mb-0 text-capitalize text-subtitle-2 font-weight-regular black--text"
                >
                  nama instansi pendidikan
                </p>
                <p
                  class="text-capitalize text-subtitle-2 black--text"
                >
                  {{nameSchool}}
                </p>
                <p
                  class="mb-0 text-capitalize text-subtitle-2 font-weight-regular black--text"
                >
                  jenis pendidikan
                </p>
                <p
                  class="text-capitalize text-subtitle-2 black--text"
                >
                  {{typeSchool}}
                </p>
                <p
                  class="mb-0 text-capitalize text-subtitle-2 font-weight-regular black--text"
                >
                  jurusan
                </p>
                <p
                  class="text-capitalize text-subtitle-2 black--text"
                >
                  {{majors}}
                </p>
                <p
                  class="mb-0 text-capitalize text-subtitle-2 font-weight-regular black--text"
                >
                  tahun lulus
                </p>
                <p
                  class="text-capitalize text-subtitle-2 black--text"
                >
                  {{yearsGraduate}}
                </p>
                <p
                  class="mb-0 text-capitalize text-subtitle-2 font-weight-regular black--text"
                >
                  nilai
                </p>
                <p
                  class="text-capitalize text-subtitle-2 black--text"
                >
                  {{score}}
                </p>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-title class="text-capitalize font-weight-regular">
            keterampilan
          </v-card-title>
          <v-card-text v-html="skill" class="black--text"> </v-card-text>
          <v-divider></v-divider>
          <v-card-title class="text-capitalize font-weight-regular">
            bahasa keahlian
          </v-card-title>
          <v-card-text v-html="language" class="black--text"> </v-card-text>
          <v-divider></v-divider>
          <v-card-title class="text-capitalize font-weight-regular">
            pengalaman kerja
          </v-card-title>
          <v-card-text v-html="experience" class="black--text"> </v-card-text>
        </v-card>
        <v-skeleton-loader
          ref="skeleton"
          type="card"
          v-if="skeleton"
          class="mt-3"
        ></v-skeleton-loader>
        <!-- <v-row class="mx-6">
          <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
            <v-card elevation="3" v-if="!skeleton">
              <v-card-title class="primary">
                <v-icon class="white--text mr-2">$experience</v-icon>
                <p class="text-capitalize ma-0 white--text">pengalaman kerja</p>
              </v-card-title>
              <v-card-text class="pa-4" v-html="skill"></v-card-text>
            </v-card>
            <v-skeleton-loader
              ref="skeleton"
              type="card"
              v-if="skeleton"
            ></v-skeleton-loader>
          </v-col>
          <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
            <v-card elevation="3" v-if="!skeleton">
              <v-card-title class="primary">
                <v-icon class="white--text mr-2">$language</v-icon>
                <p class="text-capitalize ma-0 white--text">bahasa keahlian</p>
              </v-card-title>
              <v-card-text class="pa-4" v-html="experience"></v-card-text>
            </v-card>
            <v-card elevation="3" class="mt-3" v-if="!skeleton">
              <v-card-title class="primary">
                <v-icon class="white--text mr-2">$language</v-icon>
                <p class="text-capitalize ma-0 white--text">ketrrampilan</p>
              </v-card-title>
              <v-card-text class="pa-4" v-html="language"></v-card-text>
            </v-card>
            <v-skeleton-loader
              ref="skeleton"
              type="card"
              v-if="skeleton"
            ></v-skeleton-loader>
            <v-skeleton-loader
              ref="skeleton"
              type="card"
              v-if="skeleton"
              class="mt-3"
            ></v-skeleton-loader>
          </v-col>
        </v-row> -->
      </v-container>
    </v-main>
  </div>
</template>

<script>
import axios from 'axios';
// import PDFCreate from '@/components/PDFCreate.vue';

export default {
  data: () => ({
    items: [
      {
        text: 'karyawan',
        disabled: false,
        to: '/job-seeker-company',
      },
      {
        text: 'nama',
        disabled: true,
      },
    ],
    photo: '',
    fullname: '',
    position: '',
    region: '',
    aboutMe: '',
    gender: '',
    date: '',
    religi: '',
    married: '',
    nasionality: '',
    weight: '',
    height: '',
    phone: '',
    address: '',
    degreeSchool: '',
    nameSchool: '',
    typeSchool: '',
    majors: '',
    score: '',
    yearsGraduate: '',
    language: '',
    experience: '',
    skill: '',
    skeleton: true,
    jobSeeker: [],
  }),
  components: {
    // 'pdf-create': PDFCreate,
  },
  async beforeCreate() {
    try {
      const response = await axios({
        baseURL: `${this.$store.state.domain}job-seeker/${this.$route.params.id}`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          Authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      });
      this.jobSeeker = [...response.data.data.attributes];
      let frontDegree = null;
      let backkDegree = null;
      let sex = null;
      let married = null;
      if (response.data.data.attributes[0].frontDegree === '-') {
        frontDegree = '';
      } else {
        frontDegree = response.data.data.attributes[0].frontDegree;
      }
      if (response.data.data.attributes[0].backwardDegree === '-') {
        backkDegree = '';
      } else {
        backkDegree = response.data.data.attributes[0].backwardDegree;
      }
      if (response.data.data.attributes[0].sex === 'L') {
        sex = 'Laki-Laki';
      } else {
        sex = 'Perempuan';
      }
      if (response.data.data.attributes[0].married === 'Sudah') {
        married = 'Sudah Menikah';
      } else {
        married = 'Belum Menikah';
      }
      const date = response.data.data.attributes[0].dateOfBirth.split('-');
      this.position = JSON.parse(response.data.data.attributes[0].desiredPosition).join(', ');
      this.region = response.data.data.attributes[0].desiredRegion;
      this.aboutMe = response.data.data.attributes[0].aboutMe;
      this.photo = response.data.data.attributes[0].image;
      this.experience = response.data.data.attributes[0].experience;
      this.skill = response.data.data.attributes[0].skill;
      this.language = response.data.data.attributes[0].language;
      this.fullname = `${frontDegree} ${response.data.data.attributes[0].fullname} ${backkDegree}`;
      this.date = `${response.data.data.attributes[0].placeOfBirth}, 
        ${date[2]} ${this.$store.state.month[date[1] - 1]} ${date[0]}`;
      this.gender = sex;
      this.religi = response.data.data.attributes[0].religion;
      this.married = married;
      this.nasionality = response.data.data.attributes[0].nasionality;
      this.weight = response.data.data.attributes[0].weight;
      this.height = response.data.data.attributes[0].height;
      this.phone = response.data.data.attributes[0].phone;
      this.address = `${response.data.data.attributes[0].address}, 
        kec ${response.data.data.attributes[0].district}, kab/kota ${response.data.data.attributes[0].city},
        provinsi ${response.data.data.attributes[0].province}`;
      this.postalCode = response.data.data.attributes[0].postalCode;
      this.degreeSchool = response.data.data.attributes[0].degreeSchool;
      this.nameSchool = response.data.data.attributes[0].nameSchool;
      this.typeSchool = response.data.data.attributes[0].typeSchool;
      this.majors = response.data.data.attributes[0].majors;
      this.yearsGraduate = response.data.data.attributes[0].yearsGraduate;
      this.score = response.data.data.attributes[0].score;
      this.items.splice(1, 1, {
        text: response.data.data.attributes[0].fullname,
        disabled: true,
      });
      this.skeleton = false;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  },
  beforeDestroy() {
    this.photo = null;
    this.fullname = null;
    this.date = null;
    this.religi = null;
    this.married = null;
    this.nasionality = null;
    this.weight = null;
    this.height = null;
    this.nameSchool = null;
    this.majors = null;
    this.score = null;
    this.yearsGraduate = null;
    this.language = null;
    this.experience = null;
    this.skill = null;

    delete this.photo;
    delete this.fullname;
    delete this.date;
    delete this.religi;
    delete this.married;
    delete this.nasionality;
    delete this.weight;
    delete this.height;
    delete this.nameSchool;
    delete this.majors;
    delete this.score;
    delete this.yearsGraduate;
    delete this.language;
    delete this.experience;
    delete this.skill;
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
.size-description {
  height: 85%;
}
.size-button {
  height: 15%;
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
