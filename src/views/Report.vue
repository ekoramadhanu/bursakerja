<template>
  <div>
    <v-main>
      <v-container class="d-flex flex-column justify-center size-max">
        <v-breadcrumbs
          :items="items"
          class="text-capitalize pa-2"
        ></v-breadcrumbs>
        <v-card elevation="3" class="pa-4">
          <div class="d-flex">
            <v-icon class="mr-2 warning--text" size="25">$warning</v-icon>
            <p class="text-capitalize ma-0 text-subtitle-1">
              hati hati data akan disimpan ke database
            </p>
          </div>
        </v-card>
        <v-card class="overflow-hidden mt-3">
          <v-toolbar flat color="primary">
            <v-icon class="mr-2 white--text">$warning</v-icon>
            <v-toolbar-title class="font-weight-light white--text"
              >lapor</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn color="white" fab small @click="isEditing = !isEditing">
              <v-icon v-if="isEditing" class="primary--text">mdi-close</v-icon>
              <v-icon v-else class="primary--text">mdi-pencil</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-form lazy-validation ref="form">
              <v-autocomplete
                v-model="model"
                :items="lists"
                :loading="isLoading"
                :search-input.sync="search"
                hide-no-data
                hide-selected
                item-text="fullname"
                item-value="id"
                label="Silahakn Cari Nama Pencari Kerja"
                prepend-icon="mdi-database-search"
                return-object
                :rules="rulesModel"
                :disabled="!isEditing"
                @change="changeValue()"
              ></v-autocomplete>
              <img
                :src="priviewPhoto"
                v-if="priviewPhoto != null"
                class="preview-img"
                contain
                aspect-ratio="1.7"
              />
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!isEditing"
              color="primary"
              @click="save"
              class=""
            >
              <v-progress-circular
                indeterminate
                color="white"
                v-if="loadingSave"
              ></v-progress-circular>
              <p
                class="text-capitalize white--text my-auto"
                v-if="!loadingSave"
              >
                simpan
              </p>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
      <v-snackbar
        v-model="hasSaved"
        :timeout="4000"
        top
        right
        color="white"
        max-width="250px"
      >
        <div class="d-flex">
          <v-icon
            :class="
              status === false ? 'mr-2 error--text' : 'mr-2 success--text'
            "
            >{{ icon }}</v-icon
          >
          <p class="text-capitalize black--text ma-0 text-subtitle-1">
            {{ message }}
          </p>
        </div>
      </v-snackbar>
    </v-main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    items: [
      {
        text: 'lapor',
        disabled: true,
      },
    ],
    isEditing: null,
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    rulesModel: [(v) => !!v || 'Nama Pencari Kerja Tidak Boleh Kosong'],
    search: null,
    priviewPhoto: null,
    loadingSave: false,
    hasSaved: false,
    status: null,
    icon: '',
    message: '',
  }),
  computed: {
    lists() {
      return this.entries.map((entry) => {
        const { fullname } = entry;
        return { ...entry, fullname };
      });
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    search(val) {
      // lists have already been loaded
      if (this.lists.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      fetch(`${this.$store.state.domain}job-seeker/account-activate`, {
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log(res);
          const entries = res.data.jobSeeker;
          this.entries = entries;
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        })
        // eslint-disable-next-line no-return-assign
        .finally(() => (this.isLoading = false));
    },
  },
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        this.loadingSave = true;
        axios({
          baseURL: `${this.$store.state.domain}blacklist`,
          method: 'post',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            jobSeeker: this.model.id,
          },
        })
          .then((response) => {
            if (response.data.data.message === 'Data Blacklist Is Successfully Create') {
              this.hasSaved = true;
              this.status = true;
              this.message = 'data berhasil simpan';
              this.icon = '$success';
            } else {
              this.hasSaved = true;
              this.status = false;
              this.message = 'data tidak berhasil simpan';
              this.icon = '$warning';
            }
          })
          .catch(() => {
            this.hasSaved = true;
            this.status = false;
            this.message = 'server mengalami error';
            this.icon = '$warning';
          })
          .finally(() => {
            this.loadingSave = false;
          });
      }
    },
    changeValue() {
      this.priviewPhoto = this.model.image;
    },
  },
};
</script>

<style scoped>
.preview-img {
  max-width: 354px;
  max-height: 472px;
}
</style>
