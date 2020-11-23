<template>
  <div>
    <v-main>
      <v-container class="d-flex flex-column justify-center size-max">
        <v-card class="overflow-hidden mt-3" v-if="!skeleton">
          <v-toolbar flat color="primary">
            <v-toolbar-title class="font-weight-light white--text">
              <span class="font-family"> Tentang Kami yang Ditampilkan </span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="white" icon @click="isEditing = !isEditing">
              <v-icon v-if="isEditing">mdi-close</v-icon>
              <v-icon v-else>mdi-pencil</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" lazy-validation v-if="isEditing">
              <v-file-input
                label="Unggah Gambar (Maks 1 MB) Dengan Ukuran 1044x400"
                accept="image/png, image/jpeg, image/bmp"
                required
                ref="fileInput"
                enctype="multipart/form-data"
                :rules="previewImage !== null ? [] : imageRules"
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
                class="font-family"
                :card-props="{ height: '300', style: 'overflow: auto;' }"
                :extensions="extensions"
              />
            </v-form>
            <p
              class="text-subtitle-1 mb-0 mt-4 text-uppercase font-weight-bold"
              v-if="isEditing"
            >
              <span class="font-family"> pratinjau </span>
            </p>
            <v-divider v-if="isEditing" class="mb-4"></v-divider>
            <div>
              <v-img
                :src="previewImage"
                height="400"
                max-width="1044"
                aspect-ratio="1.7778"
                class="mb-4"
              />
              <div
                class="text-justify font-family black--text"
                v-html="content"
                v-if="!skeleton"
              ></div>
            </div>
          </v-card-text>
          <v-card-actions v-if="isEditing">
            <v-spacer></v-spacer>
            <v-btn :disabled="!isEditing" color="primary" @click="save">
              <v-progress-circular
                indeterminate
                color="white"
                v-if="loadingSave"
              ></v-progress-circular>
              <p class="white--text my-auto" v-if="!loadingSave">simpan</p>
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
            method: 'PATCH',
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
.preview-img {
  max-width: 1044px;
  max-height: 400px;
}
div >>> ul > li {
  line-height: 25px !important;
}
div >>> ol > li {
  line-height: 25px !important;
}
div >>> li > p {
  margin-bottom: 5px !important;
}
div >>> li {
  margin-bottom: 10px;
}
div >>> li > ol {
  margin: 0px;
}
div >>> li > ul {
  margin: 0px;
}
.image-cover {
  object-fit: cover;
}
</style>
