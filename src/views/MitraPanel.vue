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
          :loading="loadingTable"
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
                  <v-card-title class="primary mb-4 d-flex justify-space-between">
                    <p class="headline white--text text-capitalize mb-0">
                      menambah mitra perusahaan
                    </p>
                    <v-btn @click="closeAdd()" icon color="white" :disabled="loadingSave">
                      <v-icon>$close</v-icon>
                    </v-btn>
                  </v-card-title>

                  <v-card-text>
                    <div v-if="loadingSave" class="my-2">
                      <p class="text-capitalize mb-0 text-subtitle-1 font-weight-bold">
                        progress upload file
                      </p>
                      <v-progress-linear
                        :value="percentCompleted"
                        color="light-blue"
                        height="10"
                        striped
                      />
                    </div>
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
                        accept="image/png, image/jpeg, image/jpg"
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
                      color="primary"
                      text
                      @click="closeAdd()"
                    >
                      batal
                    </v-btn>
                    <v-btn
                      color="primary"
                      text
                      class="white--text"
                      @click="saveAdd()"
                      :disabled="loadingSave"
                    >
                      <p
                        class="my-auto"
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
        <div v-if="mitra.length > 0" class="text-center pt-2">
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
      <v-dialog v-model="dialogUpdate" persistent max-width="450">
        <v-card>
          <v-card-title class="primary mb-4 d-flex justify-space-between">
            <p class="white--text text-capitalize text-h6">
              mengubah data perusahaan mitra
            </p>
            <v-btn @click="closeUpdate()" icon color="white" :disabled="loadingUpdate">
              <v-icon>$close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <div v-if="loadingUpdate" class="my-2">
              <p class="text-capitalize mb-0 text-subtitle-1 font-weight-bold">
                progress upload file
              </p>
              <v-progress-linear
                :value="percentCompleted"
                color="light-blue"
                height="10"
                striped
              />
          </div>
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
                accept="image/png, image/jpeg, image/jpg"
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
            <v-btn text color="primary" @click="closeUpdate()">
              batal
            </v-btn>
            <v-btn color="primary" @click="saveUpdate()" :disabled="loadingUpdate">
              <p
                class="my-auto"
              >
                simpan
              </p>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDeactivate" persistent max-width="450">
        <v-card>
          <v-card-title class="primary d-flex justify-space-between">
            <p class="white--text text-capitalize text-h6">
              arsip perusahaan mitra
            </p>
            <v-btn @click="dialogDeactivate = false" icon color="white">
              <v-icon>$close</v-icon>
            </v-btn>
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
              text
              color="primary"
              @click="dialogDeactivate = false"
            >
              tidak
            </v-btn>
            <v-btn color="primary" @click="saveDeactivated()" text>
              <v-progress-circular
                indeterminate
                color="primary"
                v-if="loadingDeactivate"
              />
              <p
                class="my-auto "
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
          <v-card-title class="primary d-flex justify-space-between">
            <p class="white--text text-capitalize text-h6">
              arsip perusahaan mitra
            </p>
            <v-btn @click="dialogActivate = false" icon color="white">
              <v-icon>$close</v-icon>
            </v-btn>
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
              text
              color="primary"
              @click="dialogActivate = false"
            >
              tidak
            </v-btn>
            <v-btn color="primary" @click="saveActivate()" text>
              <v-progress-circular
                indeterminate
                color="primary"
                v-if="loadingActivate"
              />
              <p
                class="my-auto"
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
    loadingTable: false,
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
    percentCompleted: 0,
  }),
  methods: {
    pagination() {
      this.loadingTable = true;
      this.mitra.splice(0, this.mitra.length);
      this.methodGetMitra();
    },
    searchMitra() {
      this.loadingTable = true;
      this.page = 1;
      this.mitra.splice(0, this.mitra.length);
      this.methodGetMitra();
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
    async saveAdd() {
      if (this.$refs.form.validate()) {
        try {
          const context = this;
          this.loadingSave = true;
          const response = await axios({
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
            onUploadProgress(progressEvent) {
              context.percentCompleted = Math.round((progressEvent.loaded * 100)
              / progressEvent.total);
            },
          });
          if (
            response.data.data.attributes.data === 'Data Partner Is Successfully Created'
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
          if (this.mitra.length > 0) {
            this.mitra.splice(0, this.mitra.length);
          }
          this.methodGetMitra();
          this.loadingSave = false;
          this.closeAdd();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
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
    async saveUpdate() {
      if (this.$refs.form.validate()) {
        try {
          const context = this;
          this.loadingUpdate = true;
          const response = await axios({
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
            onUploadProgress(progressEvent) {
              context.percentCompleted = Math.round((progressEvent.loaded * 100)
              / progressEvent.total);
            },
          });
          if (
            response.data.data.attributes.data
              === 'Data Partner Is Successfully Updated'
          ) {
            this.hasSaved = true;
            this.status = true;
            this.message = 'data berhasil diubah';
            this.icon = '$success';
          } else {
            this.hasSaved = true;
            this.status = false;
            this.message = 'data tidak berhasil diubah';
            this.icon = '$warning';
          }
          this.loadingTable = true;
          if (this.mitra.length > 0) {
            this.mitra.splice(0, this.mitra.length);
          }
          this.methodGetMitra();
          this.loadingUpdate = false;
          this.closeUpdate();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      }
    },
    async openDialogUpdate(item) {
      this.editedIndex = this.mitra.indexOf(item);
      this.editedItemMitra.name = item.name;
      this.editedItemMitra.link = item.link;
      this.dialogUpdate = true;
      this.loadingDialog = true;
      try {
        const response = await axios({
          baseURL: `${this.$store.state.domain}partner/stream/${this.mitra[this.editedIndex].id}`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          responseType: 'blob',
        });
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editedItemMitra.image = e.target.result;
        };
        reader.readAsDataURL(response.data);
        this.loadingDialog = false;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    openDialogDeactivate(item) {
      this.editedIndex = this.mitra.indexOf(item);
      this.dialogDeactivate = true;
    },
    async saveDeactivated() {
      try {
        this.loadingDeactivate = true;
        const response = await axios({
          baseURL: `${this.$store.state.domain}partner/hidden/${
            this.mitra[this.editedIndex].id
          }`,
          method: 'patch',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        });
        if (
          response.data.data.attributes.data === 'Data Partner Is Successfully Hide'
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
        this.loadingTable = true;
        this.page = 1;
        this.search = '';
        if (this.mitra.length > 0) {
          this.mitra.splice(0, this.mitra.length);
        }
        this.methodGetMitra();
        this.loadingDeactivate = false;
        this.dialogDeactivate = false;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    openDialogActivate(item) {
      this.editedIndex = this.mitra.indexOf(item);
      this.dialogActivate = true;
    },
    async saveActivate() {
      try {
        this.loadingActivate = true;
        const response = await axios({
          baseURL: `${this.$store.state.domain}partner/show/${
            this.mitra[this.editedIndex].id
          }`,
          method: 'patch',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        });
        if (
          response.data.data.attributes.data === 'Data Partner Is Successfully Show'
        ) {
          this.hasSaved = true;
          this.status = true;
          this.message = 'data berhasil diubah';
          this.icon = '$success';
        } else {
          this.hasSaved = true;
          this.status = false;
          this.message = 'data tidak berhasil diubah';
          this.icon = '$warning';
        }
        this.loadingTable = true;
        this.page = 1;
        this.search = '';
        if (this.mitra.length > 0) {
          this.mitra.splice(0, this.mitra.length);
        }
        this.methodGetMitra();
        this.loadingActivate = false;
        this.dialogActivate = false;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },

    // method use universal
    async methodGetMitra() {
      try {
        const header = {
          'x-api-key': this.$store.state.apiKey,
          Authorization: `Bearer ${this.$cookies.get('token')}`,
        };
        if (this.search !== '') {
          header.keyword = this.search;
        }
        const response = await axios({
          baseURL: `${this.$store.state.domain}partner/pagination-all/${this.page}`,
          method: 'get',
          headers: header,
        });
        if (response.data.data.attributes.length > 0) {
          const modulo = response.data.data.total % 10;
          if (modulo === 0) {
            this.pageCount = response.data.data.total / 10;
          } else {
            this.pageCount = (response.data.data.total - modulo) / 10 + 1;
          }
          let counter = (this.page - 1) * 10;
          let nameStatus = '';
          response.data.data.attributes.forEach((i) => {
            counter += 1;
            if (i.status === '0') {
              nameStatus = 'Tidak Ditampilkan';
            } else {
              nameStatus = 'Ditampilkan';
            }
            this.mitra.push({
              id: i.id,
              number: counter,
              name: i.name.replace('/', ''),
              link: i.link,
              status: nameStatus,
            });
          });
        } else {
          this.pageCount = 0;
        }
        this.loadingTable = false;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
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
          baseURL: `${this.$store.state.domain}partner/pagination-all/1`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        });
        if (response.data.data.attributes.length > 0) {
          const modulo = response.data.data.total % 10;
          if (modulo === 0) {
            this.pageCount = response.data.data.total / 10;
          } else {
            this.pageCount = (response.data.data.total - modulo) / 10 + 1;
          }
          let counter = 0;
          let nameStatus = '';
          response.data.data.attributes.forEach((i) => {
            counter += 1;
            if (i.status === '0') {
              nameStatus = 'Tidak Ditampilkan';
            } else {
              nameStatus = 'Ditampilkan';
            }
            this.mitra.push({
              id: i.id,
              number: counter,
              name: i.name.replace('/', ''),
              link: i.link,
              status: nameStatus,
            });
          });
        } else {
          this.pageCount = 0;
        }
        this.skeleton = false;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
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
    this.loadingTable = null;
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
    delete this.loadingTable;
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
