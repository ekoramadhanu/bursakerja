<template>
  <div>
    <v-navigation-drawer v-model="drawer" app color="primary" fixed>
      <v-list dense shaped>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-capitalize white--text text-h6">
              bursa kerja
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar
            class="white d-flex justify-center align-center"
            size="50"
          >
            <h2 class="primary--text ma-0 text-uppercase">
              {{photo}}
            </h2>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="white--text text-capitalize body-2">{{
             fullname
            }}</v-list-item-title>
            <v-list-item-title class="white--text caption">
              <p class="py-1 ma-0">{{ this.$store.state.role }}</p>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item-group active-class="active">
          <p class="caption text-capitalize white--text my-1 ml-4">
            menu utama
          </p>
          <v-list-item to="/home">
            <v-list-item-action>
              <v-icon class="white--text">$dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="text-capitalize white--text">
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
            <v-list-item-action v-if="item.icon !== '$announcement'">
              <v-icon class="white--text text-capitalize">{{
                item.icon
              }}</v-icon>
            </v-list-item-action>

            <v-list-item-action v-if="item.icon === '$announcement'">
              <v-badge
                :content="messages"
                :value="messages"
                dot
                color="white"
              >
                <v-icon class="white--text">{{item.icon}}</v-icon>
              </v-badge>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title class="white--text text-capitalize">{{
                item.name
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <p class="caption text-capitalize white--text my-1 ml-4">akun</p>
          <v-list-item to="/change-password">
            <v-list-item-action>
              <v-icon class="white--text">$padlock</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="text-capitalize white--text">
                ganti kata sandi
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="logout()">
            <v-list-item-action>
              <v-icon class="white--text">$logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="text-capitalize white--text">
                keluar
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="white">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- <div class="width-topbar d-flex justify-end">
        <v-badge
          :content="messages"
          :value="messages"
          overlap
          class="hidden-xs-only"
        >
          <v-icon class="text-right">$bell</v-icon>
        </v-badge>
      </div> -->
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
        return '';
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
    if (this.$store.state.role === 'Perusahaan' || this.$store.state.role === 'Pencaker') {
      axios({
        baseURL: endpoint,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
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

<style scoped>
.width-topbar {
  width: 100%;
}
.active {
  background-color: #114f8c;
}
</style>
