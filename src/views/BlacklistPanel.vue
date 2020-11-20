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
        <v-data-table
          :headers="headerBlacklist"
          :items="blacklist"
          class="elevation-3 mt-3"
          hide-default-footer
          :loading="loadingTable"
          v-if="!skeleton"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <div class="d-flex">
                  <v-icon class="primary--text mr-2">$blacklist</v-icon>
                  <p class="ma-0 text-uppercase primary--text hidden-xs-only">
                    daftar hitam
                  </p>
                </div>
              </v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogDeleteAll" max-width="550px" persistent>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="error"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon size="15" class="white--text mr-2"
                      >mdi-delete</v-icon
                    >
                    <p class="ma-0 white--text text-capitalize">hapus semua</p>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="primary">
                    <span class="headline white--text text-capitalize"
                      >menghapus semua daftar hitam karyawan</span
                    >
                  </v-card-title>

                  <v-card-text>
                    <div class="d-flex justify-start align-center pa-2">
                      <v-icon size="80" class="error--text mr-4"
                        >$warning</v-icon
                      >
                      <p class="ma-0 black--text">
                        Apakah anda yakin menghapus semua karyawan dari
                        daftar hitam ? Jika "iya" silahkan pilih tombol iya
                      </p>
                    </div>
                  </v-card-text>

                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="white"
                      class="text-capitalize mr-2"
                      elevation="3"
                      @click="dialogDeleteAll = false"
                    >
                      batal
                    </v-btn>
                    <v-btn
                      color="primary"
                      class="text-capitalize white--text"
                      @click="saveDeleteAll()"
                    >
                      <v-progress-circular
                        indeterminate
                        color="white"
                        v-if="loadingDeleteAll"
                      />
                      <p
                        class="my-auto text-capitalize text-white"
                        v-if="!loadingDeleteAll"
                      >
                        simpan
                      </p>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
            <v-text-field
              v-model="search"
              append-icon="$search"
              label="Pencarian Nama karyawan"
              class="px-5"
              single-line
              hide-details
              @click:append="searchBlacklist()"
            />
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn
              icon
              :to="`/detail-blacklist/${item.idCard}/${item.idCompany}`"
              class="success--text"
            >
              <v-icon> $detail</v-icon>
            </v-btn>
            <v-btn @click="deleteItem(item)" class="error--text" icon>
              <v-icon> mdi-delete </v-icon>
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
      <v-dialog v-model="dialogDelete" persistent max-width="550">
        <v-card>
          <v-card-title class="headline primary white--text text-capitalize">
            menghapus data daftar hitam karyawan
          </v-card-title>
          <v-card-text>
            <div class="d-flex justify-start align-center pa-2">
              <v-icon size="80" class="error--text mr-4">$warning</v-icon>
              <p class="ma-0 black--text">
                Apakah anda yakin menghapus karyawan ini dari daftar hitam
                ? Jika "iya" silahkan pilih tombol iya
              </p>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              elevation="3"
              class="text-capitalize"
              @click="dialogDelete = false"
            >
              tidak
            </v-btn>
            <v-btn color="primary" @click="saveDeleteItem()">
              <v-progress-circular
                indeterminate
                color="white"
                v-if="loadingDelete"
              />
              <p
                class="my-auto white--text text-capitalize"
                v-if="!loadingDelete"
              >
                iya
              </p>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    items: [
      {
        text: 'artikel',
        disabled: true,
      },
    ],
    dialogDeleteAll: false,
    dialogDelete: false,
    headerBlacklist: [
      {
        text: 'Nomor',
        sortable: false,
        value: 'number',
      },
      { text: 'Nama', value: 'name', sortable: false },
      { text: 'NIK', value: 'idCard', sortable: false },
      { text: 'Nomor telepon', value: 'phone', sortable: false },
      { text: 'Nama Perusahaan', value: 'company', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    loadingTable: false,
    loadingDeleteAll: false,
    loadingDelete: false,
    blacklist: [],
    editedIndex: -1,
    page: 1,
    pageCount: 3,
    search: '',
    hasSaved: false,
    status: null,
    icon: '',
    message: '',
    skeleton: true,
  }),
  methods: {
    pagination() {
      this.loadingTable = true;
      this.blacklist.splice(0, this.blacklist.length);
      this.methodGetBlacklist(this.page);
    },
    searchBlacklist() {
      this.loadingtable = true;
      this.page = 1;
      this.blacklist.splice(0, this.blacklist.length);
      this.methodGetBlacklist(this.page);
    },
    deleteItem(item) {
      this.editedIndex = this.blacklist.indexOf(item);
      this.dialogDelete = true;
    },
    saveDeleteItem() {
      this.loadingDelete = true;
      this.loadingDeleteAll = true;
      axios({
        baseURL: `${this.$store.state.domain}blacklist/${
          this.blacklist[this.editedIndex].id
        }`,
        method: 'delete',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          if (response.data.data.message === 'Data Is Successfully Delete') {
            this.hasSaved = true;
            this.status = true;
            this.message = 'data berhasil dihapus';
            this.icon = '$success';
          } else {
            this.hasSaved = true;
            this.status = false;
            this.message = 'data tidak berhasil di hapus';
            this.icon = '$warning';
          }
          this.loadingtable = true;
          this.page = 1;
          this.search = '';
          if (this.blacklist.length > 0) {
            this.blacklist.splice(0, this.blacklist.length);
          }
          this.methodGetBlacklist(1);
        })
        .catch(() => {
          this.hasSaved = true;
          this.status = false;
          this.message = 'server mengalami error';
          this.icon = '$warning';
        })
        .finally(() => {
          this.dialogDelete = false;
          this.loadingDelete = false;
        });
    },
    saveDeleteAll() {
      this.loadingDeleteAll = true;
      axios({
        baseURL: `${this.$store.state.domain}blacklist/all`,
        method: 'delete',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          if (response.data.data.message === 'Data Is Successfully Delete') {
            this.hasSaved = true;
            this.status = true;
            this.message = 'data berhasil dihapus';
            this.icon = '$success';
          } else {
            this.hasSaved = true;
            this.status = false;
            this.message = 'data tidak berhasil di hapus';
            this.icon = '$warning';
          }
          this.loadingtable = true;
          this.page = 1;
          this.search = '';
          if (this.blacklist.length > 0) {
            this.blacklist.splice(0, this.blacklist.length);
          }
          this.methodGetBlacklist(1);
        })
        .catch(() => {
          this.hasSaved = true;
          this.status = false;
          this.message = 'server mengalami error';
          this.icon = '$warning';
        })
        .finally(() => {
          this.dialogDeleteAll = false;
          this.loadingDeleteAll = false;
        });
    },
    // method universal
    methodGetBlacklist(page) {
      if (this.search === '') {
        axios({
          baseURL: `${this.$store.state.domain}blacklist/pagination/${this.page}`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        })
          .then((response) => {
            if (response.data.data.blacklist.length > 0) {
              const modulo = response.data.data.total % 10;
              if (modulo === 0) {
                this.pageCount = response.data.data.total / 10;
              } else {
                this.pageCount = (response.data.data.total - modulo) / 10 + 1;
              }
              let counter = (page - 1) * 10;
              response.data.data.blacklist.forEach((i) => {
                counter += 1;
                this.blacklist.push({
                  id: i.id,
                  number: counter,
                  name: i.name,
                  idCard: i.id_card,
                  phone: i.telephone,
                  company: i.umkmName,
                  idCompany: i.umkmId,
                });
              });
            } else {
              this.pageCount = 0;
            }
          })
          .catch(() => {
            this.hasSaved = true;
            this.status = false;
            this.message = 'server mengalami error';
            this.icon = '$warning';
          })
          .finally(() => {
            this.loadingTable = false;
          });
      } else {
        axios({
          baseURL: `${this.$store.state.domain}blacklist/search/${this.search}/${this.page}`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        })
          .then((response) => {
            // eslint-disable-next-line no-console
            console.log(response.data);
            if (response.data.data.blacklist.length > 0) {
              const modulo = response.data.data.total % 10;
              if (modulo === 0) {
                this.pageCount = response.data.data.total / 10;
              } else {
                this.pageCount = (response.data.data.total - modulo) / 10 + 1;
              }
              let counter = (page - 1) * 10;
              response.data.data.blacklist.forEach((i) => {
                counter += 1;
                this.blacklist.push({
                  id: i.id,
                  number: counter,
                  name: i.name,
                  idCard: i.id_card,
                  phone: i.telephone,
                  company: i.umkmName,
                  idCompany: i.umkmId,
                });
              });
            } else {
              this.pageCount = 0;
            }
          })
          .catch(() => {
            this.hasSaved = true;
            this.status = false;
            this.message = 'server mengalami error';
            this.icon = '$warning';
          })
          .finally(() => {
            this.loadingTable = false;
          });
      }
    },
  },
  beforeCreate() {
    if (this.$store.state.role === 'Admin 3') {
      axios({
        baseURL: `${this.$store.state.domain}blacklist/pagination/1`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          if (response.data.data.blacklist.length > 0) {
            const modulo = response.data.data.total % 10;
            if (modulo === 0) {
              this.pageCount = response.data.data.total / 10;
            } else {
              this.pageCount = (response.data.data.total - modulo) / 10 + 1;
            }
            let counter = 0;
            response.data.data.blacklist.forEach((i) => {
              counter += 1;
              this.blacklist.push({
                id: i.id,
                number: counter,
                name: i.name,
                idCard: i.id_card,
                phone: i.telephone,
                company: i.umkmName,
                idCompany: i.umkmId,
              });
            });
          } else {
            this.pageCount = 0;
          }
        })
        .catch(() => {
          this.hasSaved = true;
          this.status = false;
          this.message = 'server mengalami error';
          this.icon = '$warning';
        })
        .finally(() => {
          this.skeleton = false;
        });
    } else {
      this.$router.push('/access-block');
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
.tip-tap-size {
  overflow: auto;
  max-height: 300px;
}
.preview-img {
  max-width: 800px;
  max-height: 600px;
}
</style>
