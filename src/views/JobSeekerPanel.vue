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
                :items="filter"
                label="Pilih Status yang Ditampilkan"
                v-model="search"
                @change="searchCardJobSeeker()"
                outlined
              >
              </v-select>
            </div>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headerJobSeeker"
          :items="jobSeeker"
          class="elevation-3 mt-3"
          hide-default-footer
          :loading="loadingTable"
          v-if="!skeleton"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <div class="d-flex">
                  <p class="ma-0 hidden-xs-only">Daftar Karyawan</p>
                </div>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogAdd" max-width="500px">
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
                  <v-card-title class="primary">
                    <span class="headline white--text text-capitalize"
                      >menambah kartu karyawan</span
                    >
                  </v-card-title>

                  <v-card-text>
                    <v-form ref="form" lazy-validation>
                      <v-text-field
                        v-model="editedItemJobSeeker.bursaCard"
                        :rules="bursaCardRules"
                        label="Nomor Kartu Bursa Kerja"
                        required
                      />
                      <v-text-field
                        v-model="editedItemJobSeeker.pin"
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
                      text
                      color="primary"
                      class="mr-2"
                      @click="closeAdd()"
                    >
                      batal
                    </v-btn>
                    <v-btn
                      color="primary"
                      class="white--text"
                      @click="saveAdd()"
                    >
                      <v-progress-circular
                        indeterminate
                        color="white"
                        v-if="loadingAdd"
                      />
                      <p class="my-auto white--text" v-if="!loadingAdd">
                        simpan
                      </p>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              @click="openDialogUpdate(item)"
              x-small
              dark
              elevation="0"
              color="orange"
            >
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
      <v-dialog v-model="dialogUpdate" max-width="500px" persistent>
        <v-card>
          <v-card-title class="primary">
            <span class="headline white--text text-capitalize"
              >mengubah kartu karyawan</span
            >
          </v-card-title>

          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="editedItemJobSeeker.bursaCard"
                :rules="bursaCardRules"
                prepend-icon="$idCard"
                label="Nomor Kartu Bursa Kerja"
                required
              />
              <v-text-field
                v-model="editedItemJobSeeker.pin"
                :rules="pinRules"
                prepend-icon="$padlock"
                label="PIN Kartu Bursa Kerja"
                required
              />
            </v-form>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="primary" class="mr-2" @click="closeUpdate()">
              batal
            </v-btn>
            <v-btn color="primary" @click="saveUpdate()">
              <v-progress-circular
                indeterminate
                color="white"
                v-if="loadingUpdate"
              />
              <p class="my-auto white--text" v-if="!loadingUpdate">simpan</p>
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
    headerJobSeeker: [
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
    jobSeeker: [],
    editedIndex: -1,
    editedItemJobSeeker: {
      bursaCard: '',
      pin: '',
    },
    defaultItem: {
      bursaCard: '',
      pin: '',
    },
    page: 1,
    pageCount: 3,
    search: 'Tampilkan Semua',
    filter: ['Aktif', 'Tidak Aktif', 'Tampilkan Semua'],
    pinRules: [(v) => !!v || 'PIN Bursa Kerja Tidak Boleh Kosong'],
    bursaCardRules: [(v) => !!v || 'Nomor Bursa Kerja Tidak Boleh Kosong'],
    skeleton: true,
    hasSaved: false,
    status: null,
    icon: '',
    message: '',
  }),
  methods: {
    pagination() {
      this.loadingTable = true;
      this.jobSeeker.splice(0, this.jobSeeker.length);
      this.methodGetCardjobSeeker(this.page);
    },
    searchCardJobSeeker() {
      this.loadingTable = true;
      this.page = 1;
      this.jobSeeker.splice(0, this.jobSeeker.length);
      this.methodGetCardjobSeeker(this.page);
    },
    closeAdd() {
      this.dialogAdd = false;
      this.$nextTick(() => {
        this.editedItemJobSeeker = { ...this.defaultItem };
        this.editedIndex = -1;
        this.$refs.form.reset();
      });
    },
    saveAdd() {
      if (this.$refs.form.validate()) {
        this.loadingAdd = true;
        axios({
          baseURL: `${this.$store.state.domain}job-seeker/card`,
          method: 'post',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            bursaCard: this.editedItemJobSeeker.bursaCard,
            pin: this.editedItemJobSeeker.pin,
          },
        })
          .then((response) => {
            if (
              response.data.data.message
              === 'Job Seeker Data Is Successfully Created'
            ) {
              this.hasSaved = true;
              this.status = true;
              this.message = 'data berhasil disimpan';
              this.icon = '$success';
            } else if (
              response.data.data.message === 'Bursa Card Already Exist'
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
            this.search = 'Tampilkan Semua';
            if (this.jobSeeker.length > 0) {
              this.jobSeeker.splice(0, this.jobSeeker.length);
            }
            this.methodGetCardjobSeeker(1);
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
      this.editedIndex = this.jobSeeker.indexOf(item);
      this.editedItemJobSeeker = { ...item };
      this.dialogUpdate = true;
    },
    saveUpdate() {
      if (this.$refs.form.validate()) {
        this.loadingUpdate = true;
        axios({
          baseURL: `${this.$store.state.domain}job-seeker/card/${
            this.jobSeeker[this.editedIndex].id
          }`,
          method: 'patch',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            bursaCard: this.editedItemJobSeeker.bursaCard,
            pin: this.editedItemJobSeeker.pin,
          },
        })
          .then((response) => {
            if (
              response.data.data.message
              === 'Data Job Seeker Is Successfully Updated'
            ) {
              this.hasSaved = true;
              this.status = true;
              this.message = 'data berhasil disimpan';
              this.icon = '$success';
            } else if (
              response.data.data.message === 'Card Job Seeker Already Exist'
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
            this.search = 'Tampilkan Semua';
            if (this.jobSeeker.length > 0) {
              this.jobSeeker.splice(0, this.jobSeeker.length);
            }
            this.methodGetCardjobSeeker(1);
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
        this.editedItemJobSeeker = { ...this.defaultItem };
        this.editedIndex = -1;
        this.$refs.form.reset();
      });
    },
    // method universal
    methodGetCardjobSeeker(page) {
      let endpoint = '';
      if (this.search === 'Tampilkan Semua') {
        endpoint = `${this.$store.state.domain}job-seeker/card/${page}`;
      } else if (this.search === 'Aktif') {
        endpoint = `${this.$store.state.domain}job-seeker/card-activate/${page}`;
      } else {
        endpoint = `${this.$store.state.domain}job-seeker/card-not-activate/${page}`;
      }
      axios({
        baseURL: endpoint,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          if (response.data.data.jobSeeker.length > 0) {
            const modulo = response.data.data.total % 10;
            if (modulo === 0) {
              this.pageCount = response.data.data.total / 10;
            } else {
              this.pageCount = (response.data.data.total - modulo) / 10 + 1;
            }
            let counter = (page - 1) * 10;
            let nameStatus = '';
            let nameCard = '';
            response.data.data.jobSeeker.forEach((i) => {
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
              this.jobSeeker.push({
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
  },
  beforeCreate() {
    if (
      this.$store.state.role === 'Admin 1'
      || this.$store.state.role === 'UMKM'
      || this.$store.state.role === 'Magang'
      || this.$store.state.role === 'Umum'
      || this.$store.state.role === 'Profesional'
      || this.$store.state.role === 'Informal'
    ) {
      this.$router.push('/access-block');
    } else {
      axios({
        baseURL: `${this.$store.state.domain}job-seeker/card/1`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          if (response.data.data.jobSeeker.length > 0) {
            const modulo = response.data.data.total % 10;
            if (modulo === 0) {
              this.pageCount = response.data.data.total / 10;
            } else {
              this.pageCount = (response.data.data.total - modulo) / 10 + 1;
            }
            let counter = 0;
            let nameStatus = '';
            let nameCard = '';
            response.data.data.jobSeeker.forEach((i) => {
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
              this.jobSeeker.push({
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
    }
  },
  beforeDestroy() {
    this.items = null;
    this.dialogAdd = null;
    this.headerJobSeeker = null;
    this.jobSeeker = null;
    this.editedIndex = null;
    this.editedItemJobSeeker = null;
    this.defaultItem = null;
    this.page = null;
    this.pageCount = null;
    this.search = null;
    this.pinRules = null;
    this.bursaCardRules = null;

    delete this.items;
    delete this.dialogAdd;
    delete this.headerJobSeeker;
    delete this.jobSeeker;
    delete this.editedIndex;
    delete this.editedItemJobSeeker;
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
.size-max {
  max-width: 1100px;
}
</style>
