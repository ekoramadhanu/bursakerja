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
                v-model="statusProfesional"
                :items="filter"
                class="font-family"
                label="Pilih Status yang Ditampilkan"
                dense
                @change="searchCardJobSeeker()"
              ></v-select>
            </div>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headerJobSeeker"
          :items="jobSeeker"
          class="elevation-3 mt-3 font-family"
          hide-default-footer
          :loading="loadingTable"
          v-if="!skeleton"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <div class="d-flex">
                  <p class="ma-0 hidden-xs-only">
                    <span class="font-family">
                      Daftar Tenaga Informal
                    </span>
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
                    <p class="ma-0 white--text font-weight-bold">
                      <span class="font-family">
                        tambah
                      </span>
                    </p>
                  </v-btn>
                </template>
                <v-card>
                  <v-toolbar class="primary">
                    <v-btn icon @click="closeAdd()">
                      <v-icon class="white--text">mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title class="text-capitalize white--text">
                      <span class="font-family">
                        Tambah Data Pekerja Infomal
                      </span>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn @click="saveAdd()" color="white" elevation="0">
                      <v-progress-circular
                        indeterminate
                        color="primary"
                        v-if="loadingAdd"
                      />
                      <p class="ma-0 primary--text font-weight-bold" v-if="!loadingAdd">
                        <span class="font-family">
                          simpan
                        </span>
                      </p>
                    </v-btn>
                  </v-toolbar>

                  <v-card-text class="size-max mx-auto my-4">
                    <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="editedItemJobSeeker.name"
                :rules="nameRules"
                label="Nama Pekerja Profesional"
                required
              />
              <v-text-field
                v-model="editedItemJobSeeker.position"
                :rules="positionRules"
                label="Posisi Pekerja Profesional"
                required
              />
              <v-text-field
                v-model="editedItemJobSeeker.phone"
                :rules="phoneRules"
                label="Telepon Pekerja Profesional"
                required
              />
              <v-autocomplete
                v-model="editedItemJobSeeker.location"
                :items="itemsLocation"
                :loading="isLoading"
                :search-input.sync="searchLocation"
                hide-no-data
                hide-selected
                item-text="name"
                item-value="name"
                label="Lokasi "
                :rules="locationRules"
              />
              <v-select
                v-model="editedItemJobSeeker.school"
                :items="itemSchool"
                item-text="name"
                item-value="name"
                label="Pendidikan Terakhir"
                :rules="schoolRules"
                required
              ></v-select>
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="computedDateFormatted"
                    label="Tanggal Berakhir "
                    :rules="expiredRules"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="editedItemJobSeeker.expired"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
              <v-file-input
                label="Unggah Foto (Maks 1 MB)"
                accept="image/png, image/jpeg, image/bmp"
                required
                ref="fileInput"
                enctype="multipart/form-data"
                :rules="imageRules"
                @change="ChangeImage"
              ></v-file-input>
              <img
                :src="editedItemJobSeeker.image"
                v-if="editedItemJobSeeker.image != null"
                class="preview-img"
                contain
                aspect-ratio="1.7"
              />
              <v-textarea
                filled
                label="Deskripsi Terkait Anda"
                v-model="editedItemJobSeeker.description"
                :rules="descriptionRules"
                :counter="250"
              ></v-textarea>
            </v-form>
            <p
              class="mt-4 mb-0 text-uppercase font-weight-bold text-subtitle-1"
            >
              <span class="font-family"> pratinjau </span>
            </p>
            <v-divider class="m-4"></v-divider>
            <v-row>
              <v-col
                cols="12"
                xl="2"
                lg="2"
                md="2"
                sm="12"
                xs="12"
                class="d-flex justify-center align-center"
              >
                <img
                  v-if="editedItemJobSeeker.image !== ''"
                  :src="editedItemJobSeeker.image"
                  class="preview-img-2"
                  aspect-ratio="1.7"
                />
              </v-col>
              <v-col cols="12" xl="10" lg="10" md="10" sm="12" xs="12">
                <p
                  class="font-weight-bold text-h6 black--text mb-0"
                  v-if="editedItemJobSeeker.name !== ''"
                >
                  <span class="font-family">
                    {{ editedItemJobSeeker.name }}
                  </span>
                </p>
                <p
                  class="text-subtitle-2 black--text mb-2"
                  v-if="editedItemJobSeeker.position !== ''"
                >
                  <span class="font-family">
                    {{ editedItemJobSeeker.position }}
                  </span>
                </p>
                <p
                  class="text-subtitle-2 black--text mb-1"
                  v-if="editedItemJobSeeker.phone !== ''"
                >
                  <v-icon size="15" class="mr-3">$phone</v-icon>
                  <span class="font-family">
                    {{ editedItemJobSeeker.phone }}
                  </span>
                </p>
                <p
                  class="black--text mb-2 text-subtitle-2"
                  v-if="editedItemJobSeeker.location !== ''"
                >
                  <v-icon size="15" class="mr-3">$location</v-icon>
                  <span class="font-family">
                    {{ editedItemJobSeeker.location }}
                  </span>
                </p>
                <p
                  class="black--text text-subtitle-2 mb-4"
                  v-if="editedItemJobSeeker.school !== ''"
                >
                  <v-icon size="15" class="mr-3">$school</v-icon>
                  <span class="font-family">
                    {{ editedItemJobSeeker.school }}
                  </span>
                </p>
                <p
                  class="black--text"
                  v-if="editedItemJobSeeker.description !== ''"
                >
                  <span class="font-family">
                    {{ editedItemJobSeeker.description }}
                  </span>
                </p>
              </v-col>
            </v-row>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-toolbar>
            <v-text-field
              v-model="search"
              append-icon="$search"
              label="Cari Tenaga Informal"
              class="px-5"
              single-line
              hide-details
              @click:append="searchProfesional()"
            />
          </template>
          <template v-slot:[`item.number`]="{ item }">
            <p :class="`ma-0 ${item.color}`">{{ item.number }}</p>
          </template>
          <template v-slot:[`item.name`]="{ item }">
            <p :class="`ma-0 ${item.color}`">{{ item.name }}</p>
          </template>
          <template v-slot:[`item.position`]="{ item }">
            <p :class="`ma-0 ${item.color}`">{{ item.position }}</p>
          </template>
          <template v-slot:[`item.phone`]="{ item }">
            <p :class="`ma-0 ${item.color}`">{{ item.phone }}</p>
          </template>
          <template v-slot:[`item.location`]="{ item }">
            <p :class="`ma-0 ${item.color}`">{{ item.location }}</p>
          </template>
          <template v-slot:[`item.school`]="{ item }">
            <p :class="`ma-0 ${item.color}`">{{ item.school }}</p>
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <p :class="`ma-0 ${item.color}`">{{ item.status }}</p>
          </template>
          <template v-slot:[`item.expired`]="{ item }">
            <p :class="`ma-0 ${item.color}`">{{ item.expired }}</p>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-row class="mr-2 my-2">
              <v-btn
                @click="openDialogUpdate(item)"
                dark
                color="orange"
                x-small
                v-if="item.status === 'Tidak Aktif'"
              >
                ubah data
              </v-btn>
            </v-row>
            <v-row class="mr-2 my-2">
              <v-btn
                @click="openDialogDeShow(item)"
                dark
                color="error"
                x-small
                v-if="item.status === 'Aktif'"
              >
                nonaktifkan
              </v-btn>
            </v-row>
            <v-row class="mr-2 my-2">
              <v-btn
                @click="openDialogShow(item)"
                dark
                color="success"
                x-small
                v-if="item.status === 'Tidak Aktif'"
              >
                aktifkan
              </v-btn>
            </v-row>
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
      <v-dialog
        v-model="dialogUpdate"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar class="primary">
            <v-btn icon @click="closeUpdate()">
              <v-icon class="white--text">mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title class="text-capitalize white--text">
              <span class="font-family">
                Edit Data Pekerja Informal
              </span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="saveUpdate()" elevation="0" color="white">
              <v-progress-circular
                indeterminate
                color="primary"
                v-if="loadingAdd"
              />
              <p class="ma-0 primary--text font-weight-bold" v-if="!loadingAdd">
                <span class="font-family">
                  simpan
                </span>
              </p>
            </v-btn>
          </v-toolbar>

          <v-card-text class="size-max mx-auto my-4">
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="editedItemJobSeeker.name"
                :rules="nameRules"
                label="Nama Pekerja Profesional"
                required
              />
              <v-text-field
                v-model="editedItemJobSeeker.position"
                :rules="positionRules"
                label="Posisi Pekerja Profesional"
                required
              />
              <v-text-field
                v-model="editedItemJobSeeker.phone"
                :rules="phoneRules"
                label="Telepon Pekerja Profesional"
                required
              />
              <v-autocomplete
                v-model="editedItemJobSeeker.location"
                :items="itemsLocation"
                :loading="isLoading"
                :search-input.sync="searchLocation"
                hide-no-data
                hide-selected
                item-text="name"
                item-value="name"
                label="Lokasi "
                :rules="locationRules"
              />
              <v-select
                v-model="editedItemJobSeeker.school"
                :items="itemSchool"
                item-text="name"
                item-value="name"
                label="Pendidikan Terakhir"
                :rules="schoolRules"
                required
              ></v-select>
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="computedDateFormatted"
                    label="Tanggal Berakhir "
                    :rules="expiredRules"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="editedItemJobSeeker.expired"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
              <v-file-input
                label="Unggah Foto (Maks 1 MB)"
                accept="image/png, image/jpeg, image/bmp"
                required
                ref="fileInput"
                enctype="multipart/form-data"
                :rules="imageRules"
                @change="ChangeImage"
              ></v-file-input>
              <img
                :src="editedItemJobSeeker.image"
                v-if="editedItemJobSeeker.image != null"
                class="preview-img"
                contain
                aspect-ratio="1.7"
              />
              <v-textarea
                filled
                label="Deskripsi Terkait Anda"
                v-model="editedItemJobSeeker.description"
                :rules="descriptionRules"
                :counter="250"
              ></v-textarea>
            </v-form>
            <p
              class="mt-4 mb-0 text-uppercase font-weight-bold text-subtitle-1"
            >
              <span class="font-family"> pratinjau </span>
            </p>
            <v-divider class="m-4"></v-divider>
            <v-row>
              <v-col
                cols="12"
                xl="2"
                lg="2"
                md="2"
                sm="12"
                xs="12"
                class="d-flex justify-center align-center"
              >
                <img
                  v-if="editedItemJobSeeker.image !== ''"
                  :src="editedItemJobSeeker.image"
                  class="preview-img-2"
                  aspect-ratio="1.7"
                />
              </v-col>
              <v-col cols="12" xl="10" lg="10" md="10" sm="12" xs="12">
                <p
                  class="font-weight-bold text-h6 black--text mb-0"
                  v-if="editedItemJobSeeker.name !== ''"
                >
                  <span class="font-family">
                    {{ editedItemJobSeeker.name }}
                  </span>
                </p>
                <p
                  class="text-subtitle-2 black--text mb-2"
                  v-if="editedItemJobSeeker.position !== ''"
                >
                  <span class="font-family">
                    {{ editedItemJobSeeker.position }}
                  </span>
                </p>
                <p
                  class="text-subtitle-2 black--text mb-1"
                  v-if="editedItemJobSeeker.phone !== ''"
                >
                  <v-icon size="15" class="mr-3">$phone</v-icon>
                  <span class="font-family">
                    {{ editedItemJobSeeker.phone }}
                  </span>
                </p>
                <p
                  class="black--text mb-2 text-subtitle-2"
                  v-if="editedItemJobSeeker.location !== ''"
                >
                  <v-icon size="15" class="mr-3">$location</v-icon>
                  <span class="font-family">
                    {{ editedItemJobSeeker.location }}
                  </span>
                </p>
                <p
                  class="black--text text-subtitle-2 mb-4"
                  v-if="editedItemJobSeeker.school !== ''"
                >
                  <v-icon size="15" class="mr-3">$school</v-icon>
                  <span class="font-family">
                    {{ editedItemJobSeeker.school }}
                  </span>
                </p>
                <p
                  class="black--text"
                  v-if="editedItemJobSeeker.description !== ''"
                >
                  <span class="font-family">
                    {{ editedItemJobSeeker.description }}
                  </span>
                </p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDeShow" persistent max-width="450">
        <v-card>
          <v-card-title class="headline primary white--text text-capitalize">
            menonaktifkan iklan informal
          </v-card-title>
          <v-card-text>
            <div class="d-flex justify-start align-center pa-2">
              <v-icon size="80" class="error--text mr-4">$warning</v-icon>
              <p class="ma-0 black--text">
                Apakah anda yakin mmenonaktifkan iklan informal ? Jika "iya"
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
              @click="dialogDeShow = false"
            >
              tidak
            </v-btn>
            <v-btn color="primary" @click="saveDeShow()">
              <v-progress-circular
                indeterminate
                color="white"
                v-if="loadingDeShow"
              />
              <p
                class="my-auto white--text text-capitalize"
                v-if="!loadingDeShow"
              >
                iya
              </p>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogShow" persistent max-width="450">
        <v-card>
          <v-card-title class="headline primary white--text text-capitalize">
            mengaktifkan iklan informal
          </v-card-title>
          <v-card-text>
            <div class="d-flex justify-start align-center pa-2">
              <v-icon size="80" class="error--text mr-4">$warning</v-icon>
              <p class="ma-0 black--text">
                Apakah anda yakin mengaktifkan iklan informal ? Jika "iya"
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
              @click="dialogShow = false"
            >
              tidak
            </v-btn>
            <v-btn color="primary" @click="saveShow()">
              <v-progress-circular
                indeterminate
                color="white"
                v-if="loadingShow"
              />
              <p
                class="my-auto white--text text-capitalize"
                v-if="!loadingShow"
              >
                iya
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
import axios from 'axios';

