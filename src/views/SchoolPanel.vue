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
          :headers="headerSchool"
          :items="school"
          v-if="!skeleton"
          class="elevation-3 mt-3 font-family"
          hide-default-footer
          :loading="loadingtable"
          :items-per-page="10"
          mobile-breakpoint="0"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <div class="d-flex">
                  <p class="ma-0">
                    <span class="fon-family"> Daftar Sekolah Unggulan </span>
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
                    <p class="ma-0 white--text font-weight-bold">tambah</p>
                  </v-btn>
                </template>
                <v-card>
                  <v-toolbar class="primary mb-4">
                    <div class="size-max mx-auto d-flex justify-end">
                      <v-btn icon @click="closeAdd()">
                        <v-icon class="white--text">mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title
                        class="text-capitalize white--text my-auto ml-1"
                      >
                        <span class="font-family"> tambah data sekolah </span>
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn @click="saveAdd()" elevation="0" color="white">
                        <v-progress-circular
                          indeterminate
                          color="primary"
                          v-if="loadingAdd"
                        />
                        <p
                          class="ma-0 primary--text font-weight-bold"
                          v-if="!loadingAdd"
                        >
                          <span class="font-family"> simpan </span>
                        </p>
                      </v-btn>
                    </div>
                  </v-toolbar>

                  <v-card-text class="size-max mx-auto">
                    <v-form ref="form" lazy-validation>
                      <p class="mb-0 black--text text-capitalize">
                        <span class="font-family"> nama sekolah </span>
                        <span class="ml-1 error--text"> * </span>
                      </p>
                      <v-text-field
                        v-model="editedItemSchool.name"
                        :rules="nameRules"
                        label="Nama Sekolah"
                        required
                        single-line
                        outlined
                        dense
                        class="font-family"
                      />
                      <p class="mb-0 black--text text-capitalize">
                        <span class="font-family"> lokasi sekolah </span>
                        <span class="ml-1 error--text"> * </span>
                      </p>
                      <v-autocomplete
                        v-model="editedItemSchool.location"
                        :items="itemsLocation"
                        :loading="isLoading"
                        :search-input.sync="searchLocation"
                        hide-no-data
                        hide-selected
                        item-text="name"
                        item-value="name"
                        label="Lokasi Sekolah"
                        persistent-hint
                        :rules="locationRules"
                        single-line
                        outlined
                        dense
                        class="font-family"
                      />
                      <p class="mb-0 black--text text-capitalize">
                        <span class="font-family"> kategori sekolah </span>
                        <span class="ml-1 error--text"> * </span>
                      </p>
                      <v-select
                        v-model="editedItemSchool.category"
                        :items="itemCategory"
                        item-text="name"
                        item-value="name"
                        label="Kategori Sekolah"
                        :rules="categoryRules"
                        single-line
                        required
                        outlined
                        dense
                        class="font-family"
                      ></v-select>
                      <p class="mb-0 black--text text-capitalize">
                        <span class="font-family">
                          Gambar Sekolah (Maks 1 MB)
                        </span>
                        <span class="ml-1 error--text"> * </span>
                      </p>
                      <v-file-input
                        label="Unggah Gambar Sekolah (Maks 1 MB)"
                        accept="image/png, image/jpeg, image/bmp"
                        required
                        ref="fileInput"
                        enctype="multipart/form-data"
                        :rules="imageRules"
                        @change="ChangeImage"
                        prepend-icon="$fileUpload"
                        outlined
                        dense
                        class="font-family"
                        single-line
                      ></v-file-input>
                      <img
                        :src="editedItemSchool.image"
                        v-if="editedItemSchool.image != null"
                        class="preview-img"
                        contain
                        aspect-ratio="1.7"
                      />
                      <p class="mb-0 black--text text-capitalize">
                        <span class="font-family"> deskripsi sekolah </span>
                        <span class="ml-1 error--text"> * </span>
                      </p>
                      <tip-tap-vuetify
                        v-model="editedItemSchool.description"
                        :extensions="extensions"
                        :card-props="{
                          height: '500',
                          style: 'overflow: auto;',
                        }"
                      />
                    </v-form>
                    <p
                      class="mt-4 mb-0 text-uppercase font-weight-bold text-subtitle-1"
                    >
                      <span class="font-family"> pratinjau </span>
                    </p>
                    <v-divider class="m-4"></v-divider>
                    <v-img
                      :src="editedItemSchool.image"
                      aspect-ratio="1.7"
                      width="100vw"
                      max-width="230"
                      height="100vh"
                      max-height="200"
                      class="mx-auto"
                      v-if="!skeleton"
                      contain
                    ></v-img>
                    <p class="mb-0 mt-6 text-h5 font-weight-bold">
                      <span class="font-family">
                        {{ editedItemSchool.name }}
                      </span>
                    </p>
                    <p class="mt-4 mb-0 text-subtitle-1">
                      <v-icon size="15" class="mr-1">$location</v-icon>
                      <span class="font-family">
                        {{ editedItemSchool.location }}
                      </span>
                    </p>
                    <p class="text-subtitle-1">
                      <v-icon size="15" class="mr-1">$tag</v-icon>
                      <span class="font-family">
                        {{ editedItemSchool.category }}
                      </span>
                    </p>
                    <div
                      class="text-justify mt-6 font-family"
                      v-html="editedItemSchool.description"
                      v-if="!skeleton"
                    ></div>
                  </v-card-text>
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
              @click:append="searchSchool()"
              outlined
              dense
            />
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="openDialogUpdate(item)"
                  class="mr-1"
                  icon
                  color="orange"
                  small
                  elevation="0"
                  v-bind="attrs"
                  v-on="on"
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
                  small
                  elevation="0"
                  v-if="item.status === 'Ditampilkan'"
                  v-bind="attrs"
                  v-on="on"
                  icon
                >
                  <v-icon>$archive</v-icon>
                </v-btn>
              </template>
              <span class="font-family text-capitalize">arsip data</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="openDialogActivate(item)"
                  icon
                  color="success"
                  small
                  elevation="0"
                  v-bind="attrs"
                  v-on="on"
                  v-if="item.status === 'Tidak Ditampilkan'"
                >
                  <v-icon>$unArchive</v-icon>
                </v-btn>
              </template>
              <span class="font-family text-capitalize">aktifkan data</span>
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
      >
        <v-card>
          <v-toolbar class="primary mb-4">
            <div class="size-max mx-auto d-flex justify-end">
              <v-btn icon @click="closeUpdate()">
                <v-icon class="white--text">mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title class="text-capitalize white--text my-auto ml-1">
                <span class="font-family"> Edit data sekolah </span>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn @click="saveUpdate()" elevation="0" color="white">
                <v-progress-circular
                  indeterminate
                  color="primary"
                  v-if="loadingUpdate"
                />
                <p
                  class="ma-0 primary--text font-weight-bold"
                  v-if="!loadingUpdate"
                >
                  <span class="font-family"> simpan </span>
                </p>
              </v-btn>
            </div>
          </v-toolbar>

          <v-card-text class="size-max mx-auto">
            <div v-if="!loadingDialog">
              <v-form ref="form" lazy-validation>
                <p class="mb-0 black--text text-capitalize">
                  <span class="font-family"> nama sekolah </span>
                  <span class="ml-1 error--text"> * </span>
                </p>
                <v-text-field
                  v-model="editedItemSchool.name"
                  :rules="nameRules"
                  label="Nama Sekolah"
                  required
                  single-line
                  outlined
                  dense
                  class="font-family"
                />
                <p class="mb-0 black--text text-capitalize">
                  <span class="font-family"> lokasi sekolah </span>
                  <span class="ml-1 error--text"> * </span>
                </p>
                <v-autocomplete
                  v-model="editedItemSchool.location"
                  :items="itemsLocation"
                  :loading="isLoading"
                  :search-input.sync="searchLocation"
                  hide-no-data
                  hide-selected
                  item-text="name"
                  item-value="name"
                  label="Lokasi Sekolah"
                  persistent-hint
                  :rules="locationRules"
                  single-line
                  outlined
                  dense
                  class="font-family"
                  :hint="`Data Yang Disimpan ${editedItemSchool.location}`"
                />
                <p class="mb-0 black--text text-capitalize">
                  <span class="font-family"> kategori sekolah </span>
                  <span class="ml-1 error--text"> * </span>
                </p>
                <v-select
                  v-model="editedItemSchool.category"
                  :items="itemCategory"
                  item-text="name"
                  item-value="name"
                  label="Kategori Sekolah"
                  :rules="categoryRules"
                  single-line
                  required
                  outlined
                  dense
                  class="font-family"
                ></v-select>
                <p class="mb-0 black--text text-capitalize">
                  <span class="font-family"> Gambar Sekolah (Maks 1 MB) </span>
                  <span class="ml-1 error--text"> * </span>
                </p>
                <v-file-input
                  label="Unggah Gambar Sekolah (Maks 1 MB)"
                  accept="image/png, image/jpeg, image/bmp"
                  required
                  ref="fileInput"
                  enctype="multipart/form-data"
                  :rules="editedItemSchool.image != null? [] : imageRules"
                  @change="ChangeImage"
                  prepend-icon="$fileUpload"
                  outlined
                  dense
                  class="font-family"
                  single-line
                ></v-file-input>
                <img
                  :src="editedItemSchool.image"
                  v-if="editedItemSchool.image != null"
                  class="preview-img"
                  contain
                  aspect-ratio="1.7"
                />
                <p class="mb-0 black--text text-capitalize">
                  <span class="font-family"> deskripsi sekolah </span>
                  <span class="ml-1 error--text"> * </span>
                </p>
                <tip-tap-vuetify
                  v-model="editedItemSchool.description"
                  :extensions="extensions"
                  :card-props="{
                    height: '500',
                    style: 'overflow: auto;',
                  }"
                />
              </v-form>
              <p
                class="mt-4 mb-0 text-uppercase font-weight-bold text-subtitle-1"
              >
                <span class="font-family"> pratinjau </span>
              </p>
              <v-divider class="m-4"></v-divider>
              <v-img
                :src="editedItemSchool.image"
                aspect-ratio="1.7"
                width="100vw"
                max-width="230"
                height="100vh"
                max-height="200"
                class="mx-auto"
                v-if="!skeleton"
                contain
              ></v-img>
              <p class="mb-0 mt-6 text-h5 font-weight-bold" v-if="!skeleton">
                <span class="font-family">
                  {{ editedItemSchool.name }}
                </span>
              </p>
              <p class="text-subtitle-1">
                <v-icon size="15" class="mr-1">$tag</v-icon>
                <span class="font-family">
                  {{ editedItemSchool.category }}
                </span>
              </p>
              <p class="mt-4 text-subtitle-1" v-if="!skeleton">
                <v-icon size="15" class="mr-1">$location</v-icon>
                <span class="font-family">
                  {{ editedItemSchool.location }}
                </span>
              </p>
              <div
                class="text-justify mt-6 font-family"
                v-html="editedItemSchool.description"
                v-if="!skeleton"
              ></div>
            </div>
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
      <v-dialog v-model="dialogDeactive" persistent max-width="450">
        <v-card>
          <v-card-title class="headline primary white--text text-capitalize">
            ubah data sekolah
          </v-card-title>
          <v-card-text>
            <div class="d-flex justify-start align-center pa-2">
              <v-icon size="80" class="error--text mr-4">$warning</v-icon>
              <p class="ma-0 black--text">
                Apakah anda yakin tidak menampilkan data sekolah ? Jika "iya"
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
              @click="dialogDeactive = false"
            >
              tidak
            </v-btn>
            <v-btn color="primary" @click="saveDeactivated()">
              <v-progress-circular
                indeterminate
                color="white"
                v-if="loadingDeactive"
              />
              <p
                class="my-auto white--text text-capitalize"
                v-if="!loadingDeactive"
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
            ubah data sekolah unggulan
          </v-card-title>
          <v-card-text>
            <div class="d-flex justify-start align-center pa-2">
              <v-icon size="80" class="error--text mr-4">$warning</v-icon>
              <p class="ma-0 black--text">
                Apakah anda yakin menampilkan data sekolah ? Jika "iya" silahkan
                pilih tombol iya
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
  HardBreak,
  HorizontalRule,
  History,
} from 'tiptap-vuetify';
import axios from 'axios';

