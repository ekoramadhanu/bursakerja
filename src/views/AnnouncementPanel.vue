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
        <v-data-table
          :headers="headerArticle"
          :items="article"
          class="elevation-3 mt-3"
          hide-default-footer
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <div class="d-flex">
                  <v-icon class="primary--text mr-2">$announcement</v-icon>
                  <p class="ma-0 text-uppercase primary--text hidden-xs-only">
                    pengumuman
                  </p>
                </div>
              </v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog
                v-model="dialogAdd"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon class="mr-2 white--text" size="15">$add</v-icon>
                    <p class="ma-0 text-capitalize white--text">tambah</p>
                  </v-btn>
                </template>
                <v-card>
                  <v-toolbar class="primary">
                    <v-btn icon @click="closeAdd()">
                      <v-icon class="white--text">$close</v-icon>
                    </v-btn>
                    <v-toolbar-title class="text-capitalize white--text">
                      silahkan isi data pengumuman
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn text @click="saveAdd()">
                      <p class="ma-0 text-capitalize white--text">simpan</p>
                    </v-btn>
                  </v-toolbar>

                  <v-card-text>
                    <v-form ref="form" lazy-validation>
                      <v-text-field
                        v-model="editedItemArticle.title"
                        :rules="titleRules"
                        prepend-icon="$announcement"
                        label="Judul pengumuman"
                        required
                      />
                      <v-select
                        v-model="editedItemArticle.user"
                        :rules="userRules"
                        prepend-icon="$announcement"
                        :items="userRead"
                        item-text="state"
                        item-value="abbr"
                        label="pilih pembaca dari artikel ini"
                      />
                      <v-file-input
                        label="Unggah Gambar Pengumuamn (Maks 1 MB)"
                        accept="image/png, image/jpeg, image/bmp"
                        required
                        ref="fileInput"
                        enctype="multipart/form-data"
                        :rules="imageRules"
                        @change="ChangeImage"
                      ></v-file-input>
                      <img
                        :src="editedItemArticle.image"
                        v-if="editedItemArticle.image != null"
                        class="preview-img"
                        contain
                        aspect-ratio="1.7"
                      />
                      <tip-tap-vuetify
                        v-model="editedItemArticle.description"
                        :extensions="extensions"
                        class="tip-tap-size"
                      />
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-toolbar>
            <v-text-field
              v-model="search"
              append-icon="$search"
              label="Pencarian Judul Artikel"
              class="px-5"
              single-line
              hide-details
              @click:append="searchArticle()"
            />
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data>
            <p class="text-center text-capitalize">
              data tidak ditemukan / data belum ada
            </p>
          </template>
        </v-data-table>
        <div class="text-center pt-2">
          <v-pagination
            v-model="page"
            :length="pageCount"
            total-visible="10"
            @input="pagination()"
          >
          </v-pagination>
        </div>
      </v-container>
    </v-main>
  </div>
</template>

<script>
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

export default {
  data: () => ({
    items: [
      {
        text: 'pengumuman',
        disabled: true,
      },
    ],
    dialogAdd: false,
    headerArticle: [
      {
        text: 'Nomor',
        sortable: false,
        value: 'number',
      },
      { text: 'Judul', value: 'title', sortable: false },
      { text: 'Arsip', value: 'status', sortable: false },
      { text: 'Pembaca', value: 'user', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    article: [],
    editedIndex: -1,
    editedItemArticle: {
      title: '',
      image: null,
      description: '<p>Silahkan Isi Pejelasan</p>',
      user: '',
    },
    defaultItem: {
      title: '',
      image: null,
      description: '<p>Silahkan Isi Pejelasan</p>',
      user: '',
    },
    page: 1,
    pageCount: 3,
    search: '',
    userRead: [],
    titleRules: [
      (v) => !!v || 'Judul Artikel Tidak Boleh Kosong',
    ],
    userRules: [
      (v) => !!v || 'Pembaca Artikel Tidak Boleh Kosong',
    ],
    imageRules: [
      (v) => !!v || 'Gambar Artikel 3x4 Tidak Boleh Kosong',
      (v) => !v || v.size < 1000000 || 'Gambar Artikel Harus Kurang Dari 1MB',
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
  }),
  components: {
    'tip-tap-vuetify': TiptapVuetify,
  },
  methods: {
    pagination() {
      // eslint-disable-next-line no-console
      console.log('pagination');
    },
    searchArticle() {
      // eslint-disable-next-line no-console
      console.log('serach');
    },
    ChangeImage(event) {
      // this.image = event;
      if (event == null) {
        this.editedItemArticle.image = null;
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editedItemArticle.image = e.target.result;
        };
        reader.readAsDataURL(event);
      }
    },
    closeAdd() {
      this.dialogAdd = false;
    },
    saveAdd() {
      this.closeAdd();
    },
  },
  beforeDestroy() {
    this.items = null;
    this.dialogAdd = null;
    this.headerArticle = null;
    this.article = null;
    this.editedIndex = null;
    this.editedItemArticle = null;
    this.defaultItem = null;
    this.page = null;
    this.pageCount = null;
    this.search = null;
    this.userRead = null;
    this.titleRules = null;
    this.userRules = null;
    this.imageRules = null;

    delete this.items;
    delete this.dialogAdd;
    delete this.headerArticle;
    delete this.article;
    delete this.editedIndex;
    delete this.editedItemArticle;
    delete this.defaultItem;
    delete this.page;
    delete this.pageCount;
    delete this.search;
    delete this.userRead;
    delete this.titleRules;
    delete this.userRules;
    delete this.imageRules;
  },
};
</script>

<style scoped>
.tip-tap-size {
  overflow: auto;
  max-height: 300px;
}
.preview-img{
    max-width: 800px;
    max-height: 600px;
}
</style>
