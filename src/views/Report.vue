<template>
  <div>
    <v-main>
      <v-container class="d-flex flex-column justify-center size-max">
        <v-card class="overflow-hidden mt-3">
          <v-toolbar flat color="primary">
            <v-icon class="mr-2 white--text">$warning</v-icon>
            <v-toolbar-title class="font-weight-light text-capitalize  white--text"
              >lapor</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn color="white" fab small @click="isEditing = !isEditing">
              <v-icon v-if="isEditing" class="primary--text">mdi-close</v-icon>
              <v-icon v-else class="primary--text">mdi-pencil</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-form lazy-validation ref="form">
              <p class="mb-0 black--text">
                <span class="font-family">NIK</span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <v-text-field
                label="NIK"
                required
                v-model="idCard"
                :rules="idCardRules"
                :disabled="!isEditing"
                outlined
                single-line
                dense
                class="font-family"
              />
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family">nama yang akan dilapor</span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <v-text-field
                label="Nama Yang Akan Dilapor"
                required
                v-model="name"
                :rules="nameRules"
                :disabled="!isEditing"
                outlined
                single-line
                dense
                class="font-family"
              />
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family">nomor telepon orang yang dilaporkan</span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <v-text-field
                label="Nomor Telepon Orang Yang Dilaporkan"
                required
                v-model="phone"
                :rules="phoneRules"
                :disabled="!isEditing"
                outlined
                single-line
                dense
                class="font-family"
              />
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!isEditing"
              color="primary"
              @click="save"
              text
            >
              <v-progress-circular
                indeterminate
                color="primary"
                v-if="loadingSave"
              ></v-progress-circular>
              <p
                class=" my-auto"
                v-if="!loadingSave"
              >
                simpan
              </p>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
      <v-snackbar
        v-model="hasSaved"
        :timeout="2000"
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
import axios from 'axios';

export default {
  data: () => ({
    items: [
      {
        text: 'lapor',
        disabled: true,
      },
    ],
    isEditing: null,
    isLoading: false,
    idCard: '',
    idCardRules: [
      (v) => !!v || 'Nomor KTP/NIK Tidak Boleh Kosong',
      (v) => /[0-9]/.test(v) || 'Nomor KTP/NIK Harus Angka (0-9)',
    ],
    name: '',
    nameRules: [
      (v) => !!v || 'Nama Yang dilaporkan Tidak Boleh Kosong',
    ],
    phone: '',
    phoneRules: [
      (v) => !!v || 'Nomor telepon Yang dilaporkan Tidak Boleh Kosong',
    ],
    loadingSave: false,
    hasSaved: false,
    status: null,
    icon: '',
    message: '',
  }),
  methods: {
    async save() {
      if (this.$refs.form.validate()) {
        try {
          this.loadingSave = true;
          const response = await axios({
            baseURL: `${this.$store.state.domain}blacklist`,
            method: 'post',
            headers: {
              'x-api-key': this.$store.state.apiKey,
              Authorization: `Bearer ${this.$cookies.get('token')}`,
            },
            data: {
              jobSeeker: this.name,
              phone: this.phone,
              idCard: this.idCard,
            },
          });
          if (response.data.data.attributes.data === 'Data Blacklist Is Successfully Create') {
            this.hasSaved = true;
            this.status = true;
            this.message = 'data berhasil simpan';
            this.icon = '$success';
          } else {
            this.hasSaved = true;
            this.status = false;
            this.message = 'data tidak berhasil simpan';
            this.icon = '$warning';
          }
          this.$refs.form.reset();
          this.loadingSave = false;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      }
    },
  },
  beforeCreate() {
    if (this.$store.state.role !== 'Perusahaan') {
      this.$router.push('/access-block');
    } else if (this.$store.state.uploadData) {
      if (this.$store.state.role === 'Pencaker') {
        this.$router.push('/resume-job-seeker');
      } else {
        this.$router.push('/data-umkm');
      }
    }
  },
};
</script>

<style scoped>
.preview-img {
  max-width: 354px;
  max-height: 472px;
}
</style>