export default {
  data: () => ({
    dialogAdd: false,
    dialogUpdate: false,
    dialogDeactive: false,
    dialogActivate: false,
    loadingAdd: false,
    loadingUpdate: false,
    loadingDeactive: false,
    loadingActivate: false,
    loadingtable: false,
    loadingDialog: false,
    headerSchool: [
      {
        text: 'Nomor',
        sortable: false,
        value: 'number',
        width: 80,
      },
      { text: 'Nama Sekolah', value: 'name', sortable: false },
      {
        text: 'Lokasi', value: 'location', sortable: false, width: 200,
      },
      {
        text: 'Kategori Sekolah', value: 'category', sortable: false, width: 150,
      },
      {
        text: 'Status', value: 'status', sortable: false, width: 120,
      },
      {
        text: 'Aksi', value: 'actions', sortable: false, width: 150,
      },
    ],
    school: [],
    editedIndex: -1,
    editedItemSchool: {
      name: '',
      image: null,
      description: '',
      location: '',
      category: '',
    },
    defaultItem: {
      name: '',
      image: null,
      description: '',
      location: '',
      category: '',
    },
    page: 1,
    pageCount: 0,
    search: '',
    nameRules: [(v) => !!v || 'Nama Sekolah Tidak Boleh Kosong'],
    locationRules: [(v) => !!v || 'Lokasi Sekolah Tidak Boleh Kosong'],
    categoryRules: [(v) => !!v || 'Kategori Sekolah Tidak Boleh Kosong'],
    imageRules: [
      (v) => !!v || 'Gambar Sekolah Tidak Boleh Kosong',
      (v) => !v || v.size < 1000000 || 'Gambar Sekolah Harus Kurang Dari 1MB',
    ],
    // tip tap
    extensions: [
      History,
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
    // add atribut
    entries: [],
    isLoading: false,
    searchLocation: null,
    itemCategory: [],
  }),
  computed: {
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
  components: {
    'tip-tap-vuetify': TiptapVuetify,
  },
  methods: {
    pagination() {
      this.loadingtable = true;
      this.school.splice(0, this.school.length);
      this.methodGetSchool(this.page);
    },
    searchSchool() {
      this.loadingtable = true;
      this.page = 1;
      this.school.splice(0, this.school.length);
      this.methodGetSchool(this.page);
    },
    ChangeImage(event) {
      // this.image = event;
      if (event == null) {
        this.editedItemSchool.image = null;
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editedItemSchool.image = e.target.result;
        };
        reader.readAsDataURL(event);
      }
    },
    closeAdd() {
      this.dialogAdd = false;
      this.$nextTick(() => {
        this.editedItemSchool = { ...this.defaultItem };
        this.editedIndex = -1;
        this.$refs.form.resetValidation();
        this.$refs.form.reset();
      });
    },
    saveAdd() {
      if (this.$refs.form.validate()) {
        this.loadingAdd = true;
        axios({
          baseURL: `${this.$store.state.domain}school`,
          method: 'post',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            name: this.editedItemSchool.name,
            photo: this.editedItemSchool.image,
            description: this.editedItemSchool.description,
            location: this.editedItemSchool.location,
            category: this.editedItemSchool.category,
          },
        })
          .then((response) => {
            if (
              response.data.data.message
              === 'School Data Is Successfully Created'
            ) {
              this.hasSaved = true;
              this.status = true;
              this.message = 'data berhasil disimpan';
              this.icon = '$success';
              this.loadingtable = true;
              this.page = 1;
              this.search = '';
              if (this.school.length > 0) {
                this.school.splice(0, this.school.length);
              }
              this.methodGetSchool(1);
              this.closeAdd();
            } else {
              this.hasSaved = true;
              this.status = false;
              this.message = 'data tidak berhasil disimpan';
              this.icon = '$warning';
            }
          })
          .catch(() => {
            this.hasSaved = true;
            this.status = false;
            this.message = 'server mengalami error';
            this.icon = '$warning';
          })
          .finally(() => {
            this.loadingAdd = false;
          });
      }
    },
    openDialogUpdate(item) {
      this.editedIndex = this.school.indexOf(item);
      // this.editedItemSchool = { ...item };
      this.dialogUpdate = true;
      this.loadingDialog = true;
      Promise.all(
        [
          axios({
            baseURL: `${this.$store.state.domain}school/${this.school[this.editedIndex].id}`,
            method: 'get',
            headers: {
              'x-api-key': this.$store.state.apiKey,
              Authorization: `Bearer ${this.$cookies.get('token')}`,
            },
          }),
          axios({
            baseURL: `${this.$store.state.domain}school/stream/${this.school[this.editedIndex].id}`,
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
          this.editedItemSchool.name = item.name;
          this.editedItemSchool.description = response[0].data.data.school[0].description;
          this.editedItemSchool.location = response[0].data.data.school[0].location;
          this.editedItemSchool.category = item.category;
          const reader = new FileReader();
          reader.onload = (e) => {
            this.editedItemSchool.image = e.target.result;
          };
          reader.readAsDataURL(response[1].data);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        })
        .finally(() => {
          this.loadingDialog = false;
        });
    },
    saveUpdate() {
      if (this.$refs.form.validate()) {
        this.loadingUpdate = true;
        axios({
          baseURL: `${this.$store.state.domain}school/${
            this.school[this.editedIndex].id
          }`,
          method: 'patch',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            name: this.editedItemSchool.name,
            photo: this.editedItemSchool.image,
            description: this.editedItemSchool.description,
            location: this.editedItemSchool.location,
            category: this.editedItemSchool.category,
          },
        })
          .then((response) => {
            if (
              response.data.data.message
              === 'Data School Is Successfully Updated'
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
            if (this.school.length > 0) {
              this.school.splice(0, this.school.length);
            }
            this.methodGetSchool(1);
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
        this.editedItemSchool = { ...this.defaultItem };
        this.editedIndex = -1;
        this.$refs.form.resetValidation();
        this.$refs.form.reset();
      });
    },
    openDialogDeactivate(item) {
      this.editedIndex = this.school.indexOf(item);
      this.dialogDeactive = true;
    },
    saveDeactivated() {
      this.loadingDeactive = true;
      axios({
        baseURL: `${this.$store.state.domain}school/hidden/${
          this.school[this.editedIndex].id
        }`,
        method: 'patch',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          Authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          if (
            response.data.data.message === 'Data School Is Successfully Hide'
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
          if (this.school.length > 0) {
            this.school.splice(0, this.school.length);
          }
          this.methodGetSchool(1);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        })
        .finally(() => {
          this.loadingDeactive = false;
          this.dialogDeactive = false;
        });
    },
    openDialogActivate(item) {
      this.editedIndex = this.school.indexOf(item);
      this.dialogActivate = true;
    },
    saveActivate() {
      this.loadingActivate = true;
      axios({
        baseURL: `${this.$store.state.domain}school/show/${
          this.school[this.editedIndex].id
        }`,
        method: 'patch',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          Authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          if (
            response.data.data.message === 'Data School Is Successfully Show'
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
          if (this.school.length > 0) {
            this.school.splice(0, this.school.length);
          }
          this.methodGetSchool(1);
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
    capitalizeEachWord(str) {
      return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
      );
    },

    // method universal
    methodGetSchool(page) {
      const header = {
        'x-api-key': this.$store.state.apiKey,
        Authorization: `Bearer ${this.$cookies.get('token')}`,
      };
      if (this.search !== '') {
        header.keyword = this.search;
      }
      axios({
        baseURL: `${this.$store.state.domain}school/pagination-all/${page}`,
        method: 'get',
        headers: header,
      })
        .then((response) => {
          if (response.data.data.school.length > 0) {
            const modulo = response.data.data.total % 10;
            if (modulo === 0) {
              this.pageCount = response.data.data.total / 10;
            } else {
              this.pageCount = (response.data.data.total - modulo) / 10 + 1;
            }
            let counter = (page - 1) * 10;
            let nameStatus = '';
            response.data.data.school.forEach((i) => {
              counter += 1;
              if (i.status === '0') {
                nameStatus = 'Tidak Ditampilkan';
              } else {
                nameStatus = 'Ditampilkan';
              }
              this.school.push({
                id: i.id,
                number: counter,
                name: i.name,
                image: i.image,
                status: nameStatus,
                location: i.location,
                description: i.description,
                category: i.category,
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
          this.loadingtable = false;
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
        baseURL: `${this.$store.state.domain}school/pagination-all/1`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          Authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          if (response.data.data.school.length > 0) {
            const modulo = response.data.data.total % 10;
            if (modulo === 0) {
              this.pageCount = response.data.data.total / 10;
            } else {
              this.pageCount = (response.data.data.total - modulo) / 10 + 1;
            }
            let counter = 0;
            let nameStatus = '';
            response.data.data.school.forEach((i) => {
              counter += 1;
              if (i.status === '0') {
                nameStatus = 'Tidak Ditampilkan';
              } else {
                nameStatus = 'Ditampilkan';
              }
              this.school.push({
                id: i.id,
                number: counter,
                name: i.name,
                status: nameStatus,
                location: i.location,
                category: i.category,
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
    this.itemCategory = [...this.$store.state.categorySchool];
  },
  beforeDestroy() {
    this.items = null;
    this.dialogAdd = null;
    this.headerSchool = null;
    this.school = null;
    this.editedIndex = null;
    this.editedItemSchool = null;
    this.defaultItem = null;
    this.page = null;
    this.pageCount = null;
    this.search = null;
    this.nameRules = null;
    this.locationRules = null;
    this.imageRules = null;

    delete this.items;
    delete this.dialogAdd;
    delete this.headerSchool;
    delete this.school;
    delete this.editedIndex;
    delete this.editedItemSchool;
    delete this.defaultItem;
    delete this.page;
    delete this.pageCount;
    delete this.search;
    delete this.nameRules;
    delete this.locationRules;
    delete this.imageRules;
  },
};
</script>

<style scoped>
.preview-img {
  max-width: 300px;
  max-height: 200px;
}
.size-max {
  width: 100vw;
  max-width: 1044px;
}
div >>> ul > li,
div >>> ol > li {
  line-height: 25px !important;
}
div >>> li > p {
  margin-bottom: 0px !important;
  margin-top: 0px !important;
}
div >>> li {
  margin-bottom: 0px;
}
div >>> li > ol,
div >>> li > ul {
  margin: 0px;
}
div >>> p,
div >>> h1,
div >>> h2,
div >>> h3 {
  margin-top: 0px !important;
  margin-bottom: 3px !important;
}
</style>
