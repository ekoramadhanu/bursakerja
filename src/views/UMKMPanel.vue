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
        <v-row>
          <v-spacer
            class="d-none d-md-flex d-lg-none d-lg-flex d-xl-none d-xl-flex"
          ></v-spacer>
          <v-col lg="4" md="4">
            <div class="d-flex justify-end">
              <v-select
                v-model="type"
                class="mt-3 font-family"
                :items="filter"
                label="Pilih Status yang Ditampilkan"
                outlined
                dense
                @change="searchCardUMKM()"
              ></v-select>
            </div>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headerUMKM"
          :items="UMKM"
          class="elevation-3 mt-3 font-family"
          hide-default-footer
          :loading="loadingTable"
          v-if="!skeleton"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <div class="d-flex">
                  <p class="ma-0 font-family">
                    Daftar Perusahaan Pemegang Kartu Bursa Kerja
                  </p>
                </div>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogAdd" max-width="500px" persistent>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2 mr-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon size="15" class="white--text mr-2">$add</v-icon>
                    <p class="ma-0 white--text font-family font-weight-bold">tambah</p>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class=" headline primary mb-4">
                    <span class="white--text text-capitalize font-family"
                      >menambah kartu perusahaan</span
                    >
                  </v-card-title>

                  <v-card-text>
                    <v-form ref="form" lazy-validation>
                      <p class="mb-0 black--text text-capitalize">
                        <span class="font-family"> nomor kartu bursa kerja </span>
                        <span class="ml-1 error--text"> * </span>
                      </p>
                      <v-text-field
                        v-model="editedItemUMKM.bursaCard"
                        :rules="bursaCardRules"
                        label="Nomor Kartu Bursa Kerja"
                        required
                        outlined
                        dense
                        single-line
                        class="font-family"
                      />
                      <p class="mb-0 black--text text-capitalize">
                        <span class="font-family"> PIN bursa kerja </span>
                        <span class="ml-1 error--text"> * </span>
                      </p>
                      <v-text-field
                        v-model="editedItemUMKM.pin"
                        :rules="pinRules"
                        label="PIN Kartu Bursa Kerja"
                        required
                        outlined
                        dense
                        single-line
                        class="font-family"
                      />
                    </v-form>
                  </v-card-text>

                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="white"
                      class="mr-2"
                      elevation="3"
                      @click="closeAdd()"
                    >
                      batal
                    </v-btn>
                    <v-btn color="primary" @click="saveAdd()">
                      <v-progress-circular
                        indeterminate
                        color="white"
                        v-if="loadingAdd"
                      />
                      <p
                        class="my-auto white--text"
                        v-if="!loadingAdd"
                      >
                        simpan
                      </p>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogBatchAdd" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2 font-weight-bold"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon size="15" class="white--text mr-2">$add</v-icon>
                    <p class="ma-0 white--text font-family">CSV</p>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="primary">
                    <span class="headline white--text text-capitalize font-family">
                      menambah kartu karyawan
                    </span>
                  </v-card-title>

                  <v-card-text>
                    <v-form ref="form" lazy-validation class="mt-4">
                      <p class="mb-0 black--text text-capitalize">
                        <span class="font-family"> file CSV </span>
                        <span class="ml-1 error--text"> * </span>
                      </p>
                      <v-file-input
                        label="Unggah File CSV (Maks 1 MB)"
                        accept=".csv"
                        required
                        ref="fileInput"
                        enctype="multipart/form-data"
                        class="mr-4 pa-0 font-family"
                        :rules="CSVRules"
                        @change="ChangeFile"
                        prepend-icon="$fileUpload"
                        outlined
                        single-line
                        dense
                      />
                    </v-form>
                  </v-card-text>

                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary font-family font-weight-bold"
                      class="mr-2"
                      @click="closeBatchAdd()"
                    >
                      batal
                    </v-btn>
                    <v-btn
                      color="primary"
                      class="white--text font-family font-weight-bold"
                      @click="saveBatchAdd()"
                    >
                      <v-progress-circular
                        indeterminate
                        color="white"
                        v-if="loadingBatch"
                      />
                      <p class="my-auto white--text" v-if="!loadingBatch">
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
              label="Pencarian Nomor Kartu"
              class="px-5 font-family"
              single-line
              outlined
              dense
              @click:append="searchCardUMKM()"
            />
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="openDialogUpdate(item)"
                  small
                  elevation="0"
                  color="orange"
                  icon
                  v-if="item.status === 'Tidak Aktif'"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>$accountEdit</v-icon>
                </v-btn>
              </template>
              <span class="font-family text-capitalize">ubah data</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  small
                  elevation="0"
                  color="primaryDark"
                  icon
                  v-if="
                    item.status === 'Aktif' &&
                    $store.state.role === 'Admin 3' &&
                    item.name !== '-'
                  "
                  v-bind="attrs"
                  v-on="on"
                  @click="openDialogDetail(item)"
                >
                  <v-icon>$accountCog</v-icon>
                </v-btn>
              </template>
              <span class="font-family text-capitalize">lihat data</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  small
                  elevation="0"
                  color="error"
                  icon
                  v-if="
                    item.status === 'Aktif' && $store.state.role === 'Admin 3'
                  "
                  v-bind="attrs"
                  v-on="on"
                  @click="openDialogResetPassword(item)"
                >
                  <v-icon>$accountResetPassword</v-icon>
                </v-btn>
              </template>
              <span class="font-family text-capitalize">reset kata sandi</span>
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
      <v-dialog v-model="dialogUpdate" max-width="500px" persistent>
        <v-card>
          <v-card-title class="primary mb-4">
            <span class="headline white--text text-capitalize"
              >mengubah kartu UMKM</span
            >
          </v-card-title>

          <v-card-text>
            <v-form ref="form" lazy-validation>
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> file CSV </span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <v-text-field
                v-model="editedItemUMKM.bursaCard"
                :rules="bursaCardRules"
                label="Nomor Kartu Bursa Kerja"
                required
                single-line
                dense
                outlined
                class="font-family"
              />
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> file CSV </span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <v-text-field
                v-model="editedItemUMKM.pin"
                :rules="pinRules"
                label="PIN Kartu Bursa Kerja"
                required
                single-line
                dense
                outlined
                class="font-family"
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
              @click="closeUpdate()"
            >
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
      <v-dialog v-model="dialogResetPassword" persistent max-width="450">
        <v-card>
          <v-card-title class="headline primary white--text text-capitalize">
            reset kata sandi akun pencaker
          </v-card-title>
          <v-card-text class="pa-2">
            <v-form lazy-validation ref="form">
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> kata sandi </span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <v-text-field
                v-model="resetPassword"
                :rules="resetPaswordRules"
                label="kata sandi"
                class="font-family"
                required
                outlined
                dense
                single-line
                readonly
                append-outer-icon="$refresh"
                @click:append-outer="methodRandomPassword()"
              />
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              elevation="3"
              class="text-capitalize"
              @click="closeResetPassword()"
            >
              tidak
            </v-btn>
            <v-btn color="primary" @click="saveResetPassword()">
              <v-progress-circular
                indeterminate
                color="white"
                v-if="loadingResetPassword"
              />
              <p
                class="my-auto white--text text-capitalize"
                v-if="!loadingResetPassword"
              >
                iya
              </p>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
       <v-dialog
        v-model="dialogDetail"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar class="primary">
            <div class="size-max mx-auto d-flex">
              <v-btn icon @click="dialogDetail = false">
                <v-icon class="white--text">mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title class="text-capitalize white--text my-auto ml-1">
                <span class="font-family"> lihat data pencaker </span>
              </v-toolbar-title>
              <v-spacer></v-spacer>
            </div>
          </v-toolbar>
          <v-card-text class="px-0 py-1 mx-auto size-max">
            <v-form v-if="!loadingDialog">
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> nama perusahaan</span>
              </p>
              <v-text-field
                v-model="nameCompany"
                label="Nama perusahaan"
                readonly
                outlined
                required
                dense
                single-line
              />
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> pemilik perusahaan </span>
              </p>
              <v-text-field
                v-model="owner"
                label="Pemilik Perusahaan"
                readonly
                outlined
                required
                dense
                single-line
              />
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> bentuk badan hukum </span>
              </p>
              <v-text-field
                v-model="legality"
                label="Bentuk Badan Hukum"
                readonly
                outlined
                required
                dense
                single-line
              />
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> tipe perusahaan </span>
              </p>
              <v-text-field
                v-model="typeCompany"
                label="tipe perusahaan"
                readonly
                outlined
                required
                dense
                single-line
              />
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> umur perusahaan </span>
              </p>
              <v-text-field
                v-model="oldCompany"
                label="umur perusahaan"
                readonly
                outlined
                required
                dense
                single-line
              />
              <v-row>
                <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> cabang perusahaan </span>
                  </p>
                  <v-text-field
                    v-model="branch"
                    label="cabang perusahaan"
                    readonly
                    outlined
                    required
                    dense
                    single-line
                  />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> cabang perusahaan </span>
                  </p>
                  <v-text-field
                    v-model="employee"
                    label="jumlah karyawan"
                    readonly
                    outlined
                    required
                    dense
                    single-line
                  />
                </v-col>
              </v-row>
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> alamat kantor </span>
              </p>
              <v-text-field
                v-model="address"
                label="Alamat Kantor"
                readonly
                outlined
                required
                dense
                single-line
              />
              <v-row>
                <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> provinsi </span>
                  </p>
                  <v-text-field
                    v-model="province"
                    label="provinsi"
                    readonly
                    outlined
                    required
                    dense
                    single-line
                  />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> kota </span>
                  </p>
                  <v-text-field
                    v-model="city"
                    label="kota"
                    readonly
                    outlined
                    required
                    dense
                    single-line
                  />
                </v-col>
              </v-row>
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> link website </span>
              </p>
              <v-text-field
                v-model="link"
                label="Link Website"
                readonly
                outlined
                required
                dense
                single-line
              />
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> nomor telepon </span>
              </p>
              <v-text-field
                v-model="phone"
                label="Nomor Telepon"
                readonly
                outlined
                required
                dense
                single-line
              />
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> deskripsi terkait perusahaan </span>
              </p>
              <v-textarea
                label="Deskripsi Terkait Perusahaan"
                v-model="description"
                readonly
                outlined
                required
                dense
                single-line
              ></v-textarea>
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> logo perusahaan </span>
              </p>
              <v-img
                :src="previewBrand"
                class="preview-img mt-2"
                aspect-ratio="1.7"
                contain
              />
              <v-btn
                color="primary"
                class="my-2"
                @click="downloadBrand()"
              >
                unduh logo
              </v-btn>
              <p class="mb-0 black--text text-capitalize mt-2">
                <span class="font-family"> KTP perusahaan </span>
              </p>
              <v-img
                :src="previewCard"
                class="preview-img mt-2"
                aspect-ratio="1.7"
                contain
              />
              <v-btn
                color="primary"
                class="my-2"
                @click="downloadCard()"
              >
                unduh ktp
              </v-btn>
            </v-form>
            <div v-if="loadingDialog" class="d-flex justify-center align-center full-height">
              <v-progress-circular
                indeterminate
                color="primary"
                size="64"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
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
    </v-main>
  </div>
