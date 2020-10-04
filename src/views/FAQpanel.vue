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
        <v-card class="overflow-hidden mt-3" v-if="!skeleton">
          <v-toolbar flat color="primary">
            <v-icon class="mr-2 white--text">$FAQ</v-icon>
            <v-toolbar-title class="font-weight-light white--text"
              >FAQ</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn color="white" fab small @click="isEditing = !isEditing">
              <v-icon v-if="isEditing" class="primary--text">mdi-close</v-icon>
              <v-icon v-else class="primary--text">mdi-pencil</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <tip-tap-vuetify
              v-model="content"
              :extensions="extensions"
              :disabled="!isEditing"
              class="tip-tap-size"
            />
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
              <p class="text-capitalize white--text my-auto" v-if="!loadingSave">simpan</p>
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
        :timeout="4000"
        top
        right
        color="white"
        max-width="250px"
      >
        <div class="d-flex">
          <v-icon
            :class="status === true ? 'mr-2 error--text' : 'mr-2 success--text'"
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
        text: 'FAQ',
        disabled: true,
      },
    ],
    hasSaved: false,
    isEditing: null,
    message: '',
    icon: '',
    status: null,
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
    idFAQ: '',
    skeleton: true,
    loadingSave: false,
  }),
  components: {
    'tip-tap-vuetify': TiptapVuetify,
  },
  methods: {
    save() {
      if (this.content.length > 7) {
        this.loadingSave = true;
        axios({
          baseURL: `${this.$store.state.domain}faq/${this.idFAQ}`,
          method: 'patch',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            description: this.content,
          },
        })
          .catch(() => {
            this.status = false;
            this.message = 'server mengalami error';
            this.icon = '$warning';
          })
          .finally(() => {
            this.loadingSave = false;
            this.isEditing = !this.isEditing;
            this.hasSaved = true;
            this.message = 'data berhasil disimpan';
            this.icon = '$success';
            this.status = true;
          });
      } else {
        this.message = 'data tidak bisa disimpan';
        this.icon = '$warning';
        this.hasSaved = true;
        this.status = false;
      }
    },
  },
  beforeCreate() {
    axios({
      baseURL: `${this.$store.state.domain}faq`,
      method: 'get',
      headers: {
        'x-api-key': this.$store.state.apiKey,
      },
    })
      .then((response) => {
        this.content = response.data.data.FAQ[0].description;
        this.idFAQ = response.data.data.FAQ[0].id;
      })
      .catch(() => {
        this.status = false;
        this.message = 'server mengalami error';
        this.icon = '$warning';
      })
      .finally(() => {
        this.skeleton = false;
      });
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
  max-width: 1366px;
}
.tip-tap-size {
  overflow: auto;
  max-height: 300px;
}
</style>
