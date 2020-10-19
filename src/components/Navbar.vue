<template>
  <div class="mb-2">
    <v-app-bar fixed color="white" elevate-on-scroll>
      <div class="max-width mx-auto">
        <div class="d-flex height-navbar">
          <v-app-bar-nav-icon
            class="hidden-sm-and-up primary--text"
            @click="drawer = !drawer"
          />
          <router-link
            to="/"
            class="my-auto text-decoration-none hidden-xs-only"
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
            class="my-auto text-width-xs text-decoration-none hidden-sm-and-up"
          >
            <v-toolbar-title class="text-center primary--text"
              >Bursa Kerja</v-toolbar-title
            >
          </router-link>
          <v-spacer></v-spacer>
          <div
            class="hidden-xs-only button-height"
            v-if="!this.$store.state.checkToken"
          >
            <v-btn text height="100%" to="/activate-account">
              <v-icon class="mr-2 primary--text">$activate</v-icon>
              <p class="text-capitalize my-auto primary--text">aktivasi</p>
            </v-btn>
            <v-btn text height="100%" to="/login-job-seeker">
              <v-icon class="mr-2 primary--text">$login</v-icon>
              <p class="text-capitalize my-auto primary--text">masuk</p>
            </v-btn>
          </div>
          <v-menu
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
          </v-menu>
        </div>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list>
        <v-list-item
          to="/activate-account"
          v-if="!this.$store.state.checkToken"
        >
          <v-list-item-icon>
            <v-icon class="primary--text">$activate</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-capitalize primary--text"
              >aktivasi</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          to="/login-job-seeker"
          v-if="!this.$store.state.checkToken"
        >
          <v-list-item-icon>
            <v-icon class="primary--text">$login</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-capitalize primary--text"
              >masuk</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/home" v-if="this.$store.state.checkToken">
          <v-list-item-icon>
            <v-icon class="primary--text">$dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-capitalize primary--text"
              >dashboard</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="this.$store.state.checkToken" @click="logout()">
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
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
  }),
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
