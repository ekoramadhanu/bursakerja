<template>
  <div
    class="fullscreen d-flex justify-center align-center backgorund-repeat"
    :style="{ backgroundImage: `url(${backgroundUrl})` }"
  >
    <div class="pa-2 card-login">
      <p class="text-capitalize text-center text-h4">
        aktivasi akun bursa kerja
      </p>
      <v-card max-width="450" outlined class="pa-4 mt-2" elevation="3">
        <p class="text-capitalize text-center text-h6">
          Aktivasi Akun Bursa Kerja
        </p>
        <v-alert
          :type="status === true ? 'success' : 'error'"
          v-if="status !== null"
          class="text-capitalize"
        >
          {{ message }}
        </v-alert>
        <p class="text-justify text-body-2">
          Silahkan isi alamat email dan kata sandi anda untuk melengkapi
          aktivasi akun bursa kerja. Alamat email dan kata sandi ini akan
          digunakan untuk segala kegiatan di bursa kerja.
        </p>
        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            prepend-icon="$email"
            label="Alamat Email"
            required
          />
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="$padlock"
            :append-icon="showPassword ? '$eye' : '$eyeSlash'"
            label="Kata Sandi"
            @click:append="changeShowPassword()"
            required
          />
          <v-text-field
            v-model="repassword"
            :rules="repasswordRules"
            :type="showRePassword ? 'text' : 'password'"
            prepend-icon="$padlock"
            :append-icon="showRePassword ? '$eye' : '$eyeSlash'"
            label="Kata Sandi"
            @click:append="changeShowRePassword()"
            required
          />
          <div class="hidden-xs-only">
            <div class="d-flex justify-end">
              <v-btn min-width="100" color="primary" @click="registered()">
                <v-progress-circular
                  indeterminate
                  color="white"
                  v-if="loadingActivated"
                />
                <p v-if="!loadingActivated" class="text-capitalize my-auto">
                  daftar
                </p>
              </v-btn>
            </div>
          </div>
          <div class="hidden-sm-and-up">
            <div class="d-flex flex-column hidden-md-and-up">
              <v-btn
                color="primary"
                class="text-capitalize"
                @click="registered()"
              >
                <v-progress-circular
                  indeterminate
                  color="white"
                  v-if="loadingActivated"
                />
                <p v-if="!loadingActivated" class="text-capitalize my-auto">
                  daftar
                </p>
              </v-btn>
            </div>
          </div>
        </v-form>
      </v-card>
      <v-card max-height="450" outlined class="mt-2" elevation="3">
        <v-btn
          width="100%"
          height="40"
          color="primary"
          class="text-capitalize"
          to="/login-job-seeker"
        >
          <v-icon class="mr-2">$login</v-icon>
          <p class="text-capitalize my-auto">masuk</p>
        </v-btn>
      </v-card>
    </div>
  </div>
</template>

<script>
import backgroundUrl from '@/assets/bakcgorund.svg';
import axios from 'axios';

export default {
  data: () => ({
    email: '',
    emailRules: [
      (v) => !!v || 'Alamat Email Tidak Boleh Kosong',
      (v) => /^\S*$/.test(v) || 'Alamat Email Tidak Boleh Ada Spasi',
      (v) => /.+@.+\..+/.test(v) || 'Alamat Email Tidak Valid',
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'Kata Sandi Tidak Boleh Kosong',
      (v) => (v.length >= 6 && v.length <= 12) || 'Kata Sandi Harus (6-12)',
    ],
    showPassword: false,
    repassword: '',
    repasswordRules: [
      (v) => !!v || 'Ulangi Kata Sandi Tidak Boleh Kosong',
      (v) => (v.length >= 6 && v.length <= 12) || 'Kata Sandi Harus (6-12)',
    ],
    showRePassword: false,
    loadingActivated: false,
    status: null,
    message: '',
    backgroundUrl,
  }),
  methods: {
    registered() {
      if (this.$refs.form.validate()) {
        if (this.password !== this.repassword) {
          this.status = false;
          this.message = 'kata sandi dan ulangi kata sandi tidak sama';
        } else {
          this.loadingActivated = true;
          axios({
            baseURL: `${this.$store.state.domain}activate-account/${this.$route.params.id}`,
            method: 'patch',
            headers: {
              'x-api-key': this.$store.state.apiKey,
            },
            data: {
              email: this.email,
              password: this.password,
            },
          })
            .then((response) => {
              if (response.data.data.message === 'PIN Not Match') {
                this.status = false;
                this.message = 'PIN kartu salah';
              } else if (
                response.data.data.message === 'Data Has Been Activate'
              ) {
                this.status = false;
                this.message = 'kartu bursa sudah diaktifkan';
              } else if (response.data.data.message === 'Data Not Found') {
                this.status = false;
                this.message = 'kartu bursa tidak ada silahkan hubungi pihak bursa kerja';
              } else {
                this.status = true;
                this.message = 'silahkan masuk / login menggunakan email dan password yang telah anda buat ';
              }
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.log(error);
            })
            .finally(() => {
              this.loadingActivated = false;
            });
        }
      }
    },
    changeShowPassword() {
      this.showPassword = !this.showPassword;
    },
    changeShowRePassword() {
      this.showRePassword = !this.showRePassword;
    },
  },
};
</script>

<style scoped>
.fullscreen {
  width: 100vw;
  height: 100vh;
}
.card-login {
  max-width: 450px;
  width: 450px;
}
.backgorund-repeat {
  background-position: initial;
  background-repeat: space;
  background-size: 90px 90px;
}
</style>
