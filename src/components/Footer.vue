<template>
  <div>
    <div class="accent d-flex justify-center">
      <v-row class="max-width ma-0">
        <v-col cols="12" xl="3" lg="3" md="3" sm="12" xs="12">
          <v-list flat color="accent" dense>
            <p class="text-uppercase white--text text-h6">
              <span class="font-family font-weight-bold"> bursa kerja </span>
            </p>
            <v-list-item-group color="white">
              <v-list-item to="/about-us" class="pa-0">
                <v-list-item-content>
                  <v-list-item-title
                    class="text-capitalize white--text font-family text-subtitle-2"
                  >
                    <span class="font-family"> tentang kami </span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item-group color="white">
              <v-list-item to="/faq" class="pa-0">
                <v-list-item-content>
                  <v-list-item-title
                    class="text-uppercase white--text font-family text-subtitle-2"
                  >
                    <span class="font-family"> faq </span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item-group color="white">
              <v-list-item to="/school" class="pa-0">
                <v-list-item-content>
                  <v-list-item-title
                    class="text-capitalize white--text text-subtitle-2"
                  >
                    <span class="font-family"> sekolah unggulan </span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item-group color="white">
              <v-list-item to="/article" class="pa-0">
                <v-list-item-content>
                  <v-list-item-title
                    class="text-capitalize white--text text-subtitle-2"
                  >
                    <span class="font-family"> artikel </span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col cols="12" xl="3" lg="3" md="3" sm="12" xs="12">
          <v-list flat color="accent" dense>
            <p class="text-uppercase white--text text-h6">
              <span class="font-family font-weight-bold"> pencaker </span>
            </p>
            <v-list-item-group color="white">
              <v-list-item to="/job-seeker-informal" class="pa-0">
                <v-list-item-content>
                  <v-list-item-title
                    class="text-capitalize white--text text-subtitle-2"
                  >
                    <span class="font-family"> informal </span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item-group color="white">
              <v-list-item to="/job-seeker" class="pa-0">
                <v-list-item-content>
                  <v-list-item-title
                    class="text-capitalize white--text text-subtitle-2"
                  >
                    <span class="font-family"> karyawan </span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item-group color="white">
              <v-list-item to="/job-seeker-internship" class="pa-0">
                <v-list-item-content>
                  <v-list-item-title
                    class="text-capitalize white--text font-family text-subtitle-2"
                  >
                    <span class="font-family"> tenaga magang </span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item-group color="white">
              <v-list-item to="/job-seeker-professional" class="pa-0">
                <v-list-item-content>
                  <v-list-item-title
                    class="text-capitalize white--text text-subtitle-2"
                  >
                    <span class="font-family"> profesional </span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col cols="12" xl="3" lg="3" md="3" sm="12" xs="12">
          <v-list flat color="accent" dense>
            <p class="text-uppercase white--text text-h6">
              <span class="font-family font-weight-bold"> lowongan kerja </span>
            </p>
            <v-list-item-group color="primary">
              <v-list-item to="/upload-job-vacancy" class="pa-0">
                <v-list-item-content>
                  <v-list-item-title
                    class="text-capitalize white--text text-subtitle-2"
                  >
                    <span class="font-family"> pasang lowongan kerja </span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item-group color="primary">
              <v-list-item to="/job-vacancy" class="pa-0">
                <v-list-item-content>
                  <v-list-item-title
                    class="text-capitalize white--text text-subtitle-2"
                  >
                    <span class="font-family"> cari lowongan </span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col cols="12" xl="3" lg="3" md="3" sm="12" xs="12">
          <v-list flat color="accent" dense>
            <p class="text-uppercase white--text text-h6">
              <span class="font-family font-weight-bold"> media sosial </span>
            </p>
            <v-list-item-group color="white">
              <v-list-item @click="openWhastapp()" class="pa-0">
                <v-list-item-icon class="mr-2">
                  <v-card
                    height="27"
                    width="27"
                    class="rounded-circle d-flex justify-center align-center"
                  >
                    <v-icon class="primary--text" size="20"> $whatsapp </v-icon>
                  </v-card>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    class="text-capitalize text-subtitle-2 white--text"
                  >
                  <span class="font-family">
                    {{ whatsapp }}
                  </span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item-group color="white">
              <v-list-item @click="openEmail()" class="pa-0">
                <v-list-item-icon class="mr-2">
                  <v-card
                    height="27"
                    width="27"
                    class="rounded-circle d-flex justify-center align-center"
                  >
                    <v-icon class="primary--text" size="20">$email</v-icon>
                  </v-card>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-capitalize white--text text-subtitle-2">
                    <span class="font-family">
                      {{email}}
                    </span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item-group color="white">
              <v-list-item @click="openTwitter()" class="pa-0">
                <v-list-item-icon class="mr-2">
                  <v-card
                    height="27"
                    width="27"
                    class="rounded-circle d-flex justify-center align-center"
                  >
                    <v-icon class="primary--text" size="20">$twitter</v-icon>
                  </v-card>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-capitalize white--text text-subtitle-2">
                    <span class="font-family">
                      {{twitter}}
                    </span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item-group color="white">
              <v-list-item @click="openFacebook()" class="pa-0">
                <v-list-item-icon class="mr-2">
                  <v-card
                    height="27"
                    width="27"
                    class="rounded-circle d-flex justify-center align-center"
                  >
                    <v-icon class="primary--text" size="20">$facebook</v-icon>
                  </v-card>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-capitalize white--text text-subtitle-2">
                    <span class="font-family">
                      {{facebook}}
                    </span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item-group color="white">
              <v-list-item @click="openInstagram()" class="pa-0">
                <v-list-item-icon class="mr-2">
                  <v-card
                    height="27"
                    width="27"
                    class="rounded-circle d-flex justify-center align-center"
                  >
                    <v-icon class="primary--text" size="20">$instagram</v-icon>
                  </v-card>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-capitalize white--text tex-subtitle-2">
                    <span class="font-family">
                      {{instagram}}
                    </span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </div>
    <v-footer class="pa-0 accent">
      <v-row justify="center" no-gutters>
        <v-col
          class="py-4 text-center white--text max-width font-family"
          cols="12"
        >
          {{ new Date().getFullYear() }} —
          <span class="text-capitalize">bursa kerja</span>
        </v-col>
      </v-row>
    </v-footer>
    <v-fab-transition>
      <v-btn
        fixed
        bottom
        right
        color="success"
        elevation="3"
        fab
        @click="openWhastapp()"
      >
        <v-icon class="white--text" size="39">$whatsapp</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    isActive: false,
    urlWhatsapp: '',
    whatsapp: '',
    urlEmail: '',
    email: '',
    urlTwitter: '',
    twitter: '',
    urlFacebook: '',
    facebook: '',
    urlInstagram: '',
    instagram: '',
  }),
  methods: {
    openWhastapp() {
      window.open(this.urlWhatsapp);
    },
    openEmail() {
      window.open(this.urlEmail);
    },
    openTwitter() {
      window.open(this.urlTwitter);
    },
    openFacebook() {
      window.open(this.urlFacebook);
    },
    openInstagram() {
      window.open(this.urlInstagram);
    },
  },
  beforeCreate() {
    axios({
      baseURL: `${this.$store.state.domain}contact`,
      method: 'get',
      headers: {
        'x-api-key': this.$store.state.apiKey,
      },
    })
      .then((response) => {
        const numberWhatsapp = response.data.data.contact[0].whatsapp.slice(1);
        this.urlWhatsapp = `https://api.whatsapp.com/send?phone=+62${numberWhatsapp}&text=Halo%20Kak%2C%20saya%20ingin%20bertanya%20terkait%20burasakerja.net%20%0Asebelumnya%20perkenalkan%20saya%20.....%20.%20Saya%20tertarik%20untuk%20mendaftar%20atau%20bergabung%20dengan%20sistem%20ini.%20Mungkin%20saya%20bisa%20dibantu%20kak%20untuk%20melakukan%20pendaftaran%20ini.`;
        this.whatsapp = response.data.data.contact[0].whatsapp;
        this.urlEmail = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${response.data.data.contact[0].email}`;
        this.email = response.data.data.contact[0].email;
        this.urlTwitter = `https://twitter.com/${response.data.data.contact[0].twitter}`;
        this.twitter = response.data.data.contact[0].twitter;
        this.urlFacebook = `https://www.facebook.com/${response.data.data.contact[0].facebook}`;
        this.facebook = response.data.data.contact[0].facebook;
        this.urlInstagram = `https://www.instagram.com/${response.data.data.contact[0].instagram}`;
        this.instagram = response.data.data.contact[0].instagram;
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  },
  beforeDestroy() {
    this.urlWhatsapp = null;
    this.urlEmail = null;
    this.urlTwitter = null;
    this.urlFacebook = null;
    this.urlInstagram = null;

    delete this.urlWhatsapp;
    delete this.urlEmail;
    delete this.urlTwitter;
    delete this.urlFacebook;
    delete this.urlInstagram;
  },
};
</script>

<style scoped>
.max-width {
  max-width: 1044px;
}
</style>
