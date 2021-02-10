/*
  Nama        : Eko Ramadhanu Aryputra
  Log Date    : 30 Januri 2020 -> check data  after change image base 64 to link
                               -> add request every get per item
  Log Note    :-
*/
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
                      <p class="mb-0 black--text text-capitalize">
                        <span class="font-family">
                          nama mitra perusahaan
                        </span>
                        <span class="ml-1 error--text">
                          *
                        </span>
                      </p>
                      <v-text-field
                        label="Nama Mitra Perusahaan"
                        v-model="editedItemMitra.name"
                        :rules="nameRules"
                        outlined
                        single-line
                        dense
                        class="font-family"
                      />
                      <p class="mb-0 black--text text-capitalize">
                        <span class="font-family">
                          link website
                        </span>
                        <span class="ml-1 error--text">
                          *
                        </span>
                      </p>
                      <v-text-field
                        label="Link website"
                        v-model="editedItemMitra.link"
                        :rules="linkRules"
                        required
                        outlined
                        single-line
                        dense
                        class="font-family"
                      />
                      <p class="mb-0 black--text text-capitalize">
                        <span class="font-family">
                          Gambar Perusahaan Mitra (Maks 1 MB) 128px x 24px
                        </span>
                        <span class="ml-1 error--text">
                          *
                        </span>
                      </p>
                      <v-file-input
                        label="Unggah Gambar Perusahaan Mitra (Maks 1 MB) 128px x 24px"
                        accept="image/png, image/jpeg, image/bmp"
                        required
                        ref="fileInput"
                        enctype="multipart/form-data"
                        prepend-icon="$fileUpload"
                        :rules="imageRules"
                        @change="ChangeImage"
                        outlined
                        single-line
                        dense
                        class="font-family"
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
              label="Pencarian Nama"
              class="px-5 font-family"
              single-line
              hide-details
              outlined
              dense
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
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="openDialogUpdate(item)"
                  color="orange"
                  elevation="0"
                  small
                  dark
                  class="mr-1"
                  v-bind="attrs"
                  v-on="on"
                  icon
                >
                  <v-icon>$contentEdit</v-icon>
                </v-btn>
              </template>
              <span class="font-family text-capitalize">ubah data</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="openDialogDeactivate(item)"
                  color="error"
                  elevation="0"
                  small
                  dark
                  class="ml-2"
                  v-if="item.status === 'Ditampilkan'"
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>$archive</v-icon>
                </v-btn>
              </template>
              <span class="font-family text-capitalize">mengarsipkan data</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="openDialogActivate(item)"
                  color="success"
                  elevation="0"
                  small
                  dark
                  class="ml-2"
                  icon
                  v-if="item.status === 'Tidak Ditampilkan'"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>$unArchive</v-icon>
                </v-btn>
              </template>
              <span class="font-family text-capitalize">menampilakn data</span>
            </v-tooltip>
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
            <v-form lazy-validation ref="form" v-if="!loadingDialog">
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family">
                  nama mitra perusahaan
                </span>
                <span class="ml-1 error--text">
                  *
                </span>
              </p>
              <v-text-field
                label="Nama Mitra Perusahaan"
                v-model="editedItemMitra.name"
                :rules="nameRules"
                outlined
                single-line
                dense
                class="font-family"
              />
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family">
                  link website
                </span>
                <span class="ml-1 error--text">
                  *
                </span>
              </p>
              <v-text-field
                label="Link website"
                v-model="editedItemMitra.link"
                :rules="linkRules"
                required
                outlined
                single-line
                dense
                class="font-family"
              />
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family">
                  Gambar Perusahaan Mitra (Maks 1 MB) 128px x 24px
                </span>
                <span class="ml-1 error--text">
                  *
                </span>
              </p>
              <v-file-input
                label="Unggah Gambar Perusahaan Mitra (Maks 1 MB) 128px x 24px"
                accept="image/png, image/jpeg, image/bmp"
                required
                ref="fileInput"
                enctype="multipart/form-data"
                show-size
                :rules="editedItemMitra.image !== null ? [] : imageRules"
                @change="ChangeImage"
                outlined
                single-line
                prepend-icon="$fileUpload"
                dense
                class="font-family"
              ></v-file-input>
              <img
                :src="editedItemMitra.image"
                v-if="editedItemMitra.image != null"
                class="preview-img"
                contain
                aspect-ratio="1.7"
              />
            </v-form>
            <div v-if="loadingDialog" class="d-flex justify-center align-center">
              <v-progress-circular
                indeterminate
                color="primary"
                size="64"
              />
            </div>
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
            arsip perusahaan mitra
          </v-card-title>
          <v-card-text>
            <div class="d-flex justify-start align-center pa-2">
              <v-icon size="80" class="error--text mr-4">$warning</v-icon>
              <p class="ma-0 black--text">
                Apakah anda yakin tidak mengarsipkan data perusahaan mitra ? Jika
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
            arsip perusahaan mitra
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
    dialogAdd: false,
    dialogUpdate: false,
    dialogActivate: false,
    dialogDeactivate: false,
    loadingSave: false,
    loadingUpdate: false,
    loadingDeactivate: false,
    loadingActivate: false,
    loadingtable: false,
    loadingDialog: false,
    headerMitra: [
      {
        text: 'Nomor',
        sortable: false,
        value: 'number',
        width: 80,
      },
      { text: 'Nama Perusaahan', value: 'name', sortable: false },
      {
        text: 'Website', value: 'link', sortable: false, width: 250,
      },
      {
        text: 'status', value: 'status', sortable: false, width: 150,
      },
      {
        text: 'Aksi', value: 'actions', sortable: false, width: 150,
      },
    ],
    mitra: [],
    editedIndex: -1,
    editedItemMitra: {
      image: '',
      name: '',
      link: '',
    },
    defaultItem: {
      image: '',
      name: '',
      link: '',
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
    linkRules: [
      (v) => !!v || 'Link Website Tidak Boleh Kosong',
      (v) => /^http:|https:/.test(v)
        || 'Link Website Harus Dimulai Dengan http:// atau https://',
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
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            name: this.editedItemMitra.name,
            photo: this.editedItemMitra.image,
            link: this.editedItemMitra.link,
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
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            photo: this.editedItemMitra.image,
            name: this.editedItemMitra.name,
            link: this.editedItemMitra.link,
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
      this.editedItemMitra.name = item.name;
      this.editedItemMitra.link = item.link;
      this.dialogUpdate = true;
      this.loadingDialog = true;
      axios({
        baseURL: `${this.$store.state.domain}partner/stream/${this.mitra[this.editedIndex].id}`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          Authorization: `Bearer ${this.$cookies.get('token')}`,
        },
        responseType: 'blob',
      })
        .then((response) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.editedItemMitra.image = e.target.result;
          };
          reader.readAsDataURL(response.data);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        })
        .finally(() => {
          this.loadingDialog = false;
        });
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
          Authorization: `Bearer ${this.$cookies.get('token')}`,
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
          Authorization: `Bearer ${this.$cookies.get('token')}`,
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
      const header = {
        'x-api-key': this.$store.state.apiKey,
        Authorization: `Bearer ${this.$cookies.get('token')}`,
      };
      if (this.search !== '') {
        header.keyword = this.search;
      }
      axios({
        baseURL: `${this.$store.state.domain}partner/pagination-all/${page}`,
        method: 'get',
        headers: header,
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
                link: i.link,
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
          Authorization: `Bearer ${this.$cookies.get('token')}`,
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
                link: i.link,
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
.size-max{
  max-width: 1044px;
}
</style>
