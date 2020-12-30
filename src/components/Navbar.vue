<template>
  <div class="mb-2">
    <v-app-bar fixed color="white" flat>
      <div class="max-width mx-auto">
        <div class="d-flex height-navbar">
          <v-app-bar-nav-icon
            class="hidden-lg-and-up primary--text"
            @click="drawer = !drawer"
            light
          />
          <router-link
            to="/"
            class="my-auto text-decoration-none hidden-md-and-down"
          >
            <v-toolbar-title class="primary--text">
              <v-img
                src="@/assets/logo.svg"
                width="100%"
                height="100%"
                max-width="153"
                max-height="30"
                to="/"
                contain
              ></v-img>
            </v-toolbar-title>
          </router-link>
          <router-link to="/" class="my-auto text-width-xs hidden-lg-and-up">
            <v-toolbar-title>
              <v-img
                src="@/assets/logo.svg"
                to="/"
                width="100%"
                height="100%"
                max-width="153"
                max-height="30"
                class="mx-auto"
                contain
              ></v-img
            ></v-toolbar-title>
          </router-link>
          <v-spacer></v-spacer>
          <div class="hidden-md-and-down button-height">
            <v-btn
              text
              to="/"
              elevation="0"
              class="pa-0 mr-6 no-focus"
              height="100%"
            >
              <span class="my-auto font-family font-weight-regular">beranda</span>
            </v-btn>
            <v-menu offset-y class="button-height" open-on-hover>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  text
                  class="no-focus font-family pa-0 mr-6"
                  height="100%"
                  >profil
                  <v-icon class="ml-2" size="14">$dropdown</v-icon>
                </v-btn>
              </template>
              <v-list flat>
                <v-list-item
                  v-for="item in sortItems"
                  :key="item.title"
                  :to="item.to"
                  dense
                >
                  <v-list-item-title
                    class="text-uppercase no-focus font-family"
                    >{{ item.title }}</v-list-item-title
                  >
                </v-list-item>
                <v-list-item
                  v-for="item in itemsArticle"
                  :key="item.title"
                  :to="item.to"
                  dense
                >
                  <v-list-item-title
                    class="text-uppercase no-focus font-family"
                    >{{ item.title }}</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
            <v-menu offset-y class="button-height" open-on-hover>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  text
                  class="no-focus font-family pa-0 mr-6"
                  height="100%"
                  >pencaker
                  <v-icon class="ml-2" size="14">$dropdown</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item to="/job-seeker" dense class="no-focus">
                  <v-list-item-title class="text-uppercase font-family">
                    karyawan
                  </v-list-item-title>
                </v-list-item>
                <v-list-item
                  v-for="(item, index) in sortItemsJob"
                  :key="index"
                  :to="item.to"
                  dense
                  class="no-focus"
                >
                  <v-list-item-title class="text-uppercase font-family">{{
                    item.title
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-menu offset-y class="button-height" open-on-hover>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  text
                  class="no-focus font-family pa-0 mr-6"
                  height="100%"
                  >lowker
                  <v-icon class="ml-2" size="14">$dropdown</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in sortItemJobVacancy"
                  :key="index"
                  :to="item.to"
                  dense
                  class="no-focus"
                >
                  <v-list-item-title class="text-uppercase font-family">{{
                    item.title
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn
              text
              to="/school"
              elevation="0"
              class="no-focus pa-0 mr-6"
              height="100%"
            >
              <span class="my-auto font-family">sekolah unggulan</span>
            </v-btn>
            <v-btn class="mr-6 rounded-lg" outlined color="primary" to="/activate-account">
              <p class="my-auto font-family font-weight-bold ">aktivasi</p>
            </v-btn>
            <v-btn
              class=""
              color="primary rounded-lg"
              to="/login-job-seeker"
              elevation="0"
            >
              <p class="my-auto font-family font-weight-bold">masuk</p>
            </v-btn>
          </div>
        </div>
      </div>
    </v-app-bar>
    <!-- drawer menu -->
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list dense>
        <v-list-item to="/" class="no-focus">
          <v-list-item-content>
            <v-list-item-title class="font-family text-uppercase"
              >beranda</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-group :value="dropDown" append-icon="$dropdown" active-class="black--text">
          <template v-slot:activator>
            <v-list-item-content class="no-focus">
              <v-list-item-title class="font-family text-uppercase"
                >profil</v-list-item-title
              >
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="item in sortItems"
            :key="item.title"
            :to="item.to"
            class="no-focus"
            active-class="black--text"
          >
            <v-list-item-title class="font-family text-uppercase">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-for="item in sortItemArticle"
            :key="item.title"
            :to="item.to"
            class="no-focus"
          >
            <v-list-item-title class="font-family text-uppercase">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group :value="dropDown" append-icon="$dropdown" active-class="black--text">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="font-family text-uppercase"
                >pencaker</v-list-item-title
              >
            </v-list-item-content>
          </template>
          <v-list-item to="/job-seeker">
            <v-list-item-content class="no-focus">
              <v-list-item-title class="font-family text-uppercase"
                >karyawan</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-for="item in itemJob"
            :key="item.title"
            :to="item.to"
            class="no-focus"
          >
            <v-list-item-title class="font-family text-uppercase">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group :value="dropDown" append-icon="$dropdown" active-class="black--text">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="font-family text-uppercase"
                >lowker</v-list-item-title
              >
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="item in jobVacancy"
            :key="item.title"
            :to="item.to"
          >
            <v-list-item-title class="font-family text-uppercase">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item to="/school">
          <v-list-item-content>
            <v-list-item-title class="font-family text-uppercase"
              >sekolah unggulan</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item to="/activate-account">
          <v-list-item-content>
            <v-list-item-title class="font-family text-uppercase"
              >aktivasi</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/login-job-seeker">
          <v-list-item-content>
            <v-list-item-title class="font-family text-uppercase"
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
    itemsArticle: [{ title: 'artikel', to: '/article' }],
    itemJob: [
      { title: 'informal', to: '/job-seeker-informal' },
      { title: 'tenaga magang', to: '/job-seeker-internship' },
      { title: 'profesional', to: '/job-seeker-professional' },
    ],
    jobVacancy: [
      { title: 'pasang lowongan', to: '/upload-job-vacancy' },
      { title: 'cari lowongan', to: '/job-vacancy' },
    ],
    dropDown: false,
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
  updated() {
  },
};
</script>

<style lang='scss' scoped>
.button-height {
  height: 100%;
  max-width: 1366px;
}
.max-width {
  max-width: 1044px;
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
.no-focus:before {
  opacity: 0 !important;
}
</style>
