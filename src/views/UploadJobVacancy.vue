<template>
  <div>
    <v-main>
      <v-container class="d-flex flex-column justify-center size-max">
        <v-breadcrumbs
          :items="items"
          class="text-capitalize pa-2"
        ></v-breadcrumbs>
        <v-card elevation="3" class="pa-4">
          <div class="d-flex">
            <v-icon class="mr-2 warning--text" size="25">$warning</v-icon>
            <p class="text-capitalize ma-0 text-subtitle-1">
              hati hati data akan disimpan ke database
            </p>
          </div>
        </v-card>
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
                  <v-icon class="primary--text mr-2">$jobSeeker</v-icon>
                  <p class="ma-0 text-uppercase primary--text hidden-xs-only">
                    lowongan kerja
                  </p>
                </div>
              </v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
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
                    <p class="ma-0 text-capitalize white--text">tambah</p>
                  </v-btn>
                </template>
                <v-card>
                  <v-toolbar class="primary">
                    <v-btn icon @click="closeAdd()">
                      <v-icon class="white--text">$close</v-icon>
                    </v-btn>
                    <v-toolbar-title class="text-capitalize white--text">
                      silahkan isi data unggah lowongan
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn text @click="saveAdd()">
                      <v-progress-circular
                        indeterminate
                        color="white"
                        v-if="loadingAdd"
                      />
                      <p
                        class="ma-0 text-capitalize white--text"
                        v-if="!loadingAdd"
                      >
                        simpan
                      </p>
                    </v-btn>
                  </v-toolbar>

                  <v-card-text>
                    <v-form ref="form" lazy-validation>
                      <v-text-field
                        v-model="editedItemJobVacancy.name"
                        :rules="nameRules"
                        prepend-icon="$jobSeeker"
                        label="Nama lowongan"
                        required
                      />
                      <v-row>
                        <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                          <v-select
                            v-model="editedItemJobVacancy.academic"
                            :items="itemSchool"
                            item-text="name"
                            item-value="name"
                            label="Tipe Pekerjaan"
                            prepend-icon="$job"
                            :rules="educationRules"
                            single-line
                            required
                          ></v-select>
                        </v-col>
                        <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                          <v-select
                            v-model="editedItemJobVacancy.typeJob"
                            :items="itemTypeJob"
                            item-text="name"
                            item-value="name"
                            label="Tipe Pekerjaan"
                            prepend-icon="$school"
                            :rules="typeJobRules"
                            single-line
                            required
                          ></v-select>
                        </v-col>
                      </v-row>
                      <tip-tap-vuetify
                        v-model="editedItemJobVacancy.description"
                        :extensions="extensions"
                        :card-props="{ height: '300', style: 'overflow: auto;' }"
                      />
                      <br>
                      <tip-tap-vuetify
                        v-model="editedItemJobVacancy.experience"
                        :extensions="extensions"
                        :card-props="{ height: '300', style: 'overflow: auto;' }"
                      />
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-toolbar>
            <v-text-field
              v-model="search"
              append-icon="$search"
              label="Pencarian Judul lowongan kerja"
              class="px-5"
              single-line
              hide-details
              @click:append="searchjobVacancy()"
            />
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn @click="openDialogUpdate(item)" class="warning--text" icon>
              <v-icon> mdi-pencil </v-icon>
            </v-btn>
            <v-btn :to="`/application-job/${item.id}`" class="success--text" icon>
              <v-icon> $detail </v-icon>
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
      <v-dialog
        v-model="dialogUpdate"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar class="primary">
            <v-btn icon @click="closeUpdate()">
              <v-icon class="white--text">$close</v-icon>
            </v-btn>
            <v-toolbar-title class="text-capitalize white--text">
              silahkan ubah data unggah lowongan
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text @click="saveUpdate()">
              <v-progress-circular
                indeterminate
                color="white"
                v-if="loadingUpdate"
              />
              <p class="ma-0 text-capitalize white--text" v-if="!loadingUpdate">
                simpan
              </p>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="editedItemJobVacancy.name"
                :rules="nameRules"
                prepend-icon="$jobSeeker"
                label="Nama lowongan"
                required
              />
              <tip-tap-vuetify
                v-model="editedItemJobVacancy.description"
                :extensions="extensions"
                :card-props="{ height: '300', style: 'overflow: auto;' }"
              />
              <br>
              <tip-tap-vuetify
                v-model="editedItemJobVacancy.experience"
                :extensions="extensions"
                :card-props="{ height: '300', style: 'overflow: auto;' }"
              />
            </v-form>
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
    headerJobVacancy: [
      {
        text: 'Nomor',
        sortable: false,
        value: 'number',
      },
      { text: 'Nama Lowongan', value: 'name', sortable: false },
      { text: 'Perusahaan', value: 'company', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    jobVacancy: [],
    editedIndex: -1,
    editedItemJobVacancy: {
      name: '',
      description: '<p>Silahkan Isi Pejelasan</p>',
      experience: '<p>Silahkan Isi Pengalaman</p>',
      academic: '',
      typeJob: '',
    },
    defaultItem: {
      name: '',
      description: '<p>Silahkan Isi Pejelasan</p>',
      experience: '<p>Silahkan Isi Pengalaman</p>',
      academic: '',
      typeJob: '',
    },
    nameRules: [(v) => !!v || 'Nama Perkerjaan Tidak Boleh Kosong'],
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
    educationRules: [(v) => !!v || 'Tingkat Pendidikan Tidak Boleh Kosong'],
    itemSchool: '',
    typeJobRules: [(v) => !!v || 'Tingkat Pendidikan Tidak Boleh Kosong'],
    itemTypeJob: [
      { name: 'Purna Waktu' },
      { name: 'Paruh Waktu' },
      { name: 'Pekerja Lepas' },
      { name: 'Kontrak' },
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
        this.editedItemArticle.image = null;
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editedItemArticle.image = e.target.result;
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
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            name: this.editedItemJobVacancy.name,
            description: this.editedItemJobVacancy.description,
            experience: this.editedItemJobVacancy.experience,
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
        this.closeAdd();
      }
    },
    openDialogUpdate(item) {
      this.editedIndex = this.jobVacancy.indexOf(item);
      this.editedItemJobVacancy.name = item.name;
      this.editedItemJobVacancy.description = item.description;
      this.editedItemJobVacancy.experience = item.experience;
      this.dialogUpdate = true;
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
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            name: this.editedItemJobVacancy.name,
            description: this.editedItemJobVacancy.description,
            experience: this.editedItemJobVacancy.experience,
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
      if (this.search === '') {
        axios({
          baseURL: `${this.$store.state.domain}job-vacancy/company-pagination/${page}`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
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
              let counter = (page - 1) * 10;
              response.data.data.jobVacancy.forEach((i) => {
                counter += 1;
                this.jobVacancy.push({
                  id: i.id,
                  number: counter,
                  name: i.name,
                  company: i.nameCompany,
                  description: i.description,
                  experience: i.experience,
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
      } else {
        axios({
          baseURL: `${this.$store.state.domain}job-vacancy/company-search/${this.search}/${page}`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
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
              let counter = (page - 1) * 10;
              response.data.data.jobVacancy.forEach((i) => {
                counter += 1;
                this.jobVacancy.push({
                  id: i.id,
                  number: counter,
                  name: i.name,
                  company: i.nameCompany,
                  description: i.description,
                  experience: i.experience,
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
      }
    },
  },
  beforeCreate() {
    if (this.$store.state.role === 'Perusahaan') {
      axios({
        baseURL: `${this.$store.state.domain}job-vacancy/company-pagination/1`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          if (response.data.data.jobVacancy.length > 0) {
            // eslint-disable-next-line no-console
            console.log(response.data);
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
                experience: i.experience,
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
.size-max{
  max-width: 1100px;
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
