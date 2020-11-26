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
                  <span class="font-family"> Aktivasi Akun </span>
                </h3>
                <p class="text-subtitle-1">
                  <span class="font-family">
                    Nomor kartu dan PIN Anda telah kami konfirmasi. Silahkan isi
                    alamat email dan kata sandi untuk melengkapi pendaftaran
                    akun Bursa Kerja.
                  </span>
                </p>
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
                      @input="checkedFormatPassword()"
                      @blur="checkedFormatPassword()"
                      @focus="checkedFormatPassword()"
                      required
                    />
                    <div class="d-flex">
                      <p
                        :class="
                          checkNumber === false
                            ? 'text-caption mb-0 mr-3 error--text'
                            : 'text-caption mb-0 mr-3 success-text'
                        "
                      >
                        <span class="font-family">
                          kata sandi harus ada angka
                        </span>
                      </p>
                      <v-icon
                        v-if="checkNumber === false"
                        size="15"
                        color="error"
                      >
                        $close
                      </v-icon>
                      <v-icon
                        size="15"
                        v-if="checkNumber === true"
                        color="success"
                      >
                        $check
                      </v-icon>
                    </div>
                    <div class="d-flex">
                      <p
                        :class="
                          checkSymbol === false
                            ? 'text-caption mb-0 mr-3 error--text'
                            : 'text-caption mb-0 mr-3 success-text'
                        "
                      >
                        <span class="font-family">
                          kata sandi harus ada simbol
                        </span>
                      </p>
                      <v-icon
                        v-if="checkSymbol === false"
                        size="15"
                        color="error"
                      >
                        $close
                      </v-icon>
                      <v-icon
                        size="15"
                        v-if="checkSymbol === true"
                        color="success"
                      >
                       $check
                      </v-icon>
                    </div>
                    <div class="d-flex">
                      <p
                        :class="
                          checkUppercase === false
                            ? 'text-caption mb-0 mr-3 error--text'
                            : 'text-caption mb-0 mr-3 success-text'
                        "
                      >
                        <span class="font-family">
                          kata sandi harus diawali huruf kapital
                        </span>
                      </p>
                      <v-icon
                        v-if="checkUppercase === false"
                        size="15"
                        color="error"
                      >
                        $close
                      </v-icon>
                      <v-icon
                        size="15"
                        v-if="checkUppercase === true"
                        color="success"
                      >
                       $check
                      </v-icon>
                    </div>
                    <div class="d-flex">
                      <p
                        :class="
                          checkLowercase === false
                            ? 'text-caption mb-0 mr-3 error--text'
                            : 'text-caption mb-0 mr-3 success-text'
                        "
                      >
                        <span class="font-family">
                          kata sandi harus ada huruf kecil
                        </span>
                      </p>
                      <v-icon
                        v-if="checkLowercase === false"
                        size="15"
                        color="error"
                      >
                        $close
                      </v-icon>
                      <v-icon
                        size="15"
                        v-if="checkLowercase === true"
                        color="success"
                      >
                       $check
                      </v-icon>
                    </div>
                    <v-text-field
                      v-model="repassword"
                      :rules="repasswordRules"
                      :type="showRePassword ? 'text' : 'password'"
                      :append-icon="showRePassword ? '$eye' : '$eyeSlash'"
                      label="Kata Sandi"
                      @click:append="changeShowRePassword()"
                      required
                    />
                    <div class="hidden-sm-and-down">
                      <div class="d-flex justify-end">
                        <v-btn
                          min-width="100"
                          color="primary"
                          @click="registered()"
                        >
                          <v-progress-circular
                            indeterminate
                            color="white"
                            v-if="loadingActivated"
                          />
                          <p
                            v-if="!loadingActivated"
                            class="my-auto font-weight-bold"
                          >
                            daftar
                          </p>
                        </v-btn>
                      </div>
                    </div>
                    <div class="hidden-md-and-up">
                      <div class="d-flex flex-column hidden-md-and-up">
                        <v-btn color="primary" @click="registered()">
                          <v-progress-circular
                            indeterminate
                            color="white"
                            v-if="loadingActivated"
                          />
                          <p
                            v-if="!loadingActivated"
                            class="my-auto font-weight-bold"
                          >
                            daftar
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
    repassword: '',
    repasswordRules: [
      (v) => !!v || 'Ulangi Kata Sandi Tidak Boleh Kosong',
      (v) => (v.length >= 8 && v.length <= 12) || 'Kata Sandi Harus (8-12)',
    ],
    showRePassword: false,
    loadingActivated: false,
    status: null,
    message: '',
    // add
    checkUppercase: null,
    checkLowercase: null,
    checkSymbol: null,
    checkNumber: null,
  }),
  methods: {
    registered() {
      if (this.checkUppercase === null) {
        this.checkUppercase = false;
      }
      if (this.checkLowercase === null) {
        this.checkLowercase = false;
      }
      if (this.checkSymbol === null) {
        this.checkSymbol = false;
      }
      if (this.checkNumber === null) {
        this.checkNumber = false;
      }
      if (this.$refs.form.validate()) {
        if (this.password !== this.repassword) {
          this.status = false;
          this.message = 'kata sandi dan ulangi kata sandi tidak sama';
        } else if (
          this.checkUppercase === false
          || this.checkLowercase === false
          || this.checkSymbol === false
          || this.checkNumber === false
        ) {
          this.status = false;
          this.message = 'kata sandi anda tidak memenuhi syarat';
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
              if (response.data.data.message === 'Email Has Been Used') {
                this.status = false;
                this.message = 'alamat email has been used';
              } else if (
                response.data.data.message === 'Bursa Card Cannot Activate'
              ) {
                this.status = false;
                this.message = 'kartu bursa tidak terdaftar silahkan hubungi pihak bursa kerja';
              } else {
                this.status = true;
                this.message = 'silahkan masuk /login menggunakan email dan password yang telah anda buat ';
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
    checkedFormatPassword() {
      const lowerCaseRegex = '(?=.*[a-z])';
      const upperCaseRegex = '([A-Z])';
      const symbolsRegex = '(?=.*[!@#$%^&*])';
      const numericRegex = '(?=.*[0-9])';
      if (new RegExp(`^${upperCaseRegex}`).test(this.password)) {
        this.checkUppercase = true;
      }
      if (new RegExp(`^${lowerCaseRegex}`).test(this.password)) {
        this.checkLowercase = true;
      }
      if (new RegExp(`^${symbolsRegex}`).test(this.password)) {
        this.checkSymbol = true;
      }
      if (new RegExp(`^${numericRegex}`).test(this.password)) {
        this.checkNumber = true;
      }
      if (this.password === '' || this.password === null) {
        this.checkUppercase = false;
        this.checkLowercase = false;
        this.checkSymbol = false;
        this.checkNumber = false;
      }
    },
  },
};
</script>

<style scoped>
</style>
