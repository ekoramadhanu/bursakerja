<template>
  <div class="mb-2">
    <v-app-bar fixed color="white" elevate-on-scroll>
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
                src="@/assets/logo_company.jpeg"
                width="100"
                height="50"
                to="/"
              ></v-img>
            </v-toolbar-title>
          </router-link>
          <router-link
            to="/"
            class="my-auto text-width-xs text-decoration-none hidden-md-and-up"
          >
            <v-toolbar-title>
              <v-img
                src="@/assets/logo_company.jpeg"
                width="100"
                height="50"
                to="/"
                class="mx-auto"
              ></v-img
            ></v-toolbar-title>
          </router-link>
          <v-spacer></v-spacer>
          <div class="hidden-sm-and-down button-height">
            <v-btn text height="100%" to="/">
              <p class="text-capitalize my-auto primary--text">beranda</p>
            </v-btn>
            <v-menu offset-y class="button-height" open-on-hover>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" text height="100%">
                  <p class="my-0 mr-2 text-capitalize primary--text">profil</p>
                  <v-icon class="primary--text" size="14">$dropdown</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="item in sortItems"
                  :key="item.title"
                  :to="item.to"
                  dense
                >
                  <v-list-item-title class="text-capitalize primary--text">{{
                    item.title
                  }}</v-list-item-title>
                </v-list-item>
                <v-list-item
                  v-for="item in itemsArticle"
                  :key="item.title"
                  :to="item.to"
                  dense
                >
                  <v-list-item-title class="text-capitalize primary--text">{{
                    item.title
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-menu offset-y class="button-height" open-on-hover>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" text height="100%">
                  <p class="my-0 mr-2 text-capitalize primary--text">pencaker</p>
                  <v-icon class="primary--text" size="14">$dropdown</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item to="/job-seeker" dense>
                  <v-list-item-title class="text-capitalize primary--text">
                    karyawan
                  </v-list-item-title>
                </v-list-item>
                <v-list-item
                  v-for="(item, index) in sortItemsJob"
                  :key="index"
                  :to="item.to"
                  dense
                >
                  <v-list-item-title class="text-capitalize primary--text">{{
                    item.title
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-menu offset-y class="button-height" open-on-hover>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" text height="100%">
                  <p class="my-0 mr-2 text-capitalize primary--text">
                    lowker
                  </p>
                  <v-icon class="primary--text" size="14">$dropdown</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in sortItemJobVacancy"
                  :key="index"
                  :to="item.to"
                  dense
                >
                  <v-list-item-title class="text-capitalize primary--text">{{
                    item.title
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn text height="100%" to="/school">
              <p class="text-capitalize my-auto primary--text">sekolah unggulan</p>
            </v-btn>
          </div>
          <v-divider vertical class="hidden-sm-and-down"></v-divider>
          <div class="hidden-sm-and-down button-height">
            <v-btn text height="100%" to="/activate-account">
              <v-icon class="mr-2 primary--text">$activate</v-icon>
              <p class="text-capitalize my-auto primary--text">aktivasi</p>
            </v-btn>
            <v-btn text height="100%" to="/login-job-seeker">
              <v-icon class="mr-2 primary--text">$login</v-icon>
              <p class="text-capitalize my-auto primary--text">masuk</p>
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
                <p class="ma-0 text-capitalize">akun</p>
              </v-btn>
            </template>
            <v-list>
              <v-list-item to="/home">
                <v-list-item-icon>
                  <v-icon class="primary--text">$dashboard</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-capitalize primary--text"
                    >dashboard</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="logout()">
                <v-list-item-icon>
                  <v-icon class="primary--text">$logout</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-capitalize primary--text"
                    >keluar</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu> -->
        </div>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list dense>
        <v-list-item to="/">
          <v-list-item-content>
            <v-list-item-title class="text-capitalize"
              >beranda</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-group :value="false">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="text-capitalize"
                >profil</v-list-item-title
              >
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="item in sortItems"
            :key="item.title"
            :to="item.to"
          >
            <v-list-item-title class="text-capitalize">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-for="item in sortItemArticle"
            :key="item.title"
            :to="item.to"
          >
            <v-list-item-title class="text-capitalize">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group :value="false">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="text-capitalize"
                >pencaker</v-list-item-title
              >
            </v-list-item-content>
          </template>
          <v-list-item to="/job-seeker">
            <v-list-item-content>
              <v-list-item-title class="text-capitalize"
                >karyawan</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-for="item in itemJob" :key="item.title" :to="item.to">
            <v-list-item-title class="text-capitalize">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group :value="false">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="text-capitalize"
                >lowker</v-list-item-title
              >
            </v-list-item-content>
          </template>
          <v-list-item v-for="item in jobVacancy" :key="item.title" :to="item.to">
            <v-list-item-title class="text-capitalize">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item to="/school">
          <v-list-item-content>
            <v-list-item-title class="text-capitalize"
              >sekolah unggulan</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item to="/activate-account">
          <v-list-item-icon>
            <v-icon class="primary--text">$activate</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-capitalize primary--text"
              >aktivasi</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/login-job-seeker">
          <v-list-item-icon>
            <v-icon class="primary--text">$login</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-capitalize primary--text"
              >masuk</v-list-item-title
            >
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
    itemsArticle: [
      { title: 'artikel', to: '/article' },
    ],
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

<style scoped>
.button-height {
  height: 100%;
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
</style>
