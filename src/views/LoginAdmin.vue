<template>
  <div>
    <v-container>
      <v-row class="full-height align-center">
        <v-col cols="12" lg="6" xl="6" md="6"
          ><v-img
            src="@/assets/Login-rafiki.svg"
            max-height="512"
            contain
            class="hidden-xs-only hidden-sm-only"
          ></v-img
        ></v-col>
        <v-col cols="12" lg="6" xl="6" md="6">
          <v-container>
            <v-row>
              <div class="mb-8">
                <v-btn text small color="dark grey" class="pa-0 mb-4" to="/"
                  >kembali ke beranda</v-btn
                >
                <h1 class="display-2">Masuk Admin</h1>
                <h2 class="subtitle-1">
                  Silahkan masukkan alamat email dan kata sandi admin yang
                  terdaftar
                </h2>
              </div>
            </v-row>
            <v-row>
              <v-card width="100%" max-width="960">
                <v-card-text v-if="status !== null">
                  <v-alert
                    :type="status ? 'success' : 'error'"
                    class="text-capitalize"
                  >
                    {{ message }}
                  </v-alert>
                </v-card-text>
                <v-card-text>
                  <v-form ref="form" lazy-validation>
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="Alamat Email"
                      required
                    />
                    <v-text-field
                      v-model="password"
                      :rules="passwordRules"
                      :type="showPassword ? 'text' : 'password'"
                      :append-icon="showPassword ? '$eye' : '$eyeSlash'"
                      label="Kata Sandi"
                      @click:append="changeShowPassword()"
                      required
                    />
                    <div class="hidden-xs-only hidden-md-only">
                      <div class="d-flex justify-end">
                        <v-btn min-width="100" color="primary" @click="login()">
                          <v-progress-circular
                            indeterminate
                            color="white"
                            v-if="loadingLogin"
                          />
                          <p v-if="!loadingLogin" class="my-auto">masuk</p>
                        </v-btn>
                      </div>
                    </div>
                    <div class="hidden-md-and-up">
                      <div class="d-flex flex-column hidden-md-and-up">
                        <v-btn color="primary" @click="login()">
                          <v-progress-circular
                            indeterminate
                            color="white"
                            v-if="loadingLogin"
                          />
                          <p v-if="!loadingLogin" class="my-auto">masuk</p>
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
import backgroundUrl from '@/assets/background.svg';
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
    // loading
    loadingLogin: false,
    // baground
    backgroundUrl,
    // alert
    status: null,
    message: '',
  }),
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.loadingLogin = true;
        axios({
          baseURL: `${this.$store.state.domain}admin/login`,
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
            if (response.data.data.message === 'Data Account Not Found') {
              this.status = false;
              this.message = 'akun belum terdaftar, silahkan hubungi pihak bursa kerja';
            } else if (response.data.data.message === 'Password Not Match') {
              this.status = false;
              this.message = 'kata sandi salah';
            } else if (
              response.data.data.message === 'Account Is Non Activated'
            ) {
              this.status = false;
              this.message = 'akun anda tidal aktif, silahkan hubungi pihak bursa kerja';
            } else if (response.data.data.token !== undefined) {
              this.$store.commit('changeToken', response.data.data.token);
              this.$store.commit('changeCheckToken', true);
              this.$cookies.set('token', response.data.data.token, '1d');
            } else {
              this.status = false;
              this.message = 'ada kesalahan di sistem';
            }
          })
          .catch(() => {
            this.status = false;
            this.message = 'ada kesalahan di sistem';
          })
          .finally(() => {
            this.loadingLogin = false;
            axios({
              baseURL: `${this.$store.state.domain}admin/token`,
              method: 'get',
              headers: {
                'x-api-key': this.$store.state.apiKey,
                authorization: `Bearer ${this.$cookies.get('token')}`,
              },
            })
              .then((response) => {
                this.$store.commit(
                  'changeNameUser',
                  response.data.data.admin[0].name,
                );
                this.$store.commit(
                  'changeRole',
                  response.data.data.admin[0].role,
                );
                this.$router.push('/home');
              })
              .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error);
              });
          });
      }
    },
    changeShowPassword() {
      this.showPassword = !this.showPassword;
    },
  },
  beforeDestroy() {
    // set data is null
    this.email = null;
    this.emailRules = null;
    this.password = null;
    this.passwordRules = null;
    this.showPassword = null;
    this.loadingLogin = null;
    this.backgroundUrl = null;
    this.status = null;
    this.message = null;

    // release data from memory
    delete this.email;
    delete this.emailRules;
    delete this.password;
    delete this.passwordRules;
    delete this.showPassword;
    delete this.loadingLogin;
    delete this.backgroundUrl;
    delete this.status;
    delete this.message;
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
