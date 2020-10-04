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
          v-if="!skeleton"
          :loading="loadingTable"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <div class="d-flex">
                  <v-icon class="primary--text mr-2">$article</v-icon>
                  <p class="ma-0 text-uppercase primary--text hidden-xs-only">
                    artikel
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
                      silahkan isi data artikel
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn text @click="saveAdd()">
                      <v-progress-circular
                        indeterminate
                        color="white"
                        v-if="loadingAdd"
                      />
                      <p
                        class="ma-0 text-capitalize white--text"
                        v-if="!loadingAdd"
                      >
                        simpan
                      </p>
                    </v-btn>
                  </v-toolbar>

                  <v-card-text>
                    <v-form ref="form" lazy-validation>
                      <v-text-field
                        v-model="editedItemArticle.title"
                        :rules="titleRules"
                        prepend-icon="$article"
                        label="Judul Artikel"
                        required
                      />
                      <v-select
                        v-model="editedItemArticle.user"
                        :rules="userRules"
                        prepend-icon="$article"
                        :items="userRead"
                        item-text="name"
                        item-value="id"
                        label="pilih pembaca dari artikel ini"
                      />
                      <v-file-input
                        label="Unggah Gambar Artikel (Maks 1 MB)"
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
          <template v-slot:item.image="{ item }">
            <v-img
              :src="item.image"
              aspect-ratio="1.7"
              contain
              max-height="100"
              max-width="100"
              class="ma-2"
            ></v-img>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn @click="openDialogUpdate(item)" class="warning--text" icon>
              <v-icon> mdi-pencil </v-icon>
            </v-btn>
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
            v-if="!skeleton"
            @input="pagination()"
          >
          </v-pagination>
        </div>
        <v-skeleton-loader
          ref="skeleton"
          type="table"
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
      <v-dialog
        v-model="dialogUpdate"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar class="primary">
            <v-btn icon @click="closeUpdate()">
              <v-icon class="white--text">$close</v-icon>
            </v-btn>
            <v-toolbar-title class="text-capitalize white--text">
              ubah data artikel
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text @click="saveUpdate()">
              <v-progress-circular
                indeterminate
                color="white"
                v-if="loadingUpdate"
              />
              <p class="ma-0 text-capitalize white--text" v-if="!loadingUpdate">
                simpan
              </p>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="editedItemArticle.title"
                :rules="titleRules"
                prepend-icon="$article"
                label="Judul Artikel"
                required
              />
              <v-select
                v-model="editedItemArticle.user"
                :rules="userRules"
                prepend-icon="$article"
                :items="userRead"
                item-text="name"
                item-value="id"
                label="pilih pembaca dari artikel ini"
              />
              <v-file-input
                label="Unggah Gambar Artikel (Maks 1 MB)"
                accept="image/png, image/jpeg, image/bmp"
                required
                ref="fileInput"
                enctype="multipart/form-data"
                :rules="editedItemArticle.image !== null? [] : imageRules"
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
import axios from 'axios';

