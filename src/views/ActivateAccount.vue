<template>
  <div class="fullscreen d-flex justify-center align-center backgorund-repeat"
  :style="{backgroundImage: `url(${backgroundUrl})` }">
    <div class="pa-2 card-login">
      <p class="text-capitalize text-center text-h4"> aktivasi akun bursa kerja </p>
      <v-card max-width="450" outlined class="pa-4 mt-2" elevation="3">
        <p class="text-capitalize text-center text-h6">Aktivasi Akun Bursa Kerja</p>
        <v-alert
          :type="status === true? 'success' : 'error'"
          v-if="status !== null"
          class=" text-capitalize"
        >
          {{message}}
        </v-alert>
        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="bursaCard"
            :rules="bursaCardRules"
            prepend-icon="$idCard"
            label="Nomor Kartu Bursa Kerja"
            required
          />
          <v-text-field
            v-model="pin"
            :rules="pinRules"
            :type="showPin ? 'text': 'password'"
            prepend-icon="$padlock"
            :append-icon="showPin ? '$eye':'$eyeSlash'"
            label="PIN Kartu Bursa Kerja"
            @click:append="changeShowPin()"
            required
          />
          <div class="hidden-xs-only">
            <div class="d-flex justify-end">
              <v-btn min-width="100" color="primary" @click="activated()">
                <v-progress-circular indeterminate color="white" v-if="loadingActivated" />
                <p v-if="!loadingActivated" class="text-capitalize my-auto">kirim</p>
              </v-btn>
            </div>
          </div>
          <div class="hidden-sm-and-up">
            <div class="d-flex flex-column hidden-md-and-up">
              <v-btn color="primary" class="text-capitalize" @click="activated()">
                <v-progress-circular indeterminate color="white" v-if="loadingActivated" />
                <p v-if="!loadingActivated" class="text-capitalize my-auto">kirim</p>
              </v-btn>
            </div>
          </div>
        </v-form>
      </v-card>
      <v-card max-height="450" outlined class="mt-2" elevation="3">
          <v-btn width="100%" height="40" color="primary" class="text-capitalize">
              <v-icon class="mr-2">$login</v-icon>
              <p class="text-capitalize my-auto" >Masuk</p>
          </v-btn>
      </v-card>
    </div>
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
            } else if (response.data.data.message === 'Data Has Been Activate') {
              this.status = false;
              this.message = 'kartu bursa sudah diaktifkan';
            } else if (response.data.data.message === 'Data Not Found') {
              this.status = false;
              this.message = 'kartu bursa tidak ada silahkna hubungi pihak bursa kerja';
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
