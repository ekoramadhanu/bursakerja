/* eslint-disable import/no-extraneous-dependencies */
import '@fortawesome/fontawesome-free/css/all.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'fa4',
    values: {
      register: 'far fa-registered',
      login: 'fas fa-sign-in-alt',
      activate: 'mdi-account-reactivate',
      search: 'fas fa-search',
      arrowUp: 'fas fa-chevron-up',
      whatsapp: 'fab fa-whatsapp-square',
      facebook: 'fab fa-facebook-square',
      email: 'fas fa-envelope',
      twitter: 'fab fa-twitter-square',
      instagram: 'fab fa-instagram-square',
      phone: 'fas fa-phone-alt',
      idCard: 'fas fa-id-card',
      padlock: 'fas fa-lock',
      eye: 'far fa-eye',
      eyeSlash: 'far fa-eye-slash',
      dashboard: 'mdi-view-dashboard',
      jobSeeker: 'fas fa-user-tie',
      UMKM: 'fas fa-building',
      blacklist: 'fas fa-user-times',
      admin: 'fas fa-user-shield',
      school: 'fas fa-school',
      article: 'fas fa-newspaper',
      contact: 'fas fa-comments',
      FAQ: 'fas fa-comment',
      CV: 'fas fa-file-alt',
      announcement: 'fas fa-bullhorn',
      bell: 'fas fa-bell',
      logout: 'fas fa-sign-out-alt',
      account: 'fas fa-user',
      job: 'fas fa-suitcase',
      success: 'fas fa-check-circle',
      times: 'fas fa-times',
      check: 'fas fa-check',
      warning: 'fas fa-exclamation-triangle',
      add: 'fas fa-plus',
      degree: 'fas fa-user-graduate',
      calendar: 'far fa-calendar-alt',
      gender: 'fas fa-venus-mars',
      religion: 'fas fa-praying-hands',
      married: 'fas fa-heart',
      nationality: 'fas fa-flag',
      height: 'fas fa-arrows-alt-v',
      weight: 'fas fa-weight',
      address: 'fas fa-home',
      education: 'fas fa-graduation-cap',
      location: 'fas fa-map-marker-alt',
      money: 'fas fa-money-bill-wave-alt',
      experience: 'fas fa-suitcase',
      language: 'fas fa-globe',
      detail: 'fas fa-align-justify',
      dropdown: 'fas fa-chevron-down',
      pdf: 'far fa-file-pdf',
    },
  },
  theme: {
    themes: {
      light: {
        primary: '#2196F3', // blue
        primaryDark: '#0D47A1', // blue dark
        primaryLight: '#2196F3', // blue light
        accent: '#448AFF', // blue accent
        primaryText: '#212121', // text color primary
        secondaryText: '#757575', // text color secondary
        divider: '#BDBDBD', // divider color
        iconColor: '#FFFFFF', // white
        grey: '#ECEFF1', // gray background
        error: '#f44336', // red
        success: '#4caf50', // green
        warning: '#ffeb3b', // yellow
      },
    },
  },
});