export default {
  data: () => ({
    items: [
      {
        text: 'artikel',
        disabled: true,
      },
    ],
    dialogAdd: false,
    dialogUpdate: false,
    loadingAdd: false,
    loadingUpdate: false,
    loadingTable: false,
    headerArticle: [
      {
        text: 'Nomor',
        sortable: false,
        value: 'number',
      },
      { text: 'Judul', value: 'title', sortable: false },
      { text: 'image', value: 'image', sortable: false },
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
    titleRules: [(v) => !!v || 'Judul Artikel Tidak Boleh Kosong'],
    userRules: [(v) => !!v || 'Pembaca Artikel Tidak Boleh Kosong'],
    imageRules: [
      (v) => !!v || 'Gambar Artikel Tidak Boleh Kosong',
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
    hasSaved: false,
    status: null,
    icon: '',
    message: '',
    skeleton: true,
  }),
  components: {
    'tip-tap-vuetify': TiptapVuetify,
  },
  methods: {
    pagination() {
      this.loadingTable = true;
      this.article.splice(0, this.article.length);
      this.methodGetArticle(this.page);
    },
    searchArticle() {
      this.loadingTable = true;
      this.page = 1;
      this.article.splice(0, this.article.length);
      this.methodGetArticle(this.page);
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
      this.$nextTick(() => {
        this.editedItemArticle = { ...this.defaultItem };
        this.editedIndex = -1;
        this.$refs.form.reset();
      });
    },
    saveAdd() {
      if (this.$refs.form.validate()) {
        this.loadingAdd = true;
        axios({
          baseURL: `${this.$store.state.domain}article`,
          method: 'post',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            title: this.editedItemArticle.title,
            photo: this.editedItemArticle.image,
            description: this.editedItemArticle.description,
            userRead: this.editedItemArticle.user,
          },
        })
          .then((response) => {
            if (
              response.data.data.message
              === 'Article Data Is Successfully Created'
            ) {
              this.hasSaved = true;
              this.status = true;
              this.message = 'data berhasil disimpan';
              this.icon = '$success';
            } else {
              this.hasSaved = true;
              this.status = false;
              this.message = 'data tidak berhasil disimpan';
              this.icon = '$warning';
            }
            this.loadingTable = true;
            this.page = 1;
            this.search = '';
            if (this.article.length > 0) {
              this.article.splice(0, this.article.length);
            }
            this.methodGetArticle(1);
          })
          .catch(() => {
            this.hasSaved = true;
            this.status = false;
            this.message = 'server mengalami error';
            this.icon = '$warning';
          })
          .finally(() => {
            this.loadingAdd = false;
            this.closeAdd();
          });
      }
    },
    openDialogUpdate(item) {
      this.editedIndex = this.article.indexOf(item);
      this.editedItemArticle.title = item.title;
      this.editedItemArticle.image = item.image;
      this.editedItemArticle.description = item.description;
      this.editedItemArticle.user = item.userId;
      this.dialogUpdate = true;
    },
    saveUpdate() {
      if (this.$refs.form.validate()) {
        this.loadingUpdate = true;
        axios({
          baseURL: `${this.$store.state.domain}article/${this.article[this.editedIndex].id}`,
          method: 'patch',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            title: this.editedItemArticle.title,
            photo: this.editedItemArticle.image,
            description: this.editedItemArticle.description,
            userRead: this.editedItemArticle.user,
          },
        })
          .then((response) => {
            if (
              response.data.data.message === 'Data Article Is Successfully Updated'
            ) {
              this.hasSaved = true;
              this.status = true;
              this.message = 'data berhasil disimpan';
              this.icon = '$success';
            } else {
              this.hasSaved = true;
              this.status = false;
              this.message = 'data tidak berhasil disimpan';
              this.icon = '$warning';
            }
            this.loadingTable = true;
            this.page = 1;
            this.search = '';
            if (this.article.length > 0) {
              this.article.splice(0, this.article.length);
            }
            this.methodGetArticle(1);
          })
          .catch(() => {
            this.hasSaved = true;
            this.status = false;
            this.message = 'server mengalami error';
            this.icon = '$warning';
          })
          .finally(() => {
            this.loadingUpdate = false;
            this.closeUpdate();
          });
      }
    },
    closeUpdate() {
      this.dialogUpdate = false;
      this.$nextTick(() => {
        this.editedItemArticle = { ...this.defaultItem };
        this.editedIndex = -1;
        this.$refs.form.reset();
      });
    },
    // method universal
    methodGetArticle(page) {
      if (this.search === '') {
        axios({
          baseURL: `${this.$store.state.domain}article/pagination-all/${page}`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        })
          .then((response) => {
            if (response.data.data.article.length > 0) {
              const modulo = response.data.data.total % 10;
              if (modulo === 0) {
                this.pageCount = response.data.data.total / 10;
              } else {
                this.pageCount = (response.data.data.total - modulo) / 10 + 1;
              }
              let counter = (page - 1) * 10;
              response.data.data.article.forEach((i) => {
                counter += 1;
                this.article.push({
                  id: i.id,
                  number: counter,
                  title: i.title,
                  image: i.image,
                  user: i.userRead.name,
                  userId: i.userRead.id,
                  description: i.description,
                });
              });
            } else {
              this.pageCount = 0;
            }
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error);
          })
          .finally(() => {
            this.loadingTable = false;
          });
      } else {
        axios({
          baseURL: `${this.$store.state.domain}article/search-all/${this.search}/${page}`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        })
          .then((response) => {
            if (response.data.data.article.length > 0) {
              const modulo = response.data.data.total % 10;
              if (modulo === 0) {
                this.pageCount = response.data.data.total / 10;
              } else {
                this.pageCount = (response.data.data.total - modulo) / 10 + 1;
              }
              let counter = (page - 1) * 10;
              response.data.data.article.forEach((i) => {
                counter += 1;
                this.article.push({
                  id: i.id,
                  number: counter,
                  title: i.title,
                  image: i.image,
                  user: i.userRead.name,
                  userId: i.userRead.id,
                  description: i.description,
                });
              });
            } else {
              this.pageCount = 0;
            }
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error);
          })
          .finally(() => {
            this.loadingTable = false;
          });
      }
    },
  },
  beforeCreate() {
    axios({
      baseURL: `${this.$store.state.domain}article/pagination-all/1`,
      method: 'get',
      headers: {
        'x-api-key': this.$store.state.apiKey,
        authorization: `Bearer ${this.$cookies.get('token')}`,
      },
    })
      .then((response) => {
        if (response.data.data.article.length > 0) {
          const modulo = response.data.data.total % 10;
          if (modulo === 0) {
            this.pageCount = response.data.data.total / 10;
          } else {
            this.pageCount = (response.data.data.total - modulo) / 10 + 1;
          }
          let counter = 0;
          response.data.data.article.forEach((i) => {
            counter += 1;
            this.article.push({
              id: i.id,
              number: counter,
              title: i.title,
              image: i.image,
              user: i.userRead.name,
              userId: i.userRead.id,
              description: i.description,
            });
          });
        } else {
          this.pageCount = 0;
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      })
      .finally(() => {
        this.skeleton = false;
      });
    axios({
      baseURL: `${this.$store.state.domain}user-read`,
      method: 'get',
      headers: {
        'x-api-key': this.$store.state.apiKey,
        authorization: `Bearer ${this.$cookies.get('token')}`,
      },
    })
      .then((response) => {
        if (response.data.data.read.length > 0) {
          response.data.data.read.forEach((i) => {
            this.userRead.push({
              id: i.id,
              name: i.name,
            });
          });
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
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
.preview-img {
  max-width: 800px;
  max-height: 600px;
}
.size-max {
  max-width: 1366px;
}
</style>
