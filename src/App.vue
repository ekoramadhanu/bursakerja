<template>
  <v-app>
    <navbar-home v-if="checkIndex && !loadData"/>
    <sidebar-dashboard v-if="checkLogin && !loadData" />
    <router-view v-if="!loadData" />
    <footer-dasahboard v-if="checkLogin && !loadData" />
  </v-app>
</template>

<script>
import navbar from '@/components/Navbar.vue';
import footerDasahboard from '@/components/FooterDasahboard.vue';
import sidebar from '@/components/Sidebar.vue';
import axios from 'axios';
import goTo from 'vuetify/es5/services/goto';

export default {
  data: () => ({
    currentURL: '',
    checkIndex: '',
    checkLogin: '',
    loadData: true,
  }),
  components: {
    'navbar-home': navbar,
    'footer-dasahboard': footerDasahboard,
    'sidebar-dashboard': sidebar,
  },
  beforeCreate() {
    if (this.$cookies.isKey('token')) {
      axios({
        baseURL: `${this.$store.state.domain}admin/token`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          if (response.data.data !== undefined) {
            this.$store.commit('changeNameUser', response.data.data.admin[0].name);
            this.$store.commit('changeRole', response.data.data.admin[0].role);
            this.loadData = false;
          } else {
            axios({
              baseURL: `${this.$store.state.domain}job-seeker/token`,
              method: 'get',
              headers: {
                'x-api-key': this.$store.state.apiKey,
                authorization: `Bearer ${this.$cookies.get('token')}`,
              },
            })
              .then((response1) => {
                if (response1.data.data !== undefined) {
                  if (response1.data.data.jobSeeker[0].fullname === null) {
                    this.$store.commit('changeNameUser', '');
                  } else {
                    this.$store.commit('changeNameUser', response1.data.data.jobSeeker[0].fullname);
                  }
                  this.$store.commit('changeRole', 'Pencaker');
                  this.loadData = false;
                } else {
                  axios({
                    baseURL: `${this.$store.state.domain}umkm/token`,
                    method: 'get',
                    headers: {
                      'x-api-key': this.$store.state.apiKey,
                      authorization: `Bearer ${this.$cookies.get('token')}`,
                    },
                  })
                    .then((response2) => {
                      if (response2.data.data !== undefined) {
                        if (response2.data.data.umkm[0].name === null) {
                          this.$store.commit('changeNameUser', '');
                        } else {
                          this.$store.commit('changeNameUser', response2.data.data.umkm[0].name);
                        }
                        this.$store.commit('changeRole', 'Perusahaan');
                        this.loadData = false;
                      }
                    })
                    .catch((error) => {
                      // eslint-disable-next-line no-console
                      console.log(error);
                    });
                }
              })
              .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error);
              });
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    }
  },
  created() {
    goTo(0);
    if (this.$cookies.isKey('token')) {
      this.$store.commit('changeToken', this.$cookies.get('token'));
      this.$store.commit('changeCheckToken', true);
    } else {
      this.loadData = false;
    }
    const url = window.location.pathname;
    // eslint-disable-next-line no-console
    if (
      url.includes('/activate-account')
      || url.includes('/register-account')
      || url.includes('/login-job-seeker')
      || url.includes('/login-company')
      || url.includes('/login-admin')
      || url.includes('/test')
    ) {
      this.checkIndex = false;
      this.checkLogin = false;
    } else if (
      url.includes('/home')
      || url.includes('/faq-panel')
      || url.includes('/contact')
      || url.includes('/change-password')
      || url.includes('/about-us-panel')
      || url.includes('/article-panel')
      || url.includes('/school-panel')
      || url.includes('/job-seeker-panel')
      || url.includes('/UMKM-panel')
      || url.includes('/mitra-panel')
      || url.includes('/announcement-panel')
      || url.includes('/job-vacancy-panel')
      || url.includes('/admin-panel')
      || url.includes('/blacklist-panel')
      || url.includes('/resume-job-seeker')
      || url.includes('/data-umkm')
      || url.includes('/professional-panel')
      || url.includes('/internship-panel')
      || url.includes('/informal-panel')
      || url.includes('/report')
      || url.includes('/upload-job-vacancy')
      || url.includes('/detail-blacklist/')
      || url.includes('/check-blacklist')
      || url.includes('/job-vacancy-job-seeker')
      || url.includes('/detail-job-vacancy')
      || url.includes('/job-seeker-detail/')
      || url.includes('/job-seeker-company')
      || url.includes('/article-user')
      || url.includes('/detail-article-login/')
      || url.includes('/detail-announcement/')
      || url.includes('/internship-login')
      || url.includes('/application-job/')
    ) {
      this.checkIndex = false;
      this.checkLogin = true;
    } else {
      this.checkIndex = true;
      this.checkLogin = false;
    }
  },
  updated() {
    const url = window.location.pathname;
    // eslint-disable-next-line no-console
    console.log(this.$store.state.token);
    if (this.currentURL !== url) {
      goTo(0);
      if (
        url.includes('/activate-account')
      || url.includes('/register-account')
      || url.includes('/login-job-seeker')
      || url.includes('/login-company')
      || url.includes('/login-admin')
      || url.includes('/test')
      ) {
        this.checkIndex = false;
        this.checkLogin = false;
      } else if (
        url.includes('/home')
        || url.includes('/faq-panel')
        || url.includes('/contact')
        || url.includes('/change-password')
        || url.includes('/about-us-panel')
        || url.includes('/article-panel')
        || url.includes('/school-panel')
        || url.includes('/job-seeker-panel')
        || url.includes('/UMKM-panel')
        || url.includes('/mitra-panel')
        || url.includes('/announcement-panel')
        || url.includes('/job-vacancy-panel')
        || url.includes('/admin-panel')
        || url.includes('/blacklist-panel')
        || url.includes('/resume-job-seeker')
        || url.includes('/data-umkm')
        || url.includes('/professional-panel')
        || url.includes('/internship-panel')
        || url.includes('/informal-panel')
        || url.includes('/report')
        || url.includes('/upload-job-vacancy')
        || url.includes('/detail-blacklist/')
        || url.includes('/check-blacklist')
        || url.includes('/job-vacancy-job-seeker')
        || url.includes('/detail-job-vacancy')
        || url.includes('/job-seeker-detail/')
        || url.includes('/job-seeker-company')
        || url.includes('/article-user')
        || url.includes('/detail-article-login/')
        || url.includes('/detail-announcement/')
        || url.includes('/internship-login')
        || url.includes('/application-job/')
      ) {
        this.checkIndex = false;
        this.checkLogin = true;
      } else {
        this.checkIndex = true;
        this.checkLogin = false;
      }
    }
  },
  beforeDestroy() {
    this.currentURL = null;
    this.checkIndex = null;
    this.checkLogin = null;
    this.checktoken = null;
    this.loadData = null;

    delete this.currentURL;
    delete this.checkIndex;
    delete this.checkLogin;
    delete this.checktoken;
    delete this.loadData;
  },
};
</script>

<style>
img{
  pointer-events: none;
}
</style>
