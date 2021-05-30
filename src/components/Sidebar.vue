<template>
  <div>
    <v-navigation-drawer v-model="drawer" app color="primary" fixed>
      <v-list>
        <v-list-item>
          <v-list-item-title class="white--text title-brand">
            bursakerja.net
          </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item-group active-class="sidebar-item-active">
          <v-list-item to="/home">
            <v-list-item-content>
              <v-list-item-title
                class="text-capitalize white--text font-family"
              >
                dashboard
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-for="item in navigations"
            :key="item.name"
            link
            :to="item.link"
          >
            <v-list-item-content v-if="item.name !== 'pengumuman'">
              <v-list-item-title
                class="white--text text-capitalize font-family"
              >
                {{ item.name }}
              </v-list-item-title>
            </v-list-item-content>
            <v-badge
              :content="messages"
              :value="messages"
              color="white"
              dot
              v-if="item.name === 'pengumuman'"
              class="white--text text-capitalize font-family"
            >
              {{ item.name }}
            </v-badge>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="white">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-family">{{ $route.name }}</v-toolbar-title>
      <v-spacer />
      <v-divider vertical class="mr-2" />
      <v-menu
        transition="slide-x-transition"
        bottom
        right
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <div
            v-bind="attrs"
            v-on="on"
          >
            <div class="d-flex">
              <div class="d-flex flex-column mr-2">
                <p class="text-capitalize text-caption mb-0 text-start">
                  {{ fullname }}
                </p>
                <p class="text-capitalize text-caption mb-0 text-start">
                  {{ $store.state.role }}
                </p>
              </div>
              <v-avatar
                color="primary"
                size="36"
              >
                <span class="white--text text-capitalize ma-0 text-subtitle-2">{{ photo }}</span>
              </v-avatar>
            </div>
          </div>
        </template>
        <v-list>
          <v-list-item @click="anchor()" to="/change-password">
            <v-list-item-title class="text-capitalize font-family">
              ganti kata sandi
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout()">
            <v-list-item-title class="text-capitalize font-family">
              keluar
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    drawer: null,
    messages: 0,
  }),
  computed: {
    navigations() {
      const { role } = this.$store.state;
      return this.$store.getters.returnSidebar(role);
    },
    photo() {
      const { nameUser } = this.$store.state;
      const { role } = this.$store.state;
      if (nameUser === '' && role === 'Magang') {
        return 'M';
      }
      return nameUser.substring(0, 1);
    },
    fullname() {
      const { nameUser } = this.$store.state;
      if (nameUser === '') {
        return '-';
      }
      if (nameUser !== '' && nameUser.length > 21) {
        return `${nameUser.substr(0, 21)}...`;
      }
      return nameUser;
    },
  },
  methods: {
    logout() {
      this.$cookies.remove('token');
      this.$store.commit('changeCheckToken', false);
      this.$store.commit('changeToken', '');
      this.$router.push('/');
    },
  },
  beforeCreate() {
    let endpoint = '';
    if (this.$store.state.role === 'Pencaker') {
      endpoint = `${this.$store.state.domain}broadcast/job-seekers`;
    } else if (this.$store.state.role === 'Perusahaan') {
      endpoint = `${this.$store.state.domain}broadcast/umkm`;
    }
    if (
      this.$store.state.role === 'Perusahaan'
      || this.$store.state.role === 'Pencaker'
    ) {
      axios({
        baseURL: endpoint,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          Authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          this.messages = parseInt(response.data.data.total, 10);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    }
  },
  beforeDestroy() {
    this.drawer = null;
    this.messages = null;

    delete this.drawer;
    delete this.messages;
  },
};
</script>

<style lang="scss" scoped>
.sidebar-item-active {
  background-color: #0d47a1;
}
</style>