export default {
  data: () => ({
    items: [
      {
        text: 'informal',
        disabled: true,
      },
    ],
    dialogAdd: false,
    dialogUpdate: false,
    dialogDeShow: false,
    dialogShow: false,
    loadingAdd: false,
    loadingUpdate: false,
    loadingShow: false,
    loadingDeShow: false,
    loadingTable: false,
    menu: false,
    menu1: false,
    headerJobSeeker: [
      {
        text: 'Nomor',
        sortable: false,
        value: 'number',
      },
      { text: 'Nama', value: 'name', sortable: false },
      { text: 'Posisi', value: 'position', sortable: false },
      { text: 'Telepon', value: 'phone', sortable: false },
      { text: 'Lokasi', value: 'location', sortable: false },
      { text: 'Sekolah', value: 'school', sortable: false },
      { text: 'Status', value: 'status', sortable: false },
      { text: 'Tanggal Berakhir', value: 'expired', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    jobSeeker: [],
    editedIndex: -1,
    editedItemJobSeeker: {
      name: '',
      position: '',
      phone: '',
      location: '',
      school: '',
      expired: '',
      image: '',
      description: 'Silahkan Isi Deskripsi Singkat',
    },
    defaultItem: {
      name: '',
      position: '',
      phone: '',
      location: '',
      school: '',
      expired: '',
      image: '',
      description: 'Silahkan Isi Deskripsi Singkat',
    },
    imageRules: [
      (v) => !!v || 'Foto Perkerja Informal Tidak Boleh Kosong',
      (v) => !v
        || v.size < 1000000
        || 'Foto Perkerja Informal Harus Kurang Dari 1MB',
    ],
    page: 1,
    pageCount: 3,
    search: '',
    filter: ['Aktif', 'Tidak Aktif', 'Tampilkan Semua'],
    nameRules: [(v) => !!v || 'Nama Pekerja Informal Tidak Boleh Kosong'],
    positionRules: [(v) => !!v || 'Posisi Pekerja Informal Tidak Boleh Kosong'],
    phoneRules: [
      (v) => !!v || 'Nomor Telepon Pekerja Informal Tidak Boleh Kosong',
      (v) => /[0-9]/.test(v) || 'Nomor Telepon Pekerja Informal Harus Angka (0-9)',
      (v) => /^08/.test(v)
        || 'Nomor Telepon Pekerja Informal Harus Dimulai Dengan 08...',
    ],
    locationRules: [(v) => !!v || 'Lokasi Pekerja Informal Tidak Boleh Kosong'],
    itemSchool: [],
    schoolRules: [(v) => !!v || 'Sekolah Pekerja Informal Tidak Boleh Kosong'],
    expiredRules: [(v) => !!v || 'Tanggal Berakhir Iklan Tidak Boleh Kosong'],
    descriptionRules: [
      (v) => !!v || 'Deskripsi Singkat Anda Tidak Boleh Kosong',
      (v) => /^[a-zA-z., ]*$/.test(v)
        || 'Deskripsi Singat Anda Hanya Boleh Huruf, Titik, Koma, dan Spasi',
      (v) => (v || '').length <= 250
        || 'Deskripsi Singkat Tidak Boleh Lebih Dari 250',
    ],
    skeleton: true,
    hasSaved: false,
    status: null,
    icon: '',
    message: '',
    // add
    entries: [],
    isLoading: false,
    searchLocation: null,
    manually: false,
    statusProfesional: 'Tampilkan Semua',
  }),
  computed: {
    computedDateFormatted() {
      if (this.editedItemJobSeeker.expired !== '') {
        const [year, month, day] = this.editedItemJobSeeker.expired.split('-');
        return `${day}/${month}/${year}`;
      }
      return '';
    },
    itemsLocation() {
      return this.entries.map((entry) => {
        const { name } = entry;
        return { ...entry, name };
      });
    },
  },
  watch: {
    searchLocation() {
      // Items have already been loaded
      if (this.itemsLocation.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      fetch(`${this.$store.state.domain}city`, {
        headers: {
          'x-api-key': this.$store.state.apiKey,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          res.data.city.forEach((i) => {
            this.entries.push({
              id: i.id,
              name: this.capitalizeEachWord(i.name),
              provinceId: i.provinceId,
            });
          });
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        })
        // eslint-disable-next-line no-return-assign
        .finally(() => (this.isLoading = false));
    },
  },
  methods: {
    pagination() {
      this.loadingTable = true;
      this.jobSeeker.splice(0, this.jobSeeker.length);
      this.methodGetCardjobSeeker(this.page);
    },
    searchProfesional() {
      this.loadingTable = true;
      this.page = 1;
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
        this.$refs.form.resetValidation();
        this.manually = false;
      });
    },
    ChangeImage(event) {
      // this.image = event;
      if (event == null) {
        this.editedItemJobSeeker.image = null;
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editedItemJobSeeker.image = e.target.result;
        };
        reader.readAsDataURL(event);
      }
    },
    saveAdd() {
      if (this.$refs.form.validate()) {
        this.loadingAdd = true;
        axios({
          baseURL: `${this.$store.state.domain}informal/create`,
          method: 'post',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            name: this.editedItemJobSeeker.name,
            position: this.editedItemJobSeeker.position,
            description: this.editedItemJobSeeker.description,
            phone: this.editedItemJobSeeker.phone,
            expired: this.editedItemJobSeeker.expired,
            location: this.editedItemJobSeeker.location,
            school: this.editedItemJobSeeker.school,
            photo: this.editedItemJobSeeker.image,
          },
        })
          .then((response) => {
            if (
              response.data.data.message
              === 'Data Informal Is Successfully Created'
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
          baseURL: `${this.$store.state.domain}informal/update/${
            this.jobSeeker[this.editedIndex].id
          }`,
          method: 'patch',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            name: this.editedItemJobSeeker.name,
            position: this.editedItemJobSeeker.position,
            description: this.editedItemJobSeeker.description,
            phone: this.editedItemJobSeeker.phone,
            expired: this.editedItemJobSeeker.expired,
            location: this.editedItemJobSeeker.location,
            school: this.editedItemJobSeeker.school,
            photo: this.editedItemJobSeeker.image,
          },
        })
          .then((response) => {
            if (
              response.data.data.message
              === 'Data Informal Is Successfully Updated'
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
        this.$refs.form.resetValidation();
        this.manually = false;
      });
    },
    openDialogShow(item) {
      this.editedIndex = this.jobSeeker.indexOf(item);
      this.dialogShow = true;
    },
    openDialogDeShow(item) {
      this.editedIndex = this.jobSeeker.indexOf(item);
      this.dialogDeShow = true;
    },
    saveShow() {
      this.loadingShow = true;
      axios({
        baseURL: `${this.$store.state.domain}informal/show/${
          this.jobSeeker[this.editedIndex].id
        }`,
        method: 'patch',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          if (
            response.data.data.message === 'Data Informal Is Successfully Show'
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
          this.loadingShow = false;
          this.dialogShow = false;
          this.editedIndex = -1;
        });
    },
    saveDeShow() {
      this.loadingDeShow = true;
      axios({
        baseURL: `${this.$store.state.domain}informal/de-show/${
          this.jobSeeker[this.editedIndex].id
        }`,
        method: 'patch',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          if (
            response.data.data.message
            === 'Data Informal Is Successfully DeShow'
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
          this.loadingDeShow = false;
          this.dialogDeShow = false;
          this.editedIndex = -1;
        });
    },
    capitalizeEachWord(str) {
      return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
      );
    },
    // method universal
    methodGetCardjobSeeker(page) {
      let endpoint = '';
      let header = {};
      if (this.search === '') {
        endpoint = `${this.$store.state.domain}informal/pagination-all/${page}`;
      } else {
        endpoint = `${this.$store.state.domain}informal/search-all/${this.search}/${page}`;
      }
      if (this.statusProfesional === 'Aktif') {
        header = {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
          show: 1,
        };
      } else if (this.statusProfesional === 'Tidak Aktif') {
        header = {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
          show: 0,
        };
      } else {
        header = {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        };
      }
      axios({
        baseURL: endpoint,
        method: 'get',
        headers: header,
      })
        .then((response) => {
          if (response.data.data.informal.length > 0) {
            const modulo = response.data.data.total % 10;
            if (modulo === 0) {
              this.pageCount = response.data.data.total / 10;
            } else {
              this.pageCount = (response.data.data.total - modulo) / 10 + 1;
            }
            let counter = 0;
            let nameStatus = '';
            const currentDate = new Date();
            let date = '';
            let color = '';
            response.data.data.informal.forEach((i) => {
              counter += 1;
              date = i.expired.split('-');
              if (i.is_show === '0') {
                nameStatus = 'Tidak Aktif';
              } else {
                nameStatus = 'Aktif';
              }
              if (
                parseInt(date[0], 10) < currentDate.getFullYear()
                || (parseInt(date[0], 10) === currentDate.getFullYear()
                  && parseInt(date[1], 10) < currentDate.getMonth() + 1)
                || (parseInt(date[0], 10) === currentDate.getFullYear()
                  && parseInt(date[1], 10) === currentDate.getMonth() + 1
                  && parseInt(date[2], 10) < currentDate.getDate())
              ) {
                color = 'red--text';
              } else {
                color = 'black--text';
              }
              this.jobSeeker.push({
                id: i.id,
                number: counter,
                name: i.name,
                position: i.position,
                description: i.desc,
                phone: i.phone,
                status: nameStatus,
                school: i.school,
                location: i.location,
                expired: i.expired,
                color,
                image: i.image,
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
        baseURL: `${this.$store.state.domain}informal/pagination-all/1`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          if (response.data.data.informal.length > 0) {
            const modulo = response.data.data.total % 10;
            if (modulo === 0) {
              this.pageCount = response.data.data.total / 10;
            } else {
              this.pageCount = (response.data.data.total - modulo) / 10 + 1;
            }
            let counter = 0;
            let nameStatus = '';
            const currentDate = new Date();
            let date = '';
            let color = '';
            response.data.data.informal.forEach((i) => {
              counter += 1;
              date = i.expired.split('-');
              if (i.is_show === '0') {
                nameStatus = 'Tidak Aktif';
              } else {
                nameStatus = 'Aktif';
              }
              if (
                parseInt(date[0], 10) < currentDate.getFullYear()
                || (parseInt(date[0], 10) === currentDate.getFullYear()
                  && parseInt(date[1], 10) < currentDate.getMonth() + 1)
                || (parseInt(date[0], 10) === currentDate.getFullYear()
                  && parseInt(date[1], 10) === currentDate.getMonth() + 1
                  && parseInt(date[2], 10) < currentDate.getDate())
              ) {
                color = 'red--text';
              } else {
                color = 'black--text';
              }
              this.jobSeeker.push({
                id: i.id,
                number: counter,
                name: i.name,
                position: i.position,
                description: i.desc,
                phone: i.phone,
                status: nameStatus,
                school: i.school,
                location: i.location,
                expired: i.expired,
                color,
                image: i.image,
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
  created() {
    this.itemSchool = [...this.$store.state.itemsSchool];
  },
  beforeDestroy() {
    this.items = null;
    this.dialogAdd = null;
    this.dialogUpdate = null;
    this.dialogDeShow = null;
    this.dialogShow = null;
    this.loadingAdd = null;
    this.loadingUpdate = null;
    this.loadingShow = null;
    this.loadingDeShow = null;
    this.loadingTable = null;
    this.menu = null;
    this.menu1 = null;
    this.headerJobSeeker = null;
    this.jobSeeker = null;
    this.editedIndex = null;
    this.editedItemJobSeeker = null;
    this.defaultItem = null;
    this.extensions = null;
    this.imageRules = null;
    this.page = null;
    this.pageCount = null;
    this.search = null;
    this.filter = null;
    this.nameRules = null;
    this.positionRules = null;
    this.phoneRules = null;
    this.locationRules = null;
    this.itemSchool = null;
    this.schoolRules = null;
    this.expiredRules = null;
    this.skeleton = null;
    this.hasSaved = null;
    this.status = null;
    this.icon = null;
    this.message = null;
    this.entries = null;
    this.isLoading = null;
    this.searchLocation = null;
    this.manually = null;
    this.statusProfesional = null;

    delete this.items;
    delete this.dialogAdd;
    delete this.dialogUpdate;
    delete this.dialogDeShow;
    delete this.dialogShow;
    delete this.loadingAdd;
    delete this.loadingUpdate;
    delete this.loadingShow;
    delete this.loadingDeShow;
    delete this.loadingTable;
    delete this.menu;
    delete this.menu1;
    delete this.headerJobSeeker;
    delete this.jobSeeker;
    delete this.editedIndex;
    delete this.editedItemJobSeeker;
    delete this.defaultItem;
    delete this.extensions;
    delete this.imageRules;
    delete this.page;
    delete this.pageCount;
    delete this.search;
    delete this.filter;
    delete this.nameRules;
    delete this.positionRules;
    delete this.phoneRules;
    delete this.locationRules;
    delete this.itemSchool;
    delete this.schoolRules;
    delete this.expiredRules;
    delete this.skeleton;
    delete this.hasSaved;
    delete this.status;
    delete this.icon;
    delete this.message;
    delete this.entries;
    delete this.isLoading;
    delete this.searchLocation;
    delete this.manually;
    delete this.statusProfesional;
  },
};
</script>

<style scoped>
.size-max {
  max-width: 1100px;
}
.preview-img {
  max-width: 300px;
  max-height: 200px;
}
.cursor {
  cursor: pointer;
}
.preview-img-2 {
  position: relative;
  width: 130px;
  height: 130px;
  overflow: hidden;
  border-radius: 50%;
}
</style>
