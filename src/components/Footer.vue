<template>
  <div>
    <div class="primary d-flex justify-center">
      <v-row class="pl-9 pr-4 max-width ma-0">
        <v-col cols="12" xl="3" lg="3" md="3" sm="12" xs="12">
          <v-list flat color="primary">
            <v-subheader class="text-uppercase white--text">bursa kerja</v-subheader>
            <v-list-item-group color="white">
              <v-list-item to="/about-us">
                <v-list-item-content>
                  <v-list-item-title
                    class="text-capitalize white--text"
                  >
                    tentang kami
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item-group color="white">
              <v-list-item to="/faq">
                <v-list-item-content>
                  <v-list-item-title class="text-uppercase white--text">faq</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item-group color="white">
              <v-list-item to="/school">
                <v-list-item-content>
                  <v-list-item-title
                    class="text-capitalize white--text"
                  >
                    sekolah unggulan
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item-group color="white">
              <v-list-item to="/article">
                <v-list-item-content>
                  <v-list-item-title class="text-capitalize white--text">artikel</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col cols="12" xl="3" lg="3" md="3" sm="12" xs="12">
          <v-list flat color="primary">
            <v-subheader class="text-uppercase white--text">pencari kerja</v-subheader>
            <v-list-item-group color="white">
              <v-list-item to="/job-seeker-informal/3cba1eb7a5bcd42097c3c3b6ff74c3a0">
                <v-list-item-content>
                  <v-list-item-title
                  class="text-capitalize white--text">informal</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item-group color="white">
              <v-list-item to="/job-seeker-internship/f7e0ef389ac6133c88aedbd66b44a4e1">
                <v-list-item-content>
                  <v-list-item-title
                  class="text-capitalize white--text">tenaga magang</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item-group color="white">
              <v-list-item to="/job-seeker-professional/d41d8cd98f00b204e9800998ecf8427e">
                <v-list-item-content>
                  <v-list-item-title
                  class="text-capitalize white--text" >profesional</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col cols="12" xl="3" lg="3" md="3" sm="12" xs="12">
          <v-list flat color="primary">
            <v-subheader class="text-uppercase white--text">umkm</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item to="/upload-job-vacancy">
                <v-list-item-content>
                  <v-list-item-title class="text-capitalize white--text">
                    pasang lowongan kerja</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item-group color="primary">
              <v-list-item to="/job-vacancy">
                <v-list-item-content>
                  <v-list-item-title class="text-capitalize white--text">
                    cari lowongan</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col cols="12" xl="3" lg="3" md="3" sm="12" xs="12">
          <v-list flat color="primary">
            <v-subheader class="text-uppercase white--text">media sosial</v-subheader>
            <v-list-item-group color="white">
              <v-list-item @click="openWhastapp()">
                <v-list-item-icon>
                  <v-icon class="white--text">$whatsapp</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                  class="text-capitalize white--text">whatsapp</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item-group color="white">
              <v-list-item @click="openEmail()">
                <v-list-item-icon>
                  <v-icon class="white--text">$email</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-capitalize white--text">email</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item-group color="white">
              <v-list-item @click="openTwitter()">
                <v-list-item-icon>
                  <v-icon class="white--text">$twitter</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-capitalize white--text">twitter</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item-group color="white">
              <v-list-item @click="openFacebook()">
                <v-list-item-icon>
                  <v-icon class="white--text">$facebook</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-capitalize white--text">
                    facebook</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item-group color="white">
              <v-list-item @click="openInstagram()">
                <v-list-item-icon>
                  <v-icon class="white--text">$instagram</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-capitalize white--text">
                    instagram</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </div>
    <v-footer class="pa-0 primary">
      <v-row justify="center" no-gutters>
        <v-col class="py-4 text-center white--text max-width" cols="12">
          {{ new Date().getFullYear() }} —
          <strong class="text-capitalize">bursa kerja</strong>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    urlWhatsapp: '',
    urlEmail: '',
    urlTwitter: '',
    urlFacebook: '',
    urlInstagram: '',
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
        this.urlWhatsapp = `https://api.whatsapp.com/send?phone=+62${numberWhatsapp}`;
        this.urlEmail = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${response.data.data.contact[0].email}`;
        this.urlTwitter = `https://twitter.com/${response.data.data.contact[0].twitter}`;
        this.urlFacebook = `https://www.facebook.com/${response.data.data.contact[0].facebook}`;
        this.urlInstagram = `https://www.instagram.com/${response.data.data.contact[0].instagram}`;
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
  max-width: 1366px;
}
</style>
