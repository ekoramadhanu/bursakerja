import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    domain: 'http://localhost/api-bursa-kerja/',
    apiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJrZXkiOiJTY213Z0VaYVdQZXFKZ2oifQ.hlBB21-SfwpTDI1Vj5rtFNiMbaIrFbrOsRgQ9z44X4U',
    sidebar: [
      {
        name: 'dashboard', icon: '$dashboard', link: '/home',
      },
      {
        name: 'pencari kerja', icon: '$jobSeeker', link: '/job-seeker-panel',
      },
      {
        name: 'UMKM', icon: '$UMKM', link: '/UMKM-panel',
      },
      {
        name: 'daftar hitam', icon: '$blacklist', link: '/blacklist-panel',
      },
      {
        name: 'admin', icon: '$admin', link: '/admin-panel',
      },
      {
        name: 'sekolah unggulan', icon: '$school', link: '/school-panel',
      },
      {
        name: 'artikel', icon: '$article', link: '/article-panel',
      },
      {
        name: 'hubungi kami', icon: '$contact', link: '/contact',
      },
      {
        name: 'FAQ', icon: '$FAQ', link: '/faq-panel',
      },
      {
        name: 'resume', icon: '$CV', link: '/resume-job-seeker',
      },
      {
        name: 'lowongan kerja', icon: '$jobSeeker', link: '/job-vacancy-panel',
      },
      {
        name: 'pengumuman', icon: '$announcement', link: '/announcement-panel',
      },
      {
        name: 'tentang kami', icon: '$UMKM', link: '/about-us-panel',
      },
      {
        name: 'mitra', icon: '$UMKM', link: '/mitra-panel',
      },
      {
        name: 'upload loker', icon: '$job', link: '/upload-job-vacancy',
      },
      {
        name: 'profesional', icon: '$job', link: '/professional-panel',
      },
      {
        name: 'informal', icon: '$job', link: '/informal-panel',
      },
      {
        name: 'magang', icon: '$job', link: '/internship-panel',
      },
      {
        name: 'karyawan', icon: '$job', link: '',
      },
      {
        name: 'lapor', icon: '$warning', link: '/report',
      },
      {
        name: 'data UMKM', icon: '$UMKM', link: '/data-umkm',
      },
    ],
    token: '',
    checkToken: false,
    nameUser: '',
    role: '',
  },
  getters: {
    returnSidebar: (state) => (payload) => {
      const navigation = [];
      if (payload === 'Admin 1') {
        state.sidebar.forEach((i) => {
          if (
            i.name === 'tentang kami'
            || i.name === 'FAQ'
            || i.name === 'hubungi kami'
            || i.name === 'mitra'
            || i.name === 'artikel'
          ) {
            navigation.push({
              name: i.name,
              icon: i.icon,
              link: i.link,
            });
          }
        });
      } else if (payload === 'Admin 2') {
        state.sidebar.forEach((i) => {
          if (
            i.name === 'tentang kami'
            || i.name === 'FAQ'
            || i.name === 'hubungi kami'
            || i.name === 'mitra'
            || i.name === 'artikel'
            || i.name === 'pencari kerja'
            || i.name === 'UMKM'
            || i.name === 'pengumuman'
            || i.name === 'sekolah unggulan'
            || i.name === 'profesional'
            || i.name === 'informal'
            || i.name === 'magang'
            || i.name === 'lowongan kerja'
          ) {
            navigation.push({
              name: i.name,
              icon: i.icon,
              link: i.link,
            });
          }
        });
      } else if (payload === 'Admin 3') {
        state.sidebar.forEach((i) => {
          if (
            i.name === 'tentang kami'
            || i.name === 'FAQ'
            || i.name === 'hubungi kami'
            || i.name === 'mitra'
            || i.name === 'artikel'
            || i.name === 'pencari kerja'
            || i.name === 'UMKM'
            || i.name === 'pengumuman'
            || i.name === 'sekolah unggulan'
            || i.name === 'profesional'
            || i.name === 'informal'
            || i.name === 'magang'
            || i.name === 'admin'
            || i.name === 'lowongan kerja'
            || i.name === 'daftar hitam'
          ) {
            navigation.push({
              name: i.name,
              icon: i.icon,
              link: i.link,
            });
          }
        });
      } else if (payload === 'UMKM') {
        state.sidebar.forEach((i) => {
          if (i.name === 'upload loker'
            || i.name === 'pengumuman'
            || i.name === 'lapor'
            || i.name === 'data UMKM'
          ) {
            navigation.push({
              name: i.name,
              icon: i.icon,
              link: i.link,
            });
          }
        });
      } else {
        state.sidebar.forEach((i) => {
          if (
            i.name === 'resume'
            || i.name === 'pengumuman'
          ) {
            navigation.push({
              name: i.name,
              icon: i.icon,
              link: i.link,
            });
          }
        });
      }
      // sort array
      navigation.sort((a, b) => {
        const bandA = a.name.toUpperCase();
        const bandB = b.name.toUpperCase();

        let comparison = 0;
        if (bandA > bandB) {
          comparison = 1;
        } else if (bandA < bandB) {
          comparison = -1;
        }
        return comparison;
      });

      return navigation;
    },
  },
  mutations: {
    changeToken(state, payload) {
      state.token = payload;
    },
    changeCheckToken(state, payload) {
      state.checkToken = payload;
    },
    changeNameUser(state, payload) {
      state.nameUser = payload;
    },
    changeRole(state, payload) {
      state.role = payload;
    },
  },
  actions: {
  },
  modules: {
  },
});
