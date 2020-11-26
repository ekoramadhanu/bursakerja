<template>
  <div>
    <v-main>
      <v-container class="d-flex flex-column justify-center size-max">
        <v-data-table
          :headers="headerMitra"
          :items="mitra"
          class="elevation-3 mt-3"
          hide-default-footer
          :loading="loadingtable"
          :items-per-page="10"
          v-if="!skeleton"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <div class="d-flex">
                  <p class="ma-0 hidden-xs-only">Daftar Mitra Bursa Kerja</p>
                </div>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogAdd" max-width="500px" persistent>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon size="15" class="white--text mr-2">$add</v-icon>
                    <p class="ma-0 white--text">tambah</p>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="primary mb-4">
                    <span class="headline white--text text-capitalize"
                      >menambah mitra perusahaan</span
                    >
                  </v-card-title>

                  <v-card-text>
                    <v-form ref="form" lazy-validation>
                      <v-text-field
                        label="Nama Mitra Perusahaan"
                        v-model="editedItemMitra.name"
                        :rules="nameRules"
                      />
                      <v-file-input
                        label="Unggah Gambar Perusahaan Mitra (Maks 1 MB)"
                        accept="image/png, image/jpeg, image/bmp"
                        required
                        ref="fileInput"
                        enctype="multipart/form-data"
                        :rules="imageRules"
                        @change="ChangeImage"
                      ></v-file-input>
                      <img
                        :src="editedItemMitra.image"
                        v-if="editedItemMitra.image != null"
                        class="preview-img"
                        contain
                        aspect-ratio="1.7"
                      />
                    </v-form>
                  </v-card-text>

                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="white"
                      class="text-capitalize mr-2"
                      elevation="3"
                      @click="closeAdd()"
                    >
                      batal
                    </v-btn>
                    <v-btn
                      color="primary"
                      class="text-capitalize white--text"
                      @click="saveAdd()"
                    >
                      <v-progress-circular
                        indeterminate
                        color="white"
                        v-if="loadingSave"
                      />
                      <p
                        class="my-auto text-capitalize text-white"
                        v-if="!loadingSave"
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
              label="Pencarian Nama Mitra Perusahaan"
              class="px-5"
              single-line
              hide-details
              @click:append="searchMitra()"
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
              elevation="0"
              x-small
              dark
              class="mr-2"
            >
              ubah
            </v-btn>
            <v-btn
              @click="openDialogDeactivate(item)"
              color="error"
              elevation="0"
              x-small
              dark
              class="ml-2"
              v-if="item.status === 'Ditampilkan'"
            >
              sembunyikan
            </v-btn>
            <v-btn
              @click="openDialogActivate(item)"
              color="success"
              elevation="0"
              x-small
              dark
              class="ml-2"
              v-else
            >
              tampilkan
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
      <v-dialog v-model="dialogUpdate" persistent max-width="450">
        <v-card>
          <v-card-title class="headline primary white--text text-capitalize mb-4">
            mengubah data perusahaan mitra
          </v-card-title>
          <v-card-text>
            <v-form lazy-validation ref="form">
              <v-text-field
                label="Nama Mitra Perusahaan"
                v-model="editedItemMitra.name"
                :rules="nameRules"
              />
              <v-file-input
                label="Unggah Gambar Perusahaan Mitra (Maks 1 MB)"
                accept="image/png, image/jpeg, image/bmp"
                required
                ref="fileInput"
                enctype="multipart/form-data"
                show-size
                :rules="editedItemMitra.image !== null ? [] : imageRules"
                @change="ChangeImage"
              ></v-file-input>
              <img
                :src="editedItemMitra.image"
                v-if="editedItemMitra.image != null"
                class="preview-img"
                contain
                aspect-ratio="1.7"
              />
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn elevation="3" class="text-capitalize" @click="closeUpdate()">
              batal
            </v-btn>
            <v-btn color="primary" @click="saveUpdate()">
              <v-progress-circular
                indeterminate
                color="white"
                v-if="loadingUpdate"
              />
              <p
                class="my-auto white--text text-capitalize"
                v-if="!loadingUpdate"
              >
                simpan
              </p>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDeactivate" persistent max-width="450">
        <v-card>
          <v-card-title class="headline primary white--text text-capitalize">
            ubah data perusahaan mitra
          </v-card-title>
          <v-card-text>
            <div class="d-flex justify-start align-center pa-2">
              <v-icon size="80" class="error--text mr-4">$warning</v-icon>
              <p class="ma-0 black--text">
                Apakah anda yakin tidak menampilkan data perusahaan mitra ? Jika
                "iya" silahkan pilih tombol iya
              </p>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              elevation="3"
              class="text-capitalize"
              @click="dialogDeactivate = false"
            >
              tidak
            </v-btn>
            <v-btn color="primary" @click="saveDeactivated()">
              <v-progress-circular
                indeterminate
                color="white"
                v-if="loadingDeactivate"
              />
              <p
                class="my-auto white--text text-capitalize"
                v-if="!loadingDeactivate"
              >
                iya
              </p>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogActivate" persistent max-width="450">
        <v-card>
          <v-card-title class="headline primary white--text text-capitalize">
            ubah data perusahaan mitra
          </v-card-title>
          <v-card-text>
            <div class="d-flex justify-start align-center pa-2">
              <v-icon size="80" class="error--text mr-4">$warning</v-icon>
              <p class="ma-0 black--text">
                Apakah anda yakin menampilkan data perusahaan mitra ? Jika "iya"
                silahkan pilih tombol iya
              </p>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              elevation="3"
              class="text-capitalize"
              @click="dialogActivate = false"
            >
              tidak
            </v-btn>
            <v-btn color="primary" @click="saveActivate()">
              <v-progress-circular
                indeterminate
                color="white"
                v-if="loadingActivate"
              />
              <p
                class="my-auto white--text text-capitalize"
                v-if="!loadingActivate"
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
        text: 'mitra perusahaan',
        disabled: true,
      },
    ],
    dialogAdd: false,
    dialogUpdate: false,
    dialogActivate: false,
    dialogDeactivate: false,
    loadingSave: false,
    loadingUpdate: false,
    loadingDeactivate: false,
    loadingActivate: false,
    loadingtable: false,
    headerMitra: [
      {
        text: 'Nomor',
        sortable: false,
        value: 'number',
      },
      { text: 'Nama Perusaahan', value: 'name', sortable: false },
      { text: 'Logo Perusaahan', value: 'image', sortable: false },
      { text: 'status', value: 'status', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    mitra: [],
    editedIndex: -1,
    editedItemMitra: {
      image: '',
      name: '',
    },
    defaultItem: {
      image: '',
      name: '',
    },
    page: 1,
    pageCount: 0,
    search: '',
    imageRules: [
      (v) => !!v || 'Gambar Perusahaan Mitra Tidak Boleh Kosong',
      (v) => !v
        || v.size < 1000000
        || 'Gambar Perusahaan Mitra Harus Kurang Dari 1MB',
    ],
    nameRules: [(v) => !!v || 'Nama Perusahaan Mitra Tidak Boleh Kosong'],
    hasSaved: false,
    status: null,
    icon: '',
    message: '',
    skeleton: true,
  }),
  methods: {
    pagination() {
      this.loadingtable = true;
      this.mitra.splice(0, this.mitra.length);
      this.methodGetMitra(this.page);
    },
    searchMitra() {
      this.loadingtable = true;
      this.page = 1;
      this.mitra.splice(0, this.mitra.length);
      this.methodGetMitra(this.page);
    },
    ChangeImage(event) {
      // this.image = event;
      if (event == null) {
        this.editedItemMitra.image = null;
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editedItemMitra.image = e.target.result;
        };
        reader.readAsDataURL(event);
      }
    },
    closeAdd() {
      this.dialogAdd = false;
      this.$nextTick(() => {
        this.editedItemMitra = { ...this.defaultItem };
        this.editedIndex = -1;
        this.$refs.form.reset();
      });
    },
    saveAdd() {
      if (this.$refs.form.validate()) {
        this.loadingSave = true;
        axios({
          baseURL: `${this.$store.state.domain}partner`,
          method: 'post',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            name: this.editedItemMitra.name,
            photo: this.editedItemMitra.image,
          },
        })
          .then((response) => {
            if (
              response.data.message === 'Partner Data Is Successfully Created'
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
            this.loadingtable = true;
            this.page = 1;
            this.search = '';
            if (this.mitra.length > 0) {
              this.mitra.splice(0, this.mitra.length);
            }
            this.methodGetMitra(1);
          })
          .catch(() => {
            this.hasSaved = true;
            this.status = false;
            this.message = 'server mengalami error';
            this.icon = '$warning';
          })
          .finally(() => {
            this.loadingSave = false;
            this.closeAdd();
          });
      }
    },
    closeUpdate() {
      this.dialogUpdate = false;
      this.$nextTick(() => {
        this.editedItemMitra = { ...this.defaultItem };
        this.editedIndex = -1;
        this.$refs.form.reset();
      });
    },
    saveUpdate() {
      if (this.$refs.form.validate()) {
        this.loadingUpdate = true;
        axios({
          baseURL: `${this.$store.state.domain}partner/${
            this.mitra[this.editedIndex].id
          }`,
          method: 'patch',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            photo: this.editedItemMitra.image,
            name: this.editedItemMitra.name,
          },
        })
          .then((response) => {
            if (
              response.data.data.message
              === 'Data Partner Is Successfully updated'
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
            this.loadingtable = true;
            this.page = 1;
            this.search = '';
            if (this.mitra.length > 0) {
              this.mitra.splice(0, this.mitra.length);
            }
            this.methodGetMitra(1);
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error);
          })
          .finally(() => {
            this.loadingUpdate = false;
            this.closeUpdate();
          });
      }
    },
    openDialogUpdate(item) {
      this.editedIndex = this.mitra.indexOf(item);
      this.editedItemMitra = { ...item };
      this.dialogUpdate = true;
    },
    openDialogDeactivate(item) {
      this.editedIndex = this.mitra.indexOf(item);
      this.dialogDeactivate = true;
    },
    saveDeactivated() {
      this.loadingDeactivate = true;
      axios({
        baseURL: `${this.$store.state.domain}partner/hidden/${
          this.mitra[this.editedIndex].id
        }`,
        method: 'patch',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          if (
            response.data.data.message === 'Data Partner Is Successfully Hide'
          ) {
            this.hasSaved = true;
            this.status = true;
            this.message = 'data berhasil simpan';
            this.icon = '$success';
          } else {
            this.hasSaved = true;
            this.status = false;
            this.message = 'data tidak berhasil disimpan';
            this.icon = '$warning';
          }
          this.loadingtable = true;
          this.page = 1;
          this.search = '';
          if (this.mitra.length > 0) {
            this.mitra.splice(0, this.mitra.length);
          }
          this.methodGetMitra(1);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        })
        .finally(() => {
          this.loadingDeactivate = false;
          this.dialogDeactivate = false;
        });
    },
    openDialogActivate(item) {
      this.editedIndex = this.mitra.indexOf(item);
      this.dialogActivate = true;
    },
    saveActivate() {
      this.loadingActivate = true;
      axios({
        baseURL: `${this.$store.state.domain}partner/show/${
          this.mitra[this.editedIndex].id
        }`,
        method: 'patch',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          if (
            response.data.data.message === 'Data Partner Is Successfully Show'
          ) {
            this.hasSaved = true;
            this.status = true;
            this.message = 'data berhasil simpan';
            this.icon = '$success';
          } else {
            this.hasSaved = true;
            this.status = false;
            this.message = 'data tidak berhasil disimpan';
            this.icon = '$warning';
          }
          this.loadingtable = true;
          this.page = 1;
          this.search = '';
          if (this.mitra.length > 0) {
            this.mitra.splice(0, this.mitra.length);
          }
          this.methodGetMitra(1);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        })
        .finally(() => {
          this.loadingActivate = false;
          this.dialogActivate = false;
        });
    },

    // method use universal
    methodGetMitra(page) {
      if (this.search === '') {
        axios({
          baseURL: `${this.$store.state.domain}partner/pagination-all/${page}`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        })
          .then((response) => {
            if (response.data.data.partner.length > 0) {
              const modulo = response.data.data.total % 10;
              if (modulo === 0) {
                this.pageCount = response.data.data.total / 10;
              } else {
                this.pageCount = (response.data.data.total - modulo) / 10 + 1;
              }
              let counter = (page - 1) * 10;
              let nameStatus = '';
              response.data.data.partner.forEach((i) => {
                counter += 1;
                if (i.status === '0') {
                  nameStatus = 'Tidak Ditampilkan';
                } else {
                  nameStatus = 'Ditampilkan';
                }
                this.mitra.push({
                  id: i.id,
                  number: counter,
                  name: i.name,
                  image: i.image,
                  status: nameStatus,
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
            this.loadingtable = false;
          });
      } else {
        axios({
          baseURL: `${this.$store.state.domain}partner/search-all/${this.search}/${page}`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        })
          .then((response) => {
            if (response.data.data.partner.length > 0) {
              const modulo = response.data.data.total % 10;
              if (modulo === 0) {
                this.pageCount = response.data.data.total / 10;
              } else {
                this.pageCount = (response.data.data.total - modulo) / 10 + 1;
              }
              let counter = (page - 1) * 10;
              let nameStatus = '';
              response.data.data.partner.forEach((i) => {
                counter += 1;
                if (i.status === '0') {
                  nameStatus = 'Tidak Ditampilkan';
                } else {
                  nameStatus = 'Ditampilkan';
                }
                this.mitra.push({
                  id: i.id,
                  number: counter,
                  name: i.name,
                  image: i.image,
                  status: nameStatus,
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
            this.loadingtable = false;
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
        baseURL: `${this.$store.state.domain}partner/pagination-all/1`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          if (response.data.data.partner.length > 0) {
            const modulo = response.data.data.total % 10;
            if (modulo === 0) {
              this.pageCount = response.data.data.total / 10;
            } else {
              this.pageCount = (response.data.data.total - modulo) / 10 + 1;
            }
            let counter = 0;
            let nameStatus = '';
            response.data.data.partner.forEach((i) => {
              counter += 1;
              if (i.status === '0') {
                nameStatus = 'Tidak Ditampilkan';
              } else {
                nameStatus = 'Ditampilkan';
              }
              this.mitra.push({
                id: i.id,
                number: counter,
                name: i.name,
                image: i.image,
                status: nameStatus,
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
  beforeDestroy() {
    this.items = null;
    this.dialogAdd = null;
    this.dialogUpdate = null;
    this.dialogActivate = null;
    this.dialogDeactivate = null;
    this.loadingSave = null;
    this.loadingUpdate = null;
    this.loadingDeactivate = null;
    this.loadingActivate = null;
    this.loadingtable = null;
    this.headerMitra = null;
    this.mitra = null;
    this.editedIndex = null;
    this.editedItemMitra = null;
    this.defaultItem = null;
    this.page = null;
    this.pageCount = null;
    this.search = null;
    this.imageRules = null;
    this.nameRules = null;
    this.hasSaved = null;
    this.status = null;
    this.icon = null;
    this.message = null;
    this.skeleton = null;

    delete this.items;
    delete this.dialogAdd;
    delete this.dialogUpdate;
    delete this.dialogActivate;
    delete this.dialogDeactivate;
    delete this.loadingSave;
    delete this.loadingUpdate;
    delete this.loadingDeactivate;
    delete this.loadingActivate;
    delete this.loadingtable;
    delete this.headerMitra;
    delete this.mitra;
    delete this.editedIndex;
    delete this.editedItemMitra;
    delete this.defaultItem;
    delete this.page;
    delete this.pageCount;
    delete this.search;
    delete this.imageRules;
    delete this.nameRules;
    delete this.hasSaved;
    delete this.status;
    delete this.icon;
    delete this.message;
    delete this.skeleton;
  },
};
</script>

<style scoped>
.tip-tap-size {
  overflow: auto;
  max-height: 300px;
}
.preview-img {
  max-width: 200px;
  max-height: 150px;
}
</style>
