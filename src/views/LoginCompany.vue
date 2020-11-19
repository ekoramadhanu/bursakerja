<template>
  <div class="fullscreen d-flex justify-center align-center backgorund-repeat"
  :style="{backgroundImage: `url(${backgroundUrl})` }">
    <div class="pa-2 card-login">
      <p class="text-capitalize text-center text-h4">masuk bursa kerja</p>
      <v-card max-width="450" outlined class="pa-4 mt-2" elevation="3">
        <p class="text-capitalize text-center text-h6">masuk sebagai perusahaan</p>
        <v-alert
          :type="status === true? 'success' : 'error'"
          v-if="status !== null"
          class=" text-capitalize"
        >
          {{message}}
        </v-alert>
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
            :type="showPassword ? 'text': 'password'"
            prepend-icon="$padlock"
            :append-icon="showPassword ? '$eye':'$eyeSlash'"
            label="Kata Sandi"
            @click:append="changeShowPassword()"
            required
          />
          <div class="hidden-xs-only">
            <div class="d-flex justify-end">
              <v-btn min-width="100" color="primary" @click="login()">
                <v-progress-circular indeterminate color="white" v-if="loadingActivated" />
                <p v-if="!loadingActivated" class="text-capitalize my-auto">masuk</p>
              </v-btn>
            </div>
          </div>
          <div class="hidden-sm-and-up">
            <div class="d-flex flex-column hidden-md-and-up">
              <v-btn color="primary" class="text-capitalize" @click="login()">
                <v-progress-circular indeterminate color="white" v-if="loadingActivated" />
                <p v-if="!loadingActivated" class="text-capitalize my-auto">masuk</p>
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
          to="login-job-seeker"
        >
          <v-icon class="mr-2">$login</v-icon>
          <p class="text-capitalize my-auto">masuk sebagai pencaker</p>
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
    loadingActivated: false,
    backgroundUrl,
    status: null,
    message: '',
  }),
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.loadingActivated = true;
        axios({
          baseURL: `${this.$store.state.domain}umkm/login`,
          method: 'post',
          headers: {
            'x-api-key': this.$store.state.apiKey,
          },
          data: {
            email: this.email,
            password: this.password,
          },
        })
          .then((response) => {
            if (response.data.data.message === 'Password Not Match') {
              this.status = false;
              this.message = 'kata sandi anda salah';
            } else if (response.data.data.message === 'Data Account Not Activate') {
              this.status = false;
              this.message = 'akun bursa kerja dinonaktifkan';
            } else if (response.data.data.message === 'Data Account Not Registered') {
              this.status = false;
              this.message = 'akun bursa tidak ada silahkan hubungi pihak bursa kerja';
            } else if (response.data.data.token !== null) {
              this.$store.commit('changeToken', response.data.data.token);
              this.$store.commit('changeCheckToken', true);
              this.$cookies.set('token', response.data.data.token, '1d');
            } else {
              this.status = false;
              this.message = 'ada kesalahan di sistem';
            }
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error);
          })
          .finally(() => {
            this.loadingActivated = false;
            if (this.$cookies.isKey('token')) {
              axios({
                baseURL: `${this.$store.state.domain}umkm/token`,
                method: 'get',
                headers: {
                  'x-api-key': this.$store.state.apiKey,
                  authorization: `Bearer ${this.$cookies.get('token')}`,
                },
              })
                .then((response) => {
                  if (response.data.data.umkm[0].name === null) {
                    this.$store.commit('changeNameUser', '');
                  } else if (response.data.data.umkm[0].name.length > 21) {
                    this.$store.commit('changeNameUser',
                      `${response.data.data.umkm[0].name.substr(0, 21)}....`);
                  } else {
                    this.$store.commit('changeNameUser', response.data.data.umkm[0].name);
                  }
                  this.$store.commit('changeRole', 'Perusahaan');
                  this.$router.push('/home');
                })
                .catch((error) => {
                  // eslint-disable-next-line no-console
                  console.log(error);
                });
            }
          });
      }
    },
    changeShowPassword() {
      this.showPassword = !this.showPassword;
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
.backgorund-repeat{
  background-position: initial;
  background-repeat: space;
  background-size: 90px 90px;
}
</style>
