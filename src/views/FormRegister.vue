<template>
  <div>
    <div class="mt-16">
      <div class="d-flex justify-center">
        <div>
          <v-alert
            border="top"
            colored-border
            color="primary"
            elevation="2"
            max-width="960"
            width="100%"
          >
            <div class="pa-2">
              <h5 class="text-uppercase text-h5 font-weight-bold mb-2">
                formulir pengajuan magang bursakerja
              </h5>
              <div v-if="step === 1 || step ===2  ">
                <p class="text-subtitle-2 font-weight-regular text-justify">
                  Formulir ini digunakan untuk melakukan pendaftaran magang di
                  portal bursakerja. Bagi pengguna yang ingin berminat untuk
                  memposting diri sebagai magang, silahkan isi formulir berikut
                  dengan data sebenar-benarnya. setalah melakukan pengisian
                  silahkan ditunggu
                  <strong>maksimal 1 x 24 jam </strong> untuk diverifikasi oleh
                  operator kami.
                </p>
                <p class="error--text text-subtitle-2 font-weight-regular">
                  * Wajib
                </p>
              </div>
              <div v-if="step === 3">
                <p class="text-subtitle-2 font-weight-regular text-justify">
                  terima kasih telah mengisi formulir ini.
                  silahkan ditunggu
                  <strong>maksimal 1 x 24 jam </strong> untuk diverifikasi oleh
                  operator kami.
                </p>
                <v-btn plain color="primary" text @click="step =1" class="pa-0">
                  kirim data lainnya
                </v-btn>
              </div>
            </div>
          </v-alert>
          <v-form ref="form" lazy-validation>
            <div v-if="step === 1">
              <v-card class="my-4 pa-6 rounded-xl" elevation="4">
                <p class="mb-8 black--text text-capitalize">
                  <span class="font-family"> nomor kartu bursa kerja </span>
                  <span class="ml-1 error--text"> * </span>
                </p>
                <v-text-field
                  v-model="bursaCard"
                  :rules="bursaCardRules"
                  label="Nomor Kartu Bursa Kerja"
                  required
                  single-line
                  dense
                  class="font-family"
                />
              </v-card>
              <v-card class="my-4 pa-6 rounded-xl" elevation="4">
                <p class="mb-8 black--text text-capitalize">
                  <span class="font-family"> PIN kartu bursa kerja </span>
                  <span class="ml-1 error--text"> * </span>
                </p>
                <v-text-field
                  v-model="pin"
                  :rules="pinRules"
                  :type="showPin ? 'text' : 'password'"
                  :append-icon="showPin ? '$eye' : '$eyeSlash'"
                  label="PIN Kartu Bursa Kerja"
                  @click:append="changeShowPin()"
                  required
                  single-line
                  dense
                  class="font-family"
                />
              </v-card>
              <v-btn class="my-4 rounded-lg" color="primary" @click="next()">
                <v-progress-circular
                  indeterminate
                  color="white"
                  v-if="loading"
                />
                <p v-if="!loading" class="my-auto font-weight-bold">
                  selanjutnya
                </p>
              </v-btn>
            </div>
            <div v-if="step === 2">
              <v-card class="my-4 pa-6 rounded-xl" elevation="4">
                <p class="mb-8 black--text text-capitalize">
                  <span class="font-family"> nama magang </span>
                  <span class="ml-1 error--text"> * </span>
                </p>
                <v-text-field
                  v-model="editedItemJobSeeker.name"
                  :rules="nameRules"
                  label="Nama Magang"
                  required
                  single-line
                  dense
                  class="font-family"
                />
              </v-card>
              <v-card class="my-4 pa-6 rounded-xl" elevation="4">
                <p class="mb-8 black--text text-capitalize">
                  <span class="font-family"> posisi magang </span>
                  <span class="ml-1 error--text"> * </span>
                </p>
                <v-autocomplete
                  v-model="editedItemJobSeeker.position"
                  :items="itemsPosition"
                  :loading="isLoadingPosition"
                  :search-input.sync="searchPosition"
                  hide-no-data
                  hide-selected
                  item-text="name"
                  item-value="id"
                  label="Posisi Magang"
                  persistent-hint
                  :rules="positionRules"
                  return-object
                  single-line
                  dense
                  class="font-family"
                />
              </v-card>
              <v-card class="my-4 pa-6 rounded-xl" elevation="4">
                <p class="mb-8 black--text text-capitalize">
                  <span class="font-family"> telepon magang </span>
                  <span class="ml-1 error--text"> * </span>
                </p>
                <v-text-field
                  v-model="editedItemJobSeeker.phone"
                  :rules="phoneRules"
                  label="Telepon Magang"
                  required
                  single-line
                  dense
                  class="font-family"
                />
              </v-card>
              <v-card class="my-4 pa-6 rounded-xl" elevation="4">
                <p class="mb-8 black--text text-capitalize">
                  <span class="font-family"> lokasi yang dinginkan </span>
                  <span class="ml-1 error--text"> * </span>
                </p>
                <v-autocomplete
                  v-model="editedItemJobSeeker.location"
                  :items="itemsLocation"
                  :loading="isLoading"
                  :search-input.sync="searchLocation"
                  hide-no-data
                  hide-selected
                  item-text="name"
                  item-value="name"
                  label="Lokasi Yang Dinginkan"
                  :rules="locationRules"
                  single-line
                  dense
                  class="font-family"
                />
              </v-card>
              <v-card class="my-4 pa-6 rounded-xl" elevation="4">
                <p class="mb-8 black--text text-capitalize">
                  <span class="font-family"> pendidikan terakhir </span>
                  <span class="ml-1 error--text"> * </span>
                </p>
                <v-select
                  v-model="editedItemJobSeeker.school"
                  :items="itemSchool"
                  item-text="name"
                  item-value="name"
                  label="Pendidikan Terakhir"
                  :rules="schoolRules"
                  required
                  single-line
                  dense
                  class="font-family"
                ></v-select>
              </v-card>
              <v-card class="my-4 pa-6 rounded-xl" elevation="4">
                <p class="mb-8 black--text">
                  <span class="font-family"> Foto 3x4 png/jpg (Maks 1MB) </span>
                  <span class="ml-1 error--text"> * </span>
                </p>
                <v-file-input
                  label="Unggah Foto 3x4 png/jpg (Maks 1MB)"
                  accept="image/png, image/jpeg, image/jpg"
                  required
                  ref="fileInput"
                  enctype="multipart/form-data"
                  :rules="imageRules"
                  @change="ChangeImage"
                  prepend-icon="$fileUpload"
                  single-line
                  dense
                  class="font-family"
                ></v-file-input>
                <img
                  :src="editedItemJobSeeker.image"
                  v-if="editedItemJobSeeker.image != null"
                  class="preview-img"
                  contain
                  aspect-ratio="1.7"
                />
              </v-card>
              <v-card class="my-4 pa-6 rounded-xl" elevation="4">
                <p class="mb-8 black--text text-capitalize">
                  <span class="font-family"> deskripsi terkait anda </span>
                  <span class="ml-1 error--text"> * </span>
                </p>
                <v-textarea
                  label="Deskripsi Terkait Anda"
                  v-model="editedItemJobSeeker.description"
                  :rules="descriptionRules"
                  :counter="250"
                  dense
                  single-line
                  class="font-family"
                ></v-textarea>
              </v-card>
              <v-btn
                class="my-4 rounded-lg"
                color="primary"
                @click="send()"
                :disabled="uploadProgress ? true : false"
              >
                kirim
              </v-btn>
            </div>
          </v-form>
        </div>
      </div>
      <v-snackbar
        v-model="hasSaved"
        :timeout="2000"
        bottom
        left
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
      <v-snackbar
        v-model="uploadProgress"
        bottom
        left
        color="white"
        max-width="250px"
      >
        <div class="d-flex">
          <div>
            <p class="text-capitalize mb-0 text-subtitle-1 font-weight-bold blackk-text">
              progress upload file
            </p>
            <v-progress-linear
              :value="percentCompleted"
              color="light-blue"
              height="10"
              striped
            />
          </div>
        </div>
      </v-snackbar>
      <footer-home />
    </div>
  </div>
