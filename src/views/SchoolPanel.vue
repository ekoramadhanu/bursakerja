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
                    <v-btn icon @click="closeAdd()">
                      <v-icon class="white--text">mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title class="text-capitalize white--text">
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
                  </v-toolbar>

                  <v-card-text class="size-max mx-auto">
                    <v-form ref="form" lazy-validation>
                      <v-text-field
                        v-model="editedItemSchool.name"
                        :rules="nameRules"
                        label="Nama Sekolah"
                        required
                      />
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
                      />
                      <v-file-input
                        label="Unggah Gambar Sekolah (Maks 1 MB)"
                        accept="image/png, image/jpeg, image/bmp"
                        required
                        ref="fileInput"
                        enctype="multipart/form-data"
                        :rules="imageRules"
                        @change="ChangeImage"
                      ></v-file-input>
                      <img
                        :src="editedItemSchool.image"
                        v-if="editedItemSchool.image != null"
                        class="preview-img"
                        contain
                        aspect-ratio="1.7"
                      />
                      <tip-tap-vuetify
                        v-model="editedItemSchool.description"
                        :extensions="extensions"
                        :card-props="{
                          height: '300',
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
                    <p
                      class="mb-0 mt-6 text-h5 font-weight-bold"
                      v-if="!skeleton"
                    >
                      <span class="font-family">
                        {{ editedItemSchool.name }}
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
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-toolbar>
            <v-text-field
              v-model="search"
              append-icon="$search"
              label="Pencarian Sekolah"
              class="px-5"
              single-line
              hide-details
              @click:append="searchSchool()"
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
              class="mr-4"
              dark
              color="orange"
              x-small
              elevation="0"
            >
              ubah data
            </v-btn>
            <v-btn
              @click="openDialogDeactivate(item)"
              dark
              color="error"
              x-small
              elevation="0"
              v-if="item.status === 'Ditampilkan'"
            >
              nonaktifkan
            </v-btn>
            <v-btn
              @click="openDialogActivate(item)"
              dark
              color="success"
              x-small
              elevation="0"
              v-else
            >
              aktifkan
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
            <v-btn icon @click="closeUpdate()">
              <v-icon class="white--text">mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title class="text-capitalize white--text">
              <span class="font-family">
                Edit data sekolah
              </span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="saveUpdate()" elevation="0" color="white">
              <v-progress-circular
                indeterminate
                color="primary"
                v-if="loadingUpdate"
              />
              <p class="ma-0 primary--text font-weight-bold" v-if="!loadingUpdate">
                <span class="font-family">
                  simpan
                </span>
              </p>
            </v-btn>
          </v-toolbar>

          <v-card-text class="size-max mx-auto">
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="editedItemSchool.name"
                :rules="nameRules"
                label="Nama Sekolah"
                required
              />
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
                :hint="`data disimpan: ${editedItemSchool.location}`"
                :rules="locationRules"
              />
              <v-file-input
                label="Unggah Gambar Sekolah (Maks 1 MB)"
                accept="image/png, image/jpeg, image/bmp"
                required
                ref="fileInput"
                enctype="multipart/form-data"
                :rules="editedItemSchool.image !== null ? [] : imageRules"
                @change="ChangeImage"
              ></v-file-input>
              <img
                :src="editedItemSchool.image"
                v-if="editedItemSchool.image != null"
                class="preview-img"
                contain
                aspect-ratio="1.7"
              />
              <tip-tap-vuetify
                v-model="editedItemSchool.description"
                :extensions="extensions"
                :card-props="{ height: '300', style: 'overflow: auto;' }"
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
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from 'tiptap-vuetify';
import axios from 'axios';

export default {
  data: () => ({
    items: [
      {
        text: 'sekolah unggulan',
        disabled: true,
      },
    ],
    dialogAdd: false,
    dialogUpdate: false,
    dialogDeactive: false,
    dialogActivate: false,
    loadingAdd: false,
    loadingUpdate: false,
    loadingDeactive: false,
    loadingActivate: false,
    loadingtable: false,
    headerSchool: [
      {
        text: 'Nomor',
        sortable: false,
        value: 'number',
      },
      { text: 'Nama Sekolah', value: 'name', sortable: false },
      { text: 'Logo Sekolah', value: 'image', sortable: false },
      { text: 'Status', value: 'status', sortable: false },
      { text: 'Lokasi', value: 'location', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    school: [],
    editedIndex: -1,
    editedItemSchool: {
      name: '',
      image: null,
      description: '<p>Silahkan Isi Pejelasan</p>',
      location: '',
    },
    defaultItem: {
      name: '',
      image: null,
      description: '<p>Silahkan Isi Pejelasan</p>',
      location: '',
    },
    page: 1,
    pageCount: 0,
    search: '',
    nameRules: [(v) => !!v || 'Nama Sekolah Tidak Boleh Kosong'],
    locationRules: [(v) => !!v || 'Lokasi Sekolah Tidak Boleh Kosong'],
    imageRules: [
      (v) => !!v || 'Gambar Sekolah Tidak Boleh Kosong',
      (v) => !v || v.size < 1000000 || 'Gambar Sekolah Harus Kurang Dari 1MB',
    ],
    // tip tap
    extensions: [
      History,
      Blockquote,
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
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            name: this.editedItemSchool.name,
            photo: this.editedItemSchool.image,
            description: this.editedItemSchool.description,
            location: this.editedItemSchool.location,
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
            this.loadingAdd = false;
            this.closeAdd();
          });
      }
    },
    openDialogUpdate(item) {
      this.editedIndex = this.school.indexOf(item);
      this.editedItemSchool = { ...item };
      this.dialogUpdate = true;
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
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            name: this.editedItemSchool.name,
            photo: this.editedItemSchool.image,
            description: this.editedItemSchool.description,
            location: this.editedItemSchool.location,
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
          authorization: `Bearer ${this.$cookies.get('token')}`,
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
          authorization: `Bearer ${this.$cookies.get('token')}`,
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
      if (this.search === '') {
        axios({
          baseURL: `${this.$store.state.domain}school/pagination-all/${page}`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
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
      } else {
        axios({
          baseURL: `${this.$store.state.domain}school/search-all/${this.search}/${page}`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
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
          authorization: `Bearer ${this.$cookies.get('token')}`,
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
                image: i.image,
                status: nameStatus,
                location: i.location,
                description: i.description,
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
  max-width: 1200px;
}
</style>
