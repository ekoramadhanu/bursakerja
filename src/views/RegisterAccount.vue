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
                <h1 class="display-2">Aktivasi Akun</h1>
                <h2 class="subtitle-1">
                  Nomor kartu dan PIN Anda telah kami konfirmasi. Silahkan isi
                  alamat email dan kata sandi untuk melengkapi pendaftaran akun
                  Bursa Kerja.
                </h2>
              </div>
            </v-row>
            <v-row>
              <v-card width="100%" max-width="960">
                <v-card-text v-if="status !== null">
                  <v-alert
                    :type="status === true ? 'success' : 'error'"
                    v-if="status !== null"
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
                    <v-text-field
                      v-model="repassword"
                      :rules="repasswordRules"
                      :type="showRePassword ? 'text' : 'password'"
                      :append-icon="showRePassword ? '$eye' : '$eyeSlash'"
                      label="Kata Sandi"
                      @click:append="changeShowRePassword()"
                      required
                    />
                    <div class="hidden-xs-only hidden-md-only">
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
                            class="my-auto"
                          >
                            daftar
                          </p>
                        </v-btn>
                      </div>
                    </div>
                    <div class="hidden-md-and-up">
                      <div class="d-flex flex-column hidden-md-and-up">
                        <v-btn
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
                            class="my-auto"
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