</template>

<script>
import footer from '@/components/Footer.vue';
import axios from 'axios';

export default {
  data: () => ({
    bursaCard: '',
    bursaCardRules: [
      (v) => !!v || 'Nomor Kartu Bursa Tidak Boleh Kosong',
      (v) => /^BK03/.test(v) || 'Nomor Bursa Kerja Harus Diawali Dengan BK03',
      (v) => /^\S*$/.test(v) || 'Nomor Kartu Bursa Tidak Boleh Ada Spasi',
    ],
    pin: '',
    showPin: false,
    pinRules: [(v) => !!v || 'Pin Kartu Bursa Tidak Boleh Kosong'],
    step: 1,
    editedItemJobSeeker: {
      name: '',
      position: '',
      phone: '',
      location: '',
      school: '',
      expired: '',
      image: '',
      description: '',
    },
    nameRules: [(v) => !!v || 'Nama Pekerja Informal Tidak Boleh Kosong'],
    imageRules: [
      (v) => !!v || 'Foto Perkerja Informal Tidak Boleh Kosong',
      (v) => !v
        || v.size < 1000000
        || 'Foto Perkerja Informal Harus Kurang Dari 1MB',
    ],
    positionRules: [(v) => !!v || 'Posisi Pekerja Informal Tidak Boleh Kosong'],
    phoneRules: [
      (v) => !!v || 'Nomor Telepon Pekerja Informal Tidak Boleh Kosong',
      (v) => /[0-9]/.test(v) || 'Nomor Telepon Pekerja Informal Harus Angka (0-9)',
      (v) => /^08/.test(v)
        || 'Nomor Telepon Pekerja Informal Harus Dimulai Dengan 08...',
    ],
    locationRules: [
      (v) => !!v || 'lokasi Pencaker Informal Tidak Boleh Kosong',
    ],
    itemSchool: [],
    schoolRules: [(v) => !!v || 'Sekolah Pekerja Informal Tidak Boleh Kosong'],
    descriptionRules: [
      (v) => !!v || 'Deskripsi Singkat Anda Tidak Boleh Kosong',
      (v) => /^([^0-9]*)$/.test(v) || 'Deskripsi Singat Anda Tidak Boleh Angka',
      (v) => (v || '').length <= 250
        || 'Deskripsi Singkat Tidak Boleh Lebih Dari 250',
    ],
    entriesPosition: [],
    isLoadingPosition: false,
    searchPosition: null,
    entries: [],
    isLoading: false,
    searchLocation: null,
    id: '',
    hasSaved: false,
    status: null,
    icon: '',
    message: '',
    loading: false,
    percentCompleted: 0,
    uploadProgress: false,
  }),
  components: {
    'footer-home': footer,
  },
  methods: {
    async next() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const response = await axios({
          baseURL: `${this.$store.state.domain}internship/check/card`,
          method: 'post',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            number: this.bursaCard,
            pin: this.pin,
          },
        });
        if (response.data.data.attributes.data.id !== undefined) {
          this.id = response.data.data.attributes.data.id;
          this.step = 2;
        } else if (
          response.data.data.attributes.data === 'Data PIN Not Match'
        ) {
          this.hasSaved = true;
          this.status = false;
          this.message = 'PIN Kartu Tidak Sesuai';
          this.icon = '$warning';
        } else if (
          response.data.data.attributes.data === 'Data Card Not Registered'
        ) {
          this.hasSaved = true;
          this.status = false;
          this.message = 'Kartu Tidak Terdaftar';
          this.icon = '$warning';
        } else {
          this.hasSaved = true;
          this.status = false;
          this.message = 'Sistem mengalami masalah';
          this.icon = '$warning';
        }
        this.loading = false;
      }
    },
    async send() {
      if (this.$refs.form.validate()) {
        this.hasSaved = true;
        this.uploadProgress = true;
        const context = this;
        const response = await axios({
          baseURL: `${this.$store.state.domain}internship/update-guest/${this.id}`,
          method: 'patch',
          headers: {
            'x-api-key': this.$store.state.apiKey,
          },
          data: {
            name: this.editedItemJobSeeker.name,
            position: this.editedItemJobSeeker.position.name,
            description: this.editedItemJobSeeker.description,
            phone: this.editedItemJobSeeker.phone,
            location: this.editedItemJobSeeker.location,
            school: this.editedItemJobSeeker.school,
            photo: this.editedItemJobSeeker.image,
          },
          onUploadProgress(progressEvent) {
            context.percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
          },
        });
        this.uploadProgress = false;
        if (
          response.data.data.attributes.data
              === 'Data Internship Is Successfully Updated'
        ) {
          this.step = 3;
        }
      }
    },
    changeShowPin() {
      this.showPin = !this.showPin;
    },
    ChangeImage(event) {
      // this.image = event;
      if (event == null) {
        this.editedItemJobSeeker.image = null;
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editedItemJobSeeker.image = e.target.result;
        };
        reader.readAsDataURL(event);
      }
    },
    capitalizeEachWord(str) {
      return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
      );
    },
  },
  computed: {
    itemsLocation() {
      return this.entries.map((entry) => {
        const { name } = entry;
        return { ...entry, name };
      });
    },
    itemsPosition() {
      return this.entriesPosition.map((entry) => {
        const { name } = entry;
        return { ...entry, name };
      });
    },
  },
  watch: {
    searchLocation() {
      // Items have already been loaded
      if (this.itemsLocation.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      fetch(`${this.$store.state.domain}city`, {
        headers: {
          'x-api-key': this.$store.state.apiKey,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          res.data.attributes.data.forEach((i) => {
            this.entries.push({
              id: i.id,
              name: this.capitalizeEachWord(i.name),
              provinceId: i.provinceId,
            });
          });
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        })
        // eslint-disable-next-line no-return-assign
        .finally(() => (this.isLoading = false));
    },
    searchPosition() {
      // Items have already been loaded
      if (this.itemsPosition.length > 0) return;

      // Items have already been requested
      if (this.isLoadingPosition) return;

      this.isLoadingPosition = true;

      // Lazily load input items
      fetch(`${this.$store.state.domain}tag-job/type`, {
        headers: {
          'x-api-key': this.$store.state.apiKey,
          type: 'Internship',
        },
      })
        .then((res) => res.json())
        .then((res) => {
          res.data.attributes.forEach((i) => {
            this.entriesPosition.push({
              id: i.id,
              name: this.capitalizeEachWord(i.name.replace('/', '')),
            });
          });
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        })
        // eslint-disable-next-line no-return-assign
        .finally(() => (this.isLoadingPosition = false));
    },
  },
  created() {
    this.itemSchool = [...this.$store.state.itemsSchool];
  },
};
</script>

<style scoped>
.preview-img {
  max-width: 300px;
  max-height: 200px;
}
</style>
