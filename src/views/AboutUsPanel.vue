/*
  Nama        : Eko Ramadhanu Aryputra
  Log Date    : 29 Januri 2020 -> check data  after change image base 64 to link
                               -> add request every get per item
  Log Note    :-
*/
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
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family">
                  Gambar (Maks 1 MB) Dengan Ukuran 1044px x 400px
                </span>
                <span class="ml-1 error--text">
                  *
                </span>
              </p>
              <v-file-input
                label="Unggah Gambar (Maks 1 MB) Dengan Ukuran 1044px x 400px"
                accept="image/png, image/jpeg, image/jpg"
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
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family">
                  penjelasan terkait perusahaan
                </span>
                <span class="ml-1 error--text">
                  *
                </span>
              </p>
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
                contain
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
            <v-btn :disabled="!isEditing" color="primary" @click="save" text>
              <v-progress-circular
                indeterminate
                color="primary"
                v-if="loadingSave"
              ></v-progress-circular>
              <p class=" my-auto" v-if="!loadingSave">simpan</p>
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
  HardBreak,
  HorizontalRule,
  History,
} from 'tiptap-vuetify';
import axios from 'axios';

export default {
  data: () => ({
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
    async save() {
      if (this.$refs.form.validate()) {
        if (this.content.length > 7) {
          try {
            this.loadingSave = true;
            const response = await axios({
              baseURL: `${this.$store.state.domain}about-us/${this.idAboutUs}`,
              method: 'PATCH',
              headers: {
                'x-api-key': this.$store.state.apiKey,
                Authorization: `Bearer ${this.$cookies.get('token')}`,
              },
              data: {
                description: this.content,
                photo: this.previewImage,
              },
            });
            if (response.data.data.attributes.data === 'Data About Us Has Been Updated') {
              this.hasSaved = true;
              this.message = 'data  berhasil disimpan ';
              this.icon = '$success';
              this.status = true;
            } else {
              this.hasSaved = true;
              this.message = 'data tidak berhasil disimpan ';
              this.icon = '$error';
              this.status = false;
            }
            this.loadingSave = false;
            this.isEditing = !this.isEditing;
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
          }
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
  async beforeCreate() {
    if (
      this.$store.state.role === 'Pencaker'
      || this.$store.state.role === 'Magang'
      || this.$store.state.role === 'Umum'
      || this.$store.state.role === 'Profesional'
      || this.$store.state.role === 'Informal'
    ) {
      this.$router.push('/access-block');
    } else {
      try {
        const response = await axios({
          baseURL: `${this.$store.state.domain}about-us`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
          },
        });
        const response1 = await axios({
          baseURL: `${this.$store.state.domain}about-us/stream`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
          },
          responseType: 'blob',
        });
        this.content = response.data.data.attributes[0].description;
        this.idAboutUs = response.data.data.attributes[0].id;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(response1.data);
        this.skeleton = false;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  },
  beforeDestroy() {
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
    this.loadingSave = null;

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
    delete this.loadingSave;
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
div >>> ul > li,
div >>> ol > li {
  line-height: 25px !important;
}
div >>> li > p {
  margin-bottom: 0px !important;
  margin-top: 0px !important;
}
div >>> li {
  margin-bottom: 0px;
}
div >>> li > ol,
div >>> li > ul {
  margin: 0px;
}
div >>> p, div >>> h1, div >>> h2, div >>> h3 {
  margin-top: 0px !important;
  margin-bottom: 3px !important;
}
.image-cover {
  object-fit: cover;
}
</style>
