<template>
  <div>
    <v-main>
      <v-container fluid>
        <v-btn text color="accent" @click="$router.go(-1)">kembali</v-btn>
        <v-card elevation="3" class="mt-3 pa-4">
          <v-card-title> Data karyawan </v-card-title>
          <v-row v-if="countData > 0">
            <v-col cols="12" xl="3" lg="3" md="3" sm="12" xs="12">
              <v-img
                :src="photo"
                height="472"
                width="354"
                max-height="322"
                max-width="204"
                class="mx-auto"
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
              <div class="d-flex">
                <p class="ma-1 table1 text-capitalize">nomor telepon</p>
                <p class="ma-1 mr-2">:</p>
                <p class="ma-1">{{ phone }}</p>
              </div>
            </v-col>
          </v-row>
          <div v-if="countData === 0">
            <p class="text-center ma-0 text-capitalize">data tidak ditemukan</p>
          </div>
        </v-card>
        <v-card elevation="3" class="mt-3 pa-4">
          <v-card-title>
            <div class="d-flex">
              <v-img
                :src="brand"
                aspect-ratio="1.7"
                width="100vw"
                max-width="100"
                height="100vh"
                max-height="70"
                contain
              ></v-img>
              <div class="my-auto">
                <p
                  class="text-capitalize cursor text-h5"
                  @click="openWebsite()"
                >
                  {{ nameCompany }}
                </p>
              </div>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                <div>
                  <p class="text-capitalize ma-0 text-subtitle-1">
                    pemilik perusahaan
                  </p>
                  <p class="text-capitalize ma-0 text-subtitle-2">
                    {{ owner }}
                  </p>
                </div>
                <div>
                  <p class="text-capitalize ma-0 text-subtitle-1">
                    bidang usaha
                  </p>
                  <p class="text-capitalize ma-0 text-subtitle-2">{{ type }}</p>
                </div>
                <div>
                  <p class="text-capitalize ma-0 text-subtitle-1">
                    Jumlah Cabang
                  </p>
                  <p class="text-capitalize ma-0 text-subtitle-2">
                    {{ branches }}
                  </p>
                </div>
                <div>
                  <p class="text-capitalize ma-0 text-subtitle-1">
                    nomor telepon
                  </p>
                  <p class="text-capitalize ma-0 text-subtitle-2">
                    {{ phone }}
                  </p>
                </div>
              </v-col>
              <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                <div>
                  <p class="text-capitalize ma-0 text-subtitle-1">
                    bentuk badan hukum
                  </p>
                  <p class="text-capitalize ma-0 text-subtitle-2">
                    {{ legality }}
                  </p>
                </div>
                <div>
                  <p class="text-capitalize ma-0 text-subtitle-1">
                    usia perusahaan
                  </p>
                  <p class="text-capitalize ma-0 text-subtitle-2">{{ old }}</p>
                </div>
                <div>
                  <p class="text-capitalize ma-0 text-subtitle-1">
                    total karyawan
                  </p>
                  <p class="text-capitalize ma-0 text-subtitle-2">
                    {{ employee }}
                  </p>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
          <div v-if="countUmkm === 0">
            <p class="text-center ma-0 text-capitalize">data tidak ditemukan</p>
          </div>
        </v-card>
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
        text: 'detail blacklist',
        disabled: true,
      },
    ],
    countData: null,
    countUmkm: null,
    link: '',
    brand: '',
    nameCompany: '',
    owner: '',
    type: '',
    branches: '',
    phone: '',
    legality: '',
    old: '',
    employee: '',
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
    phoneEmployee: '',
  }),
  methods: {
    openWebsite() {
      window.open(this.link);
    },
  },
  async beforeCreate() {
    if (this.$store.state.role !== 'Admin 3') {
      this.$router.push('/access-block');
    } else {
      try {
        const response = await axios({
          baseURL: `${this.$store.state.domain}job-seeker/Id-card/${this.$route.params.jobSeeker}`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        });
        this.countData = response.data.data.attributes.length;
        if (response.data.data.attributes.length > 0) {
          this.photo = response.data.data.attributes[0].image;
          this.experience = response.data.data.attributes[0].experience;
          this.skill = response.data.data.attributes[0].skill;
          this.language = response.data.data.attributes[0].language;
          this.fullname = response.data.data.attributes[0].fullname;
          this.date = response.data.data.attributes[0].dateOfBirth;
          this.religi = response.data.data.attributes[0].religion;
          this.married = response.data.data.attributes[0].married;
          this.nasionality = response.data.data.attributes[0].nasionality;
          this.weight = response.data.data.attributes[0].weight;
          this.height = response.data.data.attributes[0].height;
          this.phone = response.data.data.attributes[0].phone;
          this.address = response.data.data.attributes[0].address;
          this.district = response.data.data.attributes[0].district;
          this.city = response.data.data.attributes[0].city;
          this.province = response.data.data.attributes[0].province;
          this.postalCode = response.data.data.attributes[0].postalCode;
          this.degreeSchool = response.data.data.attributes[0].degreeSchool;
          this.nameSchool = response.data.data.attributes[0].nameSchool;
          this.typeSchool = response.data.data.attributes[0].typeSchool;
          this.majors = response.data.data.attributes[0].majors;
          this.yearsGraduate = response.data.data.attributes[0].yearsGraduate;
          this.score = response.data.data.attributes[0].score;
          this.phoneEmployee = response.data.data.attributes[0].phone;
        }
        const response1 = await axios({
          baseURL: `${this.$store.state.domain}umkm/id/${this.$route.params.company}`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        });
        this.countUmkm = response1.data.data.attributes.length;
        if (response1.data.data.attributes.length > 0) {
          this.brand = response1.data.data.attributes[0].imageLogo;
          this.nameCompany = response1.data.data.attributes[0].name;
          this.owner = response1.data.data.attributes[0].owner;
          this.type = response1.data.data.attributes[0].type;
          this.branches = response1.data.data.attributes[0].branches;
          this.phone = response1.data.data.attributes[0].phone;
          this.legality = response1.data.data.attributes[0].legality;
          this.old = response1.data.data.attributes[0].old;
          this.employee = response1.data.data.attributes[0].employee;
          this.link = response1.data.data.attributes[0].linkWebsite;
        }
        this.skeleton = false;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  },
};
</script>

<style scoped>
.cursor {
  cursor: pointer;
}
</style>
