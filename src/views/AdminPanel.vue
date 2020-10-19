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
          :headers="headerAdmin"
          :items="admin"
          class="elevation-3 mt-3"
          hide-default-footer
          v-if="!skeleton"
          :loading="loadingTable"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <div class="d-flex">
                  <v-icon class="primary--text mr-2">$admin</v-icon>
                  <p class="ma-0 text-uppercase primary--text hidden-xs-only">
                    admin bursa kerja
                  </p>
                </div>
              </v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
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
                    <p class="ma-0 white--text text-capitalize">tambah</p>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="primary">
                    <span class="headline white--text text-capitalize"
                      >menambah admin bursa kerja</span
                    >
                  </v-card-title>

                  <v-card-text>
                    <v-form ref="form" lazy-validation>
                      <v-text-field
                        v-model="editedItemAdmin.name"
                        :rules="nameRules"
                        prepend-icon="$admin"
                        label="Nama"
                        required
                      />
                      <v-text-field
                        v-model="editedItemAdmin.email"
                        :rules="emailRules"
                        prepend-icon="$email"
                        label="Alamat Email"
                        required
                      />
                      <v-select
                        v-model="editedItemAdmin.role"
                        :rules="roleRules"
                        prepend-icon="$admin"
                        no-data-text="Data Tidak Ditemukan"
                        :items="role"
                        item-text="name"
                        item-value="id"
                        label="pilih Tugas Admin"
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
                        class="my-auto text-capitalize text-white"
                        v-if="!loadingAdd"
                      >
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
              label="Pencarian Nama/Email Admin"
              class="px-5"
              single-line
              hide-details
              @click:append="searchAdmin()"
            />
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn @click="openDialogUpdate(item)" class="warning--text" icon>
              <v-icon> mdi-pencil </v-icon>
            </v-btn>
            <v-btn
              @click="openDialogDeactivate(item)"
              class="error--text"
              icon
              v-if="item.status === 'Aktif'"
            >
              <v-icon> $times </v-icon>
            </v-btn>
            <v-btn
              @click="openDialogActivate(item)"
              class="success--text"
              icon
              v-else
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
      <v-dialog v-model="dialogUpdate" max-width="500px">
        <v-card>
          <v-card-title class="primary">
            <span class="headline white--text text-capitalize"
              >mengubah admin bursa kerja</span
            >
          </v-card-title>

          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-select
                v-model="editedItemAdmin.role"
                :rules="roleRules"
                prepend-icon="$admin"
                no-data-text="Data Tidak Ditemukan"
                :items="role"
                item-text="name"
                item-value="id"
                label="pilih Tugas Admin"
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
              <p class="my-auto text-capitalize text-white" v-if="!loadingUpdate">
                simpan
              </p>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDeactivate" persistent max-width="450">
        <v-card>
          <v-card-title class="headline primary white--text text-capitalize">
            menonaktifkan akun admin
          </v-card-title>
          <v-card-text>
            <div class="d-flex justify-start align-center pa-2">
              <v-icon size="80" class="error--text mr-4">$warning</v-icon>
              <p class="ma-0 black--text">
                Apakah anda yakin menonaktifkan admin ? Jika "iya"
                silahkan pilih tombol iya
              </p>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn elevation="3" class="text-capitalize" @click="dialogDeactivate = false">
              tidak
            </v-btn>
            <v-btn color="primary" @click="saveDeactivated()">
              <v-progress-circular
                indeterminate
                color="white"
                v-if="loadingDeactivate"
              />
              <p
                class="my-auto white--text text-capitalize"
                v-if="!loadingDeactivate"
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
            mengaktifkan akun admin
          </v-card-title>
          <v-card-text>
            <div class="d-flex justify-start align-center pa-2">
              <v-icon size="80" class="error--text mr-4">$warning</v-icon>
              <p class="ma-0 black--text">
                Apakah anda yakin mengaktifkan akun admin ? Jika "iya"
                silahkan pilih tombol iya
              </p>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn elevation="3" class="text-capitalize" @click="dialogActivate = false">
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
        text: 'admin',
        disabled: true,
      },
    ],
    dialogAdd: false,
    dialogUpdate: false,
    dialogDeactivate: false,
    dialogActivate: false,
    loadingAdd: false,
    loadingUpdate: false,
    loadingDeactivate: false,
    loadingActivate: false,
    loadingTable: false,
    headerAdmin: [
      {
        text: 'Nomor',
        sortable: false,
        value: 'number',
      },
      { text: 'Nama', value: 'name', sortable: false },
      { text: 'Email', value: 'email', sortable: false },
      { text: 'Tugas', value: 'role', sortable: false },
      { text: 'Status', value: 'status', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    admin: [],
    editedIndex: -1,
    editedItemAdmin: {
      name: '',
      email: '',
      role: '',
    },
    defaultItem: {
      name: '',
      email: '',
      role: '',
    },
    page: 1,
    pageCount: 3,
    search: '',
    nameRules: [(v) => !!v || 'Nama Admin Tidak Boleh Kosong'],
    emailRules: [
      (v) => !!v || 'Alamat Email Tidak Boleh Kosong',
      (v) => /^\S*$/.test(v) || 'Alamat Email Tidak Boleh Ada Spasi',
      (v) => /.+@.+\..+/.test(v) || 'Alamat Email Tidak Valid',
    ],
    roleRules: [(v) => !!v || 'Tugas Admin Tidak Boleh Kosong'],
    role: [],
    hasSaved: false,
    status: null,
    icon: '',
    message: '',
    skeleton: true,
  }),
  methods: {
    pagination() {
      this.loadingTable = true;
      this.admin.splice(0, this.admin.length);
      this.methodGetAdmin(this.page);
    },
    searchAdmin() {
      this.loadingTable = true;
      this.page = 1;
      this.admin.splice(0, this.admin.length);
      this.methodGetAdmin(this.page);
    },
    closeAdd() {
      this.dialogAdd = false;
      this.$nextTick(() => {
        this.editedItemAdmin = { ...this.defaultItem };
        this.editedIndex = -1;
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
      });
    },
    saveAdd() {
      if (this.$refs.form.validate()) {
        this.loadingAdd = true;
        axios({
          baseURL: `${this.$store.state.domain}admin/register`,
          method: 'post',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            name: this.editedItemAdmin.name,
            email: this.editedItemAdmin.email,
            role: this.editedItemAdmin.role,
          },
        })
          .then((response) => {
            if (
              response.data.data.message
              === 'Admin Data Is Successfully Created'
            ) {
              this.hasSaved = true;
              this.status = true;
              this.message = 'data berhasil disimpan';
              this.icon = '$success';
            } else if (
              response.data.data.message === 'Email Admin Already Exist'
            ) {
              this.hasSaved = true;
              this.status = false;
              this.message = 'alamat email sudah ada';
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
            if (this.admin.length > 0) {
              this.admin.splice(0, this.admin.length);
            }
            this.methodGetAdmin(1);
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
    closeUpdate() {
      this.dialogUpdate = false;
      this.$nextTick(() => {
        this.editedItemAdmin = { ...this.defaultItem };
        this.editedIndex = -1;
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
      });
    },
    saveUpdate() {
      if (this.$refs.form.validate()) {
        this.loadingUpdate = true;
        axios({
          baseURL: `${this.$store.state.domain}admin/change-role/${
            this.admin[this.editedIndex].id
          }`,
          method: 'patch',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            role: this.editedItemAdmin.role,
          },
        })
          .then((response) => {
            if (
              response.data.data.message
              === 'Data Role Admin Is Successfully Update'
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
            if (this.admin.length > 0) {
              this.admin.splice(0, this.admin.length);
            }
            this.methodGetAdmin(1);
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
    openDialogUpdate(item) {
      this.editedIndex = this.admin.indexOf(item);
      this.editedItemAdmin.role = item.idRole;
      this.dialogUpdate = true;
    },
    openDialogDeactivate(item) {
      this.editedIndex = this.admin.indexOf(item);
      this.dialogDeactivate = true;
    },
    saveDeactivated() {
      this.loadingDeactivate = true;
      axios({
        baseURL: `${this.$store.state.domain}admin/deactivate-account/${
          this.admin[this.editedIndex].id
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
              === 'Data Admin Is Successfully Deactivate'
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
          if (this.admin.length > 0) {
            this.admin.splice(0, this.admin.length);
          }
          this.methodGetAdmin(1);
        })
        .catch(() => {
          this.hasSaved = true;
          this.status = false;
          this.message = 'server mengalami error';
          this.icon = '$warning';
        })
        .finally(() => {
          this.loadingDeactivate = false;
          this.dialogDeactivate = false;
        });
    },
    openDialogActivate(item) {
      this.editedIndex = this.admin.indexOf(item);
      this.dialogActivate = true;
    },
    saveActivate() {
      this.loadingActivate = true;
      axios({
        baseURL: `${this.$store.state.domain}admin/activate-account/${
          this.admin[this.editedIndex].id
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
              === 'Data Admin Is Successfully Activate'
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
          if (this.admin.length > 0) {
            this.admin.splice(0, this.admin.length);
          }
          this.methodGetAdmin(1);
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
    // method universal
    methodGetAdmin(page) {
      if (this.search === '') {
        axios({
          baseURL: `${this.$store.state.domain}admin/pagination-all/${page}`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        })
          .then((response) => {
            if (response.data.data.admin.length > 0) {
              const modulo = response.data.data.total % 10;
              if (modulo === 0) {
                this.pageCount = response.data.data.total / 10;
              } else {
                this.pageCount = (response.data.data.total - modulo) / 10 + 1;
              }
              let counter = (page - 1) * 10;
              let nameStatus = '';
              response.data.data.admin.forEach((i) => {
                counter += 1;
                if (i.status === '0') {
                  nameStatus = 'Tidak Aktif';
                } else {
                  nameStatus = 'Aktif';
                }
                this.admin.push({
                  id: i.id,
                  number: counter,
                  name: i.name,
                  email: i.email,
                  role: i.role.name,
                  idRole: i.role.id,
                  status: nameStatus,
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
          baseURL: `${this.$store.state.domain}admin/search-all/${this.search}/${page}`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        })
          .then((response) => {
            if (response.data.data.admin.length > 0) {
              const modulo = response.data.data.total % 10;
              if (modulo === 0) {
                this.pageCount = response.data.data.total / 10;
              } else {
                this.pageCount = (response.data.data.total - modulo) / 10 + 1;
              }
              let counter = (page - 1) * 10;
              let nameStatus = '';
              response.data.data.admin.forEach((i) => {
                counter += 1;
                if (i.status === '0') {
                  nameStatus = 'Tidak Aktif';
                } else {
                  nameStatus = 'Aktif';
                }
                this.admin.push({
                  id: i.id,
                  number: counter,
                  name: i.name,
                  email: i.email,
                  role: i.role.name,
                  idRole: i.role.id,
                  status: nameStatus,
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
    if (this.$store.state.role === 'Admin 3') {
      axios({
        baseURL: `${this.$store.state.domain}admin/pagination-all/1`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          if (response.data.data.admin.length > 0) {
            const modulo = response.data.data.total % 10;
            if (modulo === 0) {
              this.pageCount = response.data.data.total / 10;
            } else {
              this.pageCount = (response.data.data.total - modulo) / 10 + 1;
            }
            let counter = 0;
            let nameStatus = '';
            response.data.data.admin.forEach((i) => {
              counter += 1;
              if (i.status === '0') {
                nameStatus = 'Tidak Aktif';
              } else {
                nameStatus = 'Aktif';
              }
              this.admin.push({
                id: i.id,
                number: counter,
                name: i.name,
                email: i.email,
                role: i.role.name,
                idRole: i.role.id,
                status: nameStatus,
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
      axios({
        baseURL: `${this.$store.state.domain}role-admin`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          if (response.data.data.role.length > 0) {
            response.data.data.role.forEach((i) => {
              this.role.push({
                id: i.id,
                name: i.name,
              });
            });
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    } else {
      this.$router.push('/access-block');
    }
  },
  beforeDestroy() {
    this.items = null;
    this.dialogAdd = null;
    this.headerAdmin = null;
    this.admin = null;
    this.editedIndex = null;
    this.editedItemAdmin = null;
    this.defaultItem = null;
    this.page = null;
    this.pageCount = null;
    this.search = null;
    this.nameRules = null;
    this.emailRules = null;
    this.roleRules = null;
    this.role = null;

    delete this.items;
    delete this.dialogAdd;
    delete this.headerAdmin;
    delete this.admin;
    delete this.editedIndex;
    delete this.editedItemAdmin;
    delete this.defaultItem;
    delete this.page;
    delete this.pageCount;
    delete this.search;
    delete this.nameRules;
    delete this.emailRules;
    delete this.roleRules;
    delete this.role;
  },
};
</script>

<style scoped>
.size-max {
  max-width: 1366px;
}
</style>
