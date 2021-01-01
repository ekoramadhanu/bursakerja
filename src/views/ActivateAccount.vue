<template>
  <div>
    <v-container>
      <v-row class="full-height align-center">
        <v-col cols="12" lg="6" xl="6" md="6">
          <v-img
            src="@/assets/Developer activity-rafiki.svg"
            max-height="512"
            contain
            class="hidden-xs-only hidden-sm-only"
          ></v-img>
        </v-col>
        <v-col cols="12" lg="6" xl="6" md="6">
          <v-container>
            <v-row>
              <div class="mb-8">
                <v-btn text small color="dark grey" class="pa-0 mb-5 font-family" to="/">
                  <v-icon class="mr-3" size="16">$arrowLeft</v-icon>
                  kembali ke beranda
                </v-btn>
                <h3 class="text-h3 font-weight-bold">
                  <span class="font-family">
                    Aktivasi Akun
                  </span>
                </h3>
                <p class="text-subtitle-1">
                  <span class="font-family">
                    Silahkan masukkan nomor kartu dan pin yang tertera pada kartu
                    Bursa Kerja
                  </span>
                </p>
                  <v-btn text color="primary" class="pa-0" to="/login-job-seeker"
                    >saya sudah punya akun</v-btn
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
                    <v-text-field
                      v-model="bursaCard"
                      :rules="bursaCardRules"
                      label="Nomor Kartu Bursa Kerja"
                      required
                    />
                    <v-text-field
                      v-model="pin"
                      :rules="pinRules"
                      :type="showPin ? 'text' : 'password'"
                      :append-icon="showPin ? '$eye' : '$eyeSlash'"
                      label="PIN Kartu Bursa Kerja"
                      @click:append="changeShowPin()"
                      required
                    />
                    <div class="hidden-sm-and-down">
                      <div class="d-flex justify-end">
                        <v-btn
                          min-width="100"
                          color="primary"
                          @click="activated()"
                        >
                          <v-progress-circular
                            indeterminate
                            color="white"
                            v-if="loadingActivated"
                          />
                          <p v-if="!loadingActivated" class="my-auto font-weight-bold">
                            konfirmasi
                          </p>
                        </v-btn>
                      </div>
                    </div>
                    <div class="hidden-md-and-up">
                      <div class="d-flex flex-column hidden-md-and-up">
                        <v-btn color="primary" @click="activated()">
                          <v-progress-circular
                            indeterminate
                            color="white"
                            v-if="loadingActivated"
                          />
                          <p v-if="!loadingActivated" class="my-auto font-weight-bold">
                            konfirmasi
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
    bursaCard: '',
    bursaCardRules: [
      (v) => !!v || 'Nomor Kartu Bursa Tidak Boleh Kosong',
      (v) => /^\S*$/.test(v) || 'Nomor Kartu Bursa Tidak Boleh Ada Spasi',
    ],
    pin: '',
    pinRules: [(v) => !!v || 'Pin Kartu Bursa Tidak Boleh Kosong'],
    showPin: false,
    loadingActivated: false,
    status: null,
    message: '',
    backgroundUrl,
  }),
  methods: {
    activated() {
      if (this.$refs.form.validate()) {
        this.loadingActivated = true;
        axios({
          baseURL: `${this.$store.state.domain}activate-account`,
          method: 'post',
          headers: {
            'x-api-key': this.$store.state.apiKey,
          },
          data: {
            bursaCard: this.bursaCard,
            pin: this.pin,
          },
        })
          .then((response) => {
            if (response.data.data.message === 'PIN Not Match') {
              this.status = false;
              this.message = 'PIN kartu salah';
            } else if (
              response.data.data.message === 'Account Has ben Activate'
              || response.data.data.message === 'Data Has Been Activate'
            ) {
              this.status = false;
              this.message = 'kartu bursa sudah diaktifkan';
            } else if (response.data.data.message === 'Data Not Found') {
              this.status = false;
              this.message = 'Data kartu Tidak Ditemukan';
            } else {
              this.$router.push(`/register-account/${response.data.data.id}`);
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
    },
    changeShowPin() {
      this.showPin = !this.showPin;
    },
  },
};
</script>

<style scoped>
.full-height {
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
