<template>
  <div class="mb-2">
    <v-app-bar fixed color="white" flat>
      <div class="max-width mx-auto">
        <div class="d-flex height-navbar">
          <v-app-bar-nav-icon
            class="hidden-md-and-up primary--text"
            @click="drawer = !drawer"
            light
          />
          <router-link
            to="/"
            class="my-auto text-decoration-none hidden-sm-and-down"
          >
            <v-toolbar-title class="primary--text">
              <v-img
                src="@/assets/logo.svg"
                to="/"
                contain
              ></v-img>
            </v-toolbar-title>
          </router-link>
          <router-link to="/" class="my-auto text-width-xs hidden-md-and-up">
            <v-toolbar-title>
              <v-img
                src="@/assets/logo.svg"
                to="/"
                class="mx-auto"
                contain
              ></v-img
            ></v-toolbar-title>
          </router-link>
          <v-spacer></v-spacer>
          <div class="hidden-sm-and-down button-height">
            <v-btn text to="/" elevation="0" class="no-focus" height="100%">
              <span class="my-auto">beranda</span>
            </v-btn>
            <v-menu offset-y class="button-height" open-on-hover>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" text class="no-focus" height="100%"
                  >artikel
                  <v-icon class="ml-2" size="14">$dropdown</v-icon>
                </v-btn>
              </template>
              <v-list flat>
                <v-list-item
                  v-for="item in sortItems"
                  :key="item.title"
                  :href="item.to"
                  dense
                >
                  <v-list-item-title class="text-uppercase">{{
                    item.title
                  }}</v-list-item-title>
                </v-list-item>
                <v-list-item
                  v-for="item in itemsArticle"
                  :key="item.title"
                  :href="item.to"
                  dense
                >
                  <v-list-item-title class="text-uppercase nav-menu-button">{{
                    item.title
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-menu offset-y class="button-height" open-on-hover>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" text class="no-focus" height="100%"
                  >pencari kerja
                  <v-icon class="ml-2" size="14">$dropdown</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item to="/job-seeker" dense>
                  <v-list-item-title class="text-uppercase"> karyawan </v-list-item-title>
                </v-list-item>
                <v-list-item
                  v-for="(item, index) in sortItemsJob"
                  :key="index"
                  :href="item.to"
                  dense
                >
                  <v-list-item-title class="text-uppercase">{{
                    item.title
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-menu offset-y class="button-height" open-on-hover>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" text class="no-focus" height="100%"
                  >lowongan
                  <v-icon class="ml-2" size="14">$dropdown</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in sortItemJobVacancy"
                  :key="index"
                  :href="item.to"
                  dense
                >
                  <v-list-item-title class="text-uppercase">{{
                    item.title
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn text to="/school" elevation="0" class="no-focus" height="100%">
              <span class="my-auto">sekolah unggulan</span>
            </v-btn>
            <v-btn class="mx-4" outlined color="primary" to="/activate-account">
              <p class="my-auto">aktivasi</p>
            </v-btn>
            <v-btn
              class="ml-4"
              color="primary"
              to="/login-job-seeker"
              elevation="0"
            >
              <p class="my-auto">masuk</p>
            </v-btn>
          </div>
          <!-- <v-menu
            offset-y
            transition="slide-x-transition"
            v-if="this.$store.state.checkToken"
          >
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on" class="hidden-xs-only">
                <v-icon class="primary--text">$account</v-icon>
                <p class="ma-0 ">akun</p>
              </v-btn>
            </template>
            <v-list>
              <v-list-item to="/home">
                <v-list-item-icon>
                  <v-icon class="primary--text">$dashboard</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class=" primary--text"
                    >dashboard</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="logout()">
                <v-list-item-icon>
                  <v-icon class="primary--text">$logout</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class=" primary--text"
                    >keluar</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu> -->
        </div>
      </div>
    </v-app-bar>
    //drawer menu
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list dense>
        <v-list-item to="/">
          <v-list-item-content>
            <v-list-item-title class="">beranda</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group :value="false">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="">profil</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="item in sortItems"
            :key="item.title"
            :to="item.to"
          >
            <v-list-item-title class="">{{ item.title }}</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-for="item in sortItemArticle"
            :key="item.title"
            :to="item.to"
          >
            <v-list-item-title class="">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group :value="false">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="">pencari kerja</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item to="/job-seeker">
            <v-list-item-content>
              <v-list-item-title class="">karyawan</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-for="item in itemJob" :key="item.title" :to="item.to">
            <v-list-item-title class="">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group :value="false">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="">lowongan kerja</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="item in jobVacancy"
            :key="item.title"
            :to="item.to"
          >
            <v-list-item-title class="">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item to="/school">
          <v-list-item-content>
            <v-list-item-title class="">sekolah unggulan</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item to="/activate-account">
          <v-list-item-content>
            <v-list-item-title class="">aktivasi</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/login-job-seeker">
          <v-list-item-content>
            <v-list-item-title class="">masuk</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: 'tentang kami', to: '/about-us' },
      { title: 'FAQ', to: '/faq' },
    ],
    itemsArticle: [{ title: 'artikel', to: '/article' }],
    itemJob: [
      { title: 'informal', to: '/job-seeker-informal' },
      { title: 'magang', to: '/job-seeker-internship' },
      { title: 'profesional', to: '/job-seeker-professional' },
    ],
    jobVacancy: [
      { title: 'pasang lowongan', to: '/upload-job-vacancy' },
      { title: 'cari lowongan', to: '/job-vacancy' },
    ],
  }),
  computed: {
    sortItems() {
      const clone = [...this.items];
      clone.sort((a, b) => {
        const bandA = a.title.toUpperCase();
        const bandB = b.title.toUpperCase();

        let comparison = 0;
        if (bandA > bandB) {
          comparison = 1;
        } else if (bandA < bandB) {
          comparison = -1;
        }
        return comparison;
      });
      return clone;
    },
    sortItemsJob() {
      const clone = [...this.itemJob];
      clone.sort((a, b) => {
        const bandA = a.title.toUpperCase();
        const bandB = b.title.toUpperCase();

        let comparison = 0;
        if (bandA > bandB) {
          comparison = 1;
        } else if (bandA < bandB) {
          comparison = -1;
        }
        return comparison;
      });
      return clone;
    },
    sortItemJobVacancy() {
      const clone = [...this.jobVacancy];
      clone.sort((a, b) => {
        const bandA = a.title.toUpperCase();
        const bandB = b.title.toUpperCase();

        let comparison = 0;
        if (bandA > bandB) {
          comparison = 1;
        } else if (bandA < bandB) {
          comparison = -1;
        }
        return comparison;
      });
      return clone;
    },
    sortItemArticle() {
      const clone = [...this.itemsArticle];
      clone.sort((a, b) => {
        const bandA = a.title.toUpperCase();
        const bandB = b.title.toUpperCase();

        let comparison = 0;
        if (bandA > bandB) {
          comparison = 1;
        } else if (bandA < bandB) {
          comparison = -1;
        }
        return comparison;
      });
      return clone;
    },
  },
  methods: {
    logout() {
      this.$cookies.remove('token');
      this.$store.commit('changeCheckToken', false);
      this.$store.commit('changeToken', '');
    },
  },
  beforeDestroy() {
    this.drawer = null;

    delete this.drawer;
  },
};
</script>

<style lang='scss' scoped>
.button-height {
  height: 100%;
  max-width: 1366px;
}
.max-width {
  max-width: 1366px;
  width: 100vw;
  height: 100%;
}
.height-navbar {
  height: 100%;
}
.full-width {
  width: 100vw;
  height: 56px;
  max-height: 56px;
}
.text-decoration-none {
  text-decoration: none;
}
.text-width-xs {
  width: 100%;
}
.no-focus::before {
  opacity: 0 !important;
}
</style>
