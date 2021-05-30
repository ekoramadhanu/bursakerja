<template>
  <div>
    <v-container class="font-family">
      <v-row class="full-height d-flex align-center">
        <v-col cols="12" lg="6" xl="6" md="6" sm="12" xs="12">
          <v-img
            src="@/assets/Login-rafiki.svg"
            max-height="512"
            contain
            class="hidden-xs-only hidden-sm-only"
          ></v-img
        ></v-col>
        <v-col cols="12" lg="6" xl="6" md="6" sm="12" xs="12">
          <v-container>
            <v-row>
              <div class="mb-8">
                <v-btn text small color="dark grey" class="pa-0 mb-5" to="/">
                  <v-icon class="mr-3" size="16">$arrowLeft</v-icon>
                  <span class="font-family">
                    kembali ke beranda
                  </span>
                </v-btn>
                <h3 class="text-h3 font-weight-bold">
                  <span class="font-family">
                    Masuk Admin
                  </span>
                </h3>
                <h2 class="subtitle-1">
                  <span class="font-family">
                    Silahkan masukkan alamat email dan kata sandi admin yang
                    terdaftar
                  </span>
                </h2>
              </div>
            </v-row>
            <v-row>
              <v-card width="100%" max-width="960" elevation="0" class="pa-0">
                <v-card-text class="pa-0">
                  <div v-if="status !== null">
                    <v-alert
                      :type="status ? 'success' : 'error'"
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
                    />
                    <div class="hidden-sm-and-down">
                      <div class="d-flex justify-end">
                        <v-btn min-width="100" color="primary" @click="login()">
                          <v-progress-circular
                            indeterminate
                            color="white"
                            v-if="loadingLogin"
                          />
                          <p v-if="!loadingLogin" class="my-auto font-weight-bold">masuk</p>
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
                          <p v-if="!loadingLogin" class="my-auto font-weight-bold">masuk</p>
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
    // loading
    loadingLogin: false,
    // alert
    status: null,
    message: '',
  }),
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        try {
          this.loadingLogin = true;
          const response = await axios({
            baseURL: `${this.$store.state.domain}admin/login`,
            method: 'post',
            headers: {
              'x-api-key': this.$store.state.apiKey,
            },
            data: {
              email: this.email,
              password: this.password,
            },
          });
          if (response.data.data.attributes.data === 'Data Admin Not Found') {
            this.status = false;
            this.message = 'akun belum terdaftar, silahkan hubungi pihak bursa kerja';
          } else if (response.data.data.attributes.data === 'Password Admin Not Match') {
            this.status = false;
            this.message = 'kata sandi salah';
          } else if (
            response.data.data.attributes.data === 'Data Admin Is Not Activated'
          ) {
            this.status = false;
            this.message = 'akun anda tidak aktif, silahkan hubungi pihak bursa kerja';
          } else if (response.data.data.type === 'token') {
            this.$store.commit('changeToken', response.data.data.token);
            this.$store.commit('changeCheckToken', true);
            this.$cookies.set('token', response.data.data.attributes.data, '1d');
            const response1 = await axios({
              baseURL: `${this.$store.state.domain}admin/token`,
              method: 'get',
              headers: {
                'x-api-key': this.$store.state.apiKey,
                Authorization: `Bearer ${this.$cookies.get('token')}`,
              },
            });
            this.$store.commit(
              'changeNameUser',
              response1.data.data.attributes[0].name,
            );
            this.$store.commit(
              'changeRole',
              response1.data.data.attributes[0].role,
            );
            this.$router.push('/home');
          } else {
            this.status = false;
            this.message = 'ada kesalahan di sistem';
          }
          this.loadingLogin = false;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
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
</style>
