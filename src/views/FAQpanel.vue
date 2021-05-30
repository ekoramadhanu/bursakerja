/*
  Nama        : Eko Ramadhanu Aryputra
  Log Date    : 29 Januri 2020 -> check data  after change image base 64 to link
                               -> add style for content
  Log Note    :-
*/
<template>
  <div>
    <v-main>
      <v-container class="d-flex flex-column justify-center size-max">
        <v-card class="overflow-hidden mt-3" v-if="!skeleton">
          <v-toolbar flat color="primary">
            <v-toolbar-title class="font-weight-light white--text">
              <span class="font-family"> FAQ yang Ditampilkan </span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="white" icon @click="isEditing = !isEditing">
              <v-icon v-if="isEditing">mdi-close</v-icon>
              <v-icon v-else>mdi-pencil</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <tip-tap-vuetify
              v-if="isEditing"
              v-model="content"
              class="font-family"
              :extensions="extensions"
              :card-props="{ height: '600', style: 'overflow: auto;' }"
            />
            <p
              class="text-subtitle-1 text-uppercase font-weight-bold mt-4 mb-0"
              v-if="isEditing"
            >
              pratinjau
            </p>
            <v-divider v-if="isEditing" class="mb-4"></v-divider>
            <div v-html="content" class="text-justify font-family black--text"></div>
          </v-card-text>
          <v-card-actions v-if="isEditing">
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!isEditing"
              color="primary"
              @click="save"
              class=""
              text
            >
              <v-progress-circular
                indeterminate
                color="primary"
                v-if="loadingSave"
              ></v-progress-circular>
              <p class="my-auto" v-if="!loadingSave">simpan</p>
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-skeleton-loader
          ref="skeleton"
          type="card"
          v-if="skeleton"
          class="mt-3"
        ></v-skeleton-loader>
      </v-container>
      <v-snackbar
        v-model="hasSaved"
        :timeout="2000"
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
// eslint-disable-next-line no-unused-vars
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  CodeBlock,
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
    message: '',
    icon: '',
    status: null,
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
      CodeBlock,
      HorizontalRule,
      Paragraph,
      HardBreak,
    ],
    // starting editor's content
    content: '',
    idFAQ: '',
    skeleton: true,
    loadingSave: false,
  }),
  components: {
    'tip-tap-vuetify': TiptapVuetify,
  },
  methods: {
    async save() {
      if (this.content.length > 7) {
        try {
          this.loadingSave = true;
          const response = await axios({
            baseURL: `${this.$store.state.domain}faq/${this.idFAQ}`,
            method: 'patch',
            headers: {
              'x-api-key': this.$store.state.apiKey,
              Authorization: `Bearer ${this.$cookies.get('token')}`,
            },
            data: {
              description: this.content,
            },
          });
          if (response.data.data.attributes.data === 'Data FAQ Has Been Updated') {
            this.loadingSave = false;
            this.hasSaved = true;
            this.message = 'data berhasil diubah';
            this.icon = '$success';
            this.status = true;
          }
          this.isEditing = !this.isEditing;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      } else {
        this.message = 'data tidak bisa disimpan';
        this.icon = '$warning';
        this.hasSaved = true;
        this.status = false;
      }
    },
  },
  async beforeCreate() {
    if (
      this.$store.state.role === 'UMKM'
      || this.$store.state.role === 'Magang'
      || this.$store.state.role === 'Umum'
      || this.$store.state.role === 'Profesional'
      || this.$store.state.role === 'Informal'
    ) {
      this.$router.push('/access-block');
    } else {
      try {
        const response = await axios({
          baseURL: `${this.$store.state.domain}faq`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
          },
        });
        this.content = response.data.data.attributes[0].description;
        this.idFAQ = response.data.data.attributes[0].id;
        this.skeleton = false;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  },
  beforeDestroy() {
    this.items = null;
    this.hasSaved = null;
    this.isEditing = null;
    this.message = null;
    this.icon = null;
    this.color = null;
    this.extensions = null;
    this.content = null;
    this.skeleton = null;
    this.loadingSave = null;
    this.idFAQ = null;

    delete this.items;
    delete this.hasSaved;
    delete this.isEditing;
    delete this.message;
    delete this.icon;
    delete this.color;
    delete this.extensions;
    delete this.content;
    delete this.skeleton;
    delete this.loadingSave;
    delete this.idFAQ;
  },
};
</script>

<style scoped>
.size-max {
  max-width: 1044px;
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
</style>
