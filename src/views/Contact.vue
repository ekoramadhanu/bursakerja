/*
  Nama        : Eko Ramadhanu Aryputra
  Log Date    : 29 Januri 2020 -> check data  after change image base 64 to link
  Log Note    :-
*/
<template>
  <div>
    <v-main>
      <v-container class="d-flex flex-column justify-center size-max">
        <v-card class="overflow-hidden mt-3" v-if="!skeleton">
          <v-toolbar flat color="primary">
            <v-toolbar-title
              class="font-weight-light white--text"
            >
              <span class="font-family">
                Kontak yang Ditampilkan
              </span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="white" icon @click="isEditing = !isEditing">
              <v-icon v-if="isEditing" color="white">mdi-close</v-icon>
              <v-icon v-else color="white">mdi-pencil</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family">
                  nomor whatsapp
                </span>
                <span class="ml-1 error--text">
                  *
                </span>
              </p>
              <v-text-field
                label="Nomor Whatsapp"
                v-model="whatssapp"
                :rules="whatsappRules"
                :disabled="!isEditing"
                required
                class="font-family"
                single-line
                dense
                outlined
              />
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
                :disabled="!isEditing"
                required
                class="font-family"
                single-line
                dense
                outlined
              />
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family">
                  instagram
                </span>
                <span class="ml-1 error--text">
                  *
                </span>
              </p>
              <v-text-field
                v-model="instagram"
                :rules="instagramRules"
                label="Instagram"
                :disabled="!isEditing"
                required
                class="font-family"
                single-line
                dense
                outlined
              />
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family">
                  facebook
                </span>
                <span class="ml-1 error--text">
                  *
                </span>
              </p>
              <v-text-field
                v-model="facebook"
                :rules="facebookRules"
                label="Facebook"
                :disabled="!isEditing"
                required
                class="font-family"
                single-line
                dense
                outlined
              />
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family">
                  twitter
                </span>
                <span class="ml-1 error--text">
                  *
                </span>
              </p>
              <v-text-field
                v-model="twitter"
                :rules="twitterpRules"
                label="Twitter"
                :disabled="!isEditing"
                required
                class="font-family"
                single-line
                dense
                outlined
              />
            </v-form>
          </v-card-text>
          <v-card-actions v-if="isEditing">
            <v-spacer></v-spacer>
            <v-btn :disabled="!isEditing" color="primary" @click="save">
              <v-progress-circular
                indeterminate
                color="primary"
                v-if="loadingSave"
              ></v-progress-circular>
              <p v-if="!loadingSave" class="my-auto font-weight-bold">
                <span class="font-family">
                  simpan
                </span>
              </p>
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-skeleton-loader
          ref="skeleton"
          type="card"
          v-if="skeleton"
          class="mt-3"
        ></v-skeleton-loader>
      </v-container>
      <v-snackbar
        v-model="hasSaved"
        :timeout="4000"
        top
        right
        color="white"
        class="text-capitalize"
      >
        <div class="d-flex">
          <v-icon
            :class="status === true ? 'mr-2 success--text' : 'mr-2 error--text'"
            >{{ icon }}</v-icon
          >
          <p class="text-capitalize black--text ma-0 text-subtitle-1">
            {{ message }}
          </p>
        </div>
      </v-snackbar>
    </v-main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    hasSaved: false,
    isEditing: null,
    idContact: '',
    whatssapp: '',
    whatsappRules: [
      (v) => !!v || 'Nomor Whatsapp Tidak Boleh Kosong',
      (v) => /^[0-9]+/.test(v) || 'Nomor Whatsapp Harus Angka (0-9)',
      (v) => /^08/.test(v) || 'Nomor Telepon Harus Dimulai Dengan 08...',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'Alamat Email Tidak Boleh Kosong',
      (v) => /.+@.+\..+/.test(v) || 'Alamat Email Tidak Valid',
    ],
    instagram: '',
    instagramRules: [(v) => !!v || 'Alamat Email Tidak Boleh Kosong'],
    facebook: '',
    facebookRules: [(v) => !!v || 'Facebook Tidak Boleh Kosong'],
    twitter: '',
    twitterpRules: [(v) => !!v || 'Twitter Tidak Boleh Kosong'],
    skeleton: true,
    status: null,
    icon: '',
    message: '',
    loadingSave: false,
  }),
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        this.loadingSave = true;
        axios({
          baseURL: `${this.$store.state.domain}contact/${this.idContact}`,
          method: 'PATCH',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            whatsapp: this.whatssapp,
            email: this.email,
            instagram: this.instagram,
            facebook: this.facebook,
            twitter: this.twitter,
          },
        })
          .then((response) => {
            if (
              response.data.message === 'Data Contact Is Successfully Update'
            ) {
              this.message = 'data berhasil di simpan';
              this.status = true;
              this.icon = '$success';
            } else {
              this.message = 'data tidak bisa di simpan';
              this.status = false;
              this.icon = '$warning';
            }
          })
          .catch(() => {
            this.status = false;
            this.message = 'server mengalami error';
            this.icon = '$warning';
          })
          .finally(() => {
            this.loadingSave = false;
          });
        this.isEditing = !this.isEditing;
        this.hasSaved = true;
      }
    },
  },
  beforeCreate() {
    if (this.$store.state.role === 'UMKM'
    || this.$store.state.role === 'Magang'
    || this.$store.state.role === 'Umum'
    || this.$store.state.role === 'Profesional'
    || this.$store.state.role === 'Informal') {
      this.$router.push('/access-block');
    } else {
      axios({
        baseURL: `${this.$store.state.domain}contact`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
        },
      })
        .then((response) => {
          this.whatssapp = response.data.data.contact[0].whatsapp;
          this.email = response.data.data.contact[0].email;
          this.instagram = response.data.data.contact[0].instagram;
          this.facebook = response.data.data.contact[0].facebook;
          this.twitter = response.data.data.contact[0].twitter;
          this.idContact = response.data.data.contact[0].id;
        })
        .catch(() => {
          this.status = false;
          this.message = 'server mengalami error';
          this.icon = '$warning';
        })
        .finally(() => {
          this.skeleton = false;
        });
    }
  },
  beforeDestroy() {
    this.hasSaved = null;
    this.isEditing = null;
    this.whatssapp = null;
    this.whatsappRules = null;
    this.email = null;
    this.emailRules = null;
    this.instagram = null;
    this.instagramRules = null;
    this.facebook = null;
    this.facebookRules = null;
    this.twitter = null;
    this.twitterpRules = null;
    this.skeleton = null;
    this.idContact = null;
    this.status = null;
    this.icon = null;
    this.message = null;
    this.loadingSave = null;

    delete this.hasSaved;
    delete this.isEditing;
    delete this.whatssapp;
    delete this.whatsappRules;
    delete this.email;
    delete this.emailRules;
    delete this.instagram;
    delete this.instagramRules;
    delete this.facebook;
    delete this.facebookRules;
    delete this.twitter;
    delete this.twitterpRules;
    delete this.skeleton;
    delete this.idContact;
    delete this.status;
    delete this.icon;
    delete this.message;
    delete this.loadingSave;
  },
};
</script>

<style scoped>
.size-max {
  max-width: 1044px;
}
</style>
