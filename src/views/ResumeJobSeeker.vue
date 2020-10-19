<template>
  <div>
    <v-main>
      <v-container class="d-flex flex-column justify-center size-max">
        <v-breadcrumbs
          :items="items"
          class="text-capitalize pa-2"
        ></v-breadcrumbs>
        <v-card elevation="3" class="pa-4">
          <div class="d-flex">
            <v-icon class="mr-2 warning--text" size="25">$warning</v-icon>
            <p class="text-capitalize ma-0 text-subtitle-1">
              hati hati data akan disimpan ke database
            </p>
          </div>
        </v-card>
        <v-card class="overflow-hidden mt-3" elevation="3" v-if="!skeleton">
          <v-toolbar flat color="primary">
            <v-icon class="mr-2 white--text">$CV</v-icon>
            <v-toolbar-title
              class="font-weight-light text-capitalize white--text"
            >
              data resume pencari kerja
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="white" fab small @click="isEditing = !isEditing">
              <v-icon v-if="isEditing" class="primary--text">
                mdi-close
              </v-icon>
              <v-icon v-else class="primary--text"> mdi-pencil </v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="py-4 px-6">
            <v-form lazy-validation ref="form">
              <p class="text-capitalize font-weight-bold">1. data diri</p>
              <v-text-field
                v-model="idCard"
                :rules="idCardRules"
                prepend-icon="$idCard"
                label="Nomor KTP / NIK"
                :disabled="!isEditing"
                required
              />
              <v-row>
                <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="12">
                  <v-text-field
                    v-model="frontDegree"
                    :rules="frontDegreeRules"
                    prepend-icon="$degree"
                    label="Gelar Depan"
                    hint="Jika Tidak Ada Silahkan Isi '-'"
                    :disabled="!isEditing"
                    persistent-hint
                    required
                  />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="12">
                  <v-text-field
                    v-model="fullname"
                    :rules="fullnameRules"
                    prepend-icon="$jobSeeker"
                    :disabled="!isEditing"
                    label="Nama Lengkap"
                    required
                  />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="12">
                  <v-text-field
                    prepend-icon="$degree"
                    v-model="backwardDegree"
                    :rules="backwardDegreeRules"
                    label="Gelar Belakang"
                    hint="Jika Tidak Ada Silahkan Isi '-'"
                    :disabled="!isEditing"
                    persistent-hint
                    required
                  />
                </v-col>
              </v-row>
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="computedDateFormatted"
                    label="Tanggal Lahir"
                    prepend-icon="$calendar"
                    :disabled="!isEditing"
                    :rules="dateRules"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
              <v-select
                v-model="sex"
                :rules="sexRules"
                prepend-icon="$gender"
                :items="sexList"
                item-text="name"
                item-value="id"
                :disabled="!isEditing"
                label="Pilih Jenis Kelamin"
              />
              <v-text-field
                prepend-icon="$religion"
                label="Agama"
                required
                :disabled="!isEditing"
                v-model="religion"
                :rules="religionRules"
              />
              <v-select
                v-model="married"
                :rules="marriedRules"
                prepend-icon="$married"
                :items="marriedList"
                item-text="name"
                item-value="id"
                label="Pilih Status Pernikahan"
                :disabled="!isEditing"
              />
              <v-text-field
                v-model="nationality"
                :rules="nationalityRules"
                prepend-icon="$nationality"
                label="Kewarganegaraan"
                required
                :disabled="!isEditing"
              />
              <v-row>
                <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                  <v-text-field
                    v-model="height"
                    :rules="heightRules"
                    :disabled="!isEditing"
                    prepend-icon="$height"
                    label="Berat Badan"
                    required
                  />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                  <v-text-field
                    v-model="weight"
                    :rules="weightRules"
                    :disabled="!isEditing"
                    prepend-icon="$weight"
                    label="Tinggi Badan"
                    required
                  />
                </v-col>
              </v-row>
              <v-text-field
                prepend-icon="$phone"
                label="Telepon"
                required
                :disabled="!isEditing"
                v-model="phone"
                :rules="phoneRules"
              />
              <v-row>
                <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="12">
                  <v-text-field
                    v-model="address"
                    :rules="addressRules"
                    :disabled="!isEditing"
                    prepend-icon="$address"
                    label="Alamat"
                    required
                  />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="12">
                  <v-text-field
                    v-model="district"
                    :rules="districtRules"
                    :disabled="!isEditing"
                    prepend-icon="$address"
                    label="Kecamatan"
                    required
                  />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="12">
                  <v-text-field
                    prepend-icon="$address"
                    label="Kota"
                    required
                    :disabled="!isEditing"
                    v-model="city"
                    :rules="cityRules"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                  <v-text-field
                    v-model="province"
                    :rules="provinceRules"
                    prepend-icon="$address"
                    label="Provinsi"
                    :disabled="!isEditing"
                    required
                  />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                  <v-text-field
                    v-model="postalCode"
                    :rules="postalCodeRules"
                    :disabled="!isEditing"
                    prepend-icon="$address"
                    label="Kode Pos"
                    required
                  />
                </v-col>
              </v-row>
              <p class="text-capitalize font-weight-bold">
                2. data pendidikan terakhir
              </p>
              <v-row>
                <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                  <v-text-field
                    v-model="education"
                    :rules="educationRules"
                    :disabled="!isEditing"
                    prepend-icon="$education"
                    label="Tingkat Pendidikan Terkahir"
                    required
                  />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                  <v-text-field
                    v-model="instantion"
                    :rules="instantionRules"
                    prepend-icon="$education"
                    label="Nama Instansi Pendidikan"
                    :disabled="!isEditing"
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                  <v-text-field
                    v-model="typeEducation"
                    :rules="typeEducationRules"
                    :disabled="!isEditing"
                    prepend-icon="$education"
                    label="Jenis Pendidikan"
                    required
                  />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                  <v-text-field
                    v-model="mayor"
                    :rules="mayorRules"
                    :disabled="!isEditing"
                    prepend-icon="$education"
                    label="Jurusan"
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                  <v-text-field
                    v-model="dateGraduate"
                    :rules="dategraduateRules"
                    :disabled="!isEditing"
                    prepend-icon="$education"
                    label="Tahun Lulus"
                    required
                  />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                  <v-text-field
                    v-model="score"
                    :rules="scoreRules"
                    :disabled="!isEditing"
                    prepend-icon="$education"
                    label="Nilaia Ijazah /IPK"
                    required
                  />
                </v-col>
              </v-row>
              <p class="text-capitalize font-weight-bold">3. keahlian bahasa</p>
              <tip-tap-vuetify
                v-model="skillLanguange"
                :extensions="extensions"
                :disabled="!isEditing"
                :card-props="{ height: '300', style: 'overflow: auto;' }"
              />
              <p class="text-capitalize font-weight-bold">4. keterampilan</p>
              <tip-tap-vuetify
                v-model="skill"
                :extensions="extensions"
                :disabled="!isEditing"
                :card-props="{ height: '300', style: 'overflow: auto;' }"
              />
              <p class="text-capitalize font-weight-bold">
                5. pengalaman kerja
              </p>
              <tip-tap-vuetify
                v-model="experience"
                :extensions="extensions"
                :disabled="!isEditing"
                :card-props="{ height: '300', style: 'overflow: auto;' }"
              />
              <p class="text-capitalize font-weight-bold">6. foto diri</p>
              <v-file-input
                label="Unggah Foto Pribadi 3x4 (Maks 1 MB)"
                accept="image/png, image/jpeg, image/bmp"
                required
                ref="fileInput"
                enctype="multipart/form-data"
                :rules="priviewImage !== null ? [] : imageRules"
                :disabled="!isEditing"
                @change="ChangeImage"
              ></v-file-input>
              <img
                :src="priviewImage"
                v-if="priviewImage != null"
                class="preview-img"
                contain
                aspect-ratio="1.7"
              />
              <p class="text-capitalize font-weight-bold">
                7. data perkerjaan yang diinginkan
              </p>
              <v-row>
                <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                  <v-text-field
                    v-model="deiredRegion"
                    :rules="deiredRegionRules"
                    :disabled="!isEditing"
                    prepend-icon="$location"
                    label="Wilayah yang Diinginkan"
                    required
                  />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                  <v-text-field
                    v-model="location"
                    :rules="locationRules"
                    :disabled="!isEditing"
                    prepend-icon="$location"
                    label="Penempatan"
                    required
                  />
                </v-col>
              </v-row>
              <v-text-field
                prepend-icon="$job"
                label="Jabatan"
                required
                v-model="desiredPosition"
                :rules="desiredPositionRules"
                :disabled="!isEditing"
              />
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="!isEditing" color="primary" @click="save">
              <v-progress-circular
                indeterminate
                color="white"
                v-if="loadingSave"
              />
              <p v-if="!loadingSave" class="text-capitalize my-auto">simpan</p>
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-skeleton-loader
          ref="skeleton"
          type="card"
          v-if="skeleton"
          class="mt-3"
        ></v-skeleton-loader>
      </v-container>
      <v-snackbar
        v-model="hasSaved"
        :timeout="4000"
        top
        right
        color="white"
        max-width="250px"
      >
        <div class="d-flex">
          <v-icon
            :class="
              status === false ? 'mr-2 error--text' : 'mr-2 success--text'
            "
            >{{ icon }}</v-icon
          >
          <p class="text-capitalize black--text ma-0 text-subtitle-1">
            {{ message }}
          </p>
        </div>
      </v-snackbar>
    </v-main>
  </div>
