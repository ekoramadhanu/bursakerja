<template>
  <div>
    <v-main>
      <v-container class="d-flex flex-column justify-center size-max">

        <v-card class="overflow-hidden mt-3">
          <v-toolbar flat color="primary">
            <v-icon class="mr-2 white--text">$warning</v-icon>
            <v-toolbar-title class="font-weight-light text-capitalize white--text"
              >cek daftar hitam</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn color="white" fab small @click="isEditing = !isEditing">
              <v-icon v-if="isEditing" class="primary--text">mdi-close</v-icon>
              <v-icon v-else class="primary--text">mdi-pencil</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-form lazy-validation ref="form">
              <v-text-field
                prepend-icon="$idCard"
                label="NIK"
                required
                v-model="idCard"
                :rules="idCardRules"
                :disabled="!isEditing"
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
              class=""
            >
              <v-progress-circular
                indeterminate
                color="white"
                v-if="loadingSave"
              ></v-progress-circular>
              <p
                class="text-capitalize white--text my-auto"
                v-if="!loadingSave"
              >
                cari
              </p>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
      <v-snackbar
        v-model="hasSaved"
        :timeout="4000"
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
    ></v-main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    items: [
      {
        text: 'cek daftar hitam',
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
    loadingSave: false,
    hasSaved: false,
    status: null,
    icon: '',
    message: '',
  }),
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        this.loadingSave = true;
        axios({
          baseURL: `${this.$store.state.domain}blacklist/find`,
          method: 'post',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            idCard: this.idCard,
          },
        })
          .then((response) => {
            // eslint-disable-next-line no-console
            console.log(response.data);
            if (response.data.data.message === 'Data Is Blacklist') {
              this.hasSaved = true;
              this.status = true;
              this.message = 'data masuk daftar hitam';
              this.icon = '$success';
            } else {
              this.hasSaved = true;
              this.status = false;
              this.message = 'data tidak masuk daftar hitam';
              this.icon = '$warning';
            }
          })
          .catch(() => {
            this.hasSaved = true;
            this.status = false;
            this.message = 'server mengalami error';
            this.icon = '$warning';
          })
          .finally(() => {
            this.loadingSave = false;
          });
      }
    },
  },
  beforeCreate() {
    if (this.$store.state.role !== 'Perusahaan') {
      this.$router.push('/access-block');
    }
  },
};
</script>

<style scoped>
.size-max{
  max-width: 1100px;
}
</style>
