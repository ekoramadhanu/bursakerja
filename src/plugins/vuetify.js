import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    values: {
      activate: 'mdi-account-reactivate',
      whatsapp: 'mdi-whatsapp',
      email: 'mdi-email',
      twitter: 'mdi-twitter',
      instagram: 'mdi-instagram',
      phone: 'mdi-phone',
      eye: 'mdi-eye-outline',
      eyeSlash: 'mdi-eye-off-outline',
      dashboard: 'mdi-view-dashboard',
      school: 'mdi-school',
      check: 'mdi-check',
      dropdown: 'mdi-menu-down',
      arrowLeft: 'mdi-arrow-left',
      close: 'mdi-close',
      tag: 'mdi-tag',
      add: 'mdi-plus',
      search: 'mdi-magnify',
      accountActivate: 'mdi-account-check-outline',
      accountEdit: 'mdi-account-edit-outline',
      accountResetPassword: 'mdi-account-lock-outline',
      accountDeactivate: 'mdi-account-cancel',
      accountCog: 'mdi-account-cog-outline',
      warning: 'mdi-alert-circle-outline',
      refresh: 'mdi-refresh',
      facebook: 'mdi-facebook',
      contentEdit: 'mdi-content-save-edit-outline',
      contentSetting: 'mdi-content-save-cog-outline',
      fileUpload: 'mdi-file-upload-outline',
      calendar: 'mdi-calendar',
      user: 'mdi-account',
      editTagJob: 'mdi-briefcase-edit-outline',
      location: 'mdi-map-marker',
      archive: 'mdi-archive-arrow-down-outline',
      unArchive: 'mdi-archive-arrow-up-outline',
      arrowUp: 'mdi-arrow-up',
      jobAccept: 'mdi-briefcase-check-outline',
      jobDecline: 'mdi-briefcase-remove-outline',
      CV: 'mdi-office-building-outline',
      pdf: 'mdi-file-pdf-box-outline',
    },
  },
  theme: {
    themes: {
      light: {
        primary: '#2196F3', // blue
        primaryDark: '#0D47A1', // blue dark
        primaryLight: '#2196F3', // blue light
        accent: '#0D47A1', // blue accent
        primaryText: '#212121', // text color primary
        secondaryText: '#757575', // text color secondary
        divider: '#BDBDBD', // divider color
        iconColor: '#FFFFFF', // white
        grey: '#ECEFF1', // gray background
        greySecondary: '#78909C', // gray background
        error: '#f44336', // red
        success: '#4caf50', // green
        warning: '#f2df13', // yellow
      },
    },
  },
});
