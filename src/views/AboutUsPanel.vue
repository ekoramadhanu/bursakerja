<template>
  <div>
    <v-main>
      <v-container class="d-flex flex-column justify-center size-max">
        <v-card elevation="3" class="pa-4">
          <div class="d-flex">
            <v-icon class="mr-2 warning--text" size="25">$warning</v-icon>
            <p class="text-capitalize ma-0 text-subtitle-1">
              hati hati data akan disimpan ke database
            </p>
          </div>
        </v-card>
        <v-card class="overflow-hidden mt-3" v-if="!skeleton">
          <v-toolbar flat color="primary">
            <v-icon class="mr-2 white--text">$UMKM</v-icon>
            <v-toolbar-title
              class="font-weight-light text-capitalize white--text"
              >tentang kami</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn color="white" fab small @click="isEditing = !isEditing">
              <v-icon v-if="isEditing" class="primary--text">mdi-close</v-icon>
              <v-icon v-else class="primary--text">mdi-pencil</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-file-input
                label="Unggah Gambar Bursa Kerja (Maks 1 MB) Dengan Ukuran 970x220"
                accept="image/png, image/jpeg, image/bmp"
                required
                ref="fileInput"
                enctype="multipart/form-data"
                :rules="previewImage !== null ? [] : imageRules"
                :disabled="!isEditing"
                @change="ChangeImage"
              ></v-file-input>
              <img
                :src="previewImage"
                v-if="previewImage !== null"
                class="preview-img"
                contain
                aspect-ratio="1.7"
              />
              <tip-tap-vuetify
                v-model="content"
                :card-props="{ height: '300', style: 'overflow: auto;' }"
                :extensions="extensions"
                :disabled="!isEditing"
              />
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="!isEditing" color="primary" @click="save">
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
        <v-skeleton-loader
          ref="skeleton"
          type="card"
          v-if="skeleton"
          class="mt-3"
        ></v-skeleton-loader>
        <v-snackbar v-model="hasSaved" :timeout="2000" top right color="white">
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
      </v-container>
    </v-main>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from 'tiptap-vuetify';
import axios from 'axios';

export default {
  data: () => ({
    items: [
      {
        text: 'tentang kami',
        disabled: true,
      },
    ],
    hasSaved: false,
    isEditing: null,
    previewImage: null,
    imageRules: [
      (v) => !!v || 'Gambar Bursa Kerja Tidak Boleh Kosong',
      (v) => !v || v.size < 1000000 || 'Gambar Bursa Kerja Harus Kurang Dari 1MB',
    ],
    // tip tap
    extensions: [
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3],
          },
        },
      ],
      Bold,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak,
    ],
    // starting editor's content
    content: '',
    idAboutUs: '',
    skeleton: true,
    status: null,
    icon: '',
    message: '',
    loadingSave: false,
  }),
  components: {
    'tip-tap-vuetify': TiptapVuetify,
  },
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        if (this.content.length > 7) {
          this.loadingSave = true;
          axios({
            baseURL: `${this.$store.state.domain}about-us/${this.idAboutUs}`,
            method: 'patch',
            headers: {
              'x-api-key': this.$store.state.apiKey,
              authorization: `Bearer ${this.$cookies.get('token')}`,
            },
            data: {
              description: this.content,
              photo: this.previewImage,
            },
          })
            .catch(() => {
              this.status = false;
              this.message = 'server mengalami error';
              this.icon = '$warning';
            })
            .finally(() => {
              this.isEditing = !this.isEditing;
              this.hasSaved = true;
              this.message = 'data  berhasil disimpan ';
              this.icon = '$success';
              this.status = true;
              this.loadingSave = false;
            });
        } else {
          this.hasSaved = true;
          this.message = 'data tidak berhasil disimpan ';
          this.icon = '$warning';
          this.status = false;
        }
      }
    },
    ChangeImage(event) {
      // this.image = event;
      if (event == null) {
        this.previewImage = null;
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(event);
      }
    },
  },
  beforeCreate() {
    if (
      this.$store.state.role === 'Pencaker'
      || this.$store.state.role === 'Magang'
      || this.$store.state.role === 'Umum'
      || this.$store.state.role === 'Profesional'
      || this.$store.state.role === 'Informal'
    ) {
      this.$router.push('/access-block');
    } else {
      axios({
        baseURL: `${this.$store.state.domain}about-us`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
        },
      })
        .then((response) => {
          this.content = response.data.data.aboutUs[0].description;
          this.idAboutUs = response.data.data.aboutUs[0].id;
          this.previewImage = response.data.data.aboutUs[0].image;
        })
        .catch(() => {
          this.status = false;
          this.message = 'server mengalami error';
          this.icon = '$warning';
        })
        .finally(() => {
          this.skeleton = false;
        });
    }
  },
  beforeDestroy() {
    this.items = null;
    this.hasSaved = null;
    this.isEditing = null;
    this.previewImage = null;
    this.imageRules = null;
    this.extensions = null;
    this.content = null;
    this.idAboutUs = null;
    this.skeleton = null;
    this.status = null;
    this.icon = null;
    this.message = null;

    delete this.items;
    delete this.hasSaved;
    delete this.isEditing;
    delete this.previewImage;
    delete this.imageRules;
    delete this.extensions;
    delete this.content;
    delete this.idAboutUs;
    delete this.skeleton;
    delete this.icon;
    delete this.message;
  },
};
</script>

<style scoped>
.size-max {
  max-width: 1366px;
}
.tip-tap-size {
  overflow: auto;
  max-height: 300px;
}
.preview-img {
  max-width: 800px;
  max-height: 600px;
}
div >>> ul {
  line-height: 18px !important;
}
div >>> ol {
  line-height: 18px !important;
}
div >>> li > p {
  margin: 3px !important;
}
</style>
