<template>
  <div>
    <v-main>
      <v-container class="d-flex flex-column justify-center size-max mb-8">
        <div v-if="role === 'Admin 2' || role === 'Admin 3'">
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
                    <p class="ma-0 hidden-xs-only">Daftar Pengumuman</p>
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
                      <p class="ma-0 white--text">tambah</p>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar class="primary mb-4">
                      <v-btn icon @click="closeAdd()">
                        <v-icon class="white--text">mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title class="text-capitalize white--text">
                        Tambah Pengumuman
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn @click="saveAdd()" color="white" elevation="0">
                        <p class="ma-0 primary--text">simpan</p>
                      </v-btn>
                    </v-toolbar>

                    <v-card-text>
                      <v-form ref="form" lazy-validation>
                        <v-text-field
                          v-model="editedItemArticle.title"
                          :rules="titleRules"
                          label="Judul Pengumuman"
                          required
                        />
                        <v-select
                          v-model="editedItemArticle.user"
                          :rules="userRules"
                          :items="userRead"
                          item-text="name"
                          item-value="id"
                          label="Pilih Pembaca Pengumuman"
                        />
                        <tip-tap-vuetify
                          v-model="editedItemArticle.description"
                          :extensions="extensions"
                          :card-props="{
                            height: '300',
                            style: 'overflow: auto;',
                          }"
                        />
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </v-toolbar>
              <v-text-field
                v-model="search"
                append-icon="$search"
                label="Pencarian Judul Pengumuman"
                class="px-5"
                single-line
                hide-details
                @click:append="searchArticle()"
              />
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                @click="openDialogUpdate(item)"
                x-small
                elevation="0"
                color="orange"
                dark
              >
                ubah pengumuman
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
              @input="pagination()"
              v-if="!skeleton"
            >
            </v-pagination>
          </div>
          <v-skeleton-loader
            ref="skeleton"
            type="table"
            v-if="skeleton"
            class="mt-3"
          ></v-skeleton-loader>
        </div>
        <div v-else>
          <div v-if="!skeleton">
            <div v-if="article.length > 0">
              <div v-for="item in article" :key="item.id">
                <v-card class="mt-4">
                  <v-card-title class="text-capitalize">
                      {{ item.title }}
                  </v-card-title>
                  <v-card-text v-html="item.desc" class="font-family"></v-card-text>
                  <v-card-actions class="d-flex pl-4">
                     <v-btn
                      :to="`/detail-announcement/${item.id}`"
                      color="primary"
                      outlined
                      width="100vw"
                      height="100vh"
                      max-width="146"
                      max-height="44"
                      class="rounded-lg"
                    >
                      <p class="my-auto text-subtitle-2 font-weight-regular">
                        <span class="font-family">
                          Baca pengumuman
                        </span>
                      </p>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </div>
              <div class="text-canter mt-2">
                <v-pagination
                  v-model="page"
                  total-visible="10"
                  :length="pageCount"
                  @input="pagination()"
                ></v-pagination>
              </div>
            </div>
            <div v-if="article.length === 0">
              <p class="font-family text-center text-capitalize mt-4">
                belum ada pengumuman dari pihak bursa kerja
              </p>
            </div>
          </div>
          <div v-if="skeleton"></div>
        </div>
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
        v-if="role === 'Admin 2' || role === 'Admin 3'"
      >
        <v-card>
          <v-toolbar class="primary mb-4">
            <v-btn icon @click="closeUpdate()">
              <v-icon class="white--text">mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title class="text-capitalize white--text">
              ubah data pengumuman
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="saveUpdate()" elevation="0" color="white">
              <v-progress-circular
                indeterminate
                color="primary"
                v-if="loadingUpdate"
              />
              <p class="ma-0 primary--text" v-if="!loadingUpdate">simpan</p>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="editedItemArticle.title"
                :rules="titleRules"
                label="Judul Pengumuman"
                required
              />
              <v-select
                v-model="editedItemArticle.user"
                :rules="userRules"
                :items="userRead"
                item-text="name"
                item-value="id"
                label="Pilih Pembaca Pengumuman"
              />
              <tip-tap-vuetify
                v-model="editedItemArticle.description"
                :extensions="extensions"
                :card-props="{ height: '300', style: 'overflow: auto;' }"
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
        text: 'pengumuman',
        disabled: true,
      },
    ],
    dialogAdd: false,
    dialogUpdate: false,
    loadingUpdate: false,
    headerArticle: [
      {
        text: 'Nomor',
        sortable: false,
        value: 'number',
      },
      { text: 'Judul', value: 'title', sortable: false },
      { text: 'Pembaca', value: 'user', sortable: false },
      { text: 'Aksi', value: 'actions', sortable: false },
    ],
    article: [],
    editedIndex: -1,
    editedItemArticle: {
      title: '',
      description: '<p>Silahkan Isi Pejelasan</p>',
      user: '',
    },
    defaultItem: {
      title: '',
      description: '<p>Silahkan Isi Pejelasan</p>',
      user: '',
    },
    page: 1,
    pageCount: 3,
    search: '',
    userRead: [],
    titleRules: [(v) => !!v || 'Judul Artikel Tidak Boleh Kosong'],
    userRules: [(v) => !!v || 'Pembaca Artikel Tidak Boleh Kosong'],
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
    skeleton: true,
    hasSaved: false,
    status: null,
    icon: '',
    message: '',
    loadingTable: false,
    loadingAdd: false,
    role: '',
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
    },
    saveAdd() {
      if (this.$refs.form.validate()) {
        this.loadingAdd = true;
        axios({
          baseURL: `${this.$store.state.domain}announcement`,
          method: 'post',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            title: this.editedItemArticle.title,
            description: this.editedItemArticle.description,
            userRead: this.editedItemArticle.user,
          },
        })
          .then((response) => {
            if (
              response.data.data.message
              === 'Data Announcement Is Successfully Create'
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
            this.status = true;
            this.message = 'server mengalami error';
            this.icon = '$warning';
          })
          .finally(() => {
            this.closeAdd();
            this.loadingAdd = false;
          });
      }
    },
    openDialogUpdate(item) {
      this.editedIndex = this.article.indexOf(item);
      this.editedItemArticle.title = item.title;
      this.editedItemArticle.description = item.description;
      this.editedItemArticle.user = item.userId;
      this.dialogUpdate = true;
    },
    saveUpdate() {
      if (this.$refs.form.validate()) {
        this.loadingUpdate = true;
        axios({
          baseURL: `${this.$store.state.domain}announcement/${
            this.article[this.editedIndex].id
          }`,
          method: 'patch',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            title: this.editedItemArticle.title,
            description: this.editedItemArticle.description,
            userRead: this.editedItemArticle.user,
          },
        })
          .then((response) => {
            if (
              response.data.data.message
              === 'Data Announcement Is Successfully Updated'
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
      if (this.$store.state.role === 'Admin 2'
        || this.$store.state.role === 'Admin 3') {
        if (this.search === '') {
          axios({
            baseURL: `${this.$store.state.domain}announcement/pagination-all/${page}`,
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
            baseURL: `${this.$store.state.domain}announcement/search-all/${this.search}/${page}`,
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
      } else if (this.$store.state.role === 'Perusahaan') {
        axios({
          baseURL: `${this.$store.state.domain}announcement/umkm/${page}`,
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
              response.data.data.article.forEach((i) => {
                let shortDesc = i.description.replace(/<\/?[^>]+>/gi, ' ');
                if (shortDesc.length > 250) {
                  shortDesc = `${shortDesc.substr(0, 250)}.....`;
                }
                this.article.push({
                  id: i.id,
                  title: i.title,
                  desc: shortDesc,
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
      } else {
        axios({
          baseURL: `${this.$store.state.domain}announcement/job-seeker/${page}`,
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
              response.data.data.article.forEach((i) => {
                let shortDesc = i.description.replace(/<\/?[^>]+>/gi, ' ');
                if (shortDesc.length > 250) {
                  shortDesc = `${shortDesc.substr(0, 250)}.....`;
                }
                this.article.push({
                  id: i.id,
                  title: i.title,
                  desc: shortDesc,
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
      }
    },
  },
  beforeCreate() {
    if (this.$store.state.role === 'Admin 1') {
      this.$router.push('/access-block');
    } else if (
      this.$store.state.role === 'Admin 2'
      || this.$store.state.role === 'Admin 3'
    ) {
      axios({
        baseURL: `${this.$store.state.domain}announcement/pagination-all/1`,
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
              if (i.name !== 'Umum') {
                this.userRead.push({
                  id: i.id,
                  name: i.name,
                });
              }
            });
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    } else if (this.$store.state.role === 'Perusahaan') {
      axios({
        baseURL: `${this.$store.state.domain}announcement/umkm/1`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          if (response.data.data.article.length > 0) {
            response.data.data.article.forEach((i) => {
              let shortDesc = i.description.replace(/<\/?[^>]+>/gi, ' ');
              if (shortDesc.length > 250) {
                shortDesc = `${shortDesc.substr(0, 250)}.....`;
              }
              this.article.push({
                id: i.id,
                title: i.title,
                desc: shortDesc,
              });
            });
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        })
        .finally(() => {
          this.skeleton = false;
        });
    } else {
      axios({
        baseURL: `${this.$store.state.domain}announcement/job-seeker/1`,
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
            response.data.data.article.forEach((i) => {
              let shortDesc = i.description.replace(/<\/?[^>]+>/gi, ' ');
              if (shortDesc.length > 250) {
                shortDesc = `${shortDesc.substr(0, 250)}.....`;
              }
              this.article.push({
                id: i.id,
                title: i.title,
                desc: shortDesc,
              });
            });
          } else {
            this.pageCount = 0;
            this.page = 0;
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        })
        .finally(() => {
          this.skeleton = false;
        });
    }
  },
  created() {
    this.role = this.$store.state.role;
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
.size-max {
  max-width: 1044px;
}
</style>
