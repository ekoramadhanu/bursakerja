/*
  Nama        : Eko Ramadhanu Aryputra
  Log Date    : 30 Januri 2020 -> check data  after change image base 64 to link
                               -> add request every get per item
  Log Note    :-
*/
<template>
  <div>
    <v-container>
      <v-row class="full-height align-center">
        <v-col cols="12" lg="6" xl="6" md="6">
          <v-img
            src="@/assets/Login-rafiki.svg"
            max-height="512"
            contain
            class="hidden-xs-only hidden-sm-only"
          ></v-img>
        </v-col>
        <v-col cols="12" lg="6" xl="6" md="6">
          <v-container>
            <v-row>
              <div class="mb-8">
                <v-btn
                  text
                  small
                  color="dark grey"
                  class="pa-0 mb-5 font-family"
                  to="/"
                >
                  <v-icon class="mr-3" size="16">$arrowLeft</v-icon>
                  kembali ke beranda
                </v-btn>
                <h3 class="text-h3 font-weight-bold">
                  <span class="font-family"> Masuk </span>
                </h3>
                <p class="text-subtitle-1 mb-6">
                  <span class="font-family">
                    Silahkan pilih jenis akun dan masukkan alamat email serta
                    kata sandi yang terdaftar
                  </span>
                </p>
                <v-btn
                  text
                  color="dark grey"
                  class="pa-0 mr-10 font-family"
                  to="/login-job-seeker"
                  >Sebagai Pencari Kerja</v-btn
                >
                <v-btn
                  text
                  color="primary"
                  class="pa-0 font-family font-weight-bold"
                  >Sebagai Perusahaan</v-btn
                >
              </div>
            </v-row>
            <v-row>
              <v-card width="100%" max-width="960" elevation="0" class="pa-0">
                <v-card-text class="pa-0">
                  <div v-if="status !== null">
                    <v-alert
                      :type="status === true ? 'success' : 'error'"
                      v-if="status !== null"
                      class="text-capitalize"
                    >
                      {{ message }}
                    </v-alert>
                  </div>
                  <v-form ref="form" lazy-validation>
                    <p class="mb-0 black--text text-capitalize">
                      <span class="font-family">
                        alamat email
                      </span>
                      <span class="ml-1 error--text">
                        *
                      </span>
                    </p>
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="Alamat Email"
                      required
                      outlined
                      single-line
                      dense
                      class="font-family"
                    />
                    <p class="mb-0 black--text text-capitalize">
                      <span class="font-family">
                        kata sandi
                      </span>
                      <span class="ml-1 error--text">
                        *
                      </span>
                    </p>
                    <v-text-field
                      v-model="password"
                      :rules="passwordRules"
                      :type="showPassword ? 'text' : 'password'"
                      :append-icon="showPassword ? '$eye' : '$eyeSlash'"
                      label="Kata Sandi"
                      @click:append="changeShowPassword()"
                      required
                      outlined
                      single-line
                      dense
                      class="font-family"
                    />
                    <div class="hidden-sm-and-down">
                      <div class="d-flex justify-end">
                        <v-btn min-width="100" color="primary" @click="login()">
                          <v-progress-circular
                            indeterminate
                            color="white"
                            v-if="loadingActivated"
                          />
                          <p
                            v-if="!loadingActivated"
                            class="my-auto font-family font-weight-bold"
                          >
                            masuk
                          </p>
                        </v-btn>
                      </div>
                    </div>
                    <div class="hidden-md-and-up">
                      <div class="d-flex flex-column hidden-md-and-up">
                        <v-btn color="primary" @click="login()">
                          <v-progress-circular
                            indeterminate
                            color="white"
                            v-if="loadingActivated"
                          />
                          <p
                            v-if="!loadingActivated"
                            class="my-auto font-family font-weight-bold"
                          >
                            masuk
                          </p>
                        </v-btn>
                      </div>
                    </div>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
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
      (v) => (v.length >= 8 && v.length <= 12) || 'Kata Sandi Harus (8-12)',
    ],
    showPassword: false,
    loadingActivated: false,
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
            } else if (
              response.data.data.message === 'Data Account Not Activate'
            ) {
              this.status = false;
              this.message = 'akun bursa kerja dinonaktifkan';
            } else if (
              response.data.data.message === 'Data Account Not Registered'
            ) {
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
                  Authorization: `Bearer ${this.$cookies.get('token')}`,
                },
              })
                .then((response) => {
                  if (response.data.data.umkm[0].name === null) {
                    this.$store.commit('changeNameUser', '');
                    this.$store.commit('changeUploadData', true);
                  } else if (response.data.data.umkm[0].name.length > 21) {
                    this.$store.commit(
                      'changeNameUser',
                      `${response.data.data.umkm[0].name.substr(0, 21)}....`,
                    );
                    this.$store.commit('changeUploadData', false);
                  } else {
                    this.$store.commit(
                      'changeNameUser',
                      response.data.data.umkm[0].name,
                    );
                    this.$store.commit('changeUploadData', false);
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
  beforeDestroy() {
    this.email = null;
    this.emailRules = null;
    this.password = null;
    this.passwordRules = null;
    this.showPassword = null;
    this.loadingActivated = null;
    this.status = null;
    this.message = null;

    delete this.email;
    delete this.emailRules;
    delete this.password;
    delete this.passwordRules;
    delete this.showPassword;
    delete this.loadingActivated;
    delete this.status;
    delete this.message;
  },
};
</script>

<style scoped>
</style>
