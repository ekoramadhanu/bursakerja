<template>
  <v-app>
    <navbar-home v-if="checkIndex && !loadData" />
    <sidebar-dashboard v-if="checkLogin && !loadData" />
    <router-view v-if="!loadData" />
    <snackbar-reload />
  </v-app>
</template>

<script>
import navbar from '@/components/Navbar.vue';
import sidebar from '@/components/Sidebar.vue';
import snackbarReload from '@/components/SnackbarReload.vue';
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
    'sidebar-dashboard': sidebar,
    'snackbar-reload': snackbarReload,
  },
  async beforeCreate() {
    try {
      const dateExp = '2021-09-17';
      const dateFormatStart = new Date();
      const maxDate = new Date(dateExp);
      if (this.$cookies.isKey('token') && maxDate > dateFormatStart) {
        const response = await axios({
          baseURL: `${this.$store.state.domain}admin/token`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        });
        const response1 = await axios({
          baseURL: `${this.$store.state.domain}job-seeker/token`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        });
        const response2 = await axios({
          baseURL: `${this.$store.state.domain}umkm/token`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        });
        if (response.data.data !== undefined) {
          this.$store.commit(
            'changeNameUser',
            response.data.data.attributes[0].name,
          );
          this.$store.commit('changeRole', response.data.data.attributes[0].role);
          this.loadData = false;
        }
        if (response1.data.data !== undefined) {
          if (response1.data.data.attributes[0].fullname === null) {
            this.$store.commit('changeNameUser', '');
            this.$store.commit('changeUploadData', true);
          } else if (response1.data.data.attributes[0].fullname.length > 21) {
            this.$store.commit(
              'changeNameUser',
              `${response1.data.data.attributes[0].fullname.substr(0, 21)}....`,
            );
            this.$store.commit('changeUploadData', false);
          } else {
            this.$store.commit(
              'changeNameUser',
              response1.data.data.attributes[0].fullname,
            );
            this.$store.commit('changeUploadData', false);
          }
          this.$store.commit('changeRole', 'Pencaker');
          this.loadData = false;
        }
        if (response2.data.data !== undefined) {
          if (response2.data.data.attributes[0].name === null) {
            this.$store.commit('changeNameUser', '');
            this.$store.commit('changeUploadData', true);
          } else if (response2.data.data.attributes[0].name.length > 21) {
            this.$store.commit(
              'changeNameUser',
              `${response2.data.data.attributes[0].name.substr(0, 21)}....`,
            );
            this.$store.commit('changeUploadData', false);
          } else {
            this.$store.commit('changeNameUser', response2.data.data.attributes[0].name);
            this.$store.commit('changeUploadData', false);
          }
          this.$store.commit('changeRole', 'Perusahaan');
          this.loadData = false;
        }
      } else if (maxDate < dateFormatStart) {
        this.$router.push('/maintenance-system');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
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
    if (
      url.includes('/activate-account')
      || url.includes('/register-account')
      || url.includes('/login-job-seeker')
      || url.includes('/login-company')
      || url.includes('/login-admin')
      || url.includes('/maintenance-system')
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
      || url.includes('/tag-job')
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
        || url.includes('/tag-job')
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
img {
  pointer-events: none;
}
</style>
