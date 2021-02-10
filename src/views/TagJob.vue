/*
  Nama        : Eko Ramadhanu Aryputra
  Log Date    : 28 Januri 2020 -> add reset password generate by sistem
                                  check data  after change image base 64 to link
  Log Note    :-
*/
<template>
  <div>
    <v-main>
      <v-container class="d-flex flex-column justify-center size-max">
        <div v-if="!skeleton">
          <v-row>
            <v-col xl="8" lg="8" md="8" sm="12" xs="12" class="hidden-sm-and-down"></v-col>
            <v-col xl="4" lg="4" md="4" sm="12" xs="12">
              <div class="d-flex justify-end">
                <v-select
                  v-model="type"
                  :items="itemsType2"
                  item-value="eng"
                  item-text="ind"
                  class="font-family"
                  label="Pilih Status yang Ditampilkan"
                  dense
                  outlined
                  @change="searchTagJob()"
                ></v-select>
              </div>
            </v-col>
          </v-row>
          <v-data-table
            :headers="header"
            :items="tagName"
            class="elevation-3 mt-3 font-family"
            hide-default-footer
            :loading="loadingTable"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>
                  <div class="d-flex">
                    <p class="ma-0 font-family">Daftar Jenis Pekerjaan</p>
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
                      <p class="ma-0 white--text font-family font-weight-bold">
                        tambah
                      </p>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline primary mb-4">
                      <span class="white--text text-capitalize font-family"
                        >menambah jenis pekerjaan</span
                      >
                    </v-card-title>

                    <v-card-text>
                      <v-form ref="form" lazy-validation>
                        <p class="mb-0 black--text text-capitalize">
                          <span class="font-family">
                            nama jenis pekerjaan
                          </span>
                          <span class="ml-1 error--text"> * </span>
                        </p>
                        <v-text-field
                          v-model="editedItem.name"
                          :rules="nameRules"
                          placeholder="Nama Jenis Pekerjan"
                          required
                          single-line
                          outlined
                          dense
                          class="font-family"
                        />
                        <p class="mb-0 black--text text-capitalize">
                          <span class="font-family">
                            tipe jenis pekerjaan
                          </span>
                          <span class="ml-1 error--text"> * </span>
                        </p>
                        <v-select
                          v-model="editedItem.type"
                          :rules="typeRules"
                          :items="itemsType"
                          item-text="ind"
                          item-value="eng"
                          label="Tipe Jenis Pekerjaan"
                          outlined
                          class="font-family"
                          dense
                          single-line
                        ></v-select>
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
                        <p class="my-auto white--text" v-if="!loadingAdd">
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
                label="Pencarian Nama Jenis Pekerjaan"
                class="px-5 font-family"
                single-line
                outlined
                dense
                hide-details
                @click:append="searchTagJob()"
              />
            </template>
            <template v-slot:[`item.actions`]="{ item }">
               <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    @click="openDialogUpdate(item)"
                    color="orange"
                    small
                    dark
                    elevation="0"
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>$editTagJob</v-icon>
                  </v-btn>
                  </template>
                  <span class="font-family text-capitalize">ubah Jenis Pekerjaan</span>
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
            >
            </v-pagination>
          </div>
        </div>
        <div v-if="skeleton">
          <v-skeleton-loader ref="skeleton" type="table" class="mt-3" />
        </div>
      </v-container>
      <v-dialog v-model="dialogUpdate" max-width="500px" persistent>
        <v-card>
          <v-card-title class="headline primary mb-4">
            <span class="white--text text-capitalize font-family"
              >mengubah jenis pekerjaan</span
            >
          </v-card-title>

          <v-card-text>
            <v-form ref="form" lazy-validation>
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> nama jenis pekerjaan </span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <v-text-field
                v-model="editedItem.name"
                :rules="nameRules"
                placeholder="Nama Jenis Pekerjan"
                required
                single-line
                outlined
                dense
                class="font-family"
              />
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> tipe jenis pekerjaan </span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <v-select
                v-model="editedItem.type"
                :items="itemsType"
                item-text="ind"
                item-value="eng"
                label="Tipe Jenis Pekerjaan"
                outlined
                class="font-family"
                dense
                single-line
              ></v-select>
            </v-form>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="white"
              class="mr-2"
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
    type: '',
    dialogAdd: false,
    dialogUpdate: false,
    loadingTable: false,
    loadingAdd: false,
    loadingUpdate: false,
    page: 1,
    pageCount: 0,
    itemsType: [
      { ind: 'Pencaker', eng: 'Job Seeker' },
      { ind: 'Informal', eng: 'Informal' },
      { ind: 'Magang', eng: 'Internship' },
      { ind: 'Profesional', eng: 'Professional' },
    ],
    itemsType2: [
      { ind: 'Pencaker', eng: 'Job Seeker' },
      { ind: 'Informal', eng: 'Informal' },
      { ind: 'Magang', eng: 'Internship' },
      { ind: 'Profesional', eng: 'Professional' },
      { ind: 'Tampilkan Semua', eng: 'All' },
    ],
    header: [
      {
        text: 'Nomor',
        sortable: false,
        value: 'number',
        width: 100,
      },
      {
        text: 'Nama',
        value: 'name',
        sortable: false,
      },
      {
        text: 'Tipe',
        value: 'type',
        sortable: false,
        width: 100,
      },
      {
        text: 'Aksi',
        value: 'actions',
        sortable: false,
        width: 150,
      },
    ],
    tagName: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      type: '',
    },
    defaultItem: {
      name: '',
      type: '',
    },
    nameRules: [(v) => !!v || 'Nama Jenis Pekerja Tidak Boleh Kosong'],
    typeRules: [(v) => !!v || 'Tipe Jenis Pekerja Tidak Boleh Kosong'],
    hasSaved: false,
    status: null,
    icon: '',
    message: '',
    skeleton: true,
    search: '',
  }),
  methods: {
    searchTagJob() {
      this.loadingTable = true;
      this.page = 1;
      if (this.tagName.length > 0) {
        this.tagName.splice(0, this.tagName.length);
      }
      this.methodGetDataTagJob();
    },
    pagination() {
      this.loadingTable = true;
      if (this.tagName.length > 0) {
        this.tagName.splice(0, this.tagName.length);
      }
      this.methodGetDataTagJob();
    },
    closeAdd() {
      this.dialogAdd = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
        this.$refs.form.reset();
      });
    },
    saveAdd() {
      if (this.$refs.form.validate()) {
        this.loadingAdd = true;
        axios({
          baseURL: `${this.$store.state.domain}tag-job`,
          method: 'post',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            name: this.capitalizeEachWord(this.editedItem.name),
            type: this.capitalizeEachWord(this.editedItem.type),
          },
        })
          .then((response) => {
            if (
              response.data.data.message
              === 'Tag Job Data Is Successfully Created'
            ) {
              this.hasSaved = true;
              this.status = true;
              this.message = 'data berhasil disimpan';
              this.icon = '$success';
            } else if (
              response.data.data.message === 'Name Tag Job Already Exist'
            ) {
              this.hasSaved = true;
              this.status = false;
              this.message = 'nama jenis pekerjaan sudah ada';
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
            if (this.tagName.length > 0) {
              this.tagName.splice(0, this.tagName.length);
            }
            this.methodGetDataTagJob();
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
      this.editedIndex = this.tagName.indexOf(item);
      this.editedItem.name = item.name;
      if (item.type.toLowerCase() === 'pencaker') {
        this.editedItem.type = 'Job Seeker';
      } else if (item.type.toLowerCase() === 'informal') {
        this.editedItem.type = 'Informal';
      } else if (item.type.toLowerCase() === 'Profesional') {
        this.editedItem.type = 'Professional';
      } else {
        this.editedItem.type = 'Internship';
      }
      this.dialogUpdate = true;
    },
    closeUpdate() {
      this.dialogUpdate = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
        this.$refs.form.reset();
      });
    },
    saveUpdate() {
      if (this.$refs.form.validate()) {
        this.loadingUpdate = true;
        axios({
          baseURL: `${this.$store.state.domain}tag-job/${
            this.tagName[this.editedIndex].id
          }`,
          method: 'patch',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            name: this.capitalizeEachWord(this.editedItem.name),
            type: this.editedItem.type,
          },
        })
          .then((response) => {
            if (
              response.data.data.message
              === 'Tag Job Data Is Successfully Updated'
            ) {
              this.hasSaved = true;
              this.status = true;
              this.message = 'data berhasil diubah';
              this.icon = '$success';
            } else if (
              response.data.data.message === 'Name Tag Job Already Exist'
            ) {
              this.hasSaved = true;
              this.status = false;
              this.message = 'nama jenis pekerja sudah ada';
              this.icon = '$warning';
            } else {
              this.hasSaved = true;
              this.status = false;
              this.message = 'data tidak berhasil diubah';
              this.icon = '$warning';
            }
            this.loadingtable = true;
            if (this.tagName.length > 0) {
              this.tagName.splice(0, this.tagName.length);
            }
            this.methodGetDataTagJob();
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
    // method universal
    methodGetDataTagJob() {
      const header = {
        'x-api-key': this.$store.state.apiKey,
        Authorization: `Bearer ${this.$cookies.get('token')}`,
      };
      if (this.search !== '') {
        header.keyword = this.search;
      }
      if (this.type !== '') {
        header.type = this.type;
      }
      if (this.page === 0) {
        this.page = 1;
      }
      axios({
        baseURL: `${this.$store.state.domain}tag-job/pagination/${this.page}`,
        method: 'get',
        headers: header,
      })
        .then((response) => {
          if (response.data.data.tagJob.length > 0) {
            const modulo = response.data.data.total % 10;
            if (modulo === 0) {
              this.pageCount = response.data.data.total / 10;
            } else {
              this.pageCount = (response.data.data.total - modulo) / 10 + 1;
            }
            let counter = 0;
            let nameType = '';
            response.data.data.tagJob.forEach((i) => {
              counter += 1;
              if (i.type.toLowerCase() === 'job seeker') {
                nameType = 'Pencaker';
              } else if (i.type.toLowerCase() === 'informal') {
                nameType = 'Informal';
              } else if (i.type.toLowerCase() === 'professional') {
                nameType = 'Profesional';
              } else {
                nameType = 'Magang';
              }
              this.tagName.push({
                id: i.id,
                number: counter,
                name: i.name,
                type: nameType,
              });
            });
          } else {
            this.pageCount = 0;
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        })
        .finally(() => {
          this.loadingTable = false;
        });
    },
    capitalizeEachWord(str) {
      return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
      );
    },
  },
  beforeCreate() {
    if (
      this.$store.state.role !== 'Admin 3'
      || this.$store.state.role !== 'Admin 2'
    ) {
      axios({
        baseURL: `${this.$store.state.domain}tag-job/pagination/1`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          Authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          if (response.data.data.tagJob.length > 0) {
            const modulo = response.data.data.total % 10;
            if (modulo === 0) {
              this.pageCount = response.data.data.total / 10;
            } else {
              this.pageCount = (response.data.data.total - modulo) / 10 + 1;
            }
            let counter = 0;
            let nameType = '';
            response.data.data.tagJob.forEach((i) => {
              counter += 1;
              if (i.type.toLowerCase() === 'job seeker') {
                nameType = 'Pencaker';
              } else if (i.type.toLowerCase() === 'informal') {
                nameType = 'Informal';
              } else if (i.type.toLowerCase() === 'professional') {
                nameType = 'Profesional';
              } else {
                nameType = 'Magang';
              }
              this.tagName.push({
                id: i.id,
                number: counter,
                name: i.name,
                type: nameType,
              });
            });
          } else {
            this.pageCount = 0;
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        })
        .finally(() => {
          this.skeleton = false;
        });
    } else {
      this.$router.push('/access-block');
    }
  },
  created() {
    this.type = 'All';
  },
  beforeDestroy() {
    this.type = null;
    this.dialogAdd = null;
    this.dialogUpdate = null;
    this.loadingTable = null;
    this.loadingAdd = null;
    this.loadingUpdate = null;
    this.page = null;
    this.pageCount = null;
    this.itemsType = null;
    this.itemsType2 = null;
    this.header = null;
    this.tagName = null;
    this.editedIndex = null;
    this.editedItem = null;
    this.defaultItem = null;
    this.nameRules = null;
    this.hasSaved = null;
    this.status = null;
    this.icon = null;
    this.message = null;
    this.skeleton = null;
    this.search = null;
    this.typeRules = null;

    delete this.type;
    delete this.dialogAdd;
    delete this.dialogUpdate;
    delete this.loadingTable;
    delete this.loadingAdd;
    delete this.loadingUpdate;
    delete this.page;
    delete this.pageCount;
    delete this.itemsType;
    delete this.itemsType2;
    delete this.header;
    delete this.tagName;
    delete this.editedIndex;
    delete this.editedItem;
    delete this.defaultItem;
    delete this.nameRules;
    delete this.hasSaved;
    delete this.status;
    delete this.icon;
    delete this.message;
    delete this.skeleton;
    delete this.search;
    delete this.typeRules;
  },
};
</script>

<style scoped>
.size-max {
  max-width: 1046px;
}
</style>
