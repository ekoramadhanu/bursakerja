<template>
  <div>
    <v-main>
      <v-container class="d-flex flex-column justify-center max-width">
        <v-data-table
          :headers="headerArticle"
          :items="article"
          class="elevation-3 mt-3 font-family"
          hide-default-footer
          v-if="!skeleton"
          :loading="loadingTable"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <div class="d-flex">
                  <p class="ma-0">
                    <span class="font-family"> Daftar Artikel </span>
                  </p>
                </div>
              </v-toolbar-title>
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
                    <p class="ma-0 white--text">
                      <span class="font-family font-weight-bold"> tambah </span>
                    </p>
                  </v-btn>
                </template>
                <v-card>
                  <v-toolbar class="primary">
                    <div class="max-width mx-auto d-flex justify-end">
                      <v-btn icon @click="closeAdd()">
                        <v-icon class="white--text">mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title
                        class="text-capitalize white--text my-auto"
                      >
                        <span class="font-family"> tambah artikel </span>
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn
                        @click="saveUpdate()"
                        color="white"
                        class="primary--text my-auto"
                      >
                        <v-progress-circular
                          indeterminate
                          color="primary"
                          v-if="loadingUpdate"
                        />
                        <p
                          class="ma-0 font-family font-weight-bold"
                          v-if="!loadingUpdate"
                        >
                          simpan perubahan
                        </p>
                      </v-btn>
                    </div>
                  </v-toolbar>

                  <v-card-text class="mt-4 mx-auto max-width">
                    <v-form ref="form" lazy-validation>
                      <v-text-field
                        v-model="editedItemArticle.title"
                        :rules="titleRules"
                        label="Judul Artikel"
                        required
                      />
                      <v-select
                        v-model="editedItemArticle.user"
                        :rules="userRules"
                        :items="userRead"
                        item-text="name"
                        item-value="id"
                        label="Pilih Pembaca Artikel"
                      />
                      <v-file-input
                        label="Unggah Gambar Artikel (Maks 1 MB)"
                        accept="image/png, image/jpeg, image/bmp"
                        required
                        ref="fileInput"
                        enctype="multipart/form-data"
                        :rules="
                          editedItemArticle.image !== null ? [] : imageRules
                        "
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
                        :card-props="{
                          height: '300',
                          style: 'overflow: auto;',
                        }"
                        placeholder="Tulis Artikel"
                      />
                    </v-form>
                    <p
                      class="mb-0 mt-4 font-weight-bold text-uppercase text-subtitle-1"
                    >
                      pratinjau
                    </p>
                    <v-divider class="mb-4"></v-divider>
                    <div
                      v-if="
                        editedItemArticle.image !== null ||
                        editedItemArticle.title !== '' ||
                        editedItemArticle.description.length > 0
                      "
                    >
                      <v-img
                        :src="editedItemArticle.image"
                        height="400"
                        max-width="1044"
                        aspect-ratio="1.7778"
                        class="mb-4 mx-auto"
                      />
                      <h3 class="text-h3 font-weight-bold black--text">
                        <span class="font-family">
                          {{ editedItemArticle.title }}
                        </span>
                      </h3>
                      <div class="mt-2 pa-0 mb-4 d-flex">
                        <p
                          class="text-capitalize text-subtitle-2 font-weight-regular mb-0 mr-4"
                        >
                          <v-icon size="13" class="mr-1">$jobSeeker</v-icon>
                          <span class="font-family"> admin </span>
                        </p>
                        <p
                          class="text-capitalize text-subtitle-2 font-weight-regular ma-0"
                        >
                          <v-icon size="13" class="mr-1">$calendar</v-icon>
                          <span class="font-family">
                            {{ dateNow }}
                          </span>
                        </p>
                      </div>
                      <div
                        class="text-justify font-family black--text"
                        v-html="editedItemArticle.description"
                        v-if="!skeleton"
                      ></div>
                    </div>
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
          <template v-slot:[`item.image`]="{ item }">
            <v-img
              :src="item.image"
              aspect-ratio="1.7"
              contain
              max-height="100"
              max-width="100"
              class="ma-2"
            ></v-img>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              @click="openDialogUpdate(item)"
              color="orange"
              x-small
              class="mr-2 white--text"
              elevation="0"
            >
              ubah artikel
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
            <div class="max-width mx-auto d-flex justify-end">
              <v-btn icon @click="closeUpdate()">
                <v-icon class="white--text">mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title class="text-capitalize white--text my-auto">
                <span class="font-family"> ubah data artikel </span>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                @click="saveUpdate()"
                color="white"
                class="primary--text my-auto"
              >
                <v-progress-circular
                  indeterminate
                  color="primary"
                  v-if="loadingUpdate"
                />
                <p
                  class="ma-0 font-family font-weight-bold"
                  v-if="!loadingUpdate"
                >
                  simpan perubahan
                </p>
              </v-btn>
            </div>
          </v-toolbar>

          <v-card-text class="mt-4 mx-auto max-width">
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="editedItemArticle.title"
                :rules="titleRules"
                label="Judul Artikel"
                required
              />
              <v-select
                v-model="editedItemArticle.user"
                :rules="userRules"
                :items="userRead"
                item-text="name"
                item-value="id"
                label="Pilih Pembaca Artikel"
              />
              <v-file-input
                label="Unggah Gambar Artikel (Maks 1 MB)"
                accept="image/png, image/jpeg, image/bmp"
                required
                ref="fileInput"
                enctype="multipart/form-data"
                :rules="editedItemArticle.image !== null ? [] : imageRules"
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
                :card-props="{ height: '300', style: 'overflow: auto;' }"
                placeholder="Tulis Artikel"
              />
            </v-form>
            <p
              class="mb-0 mt-4 font-weight-bold text-uppercase text-subtitle-1"
            >
              pratinjau
            </p>
            <v-divider class="mb-4"></v-divider>
            <div
              v-if="
                editedItemArticle.image !== null ||
                editedItemArticle.title !== '' ||
                editedItemArticle.description.length > 0
              "
            >
              <v-img
                :src="editedItemArticle.image"
                height="400"
                max-width="1044"
                aspect-ratio="1.7778"
                class="mb-4 mx-auto"
              />
              <h3 class="text-h3 font-weight-bold black--text">
                <span class="font-family">
                  {{ editedItemArticle.title }}
                </span>
              </h3>
              <div class="mt-2 pa-0 mb-4 d-flex">
                <p
                  class="text-capitalize text-subtitle-2 font-weight-regular mb-0 mr-4"
                >
                  <v-icon size="13" class="mr-1">$jobSeeker</v-icon>
                  <span class="font-family"> admin </span>
                </p>
                <p
                  class="text-capitalize text-subtitle-2 font-weight-regular ma-0"
                >
                  <v-icon size="13" class="mr-1">$calendar</v-icon>
                  <span class="font-family">
                    {{ dateNow }}
                  </span>
                </p>
              </div>
              <div
                class="text-justify font-family black--text"
                v-html="editedItemArticle.description"
                v-if="!skeleton"
              ></div>
            </div>
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
        class: ['font-weight-bold'],
      },
      { text: 'Judul', value: 'title', sortable: false },
      { text: 'Gambar', value: 'image', sortable: false },
      { text: 'Pembaca', value: 'user', sortable: false },
      { text: 'Aksi', value: 'actions', sortable: false },
    ],
    article: [],
    editedIndex: -1,
    editedItemArticle: {
      title: '',
      image: null,
      description: '',
      user: '',
    },
    defaultItem: {
      title: '',
      image: null,
      description: '',
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
  computed: {
    dateNow() {
      const date = new Date();
      return `${date.getDay()} ${
        this.$store.state.month[date.getMonth() - 1]
      } ${date.getFullYear()}`;
    },
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
          baseURL: `${this.$store.state.domain}article/${
            this.article[this.editedIndex].id
          }`,
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
              response.data.data.message
              === 'Data Article Is Successfully Updated'
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
    if (
      this.$store.state.role === 'UMKM'
      || this.$store.state.role === 'Magang'
      || this.$store.state.role === 'Umum'
      || this.$store.state.role === 'Profesional'
      || this.$store.state.role === 'Informal'
    ) {
      this.$router.push('/access-block');
    } else {
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
            // eslint-disable-next-line no-console
            console.log(response.data);
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
    }
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
.preview-img {
  max-width: 1044px;
  max-height: 400px;
}
.max-width {
  width: 100vw;
  max-width: 1044px;
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
</style>
