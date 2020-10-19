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
          v-if="!skeleton"
          :loading="loadingTable"
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
            <v-btn
              @click="openDialogDecline(item)"
              class="error--text"
              icon
            >
              <v-icon> $times </v-icon>
            </v-btn>
            <v-btn
              @click="openDialogAcpprove(item)"
              class="success--text"
              icon
            >
              <v-icon> $check </v-icon>
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
      <v-dialog v-model="dialogApprove" persistent max-width="550">
        <v-card>
          <v-card-title class="headline primary white--text text-capitalize">
            menyetujui pemasanga lowongan kerja
          </v-card-title>
          <v-card-text>
            <div class="d-flex justify-start align-center pa-2">
              <v-icon size="80" class="error--text mr-4">$warning</v-icon>
              <p class="ma-0 black--text">
                Apakah anda yakin menyetujui lowongan kerja ? Jika "iya"
                silahkan pilih tombol iya
              </p>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn elevation="3" class="text-capitalize" @click="dialogApprove = false">
              tidak
            </v-btn>
            <v-btn color="primary" @click="saveApprove()">
              <v-progress-circular
                indeterminate
                color="white"
                v-if="loadingApprove"
              />
              <p
                class="my-auto white--text text-capitalize"
                v-if="!loadingApprove"
              >
                iya
              </p>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDecline" persistent max-width="550">
        <v-card>
          <v-card-title class="headline primary white--text text-capitalize">
            membatalkan pemasangan lowongan kerja
          </v-card-title>
          <v-card-text>
            <div class="d-flex justify-start align-center pa-2">
              <v-icon size="80" class="error--text mr-4">$warning</v-icon>
              <p class="ma-0 black--text">
                Apakah anda yakin membatalkan lowongan kerja ? Jika "iya"
                silahkan pilih tombol iya
              </p>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn elevation="3" class="text-capitalize" @click="dialogDecline = false">
              tidak
            </v-btn>
            <v-btn color="primary" @click="saveDecline()">
              <v-progress-circular
                indeterminate
                color="white"
                v-if="loadingDecline"
              />
              <p
                class="my-auto white--text text-capitalize"
                v-if="!loadingDecline"
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
    items: [
      {
        text: 'lowongan kerja',
        disabled: true,
      },
    ],
    dialogAdd: false,
    dialogApprove: false,
    dialogDecline: false,
    loadingTable: false,
    loadingApprove: false,
    loadingDecline: false,
    headerJobVacancy: [
      {
        text: 'Nomor',
        sortable: false,
        value: 'number',
      },
      { text: 'Nama Lowongan', value: 'name', sortable: false },
      { text: 'Gaji', value: 'salary', sortable: false },
      { text: 'Perusahaan', value: 'company', sortable: false },
      { text: 'Status', value: 'status', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    jobVacancy: [],
    editedIndex: -1,
    page: 1,
    pageCount: 3,
    search: '',
    hasSaved: false,
    status: null,
    icon: '',
    message: '',
    skeleton: true,
  }),
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
    openDialogAcpprove(item) {
      this.editedIndex = this.jobVacancy.indexOf(item);
      this.dialogApprove = true;
    },
    saveApprove() {
      this.loadingApprove = true;
      axios({
        baseURL: `${this.$store.state.domain}job-vacancy/approve/${this.jobVacancy[this.editedIndex].id}`,
        method: 'patch',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          if (response.data.data.message === 'Job Vacancy Is Successfully Approve') {
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
        .catch((error) => {
        // eslint-disable-next-line no-console
          console.log(error);
        })
        .finally(() => {
          this.dialogApprove = false;
          this.loadingApprove = false;
        });
    },
    openDialogDecline(item) {
      this.editedIndex = this.jobVacancy.indexOf(item);
      this.dialogDecline = true;
    },
    saveDecline() {
      this.loadingDecline = true;
      axios({
        baseURL: `${this.$store.state.domain}job-vacancy/decline/${this.jobVacancy[this.editedIndex].id}`,
        method: 'patch',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          if (response.data.data.message === 'Job Vacancy Is Successfully Decline') {
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
        .catch((error) => {
        // eslint-disable-next-line no-console
          console.log(error);
        })
        .finally(() => {
          this.dialogDecline = false;
          this.loadingDecline = false;
        });
    },
    // method universal
    methodGetJobVacancy(page) {
      if (this.search === '') {
        axios({
          baseURL: `${this.$store.state.domain}job-vacancy/pagination/${page}`,
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
              let nameStatus = '';
              response.data.data.jobVacancy.forEach((i) => {
                if (i.status === '0') {
                  nameStatus = 'Menunggu Verifikasi';
                } else {
                  nameStatus = 'Sudah Disetujui';
                }
                counter += 1;
                this.jobVacancy.push({
                  id: i.id,
                  number: counter,
                  name: i.name,
                  salary: i.salary,
                  company: i.nameCompany,
                  description: i.description,
                  status: nameStatus,
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
          baseURL: `${this.$store.state.domain}job-vacancy/search/${this.search}/${page}`,
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
              let nameStatus = '';
              response.data.data.jobVacancy.forEach((i) => {
                counter += 1;
                if (i.status === '0') {
                  nameStatus = 'Menunggu Verifikasi';
                } else {
                  nameStatus = 'Sudah Disetujui';
                }
                this.jobVacancy.push({
                  id: i.id,
                  number: counter,
                  name: i.name,
                  salary: i.salary,
                  company: i.nameCompany,
                  description: i.description,
                  status: nameStatus,
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
    if (this.$store.state.role === 'Admin 1'
    || this.$store.state.role === 'Magang'
    || this.$store.state.role === 'Umum'
    || this.$store.state.role === 'Profesional'
    || this.$store.state.role === 'Informal'
    ) {
      this.$router.push('/access-block');
    } else {
      axios({
        baseURL: `${this.$store.state.domain}job-vacancy/pagination/1`,
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
            let counter = 0;
            let nameStatus = '';
            response.data.data.jobVacancy.forEach((i) => {
              counter += 1;
              if (i.status === '0') {
                nameStatus = 'Menunggu Verifikasi';
              } else {
                nameStatus = 'Sudah Disetujui';
              }
              this.jobVacancy.push({
                id: i.id,
                number: counter,
                name: i.name,
                salary: i.salary,
                company: i.nameCompany,
                description: i.description,
                status: nameStatus,
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
    }
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
.preview-img{
    max-width: 800px;
    max-height: 600px;
}
</style>
