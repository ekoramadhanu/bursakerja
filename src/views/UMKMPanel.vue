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
                v-model="search"
                class="mt-3 font-family"
                :items="filter"
                label="Pilih Status yang Ditampilkan"
                outlined
                @change="searchCardUMKM()"
              ></v-select>
            </div>
          </v-col>
        </v-row>
        <div class="d-flex justify-end"></div>
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
                      <v-text-field
                        v-model="editedItemUMKM.bursaCard"
                        :rules="bursaCardRules"
                        label="Nomor Kartu Bursa Kerja"
                        required
                      />
                      <v-text-field
                        v-model="editedItemUMKM.pin"
                        :rules="pinRules"
                        label="PIN Kartu Bursa Kerja"
                        required
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
                      <div class="d-flex">
                        <v-file-input
                          label="Unggah File CSV (Maks 1 MB)"
                          accept=".csv"
                          required
                          hide-input
                          ref="fileInput"
                          enctype="multipart/form-data"
                          class="mr-4 width-upload-form pa-0"
                          :rules="CSVRules"
                          @change="ChangeFile"
                        />
                        <p class="my-auto text-h6">
                          <span class="font-family">
                            {{nameFile}}
                          </span>
                        </p>
                      </div>
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
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn @click="openDialogUpdate(item)" color="orange" x-small dark elevation="0">
              ubah data kartu
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
      <v-dialog v-model="dialogUpdate" max-width="500px" persistent>
        <v-card>
          <v-card-title class="primary mb-4">
            <span class="headline white--text text-capitalize"
              >mengubah kartu UMKM</span
            >
          </v-card-title>

          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="editedItemUMKM.bursaCard"
                :rules="bursaCardRules"
                label="Nomor Kartu Bursa Kerja"
                required
              />
              <v-text-field
                v-model="editedItemUMKM.pin"
                :rules="pinRules"
                label="PIN Kartu Bursa Kerja"
                required
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
    items: [
      {
        text: 'artikel',
        disabled: true,
      },
    ],
    dialogAdd: false,
    dialogUpdate: false,
    dialogBatchAdd: false,
    loadingAdd: false,
    loadingBatch: false,
    loadingUpdate: false,
    loadingTable: false,
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
    search: 'Semua',
    filter: ['Aktif', 'Tidak Aktif', 'Semua'],
    pinRules: [(v) => !!v || 'PIN Bursa Kerja 3x4 Tidak Boleh Kosong'],
    csv: null,
    nameFile: 'Silahkan Pilih File CSV',
    CSVRules: [
      (v) => !!v || 'File CSV Tidak Boleh Kosong',
      (v) => !v || v.size < 1000000 || 'File CSV Harus Kurang Dari 1MB',
    ],
    bursaCardRules: [
      (v) => !!v || 'Nomor Bursa Kerja 3x4 Tidak Boleh Kosong',
      (v) => /^BK02/.test(v) || 'Nomor Bursa Kerja Tidak Valid',
    ],
    hasSaved: false,
    status: null,
    icon: '',
    message: '',
    skeleton: true,
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
            authorization: `Bearer ${this.$cookies.get('token')}`,
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
            authorization: `Bearer ${this.$cookies.get('token')}`,
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
      this.csv = undefined;
      this.$refs.form.resetValidation();
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
            authorization: `Bearer ${this.$cookies.get('token')}`,
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
    // method universal
    methodGetCardUMKM(page) {
      if (this.search === 'Semua') {
        axios({
          baseURL: `${this.$store.state.domain}umkm/pagination-card/${page}`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
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
      } else if (this.search === 'Aktif') {
        axios({
          baseURL: `${this.$store.state.domain}umkm/pagination-activate-card/${page}`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
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
      } else {
        axios({
          baseURL: `${this.$store.state.domain}umkm/pagination-not-activate-card/${page}`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
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
      }
    },
  },
  beforeCreate() {
    axios({
      baseURL: `${this.$store.state.domain}umkm/pagination-card/1`,
      method: 'get',
      headers: {
        'x-api-key': this.$store.state.apiKey,
        authorization: `Bearer ${this.$cookies.get('token')}`,
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
    this.items = null;
    this.dialogAdd = null;
    this.headerUMKM = null;
    this.UMKM = null;
    this.editedIndex = null;
    this.editedItemUMKM = null;
    this.defaultItem = null;
    this.page = null;
    this.pageCount = null;
    this.search = null;
    this.pinRules = null;
    this.bursaCardRules = null;

    delete this.items;
    delete this.dialogAdd;
    delete this.headerJobSeeker;
    delete this.UMKM;
    delete this.editedIndex;
    delete this.editedItemUMKM;
    delete this.defaultItem;
    delete this.page;
    delete this.pageCount;
    delete this.search;
    delete this.pinRules;
    delete this.bursaCardRules;
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
  max-width: 10446px;
}
</style>
