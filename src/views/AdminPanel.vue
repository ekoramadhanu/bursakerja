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
        <v-data-table
          :headers="headerAdmin"
          :items="admin"
          class="elevation-3 mt-3 font-family"
          hide-default-footer
          v-if="!skeleton"
          :loading="loadingTable"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <div class="d-flex">
                  <p class="ma-0">
                    <span class="font-family"> Daftar Admin Bursa Kerja </span>
                  </p>
                </div>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogAdd" max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon size="18" class="white--text mr-2">$add</v-icon>
                    <p class="ma-0 white--text font-family">tambah</p>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="primary d-flex justify-space-between">
                    <p class="font-family white--text text-capitalize mb-0">
                      <span class="text-h6">
                        menambah admin bursa kerja
                      </span>
                    </p>
                    <v-btn @click="closeAdd()" icon color="white">
                      <v-icon>$close</v-icon>
                    </v-btn>
                  </v-card-title>

                  <v-card-text class="pa-4">
                    <v-form ref="form" lazy-validation>
                      <p class="mb-0 black--text text-capitalize">
                        <span class="font-family"> nama admin </span>
                        <span class="ml-1 error--text"> * </span>
                      </p>
                      <v-text-field
                        v-model="editedItemAdmin.name"
                        :rules="nameRules"
                        label="Nama Admin"
                        class="font-family"
                        required
                        outlined
                        dense
                        single-line
                      />
                      <p class="mb-0 black--text text-capitalize">
                        <span class="font-family"> alamat email </span>
                        <span class="ml-1 error--text"> * </span>
                      </p>
                      <v-text-field
                        v-model="editedItemAdmin.email"
                        :rules="emailRules"
                        label="Alamat Email"
                        class="font-family"
                        required
                        outlined
                        dense
                        single-line
                      />
                      <p class="mb-0 black--text text-capitalize">
                        <span class="font-family"> NIP/NIK </span>
                        <span class="ml-1 error--text"> * </span>
                      </p>
                      <v-text-field
                        v-model="editedItemAdmin.idCard"
                        :rules="idCardRules"
                        label="NIP/NIK"
                        class="font-family"
                        required
                        outlined
                        dense
                        single-line
                      />
                      <p class="mb-0 black--text text-capitalize">
                        <span class="font-family"> member area </span>
                        <span class="ml-1 error--text"> * </span>
                      </p>
                      <v-select
                        v-model="editedItemAdmin.role"
                        :rules="roleRules"
                        no-data-text="Data Tidak Ditemukan"
                        :items="role"
                        item-text="name"
                        item-value="id"
                        label="Member Area"
                        class="font-family"
                        single-line
                        outlined
                        dense
                      />
                    </v-form>
                  </v-card-text>

                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      class="px-4 mr-1"
                      @click="closeAdd()"
                      text
                    >
                      batal
                    </v-btn>
                    <v-btn color="primary" @click="saveAdd()" text>
                      <v-progress-circular
                        indeterminate
                        color="primary"
                        v-if="loadingAdd"
                      />
                      <p class="px-4 my-auto text-white" v-if="!loadingAdd">
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
              outlined
              dense
              hide-details
              @click:append="searchAdmin()"
            />
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="openDialogUpdate(item)"
                  color="orange"
                  small
                  icon
                  class="mr-1"
                  elevation="0"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>$accountEdit</v-icon>
                </v-btn>
              </template>
              <span class="font-family text-capitalize">ubah admin</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="openDialogDeactivate(item)"
                  v-if="item.status === 'Aktif'"
                  elevation="0"
                  small
                  color="error"
                  class="mr-1"
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>$accountDeactivate</v-icon>
                </v-btn>
              </template>
              <span class="font-family text-capitalize"
                >akun admin dinonaktifkan</span
              >
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="openDialogActivate(item)"
                  v-if="item.status === 'Tidak Aktif'"
                  elevation="0"
                  color="green"
                  small
                  class="mr-1"
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>$accountActivate</v-icon>
                </v-btn>
              </template>
              <span class="font-family text-capitalize"
                >akun admin diaktifkan</span
              >
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="openDialogResetPassword(item)"
                  elevation="0"
                  color="primaryDark"
                  small
                  class="mr-1"
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>$accountResetPassword</v-icon>
                </v-btn>
              </template>
              <span class="font-family text-capitalize">reset kata sandi</span>
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
      <v-dialog v-model="dialogUpdate" max-width="600px">
        <v-card>
          <v-card-title class="primary d-flex justify-space-between">
            <p class="text-h6 white--text text-capitalize font-family mb-0">
              mengubah admin bursa kerja
            </p>
            <v-btn @click="closeUpdate()" icon color="white">
              <v-icon>$close</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text class="pa-4">
            <v-form ref="form" lazy-validation>
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> member area </span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <v-select
                v-model="editedItemAdmin.role"
                :rules="roleRules"
                no-data-text="Data Tidak Ditemukan"
                :items="role"
                item-text="name"
                item-value="id"
                label="Member Area"
                outlined
                dense
                single-line
              />
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              class="mr-2 px-4"
              elevation="0"
              @click="closeUpdate()"
              text
            >
              batal
            </v-btn>
            <v-btn color="primary" @click="saveUpdate()" text>
              <v-progress-circular
                indeterminate
                color="primary"
                v-if="loadingUpdate"
              />
              <p class="my-auto text-white px-4" v-if="!loadingUpdate">
                simpan
              </p>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDeactivate" persistent max-width="450">
        <v-card>
          <v-card-title class="primary d-flex justify-space-between">
            <p class="mb-0 white--text text-capitalize text-h6">
              menonaktifkan akun admin
            </p>
            <v-btn @click="dialogDeactivate = false" icon color="white">
              <v-icon>$close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <div class="d-flex justify-start align-center pa-2">
              <v-icon size="80" class="error--text mr-4">$warning</v-icon>
              <p class="ma-0 black--text">
                Apakah anda yakin menonaktifkan admin ? Jika "iya" silahkan
                pilih tombol iya
              </p>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="dialogDeactivate = false"
              text
              color="primary"
            >
              tidak
            </v-btn>
            <v-btn color="primary" @click="saveDeactivated()" text>
              <v-progress-circular
                indeterminate
                color="primary"
                v-if="loadingDeactivate"
              />
              <p
                class="my-auto"
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
          <v-card-title class="primary d-flex justify-space-between">
            <p class="mb-0 text-capitalize text-h6 white--text">
              mengaktifkan akun admin
            </p>
            <v-btn @click="dialogActivate = false" icon color="white">
              <v-icon>$close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <div class="d-flex justify-start align-center pa-2">
              <v-icon size="80" class="error--text mr-4">$warning</v-icon>
              <p class="ma-0 black--text">
                Apakah anda yakin mengaktifkan akun admin ? Jika "iya" silahkan
                pilih tombol iya
              </p>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="dialogActivate = false"
            >
              tidak
            </v-btn>
            <v-btn color="primary" @click="saveActivate()" text>
              <v-progress-circular
                indeterminate
                color="primary"
                v-if="loadingActivate"
              />
              <p
                class="my-auto"
                v-if="!loadingActivate"
              >
                iya
              </p>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogResetPassword" persistent max-width="450">
        <v-card>
          <v-card-title class="primary d-flex justify-space-between">
            <p class="mb-0 text-capitalize text-h6 white--text">
              reset kata sandi akun admin
            </p>
            <v-btn @click="closeResetPassword()" icon color="white">
              <v-icon>$close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="pa-2">
            <v-form lazy-validation ref="form">
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> kata sandi </span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <v-text-field
                v-model="resetPassword"
                :rules="resetPaswordRules"
                label="kata sandi"
                class="font-family"
                required
                outlined
                dense
                single-line
                readonly
                append-outer-icon="$refresh"
                @click:append-outer="methodRandomPassword()"
              />
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              @click="closeResetPassword()"
              color="primary"
            >
              tidak
            </v-btn>
            <v-btn color="primary" @click="saveResetPassword()" text>
              <v-progress-circular
                indeterminate
                color="primary"
                v-if="loadingResetPassword"
              />
              <p
                class="my-auto"
                v-if="!loadingResetPassword"
              >
                iya
              </p>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar
        v-model="hasSaved"
        :timeout="2000"
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
    dialogAdd: false,
    dialogUpdate: false,
    dialogDeactivate: false,
    dialogActivate: false,
    dialogResetPassword: false,
    loadingAdd: false,
    loadingUpdate: false,
    loadingDeactivate: false,
    loadingActivate: false,
    loadingResetPassword: false,
    loadingTable: false,
    headerAdmin: [
      {
        text: 'Nomor',
        sortable: false,
        value: 'number',
        width: 90,
      },
      {
        text: 'Nama', value: 'name', sortable: false, width: 200,
      },
      {
        text: 'NIP/NIK', value: 'idCard', sortable: false, width: 200,
      },
      {
        text: 'Email', value: 'email', sortable: false, width: 200,
      },
      {
        text: 'Tugas', value: 'role', sortable: false, width: 90,
      },
      {
        text: 'Status', value: 'status', sortable: false, width: 90,
      },
      {
        text: 'Actions', value: 'actions', sortable: false, width: 150,
      },
    ],
    admin: [],
    editedIndex: -1,
    editedItemAdmin: {
      name: '',
      email: '',
      role: '',
      idCard: '',
    },
    defaultItem: {
      name: '',
      email: '',
      role: '',
      idCard: '',
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
    idCardRules: [
      (v) => !!v || 'NIP/NIK Admin Tidak Boleh Kosong',
      (v) => /^[0-9]+/.test(v) || 'NIP/NIK Admin Harus Angka',
    ],
    roleRules: [(v) => !!v || 'Member Area Tidak Boleh Kosong'],
    role: [],
    hasSaved: false,
    status: null,
    icon: '',
    message: '',
    skeleton: true,
    resetPassword: '',
    resetPaswordRules: [
      (v) => !!v || 'Kata Sandi Tidak Boleh Kosong',
      (v) => (v.length >= 8 && v.length <= 12) || 'Kata Sandi Harus (8-12)',
    ],
    settings: {
      length: 12,
      digits: 4,
      symbols: 4,
    },
  }),
  methods: {
    pagination() {
      this.loadingTable = true;
      this.admin.splice(0, this.admin.length);
      this.methodGetAdmin();
    },
    searchAdmin() {
      this.loadingTable = true;
      this.page = 1;
      this.admin.splice(0, this.admin.length);
      this.methodGetAdmin();
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
    async saveAdd() {
      if (this.$refs.form.validate()) {
        try {
          this.loadingAdd = true;
          const response = await axios({
            baseURL: `${this.$store.state.domain}admin/register`,
            method: 'post',
            headers: {
              'x-api-key': this.$store.state.apiKey,
              Authorization: `Bearer ${this.$cookies.get('token')}`,
            },
            data: {
              name: this.editedItemAdmin.name,
              email: this.editedItemAdmin.email,
              role: this.editedItemAdmin.role,
              idCard: this.editedItemAdmin.idCard,
            },
          });
          if (
            response.data.data.attributes.data
              === 'Data Admin Is Successfully Created'
          ) {
            this.hasSaved = true;
            this.status = true;
            this.message = 'data berhasil disimpan';
            this.icon = '$success';
          } else if (
            response.data.data.attributes.data === 'Data Email Is Already Exist'
          ) {
            this.hasSaved = true;
            this.status = false;
            this.message = 'alamat email sudah ada';
            this.icon = '$warning';
          } else if (
            response.data.data.attributes.data === 'Data Id Card Is Already Exist'
          ) {
            this.hasSaved = true;
            this.status = false;
            this.message = 'NIP/NIK sudah ada';
            this.icon = '$warning';
          } else {
            this.hasSaved = true;
            this.status = false;
            this.message = 'data tidak berhasil disimpan';
            this.icon = '$warning';
          }
          this.loadingTable = true;
          this.page = 1;
          this.search = '';
          if (this.admin.length > 0) {
            this.admin.splice(0, this.admin.length);
          }
          this.methodGetAdmin();
          this.loadingAdd = false;
          this.closeAdd();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
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
    async saveUpdate() {
      if (this.$refs.form.validate()) {
        try {
          this.loadingUpdate = true;
          const response = await axios({
            baseURL: `${this.$store.state.domain}admin/change-role/${
              this.admin[this.editedIndex].id
            }`,
            method: 'patch',
            headers: {
              'x-api-key': this.$store.state.apiKey,
              Authorization: `Bearer ${this.$cookies.get('token')}`,
            },
            data: {
              role: this.editedItemAdmin.role,
            },
          });
          if (
            response.data.data.attributes.data
              === 'Data Role Admin Is Successfully Update'
          ) {
            this.hasSaved = true;
            this.status = true;
            this.message = 'data berhasil diubah';
            this.icon = '$success';
          } else {
            this.hasSaved = true;
            this.status = false;
            this.message = 'data tidak berhasil diubah';
            this.icon = '$warning';
          }
          this.loadingTable = true;
          if (this.admin.length > 0) {
            this.admin.splice(0, this.admin.length);
          }
          this.methodGetAdmin();
          this.loadingUpdate = false;
          this.closeUpdate();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
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
    openDialogResetPassword(item) {
      this.editedIndex = this.admin.indexOf(item);
      this.methodRandomPassword();
      this.dialogResetPassword = true;
    },
    closeResetPassword() {
      this.dialogResetPassword = false;
      this.editedIndex = -1;
    },
    async saveResetPassword() {
      try {
        this.loadingResetPassword = true;
        const response = await axios({
          baseURL: `${this.$store.state.domain}admin/reset-password/${
            this.admin[this.editedIndex].id
          }`,
          method: 'patch',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            password: this.resetPassword,
          },
        });
        if (
          response.data.data.attributes.data
            === 'Data Admin Is Successfully Updated'
        ) {
          this.hasSaved = true;
          this.status = true;
          this.message = 'data berhasil diubah';
          this.icon = '$success';
        } else {
          this.hasSaved = true;
          this.status = false;
          this.message = 'data tidak berhasil diubah';
          this.icon = '$warning';
        }
        this.loadingTable = true;
        if (this.admin.length > 0) {
          this.admin.splice(0, this.admin.length);
        }
        this.methodGetAdmin();
        this.loadingResetPassword = false;
        this.closeResetPassword();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    async saveDeactivated() {
      try {
        this.loadingDeactivate = true;
        const response = await axios({
          baseURL: `${this.$store.state.domain}admin/deactivate-account/${
            this.admin[this.editedIndex].id
          }`,
          method: 'patch',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        });
        if (
          response.data.data.attributes.data
            === 'Data Admin Is Successfully Deactivate'
        ) {
          this.hasSaved = true;
          this.status = true;
          this.message = 'data berhasil diubah';
          this.icon = '$success';
        } else {
          this.hasSaved = true;
          this.status = false;
          this.message = 'data tidak berhasil diubah';
          this.icon = '$warning';
        }
        this.loadingTable = true;
        if (this.admin.length > 0) {
          this.admin.splice(0, this.admin.length);
        }
        this.methodGetAdmin();
        this.loadingDeactivate = false;
        this.dialogDeactivate = false;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    openDialogActivate(item) {
      this.editedIndex = this.admin.indexOf(item);
      this.dialogActivate = true;
    },
    async saveActivate() {
      try {
        this.loadingActivate = true;
        const response = await axios({
          baseURL: `${this.$store.state.domain}admin/activate-account/${
            this.admin[this.editedIndex].id
          }`,
          method: 'patch',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        });
        if (
          response.data.data.attributes.data
          === 'Data Admin Is Successfully Activate'
        ) {
          this.hasSaved = true;
          this.status = true;
          this.message = 'data berhasil diubah';
          this.icon = '$success';
        } else {
          this.hasSaved = true;
          this.status = false;
          this.message = 'data tidak berhasil diubah';
          this.icon = '$warning';
        }
        this.loadingTable = true;
        if (this.admin.length > 0) {
          this.admin.splice(0, this.admin.length);
        }
        this.methodGetAdmin();
        this.loadingActivate = false;
        this.dialogActivate = false;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    // method universal
    async methodGetAdmin() {
      try {
        const header = {
          'x-api-key': this.$store.state.apiKey,
          Authorization: `Bearer ${this.$cookies.get('token')}`,
        };
        if (this.search !== '') {
          header.keyword = this.search;
        }
        const response = await axios({
          baseURL: `${this.$store.state.domain}admin/pagination-all/${this.page}`,
          method: 'get',
          headers: header,
        });
        if (response.data.data.attributes.length > 0) {
          const modulo = response.data.data.total % 10;
          if (modulo === 0) {
            this.pageCount = response.data.data.total / 10;
          } else {
            this.pageCount = (response.data.data.total - modulo) / 10 + 1;
          }
          let counter = (this.page - 1) * 10;
          let nameStatus = '';
          response.data.data.attributes.forEach((i) => {
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
              idCard: i.idCard,
              role: i.role.name,
              idRole: i.role.id,
              status: nameStatus,
            });
          });
        } else {
          this.pageCount = 0;
        }
        this.loadingTable = false;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    methodRandomPassword() {
      const lettersSetArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
      const symbolsSetArray = ['=', '+', '-', '^', '?', '!', '%', '&', '*', '$', '#', '^', '@', '|'];
      const passwordArray = [];
      // const digitsArray = [];
      const digitsPositionArray = [];
      let i = 0;

      // first, fill the password array with letters, uppercase and lowecase
      for (i = 0; i < this.settings.length; i += 1) {
        // get an array for all indexes of the password array
        digitsPositionArray.push(i);

        const upperCase = Math.round(Math.random() * 1);
        if (upperCase === 0) {
          passwordArray[i] = lettersSetArray[Math.floor(Math.random()
          * lettersSetArray.length)].toUpperCase();
        } else {
          passwordArray[i] = lettersSetArray[Math.floor(Math.random() * lettersSetArray.length)];
        }
      }

      // Add digits to password
      for (i = 0; i < this.settings.digits; i += 1) {
        const digit = Math.round(Math.random() * 9);
        const numberIndex = digitsPositionArray[Math.floor(Math.random()
        * digitsPositionArray.length)];

        passwordArray[numberIndex] = digit;

        const j = digitsPositionArray.indexOf(numberIndex);
        if (i !== -1) {
          digitsPositionArray.splice(j, 1);
        }
      }

      // add special charachters "symbols"
      for (i = 0; i < this.settings.symbols; i += 1) {
        const symbol = symbolsSetArray[Math.floor(Math.random() * symbolsSetArray.length)];
        const symbolIndex = digitsPositionArray[Math.floor(Math.random()
        * digitsPositionArray.length)];

        passwordArray[symbolIndex] = symbol;

        const j = digitsPositionArray.indexOf(symbolIndex);
        if (i !== -1) {
          digitsPositionArray.splice(j, 1);
        }
      }

      this.resetPassword = passwordArray.join('');
    },
  },
  async beforeCreate() {
    if (this.$store.state.role === 'Admin 3') {
      try {
        const response = await axios({
          baseURL: `${this.$store.state.domain}admin/pagination-all/1`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        });
        const response1 = await axios({
          baseURL: `${this.$store.state.domain}role-admin`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        });
        if (response.data.data.attributes.length > 0) {
          const modulo = response.data.data.total % 10;
          if (modulo === 0) {
            this.pageCount = response.data.data.total / 10;
          } else {
            this.pageCount = (response.data.data.total - modulo) / 10 + 1;
          }
          let counter = 0;
          let nameStatus = '';
          response.data.data.attributes.forEach((i) => {
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
              idCard: i.idCard,
              email: i.email,
              role: i.role.name,
              idRole: i.role.id,
              status: nameStatus,
            });
          });
        } else {
          this.pageCount = 0;
        }
        if (response1.data.data.attributes.length > 0) {
          response1.data.data.attributes.forEach((i) => {
            this.role.push({
              id: i.id,
              name: i.name,
            });
          });
        }
        this.skeleton = false;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    } else {
      this.$router.push('/access-block');
    }
  },
  beforeDestroy() {
    this.dialogAdd = null;
    this.dialogUpdate = null;
    this.dialogDeactivate = null;
    this.dialogActivate = null;
    this.dialogResetPassword = null;
    this.loadingAdd = null;
    this.loadingUpdate = null;
    this.loadingDeactivate = null;
    this.loadingActivate = null;
    this.loadingResetPassword = null;
    this.loadingTable = null;
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
    this.idCardRules = null;
    this.roleRules = null;
    this.role = null;
    this.hasSaved = null;
    this.status = null;
    this.icon = null;
    this.message = null;
    this.skeleton = null;
    this.resetPassword = null;
    this.resetPaswordRules = null;
    this.settings = null;

    delete this.dialogAdd;
    delete this.dialogUpdate;
    delete this.dialogDeactivate;
    delete this.dialogActivate;
    delete this.dialogResetPassword;
    delete this.loadingAdd;
    delete this.loadingUpdate;
    delete this.loadingDeactivate;
    delete this.loadingActivate;
    delete this.loadingResetPassword;
    delete this.loadingTable;
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
    delete this.idCardRules;
    delete this.roleRules;
    delete this.role;
    delete this.hasSaved;
    delete this.status;
    delete this.icon;
    delete this.message;
    delete this.skeleton;
    delete this.resetPassword;
    delete this.resetPaswordRules;
    delete this.settings;
  },
};
</script>

<style scoped>
.size-max {
  max-width: 1044px;
}
</style>
