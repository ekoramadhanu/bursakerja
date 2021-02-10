<template>
  <div>
    <v-main>
      <v-container class="d-flex flex-column justify-center size-max">
        <v-data-table
          :headers="headerJobVacancy"
          :items="jobVacancy"
          class="elevation-3 mt-3"
          hide-default-footer
          :loading="loadingTable"
          v-if="!skeleton"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <div class="d-flex">
                  <p class="ma-0 hidden-xs-only">Lowongan Kerja</p>
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
                    <v-icon class="mr-2" size="15">$add</v-icon>
                    <p class="ma-0">tambah</p>
                  </v-btn>
                </template>
                <v-card>
                  <v-toolbar class="primary">
                    <div class="size-max mx-auto d-flex">
                      <v-btn icon @click="closeAdd()">
                        <v-icon class="white--text">mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title class="text-capitalize white--text my-auto ml-1">
                        Tambah Lowongan
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn elevation="0" @click="saveAdd()" color="white">
                        <v-progress-circular
                          indeterminate
                          color="primary"
                          v-if="loadingAdd"
                        />
                        <p class="ma-0 primary--text" v-if="!loadingAdd">
                          simpan
                        </p>
                      </v-btn>

                    </div>
                  </v-toolbar>

                  <v-card-text class="px-0 py-1 mx-auto size-max">
                    <v-form ref="form" lazy-validation>
                      <p class="mb-0 black--text text-capitalize">
                        <span class="font-family">nama lowongan</span>
                        <span class="ml-1 error--text"> * </span>
                      </p>
                      <v-text-field
                        v-model="editedItemJobVacancy.name"
                        :rules="nameRules"
                        label="Nama lowongan"
                        required
                        single-line
                        dense
                        outlined
                        class="font-family"
                      />
                      <v-row>
                        <v-col
                          cols="12"
                          xl="6"
                          lg="6"
                          md="6"
                          sm="12"
                          xs="12"
                          class="py-0"
                        >
                          <p class="mb-0 black--text text-capitalize">
                            <span class="font-family">minimal akademik</span>
                            <span class="ml-1 error--text"> * </span>
                          </p>
                          <v-select
                            v-model="editedItemJobVacancy.academic"
                            :items="itemSchool"
                            item-text="name"
                            item-value="name"
                            label="Minimal Pendidikan"
                            :rules="educationRules"
                            single-line
                            required
                            dense
                            outlined
                            class="font-family"
                          ></v-select>
                        </v-col>
                        <v-col
                          cols="12"
                          xl="6"
                          lg="6"
                          md="6"
                          sm="12"
                          xs="12"
                          class="py-0"
                        >
                          <p class="mb-0 black--text text-capitalize">
                            <span class="font-family">tipe pekerjaan</span>
                            <span class="ml-1 error--text"> * </span>
                          </p>
                          <v-select
                            v-model="editedItemJobVacancy.typeJob"
                            :items="itemTypeJob"
                            item-text="name"
                            item-value="name"
                            label="Tipe Pekerjaan"
                            :rules="typeJobRules"
                            required
                            single-line
                            dense
                            outlined
                            class="font-family"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <p class="mb-0 black--text text-capitalize">
                        <span class="font-family">silahkan isi pejelasan</span>
                        <span class="ml-1 error--text"> * </span>
                      </p>
                      <tip-tap-vuetify
                        v-model="editedItemJobVacancy.description"
                        :extensions="extensions"
                        :card-props="{
                          height: '300',
                          style: 'overflow: auto;',
                        }"
                      />
                      <p class="mb-0 black--text">
                        <span class="font-family">
                          Unggah Gambar Lowongan Kerja (Maks 1 MB) 672 x 672 JPG
                          /PNG
                        </span>
                        <span class="ml-1 error--text"> * </span>
                      </p>
                      <v-file-input
                        label="Unggah Gambar Lowongan Kerja (Maks 1 MB) 672 x 672"
                        accept="image/png, image/jpeg, image/bmp"
                        ref="fileInput"
                        enctype="multipart/form-data"
                        :rules="
                          editedItemJobVacancy.image !== null ? [] : imageRules
                        "
                        @change="ChangeImage"
                        required
                        single-line
                        dense
                        outlined
                        class="font-family"
                      ></v-file-input>
                      <img
                        :src="editedItemJobVacancy.image"
                        v-if="editedItemJobVacancy.image != null"
                        class="preview-img"
                        contain
                        aspect-ratio="1.7"
                      />
                      <br />
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-toolbar>
            <v-text-field
              v-model="search"
              append-icon="$search"
              label="Pencarian Judul lowongan kerja"
              class="px-5 font-family"
              single-line
              hide-details
              @click:append="searchjobVacancy()"
              outlined
              dense
            />
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  elevation="0"
                  @click="openDialogUpdate(item)"
                  dark
                  small
                  color="orange"
                  class="mr-2"
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>$contentEdit</v-icon>
                </v-btn>
              </template>
              <span class="font-family text-capitalize">ubah data lowongan</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :to="`/application-job/${item.id}`"
                  dark
                  small
                  color="primary"
                  elevation="0"
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>$contentSetting</v-icon>
                </v-btn>
              </template>
              <span class="font-family text-capitalize">lihat lowongan</span>
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
      <v-dialog
        v-model="dialogUpdate"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar class="primary">
            <div class="size-max mx-auto d-flex">
              <v-btn icon @click="closeUpdate()">
                <v-icon class="white--text">mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title class="text-capitalize white--text my-auto ml-1">
                ubah lowongan
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn elevation="0" @click="saveUpdate()" color="white">
                <v-progress-circular
                  indeterminate
                  color="primary"
                  v-if="loadingUpdate"
                />
                <p class="ma-0 primary--text" v-if="!loadingUpdate">simpan</p>
              </v-btn>
            </div>
          </v-toolbar>

          <v-card-text class="px-0 py-1 mx-auto size-max">
            <v-form ref="form" lazy-validation v-if="!loadingDialog">
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family">nama lowongan</span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <v-text-field
                v-model="editedItemJobVacancy.name"
                :rules="nameRules"
                label="Nama lowongan"
                required
                single-line
                dense
                outlined
                class="font-family"
              />
              <v-row>
                <v-col
                  cols="12"
                  xl="6"
                  lg="6"
                  md="6"
                  sm="12"
                  xs="12"
                  class="py-0"
                >
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family">minimal akademik</span>
                    <span class="ml-1 error--text"> * </span>
                  </p>
                  <v-select
                    v-model="editedItemJobVacancy.academic"
                    :items="itemSchool"
                    item-text="name"
                    item-value="name"
                    label="Minimal Pendidikan"
                    :rules="educationRules"
                    single-line
                    required
                    dense
                    outlined
                    class="font-family"
                  ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  xl="6"
                  lg="6"
                  md="6"
                  sm="12"
                  xs="12"
                  class="py-0"
                >
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family">tipe pekerjaan</span>
                    <span class="ml-1 error--text"> * </span>
                  </p>
                  <v-select
                    v-model="editedItemJobVacancy.typeJob"
                    :items="itemTypeJob"
                    item-text="name"
                    item-value="name"
                    label="Tipe Pekerjaan"
                    :rules="typeJobRules"
                    required
                    single-line
                    dense
                    outlined
                    class="font-family"
                  ></v-select>
                </v-col>
              </v-row>
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family">silahkan isi pejelasan</span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <tip-tap-vuetify
                v-model="editedItemJobVacancy.description"
                :extensions="extensions"
                :card-props="{
                  height: '300',
                  style: 'overflow: auto;',
                }"
              />
              <p class="mb-0 black--text">
                <span class="font-family">
                  Unggah Gambar Lowongan Kerja (Maks 1 MB) 672 x 672 JPG /PNG
                </span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <v-file-input
                label="Unggah Gambar Lowongan Kerja (Maks 1 MB) 672 x 672"
                accept="image/png, image/jpeg, image/bmp"
                ref="fileInput"
                enctype="multipart/form-data"
                :rules="editedItemJobVacancy.image !== null ? [] : imageRules"
                @change="ChangeImage"
                required
                single-line
                dense
                outlined
                class="font-family"
              ></v-file-input>
              <img
                :src="editedItemJobVacancy.image"
                v-if="editedItemJobVacancy.image != null"
                class="preview-img"
                contain
                aspect-ratio="1.7"
              />
              <br />
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
        text: 'lowongan kerja',
        disabled: true,
      },
    ],
    dialogAdd: false,
    dialogUpdate: false,
    loadingAdd: false,
    loadingUpdate: false,
    loadingTable: false,
    loadingDialog: false,
    headerJobVacancy: [
      {
        text: 'Nomor',
        sortable: false,
        value: 'number',
      },
      { text: 'Nama Lowongan', value: 'name', sortable: false },
      { text: 'Perusahaan', value: 'company', sortable: false },
      { text: 'Aksi', value: 'actions', sortable: false },
    ],
    jobVacancy: [],
    editedIndex: -1,
    editedItemJobVacancy: {
      name: '',
      description: '<p>Silahkan Isi Pejelasan</p>',
      experience: null,
      image: null,
      academic: '',
      typeJob: '',
    },
    defaultItem: {
      name: '',
      description: '<p>Silahkan Isi Pejelasan</p>',
      experience: null,
      image: null,
      academic: '',
      typeJob: '',
    },
    nameRules: [(v) => !!v || 'Nama Lowongan Tidak Boleh Kosong'],
    salaryRules: [(v) => !!v || 'Gaji  Tidak Boleh Kosong'],
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
    page: 1,
    pageCount: 3,
    search: '',
    hasSaved: false,
    status: null,
    icon: '',
    message: '',
    skeleton: true,
    educationRules: [(v) => !!v || 'Minimal Pendidikan Tidak Boleh Kosong'],
    itemSchool: '',
    typeJobRules: [(v) => !!v || 'Tipe Pekerjaan Tidak Boleh Kosong'],
    itemTypeJob: [
      { name: 'Purna Waktu' },
      { name: 'Paruh Waktu' },
      { name: 'Pekerja Lepas' },
      { name: 'Kontrak' },
    ],
    imageRules: [
      (v) => !!v || 'Gambar Lowongan Kerja Tidak Boleh Kosong',
      (v) => !v || v.size < 1000000 || 'Gambar Lowongan Kerja Harus Kurang Dari 1MB',
    ],
  }),
  components: {
    'tip-tap-vuetify': TiptapVuetify,
  },
  methods: {
    pagination() {
      this.loadingTable = true;
      this.jobVacancy.splice(0, this.jobVacancy.length);
      this.methodGetJobVacancy(this.page);
    },
    searchjobVacancy() {
      this.loadingTable = true;
      this.page = 1;
      this.jobVacancy.splice(0, this.jobVacancy.length);
      this.methodGetJobVacancy(this.page);
    },
    ChangeImage(event) {
      // this.image = event;
      if (event == null) {
        this.editedItemJobVacancy.image = null;
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editedItemJobVacancy.image = e.target.result;
        };
        reader.readAsDataURL(event);
      }
    },
    closeAdd() {
      this.dialogAdd = false;
      this.$nextTick(() => {
        this.editedItemJobVacancy = { ...this.defaultItem };
        this.editedIndex = -1;
        this.$refs.form.reset();
      });
    },
    saveAdd() {
      if (this.$refs.form.validate()) {
        this.loadingAdd = true;
        axios({
          baseURL: `${this.$store.state.domain}job-vacancy`,
          method: 'post',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            name: this.editedItemJobVacancy.name,
            description: this.editedItemJobVacancy.description,
            experience: this.editedItemJobVacancy.experience,
            photo: this.editedItemJobVacancy.image,
            academic: this.editedItemJobVacancy.academic,
            typeJob: this.editedItemJobVacancy.typeJob,
          },
        })
          .then((response) => {
            if (
              response.data.data.message
              === 'Data Job Vacancy Is Successfully Create'
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
            if (this.jobVacancy.length > 0) {
              this.jobVacancy.splice(0, this.jobVacancy.length);
            }
            this.methodGetJobVacancy(1);
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
      this.editedIndex = this.jobVacancy.indexOf(item);
      this.dialogUpdate = true;
      this.loadingDialog = true;
      Promise.all(
        [
          axios({
            baseURL: `${this.$store.state.domain}job-vacancy/${item.id}`,
            method: 'get',
            headers: {
              'x-api-key': this.$store.state.apiKey,
              Authorization: `Bearer ${this.$cookies.get('token')}`,
            },
          }),
          axios({
            baseURL: `${this.$store.state.domain}job-vacancy/stream/${item.id}`,
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
          this.editedItemJobVacancy.name = item.name;
          this.editedItemJobVacancy.description = response[0].data.data.jobVacancy[0].description;
          this.editedItemJobVacancy.academic = response[0].data.data.jobVacancy[0].academic;
          this.editedItemJobVacancy.typeJob = response[0].data.data.jobVacancy[0].typeJob;
          const reader = new FileReader();
          reader.onload = (e) => {
            this.editedItemJobVacancy.image = e.target.result;
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
          baseURL: `${this.$store.state.domain}job-vacancy/${
            this.jobVacancy[this.editedIndex].id
          }`,
          method: 'patch',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            name: this.editedItemJobVacancy.name,
            description: this.editedItemJobVacancy.description,
            photo: this.editedItemJobVacancy.image,
            typeJob: this.editedItemJobVacancy.typeJob,
            academic: this.editedItemJobVacancy.academic,
          },
        })
          .then((response) => {
            if (
              response.data.data.message
              === 'Data Job Vacancy Is Successfully Update'
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
            if (this.jobVacancy.length > 0) {
              this.jobVacancy.splice(0, this.jobVacancy.length);
            }
            this.methodGetJobVacancy(1);
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
        this.editedItemJobVacancy = { ...this.defaultItem };
        this.editedIndex = -1;
        this.$refs.form.reset();
      });
    },
    // method universal
    methodGetJobVacancy(page) {
      const header = {
        'x-api-key': this.$store.state.apiKey,
        Authorization: `Bearer ${this.$cookies.get('token')}`,
      };
      if (this.search !== '') {
        header.keyword = this.search;
      }

      axios({
        baseURL: `${this.$store.state.domain}job-vacancy/company-pagination/${page}`,
        method: 'get',
        headers: header,
      })
        .then((response) => {
          if (response.data.data.jobVacancy.length > 0) {
            const modulo = response.data.data.total % 10;
            if (modulo === 0) {
              this.pageCount = response.data.data.total / 10;
            } else {
              this.pageCount = (response.data.data.total - modulo) / 10 + 1;
            }
            let counter = (page - 1) * 10;
            response.data.data.jobVacancy.forEach((i) => {
              counter += 1;
              this.jobVacancy.push({
                id: i.id,
                number: counter,
                name: i.name,
                company: i.nameCompany,
                academic: i.academic,
                image: i.jobVacancyImage,
                typeJob: i.typeJob,
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
          this.loadingTable = false;
        });
    },
  },
  beforeCreate() {
    if (this.$store.state.uploadData) {
      if (this.$store.state.role === 'Pencaker') {
        this.$router.push('/resume-job-seeker');
      } else {
        this.$router.push('/data-umkm');
      }
    } else if (this.$store.state.role === 'Perusahaan') {
      axios({
        baseURL: `${this.$store.state.domain}job-vacancy/company-pagination/1`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          Authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          if (response.data.data.jobVacancy.length > 0) {
            const modulo = response.data.data.total % 10;
            if (modulo === 0) {
              this.pageCount = response.data.data.total / 10;
            } else {
              this.pageCount = (response.data.data.total - modulo) / 10 + 1;
            }
            let counter = 0;
            response.data.data.jobVacancy.forEach((i) => {
              counter += 1;
              this.jobVacancy.push({
                id: i.id,
                number: counter,
                name: i.name,
                company: i.nameCompany,
                description: i.description,
                image: i.jobVacancyImage,
                academic: i.academic,
                typeJob: i.typeJob,
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
    } else {
      this.$router.push('/access-block');
    }
  },
  created() {
    this.itemSchool = [...this.$store.state.itemsSchool];
    this.itemSchool.push({
      name: 'Semua Jenjang',
    });
  },
  beforeDestroy() {
    this.items = null;
    this.dialogAdd = null;
    this.headerArticle = null;
    this.article = null;
    this.editedIndex = null;
    this.editedItemArticle = null;
    this.defaultItem = null;
    this.page = null;
    this.pageCount = null;
    this.search = null;
    this.userRead = null;
    this.titleRules = null;
    this.userRules = null;
    this.imageRules = null;

    delete this.items;
    delete this.dialogAdd;
    delete this.headerArticle;
    delete this.article;
    delete this.editedIndex;
    delete this.editedItemArticle;
    delete this.defaultItem;
    delete this.page;
    delete this.pageCount;
    delete this.search;
    delete this.userRead;
    delete this.titleRules;
    delete this.userRules;
    delete this.imageRules;
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
div >>> ul {
  line-height: 18px !important;
}
div >>> ol {
  line-height: 18px !important;
}
div >>> li > p {
  margin: 3px !important;
}
</style>