</template>

<script>
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from 'tiptap-vuetify';
import axios from 'axios';

export default {
  data: () => ({
    items: [
      {
        text: 'Curiculum Vitae',
        disabled: true,
      },
    ],
    date: '',
    menu: false,
    sex: '',
    idCard: '',
    idCardRules: [
      (v) => !!v || 'Nomor KTP/NIK Tidak Boleh Kosong',
      (v) => /[0-9]/.test(v) || 'Nomor KTP/NIK Harus Angka (0-9)',
    ],
    frontDegree: '',
    frontDegreeRules: [(v) => !!v || 'Gelar Depan Tidak Boleh Kosong'],
    fullname: '',
    fullnameRules: [(v) => !!v || 'Nama lengkap Tidak Boleh Kosong'],
    backwardDegree: '',
    backwardDegreeRules: [(v) => !!v || 'Gelar Belakang Tidak Boleh Kosong'],
    dateRules: [(v) => !!v || 'Tanggal Lahir Tidak Boleh Kosong'],
    sexList: [
      { id: 'L', name: 'Laki-Laki' },
      { id: 'P', name: 'Perempuan' },
    ],
    sexRules: [(v) => !!v || 'Jenis Kelamin Tidak Boleh Kosong'],
    religion: '',
    religionRules: [(v) => !!v || 'Agama Tidak Boleh Kosong'],
    married: '',
    marriedList: [
      { id: 'Belum', name: 'Belum Menikah' },
      { id: 'Sudah', name: 'Sudah Menikah' },
    ],
    marriedRules: [(v) => !!v || 'Status Pernikahan Tidak Boleh Kosong'],
    nationality: '',
    nationalityRules: [(v) => !!v || 'Kewarganegaraa Tidak Boleh Kosong'],
    height: '',
    heightRules: [
      (v) => !!v || 'Berat Badan Tidak Boleh Kosong',
      (v) => /[0-9]/.test(v) || 'Berat Badan Harus Angka (0-9)',
    ],
    weight: '',
    weightRules: [
      (v) => !!v || 'Tinggi Badan Tidak Boleh Kosong',
      (v) => /[0-9]/.test(v) || 'Tinggi Badan Harus Angka (0-9)',
    ],
    phone: '',
    phoneRules: [
      (v) => !!v || 'Nomor Telepon Tidak Boleh Kosong',
      (v) => /[0-9]/.test(v) || 'Nomor Telepon Harus Angka (0-9)',
      (v) => /^08/.test(v) || 'Nomor Telepon Harus Dimulai Dengan 08...',
    ],
    address: '',
    addressRules: [(v) => !!v || 'Alamat Tidak Boleh Kosong'],
    district: '',
    districtRules: [(v) => !!v || 'Kecamatan Tidak Boleh Kosong'],
    city: '',
    cityRules: [(v) => !!v || 'Kota Tidak Boleh Kosong'],
    province: '',
    provinceRules: [(v) => !!v || 'Provinsi Tidak Boleh Kosong'],
    postalCode: '',
    postalCodeRules: [
      (v) => !!v || 'Kode Pos Tidak Boleh Kosong',
      (v) => /[0-9]/.test(v) || 'Kode Pos Harus Angka (0-9)',
    ],
    education: '',
    educationRules: [(v) => !!v || 'Tingkat Pendidikan Tidak Boleh Kosong'],
    instantion: '',
    instantionRules: [
      (v) => !!v || 'Nama Instansi Pendidikan Tidak Boleh Kosong',
    ],
    typeEducation: '',
    typeEducationRules: [(v) => !!v || 'Jenis Pendidikan Tidak Boleh Kosong'],
    mayor: '',
    mayorRules: [(v) => !!v || 'Jurusan Tidak Boleh Kosong'],
    dateGraduate: '',
    dategraduateRules: [
      (v) => !!v || 'Tahun Kelulusan Tidak Boleh Kosong',
      (v) => /[0-9]/.test(v) || 'Tahun Kelulusan Harus Angka (0-9)',
    ],
    score: '',
    scoreRules: [(v) => !!v || 'Nilai Ijazah /IPK Tidak Boleh Kosong'],
    imageRules: [
      (v) => !!v || 'Gambar Foto Diri Tidak Boleh Kosong',
      (v) => !v || v.size < 1000000 || 'Gambar Foto Diri Harus Kurang Dari 1MB',
    ],
    location: '',
    locationRules: [(v) => !!v || 'Penempatan Tidak Boleh Kosong'],
    deiredRegion: '',
    deiredRegionRules: [
      (v) => !!v || 'Wilayah Yang Diinginkan Tidak Boleh Kosong',
    ],
    desiredPosition: '',
    desiredPositionRules: [
      (v) => !!v || 'Jabatan Yang Diinginkan Tidak Boleh Kosong',
    ],
    // tip tap
    extensions: [
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3],
          },
        },
      ],
      Bold,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak,
    ],
    // starting editor's content
    skillLanguange: '<p>Silahkan Isi Keahlian Bahasa</p>',
    skill: '<p>Silahkan Isi Kemapuan</p>',
    experience: '<p>Silahkan Isi Pengalaman Kerja</p>',
    priviewImage: null,
    isEditing: null,
    hasSaved: false,
    loadingSave: false,
    status: null,
    icon: '',
    message: '',
    skeleton: true,
  }),
  computed: {
    computedDateFormatted() {
      if (this.date !== '') {
        const [year, month, day] = this.date.split('-');
        return `${day}/${month}/${year}`;
      }
      return '';
    },
  },
  components: {
    'tip-tap-vuetify': TiptapVuetify,
  },
  methods: {
    ChangeImage(event) {
      // this.image = event;
      if (event == null) {
        this.priviewImage = null;
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.priviewImage = e.target.result;
        };
        reader.readAsDataURL(event);
      }
    },
    save() {
      if (this.$refs.form.validate()) {
        if (this.skillLanguange.length <= 7) {
          this.hasSaved = true;
          this.status = false;
          this.message = 'keahlian bahasa harus diisi jika tidak punya silahkan isi(-)';
          this.icon = '$warning';
        } else if (this.skill.length <= 7) {
          this.hasSaved = true;
          this.status = false;
          this.message = 'keterampilan harus diisi jika tidak punya silahkan isi(-)';
          this.icon = '$warning';
        } else if (this.experience.length <= 7) {
          this.hasSaved = true;
          this.status = false;
          this.message = 'pengalaman kerja harus diisi jika tidak punya silahkan isi(-)';
          this.icon = '$warning';
        } else {
          this.loadingSave = true;
          axios({
            baseURL: `${this.$store.state.domain}job-seeker/identity`,
            method: 'patch',
            headers: {
              'x-api-key': this.$store.state.apiKey,
              authorization: `Bearer ${this.$cookies.get('token')}`,
            },
            data: {
              idCard: this.idCard,
              fullname: this.fullname,
              frontDegree: this.frontDegree,
              backwardDegree: this.backwardDegree,
              dateOfBirth: this.date,
              sex: this.sex,
              religion: this.religion,
              married: this.married,
              nasionality: this.nationality,
              weight: this.weight,
              height: this.height,
              phone: this.phone,
              address: this.address,
              district: this.district,
              city: this.city,
              province: this.province,
              postalCode: this.postalCode,
              degreeSchool: this.education,
              nameSchool: this.instantion,
              typeSchool: this.typeEducation,
              majors: this.mayor,
              yearsGraduate: this.dateGraduate,
              score: this.score,
              language: this.skillLanguange,
              skill: this.skill,
              experience: this.experience,
              photo: this.priviewImage,
              desiredRegion: this.deiredRegion,
              desiredPosition: this.desiredPosition,
              placement: this.location,
            },
          })
            .then((response) => {
              if (
                response.data.data.message
                === 'Data Job Seeker Is Successfully Update'
              ) {
                this.hasSaved = true;
                this.status = true;
                this.message = 'data berhasil disimpan';
                this.icon = '$success';
                this.isEditing = false;
              } else if (
                response.data.data.message === 'Id Card Has Been Used'
              ) {
                this.hasSaved = true;
                this.status = false;
                this.message = 'NIK sudah digunakan';
                this.icon = '$warning';
              } else {
                this.hasSaved = true;
                this.status = false;
                this.message = 'data tidak berhasil disimpan';
                this.icon = '$warning';
              }
            })
            .catch(() => {
              this.hasSaved = true;
              this.status = false;
              this.message = 'server mengalami error';
              this.icon = '$warning';
            })
            .finally(() => {
              this.loadingSave = false;
            });
        }
      }
    },
  },
  beforeCreate() {
    if (
      this.$store.state.role === 'Informal'
      || this.$store.state.role === 'Umum'
      || this.$store.state.role === 'Profesional'
      || this.$store.state.role === 'Magang'
    ) {
      axios({
        baseURL: `${this.$store.state.domain}job-seeker/token`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          if (response.data.data.jobSeeker.length > 0) {
            this.idCard = response.data.data.jobSeeker[0].idCard;
            this.fullname = response.data.data.jobSeeker[0].fullname;
            this.frontDegree = response.data.data.jobSeeker[0].frontDegree;
            this.backwardDegree = response.data.data.jobSeeker[0].backwardDegree;
            if (response.data.data.jobSeeker[0].dateOfBirth === null) {
              this.date = '';
            } else {
              this.date = response.data.data.jobSeeker[0].dateOfBirth;
            }
            this.sex = response.data.data.jobSeeker[0].sex;
            this.religion = response.data.data.jobSeeker[0].religion;
            this.married = response.data.data.jobSeeker[0].married;
            this.nationality = response.data.data.jobSeeker[0].nasionality;
            this.weight = response.data.data.jobSeeker[0].weight;
            this.height = response.data.data.jobSeeker[0].height;
            this.phone = response.data.data.jobSeeker[0].phone;
            this.address = response.data.data.jobSeeker[0].address;
            this.district = response.data.data.jobSeeker[0].district;
            this.city = response.data.data.jobSeeker[0].city;
            this.province = response.data.data.jobSeeker[0].province;
            this.postalCode = response.data.data.jobSeeker[0].postalCode;
            this.education = response.data.data.jobSeeker[0].degreeSchool;
            this.instantion = response.data.data.jobSeeker[0].nameSchool;
            this.typeEducation = response.data.data.jobSeeker[0].typeSchool;
            this.mayor = response.data.data.jobSeeker[0].majors;
            this.dateGraduate = response.data.data.jobSeeker[0].yearsGraduate;
            this.score = response.data.data.jobSeeker[0].score;
            this.skillLanguange = response.data.data.jobSeeker[0].language;
            this.skill = response.data.data.jobSeeker[0].skill;
            this.experience = response.data.data.jobSeeker[0].experience;
            this.priviewImage = response.data.data.jobSeeker[0].image;
            this.deiredRegion = response.data.data.jobSeeker[0].desiredRegion;
            this.desiredPosition = response.data.data.jobSeeker[0].desiredPosition;
            this.location = response.data.data.jobSeeker[0].placement;
          }
        })
        .catch(() => {
          this.hasSaved = true;
          this.status = false;
          this.message = 'server mengalami error';
          this.icon = '$warning';
        })
        .finally(() => {
          this.skeleton = false;
        });
    } else {
      this.$router.push('/access-block');
    }
  },
};
</script>

<style scoped>
.size-max {
  max-width: 1366px;
}
.tip-tap-size {
  overflow: auto;
  max-height: 300px;
}
.preview-img {
  max-width: 354px;
  max-height: 472px;
}
</style>