</template>

<script>
import csvToJson from 'csvtojson';
import axios from 'axios';

export default {
  data: () => ({
    dialogAdd: false,
    dialogUpdate: false,
    dialogBatchAdd: false,
    dialogResetPassword: false,
    dialogDetail: false,
    loadingAdd: false,
    loadingBatch: false,
    loadingUpdate: false,
    loadingTable: false,
    loadingDialog: false,
    loadingResetPassword: false,
    headerUMKM: [
      {
        text: 'Nomor',
        sortable: false,
        value: 'number',
      },
      { text: 'Nomor Kartu', value: 'bursaCard', sortable: false },
      { text: 'PIN', value: 'pin', sortable: false },
      { text: 'Status', value: 'status', sortable: false },
      { text: 'Nama Pemegang', value: 'name', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    UMKM: [],
    editedIndex: -1,
    editedItemUMKM: {
      bursaCard: '',
      pin: '',
    },
    defaultItem: {
      bursaCard: '',
      pin: '',
    },
    page: 1,
    pageCount: 3,
    search: '',
    type: 'Tampilkan Semua',
    filter: ['Aktif', 'Tidak Aktif', 'Tampilkan Semua'],
    pinRules: [(v) => !!v || 'PIN Bursa Kerja Tidak Boleh Kosong'],
    csv: null,
    nameFile: 'Silahkan Pilih File CSV',
    CSVRules: [
      (v) => !!v || 'File CSV Tidak Boleh Kosong',
      (v) => !v || v.size < 1000000 || 'File CSV Harus Kurang Dari 1MB',
    ],
    bursaCardRules: [
      (v) => !!v || 'Nomor Bursa Kerja Tidak Boleh Kosong',
      (v) => /^BK02/.test(v) || 'Nomor Bursa Kerja Tidak Valid',
    ],
    hasSaved: false,
    status: null,
    icon: '',
    message: '',
    skeleton: true,
    resetPassword: '',
    resetPaswordRules: [
      (v) => !!v || 'Kata Sandi Tidak Boleh Kosong',
      (v) => (v.length >= 8 && v.length <= 12) || 'Kata Sandi Harus (8-12)',
    ],
    settings: {
      length: 12,
      digits: 4,
      symbols: 4,
    },
    nameCompany: '',
    owner: '',
    legality: '',
    typeCompany: '',
    oldCompany: '',
    branch: '',
    employee: '',
    address: '',
    province: '',
    city: '',
    link: '',
    phone: '',
    description: '',
    previewBrand: '',
    typeBrand: '',
    previewCard: '',
    typeCard: '',
  }),
  methods: {
    pagination() {
      this.loadingTable = true;
      this.UMKM.splice(0, this.UMKM.length);
      this.methodGetCardUMKM(this.page);
    },
    searchCardUMKM() {
      this.loadingTable = true;
      this.page = 1;
      this.UMKM.splice(0, this.UMKM.length);
      this.methodGetCardUMKM(this.page);
    },
    closeAdd() {
      this.dialogAdd = false;
      this.$nextTick(() => {
        this.editedItemUMKM = { ...this.defaultItem };
        this.editedIndex = -1;
        this.$refs.form.reset();
      });
    },
    saveAdd() {
      if (this.$refs.form.validate()) {
        this.loadingAdd = true;
        axios({
          baseURL: `${this.$store.state.domain}umkm/card`,
          method: 'post',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            bursaCard: this.editedItemUMKM.bursaCard,
            pin: this.editedItemUMKM.pin,
          },
        })
          .then((response) => {
            if (
              response.data.data.message === 'UMKM Data Is Successfully Created'
            ) {
              this.hasSaved = true;
              this.status = true;
              this.message = 'data berhasil disimpan';
              this.icon = '$success';
            } else if (
              response.data.data.message === 'Card UMKM Already Exist'
            ) {
              this.hasSaved = true;
              this.status = false;
              this.message = 'nomor kartu sudah ada';
              this.icon = '$warning';
            } else {
              this.hasSaved = true;
              this.status = false;
              this.message = 'data tidak berhasil disimpan';
              this.icon = '$warning';
            }
            this.loadingtable = true;
            this.page = 1;
            this.search = '';
            if (this.UMKM.length > 0) {
              this.UMKM.splice(0, this.UMKM.length);
            }
            this.methodGetCardUMKM(1);
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
      this.editedIndex = this.UMKM.indexOf(item);
      this.editedItemUMKM = { ...item };
      this.dialogUpdate = true;
    },
    saveUpdate() {
      if (this.$refs.form.validate()) {
        this.loadingUpdate = true;
        axios({
          baseURL: `${this.$store.state.domain}umkm/card/${
            this.UMKM[this.editedIndex].id
          }`,
          method: 'patch',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            bursaCard: this.editedItemUMKM.bursaCard,
            pin: this.editedItemUMKM.pin,
          },
        })
          .then((response) => {
            if (
              response.data.data.message === 'Data UMKM Is Successfully Updated'
            ) {
              this.hasSaved = true;
              this.status = true;
              this.message = 'data berhasil disimpan';
              this.icon = '$success';
            } else if (
              response.data.data.message === 'Card UMKM Already Exist'
            ) {
              this.hasSaved = true;
              this.status = false;
              this.message = 'nomor kartu sudah ada';
              this.icon = '$warning';
            } else {
              this.hasSaved = true;
              this.status = false;
              this.message = 'data tidak berhasil disimpan';
              this.icon = '$warning';
            }
            this.loadingtable = true;
            this.page = 1;
            this.search = '';
            if (this.UMKM.length > 0) {
              this.UMKM.splice(0, this.UMKM.length);
            }
            this.methodGetCardUMKM(1);
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
        this.editedItemUMKM = { ...this.defaultItem };
        this.editedIndex = -1;
        this.$refs.form.reset();
      });
    },
    ChangeFile(event) {
      const reader = new FileReader();
      if (event !== undefined) {
        this.nameFile = event.name;
        reader.onload = () => {
          this.csv = `${reader.result}`;
        };
        reader.readAsText(event);
      }
    },
    closeBatchAdd() {
      this.dialogBatchAdd = false;
      this.nameFile = 'Silahkan Pilih File CSV';
      this.csv = null;
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
    },
    async saveBatchAdd() {
      if (this.$refs.form.validate()) {
        const jsonObj = await csvToJson().fromString(this.csv);
        this.loadingBatch = true;
        axios({
          baseURL: `${this.$store.state.domain}umkm/csv`,
          method: 'post',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            cardJson: JSON.stringify(jsonObj),
          },
        })
          .then((response) => {
            if (response.data.data.message === 'File CSV Not Valid') {
              this.hasSaved = true;
              this.status = false;
              this.message = 'format file CSV tidak sesuai';
              this.icon = '$warning';
            } else if (response.data.data.message === 'Bursa Card Is Already Exist') {
              this.hasSaved = true;
              this.status = false;
              this.message = 'nomor kartu sudah ada';
              this.icon = '$warning';
            } else if (response.data.data.message === 'Data Has Been Created') {
              this.hasSaved = true;
              this.status = true;
              this.message = 'data berhasil ditambahkan';
              this.icon = '$success';
            } else {
              this.hasSaved = true;
              this.status = false;
              this.message = 'server mengalami error';
              this.icon = '$warning';
            }
            this.loadingtable = true;
            this.page = 1;
            this.search = 'Semua';
            if (this.UMKM.length > 0) {
              this.UMKM.splice(0, this.UMKM.length);
            }
            this.methodGetCardUMKM(1);
          })
          .catch(() => {
            this.hasSaved = true;
            this.status = false;
            this.message = 'server mengalami error';
            this.icon = '$warning';
          })
          .finally(() => {
            this.loadingBatch = false;
            this.closeBatchAdd();
          });
      }
    },
    openDialogResetPassword(item) {
      this.editedIndex = this.UMKM.indexOf(item);
      this.methodRandomPassword();
      this.dialogResetPassword = true;
    },
    closeResetPassword() {
      this.dialogResetPassword = false;
      this.editedIndex = -1;
    },
    saveResetPassword() {
      this.loadingResetPassword = true;
      axios({
        baseURL: `${this.$store.state.domain}umkm/reset-password/${
          this.UMKM[this.editedIndex].id
        }`,
        method: 'patch',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          Authorization: `Bearer ${this.$cookies.get('token')}`,
        },
        data: {
          password: this.resetPassword,
        },
      })
        .then((response) => {
          if (
            response.data.data.message
            === 'Data UMKM Is Successfully Update'
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
          this.loadingtable = true;
          if (this.UMKM.length > 0) {
            this.UMKM.splice(0, this.UMKM.length);
          }
          this.methodGetCardUMKM(this.page);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        })
        .finally(() => {
          this.loadingResetPassword = false;
          this.closeResetPassword();
        });
    },
    openDialogDetail(item) {
      this.editedIndex = this.UMKM.indexOf(item);
      this.dialogDetail = true;
      this.loadingDialog = true;
      this.id = item.id;
      Promise.all(
        [
          axios({
            baseURL: `${this.$store.state.domain}umkm/id/${item.id}`,
            method: 'get',
            headers: {
              'x-api-key': this.$store.state.apiKey,
              Authorization: `Bearer ${this.$cookies.get('token')}`,
            },
          }),
          axios({
            baseURL: `${this.$store.state.domain}umkm/stream-brand/${item.id}`,
            method: 'get',
            headers: {
              'x-api-key': this.$store.state.apiKey,
              Authorization: `Bearer ${this.$cookies.get('token')}`,
            },
            responseType: 'blob',
          }),
          axios({
            baseURL: `${this.$store.state.domain}umkm/stream-card/${item.id}`,
            method: 'get',
            headers: {
              'x-api-key': this.$store.state.apiKey,
              Authorization: `Bearer ${this.$cookies.get('token')}`,
            },
            responseType: 'blob',
          }),
        ],
      )
        .then((response) => {
          this.nameCompany = response[0].data.data.umkm[0].name;
          this.owner = response[0].data.data.umkm[0].owner;
          this.legality = response[0].data.data.umkm[0].legality;
          this.typeCompany = response[0].data.data.umkm[0].type;
          this.oldCompany = response[0].data.data.umkm[0].old;
          this.branch = response[0].data.data.umkm[0].branches;
          this.employee = response[0].data.data.umkm[0].employee;
          this.address = response[0].data.data.umkm[0].address;
          this.province = response[0].data.data.umkm[0].province;
          this.city = response[0].data.data.umkm[0].city;
          this.link = response[0].data.data.umkm[0].linkWebsite;
          this.phone = response[0].data.data.umkm[0].phone;
          this.description = response[0].data.data.umkm[0].description;
          this.typeBrand = response[1].data.type;
          this.typeCard = response[2].data.type;
          const reader = new FileReader();
          const readerOne = new FileReader();
          reader.onload = (e) => {
            this.previewBrand = e.target.result;
          };
          reader.readAsDataURL(response[1].data);
          readerOne.onload = (e) => {
            this.previewCard = e.target.result;
          };
          readerOne.readAsDataURL(response[2].data);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        })
        .finally(() => {
          this.loadingDialog = false;
        });
    },
    downloadCard() {
      axios({
        baseURL: `${this.$store.state.domain}umkm/stream-card/${this.UMKM[this.editedIndex].id}`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          Authorization: `Bearer ${this.$cookies.get('token')}`,
        },
        responseType: 'blob',
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          if (this.typeCard.includes('png')) {
            link.setAttribute('download', 'image.png');
          } else {
            link.setAttribute('download', 'image.jpg');
          }
          document.body.appendChild(link);
          link.click();
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },
    downloadBrand() {
      axios({
        baseURL: `${this.$store.state.domain}job-seeker/stream-brand/${this.id}`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          Authorization: `Bearer ${this.$cookies.get('token')}`,
        },
        responseType: 'blob',
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          if (this.typeBrand.includes('png')) {
            link.setAttribute('download', 'image.png');
          } else {
            link.setAttribute('download', 'image.jpg');
          }
          document.body.appendChild(link);
          link.click();
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },

    // method universal
    methodGetCardUMKM(page) {
      const header = {
        'x-api-key': this.$store.state.apiKey,
        Authorization: `Bearer ${this.$cookies.get('token')}`,
      };
      if (this.type === 'Aktif') {
        header.status = 'activate';
      } else if (this.type === 'Tidak Aktif') {
        header.status = 'deactivate';
      }

      if (this.search !== '') {
        header.keyword = this.search;
      }
      axios({
        baseURL: `${this.$store.state.domain}umkm/pagination-card/${page}`,
        method: 'get',
        headers: header,
      })
        .then((response) => {
          if (response.data.data.umkm.length > 0) {
            const modulo = response.data.data.total % 10;
            if (modulo === 0) {
              this.pageCount = response.data.data.total / 10;
            } else {
              this.pageCount = (response.data.data.total - modulo) / 10 + 1;
            }
            let counter = (page - 1) * 10;
            let nameStatus = '';
            let nameCard = '';
            response.data.data.umkm.forEach((i) => {
              counter += 1;
              if (i.status === '0') {
                nameStatus = 'Tidak Aktif';
              } else {
                nameStatus = 'Aktif';
              }
              if (i.name === null) {
                nameCard = '-';
              } else {
                nameCard = i.name;
              }
              this.UMKM.push({
                id: i.id,
                number: counter,
                name: nameCard,
                bursaCard: i.bursa_card,
                status: nameStatus,
                pin: i.pin,
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
    },
    methodRandomPassword() {
      const lettersSetArray = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
      ];
      const symbolsSetArray = [
        '=',
        '+',
        '-',
        '^',
        '?',
        '!',
        '%',
        '&',
        '*',
        '$',
        '#',
        '^',
        '@',
        '|',
      ];
      const passwordArray = [];
      // const digitsArray = [];
      const digitsPositionArray = [];
      let i = 0;

      // first, fill the password array with letters, uppercase and lowecase
      for (i = 0; i < this.settings.length; i += 1) {
        // get an array for all indexes of the password array
        digitsPositionArray.push(i);

        const upperCase = Math.round(Math.random() * 1);
        if (upperCase === 0) {
          passwordArray[i] = lettersSetArray[
            Math.floor(Math.random() * lettersSetArray.length)
          ].toUpperCase();
        } else {
          passwordArray[i] = lettersSetArray[Math.floor(Math.random() * lettersSetArray.length)];
        }
      }

      // Add digits to password
      for (i = 0; i < this.settings.digits; i += 1) {
        const digit = Math.round(Math.random() * 9);
        const numberIndex = digitsPositionArray[
          Math.floor(Math.random() * digitsPositionArray.length)
        ];

        passwordArray[numberIndex] = digit;

        const j = digitsPositionArray.indexOf(numberIndex);
        if (i !== -1) {
          digitsPositionArray.splice(j, 1);
        }
      }

      // add special charachters "symbols"
      for (i = 0; i < this.settings.symbols; i += 1) {
        const symbol = symbolsSetArray[Math.floor(Math.random() * symbolsSetArray.length)];
        const symbolIndex = digitsPositionArray[
          Math.floor(Math.random() * digitsPositionArray.length)
        ];

        passwordArray[symbolIndex] = symbol;

        const j = digitsPositionArray.indexOf(symbolIndex);
        if (i !== -1) {
          digitsPositionArray.splice(j, 1);
        }
      }

      this.resetPassword = passwordArray.join('');
    },
  },
  beforeCreate() {
    axios({
      baseURL: `${this.$store.state.domain}umkm/pagination-card/1`,
      method: 'get',
      headers: {
        'x-api-key': this.$store.state.apiKey,
        Authorization: `Bearer ${this.$cookies.get('token')}`,
      },
    })
      .then((response) => {
        if (response.data.data.umkm.length > 0) {
          const modulo = response.data.data.total % 10;
          if (modulo === 0) {
            this.pageCount = response.data.data.total / 10;
          } else {
            this.pageCount = (response.data.data.total - modulo) / 10 + 1;
          }
          let counter = 0;
          let nameStatus = '';
          let nameCard = '';
          response.data.data.umkm.forEach((i) => {
            counter += 1;
            if (i.status === '0') {
              nameStatus = 'Tidak Aktif';
            } else {
              nameStatus = 'Aktif';
            }
            if (i.name === null) {
              nameCard = '-';
            } else {
              nameCard = i.name;
            }
            this.UMKM.push({
              id: i.id,
              number: counter,
              name: nameCard,
              bursaCard: i.bursa_card,
              status: nameStatus,
              pin: i.pin,
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
  },
  beforeDestroy() {
    this.dialogAdd = null;
    this.dialogUpdate = null;
    this.dialogBatchAdd = null;
    this.dialogResetPassword = null;
    this.dialogDetail = null;
    this.loadingAdd = null;
    this.loadingBatch = null;
    this.loadingUpdate = null;
    this.loadingTable = null;
    this.loadingDialog = null;
    this.loadingResetPassword = null;
    this.headerUMKM = null;
    this.UMKM = null;
    this.editedIndex = null;
    this.editedItemUMKM = null;
    this.defaultItem = null;
    this.page = null;
    this.pageCount = null;
    this.search = null;
    this.type = null;
    this.filter = null;
    this.pinRules = null;
    this.csv = null;
    this.nameFile = null;
    this.CSVRules = null;
    this.bursaCardRules = null;
    this.hasSaved = null;
    this.status = null;
    this.icon = null;
    this.message = null;
    this.skeleton = null;
    this.resetPassword = null;
    this.resetPaswordRules = null;
    this.settings = null;
    this.nameCompany = null;
    this.owner = null;
    this.legality = null;
    this.typeCompany = null;
    this.oldCompany = null;
    this.branch = null;
    this.employee = null;
    this.address = null;
    this.province = null;
    this.city = null;
    this.link = null;
    this.phone = null;
    this.description = null;
    this.previewBrand = null;
    this.typeBrand = null;
    this.previewCard = null;
    this.typeCard = null;

    delete this.dialogAdd;
    delete this.dialogUpdate;
    delete this.dialogBatchAdd;
    delete this.dialogResetPassword;
    delete this.dialogDetail;
    delete this.loadingAdd;
    delete this.loadingBatch;
    delete this.loadingUpdate;
    delete this.loadingTable;
    delete this.loadingDialog;
    delete this.loadingResetPassword;
    delete this.headerUMKM;
    delete this.UMKM;
    delete this.editedIndex;
    delete this.editedItemUMKM;
    delete this.defaultItem;
    delete this.page;
    delete this.pageCount;
    delete this.search;
    delete this.type;
    delete this.filter;
    delete this.pinRules;
    delete this.csv;
    delete this.nameFile;
    delete this.CSVRules;
    delete this.bursaCardRules;
    delete this.hasSaved;
    delete this.status;
    delete this.icon;
    delete this.message;
    delete this.skeleton;
    delete this.resetPassword;
    delete this.resetPaswordRules;
    delete this.settings;
    delete this.nameCompany;
    delete this.owner;
    delete this.legality;
    delete this.typeCompany;
    delete this.oldCompany;
    delete this.branch;
    delete this.employee;
    delete this.address;
    delete this.province;
    delete this.city;
    delete this.link;
    delete this.phone;
    delete this.description;
    delete this.previewBrand;
    delete this.typeBrand;
    delete this.previewCard;
    delete this.typeCard;
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
  width: 100vw;
  max-width: 1044px;
}
</style>
