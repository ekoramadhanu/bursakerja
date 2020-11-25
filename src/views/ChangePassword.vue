<template>
  <div>
    <v-main>
      <v-container class="d-flex flex-column justify-center size-max">
        <v-card class="overflow-hidden mt-6 px-2 py-2">
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                label="Kata Sandi Saat Ini"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? '$eye' : '$eyeSlash'"
                v-model="password"
                :rules="passwordRules"
                @click:append="changeShowPassword()"
                required
              />
              <v-text-field
                label="Kata Sandi Baru"
                :type="showNewPassword ? 'text' : 'password'"
                :append-icon="showNewPassword ? '$eye' : '$eyeSlash'"
                v-model="newPassword"
                :rules="newPasswordRules"
                @click:append="changeShowNewPassword()"
                @input="checkedFormatPassword()"
                @blur="checkedFormatPassword()"
                @focus="checkedFormatPassword()"
                required
              />
              <div class="d-flex">
                <p
                  :class="
                    checkNumber === false
                      ? 'text-caption mb-0 mr-3 error--text'
                      : 'text-caption mb-0 mr-3 success-text'
                  "
                >
                  <span class="font-family"> kata sandi harus ada angka </span>
                </p>
                <v-icon v-if="checkNumber === false" size="15" color="error">
                  $close
                </v-icon>
                <v-icon size="15" v-if="checkNumber === true" color="success">
                  $check
                </v-icon>
              </div>
              <div class="d-flex">
                <p
                  :class="
                    checkSymbol === false
                      ? 'text-caption mb-0 mr-3 error--text'
                      : 'text-caption mb-0 mr-3 success-text'
                  "
                >
                  <span class="font-family"> kata sandi harus ada simbol </span>
                </p>
                <v-icon v-if="checkSymbol === false" size="15" color="error">
                  $close
                </v-icon>
                <v-icon size="15" v-if="checkSymbol === true" color="success">
                  $check
                </v-icon>
              </div>
              <div class="d-flex">
                <p
                  :class="
                    checkUppercase === false
                      ? 'text-caption mb-0 mr-3 error--text'
                      : 'text-caption mb-0 mr-3 success-text'
                  "
                >
                  <span class="font-family">
                    kata sandi harus diawali huruf kapital
                  </span>
                </p>
                <v-icon v-if="checkUppercase === false" size="15" color="error">
                  $close
                </v-icon>
                <v-icon
                  size="15"
                  v-if="checkUppercase === true"
                  color="success"
                >
                  $check
                </v-icon>
              </div>
              <div class="d-flex">
                <p
                  :class="
                    checkLowercase === false
                      ? 'text-caption mb-0 mr-3 error--text'
                      : 'text-caption mb-0 mr-3 success-text'
                  "
                >
                  <span class="font-family">
                    kata sandi harus ada huruf kecil
                  </span>
                </p>
                <v-icon v-if="checkLowercase === false" size="15" color="error">
                  $close
                </v-icon>
                <v-icon
                  size="15"
                  v-if="checkLowercase === true"
                  color="success"
                >
                  $check
                </v-icon>
              </div>
              <v-text-field
                label="Ulangi Kata Sandi Baru"
                :type="showRePassword ? 'text' : 'password'"
                :append-icon="showRePassword ? '$eye' : '$eyeSlash'"
                v-model="rePassword"
                :rules="rePasswordRules"
                @click:append="changeShowRePassword()"
                required
              />
            </v-form>
          </v-card-text>
        </v-card>
        <v-layout class="mt-4">
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="save">
            <v-progress-circular indeterminate color="white" v-if="loading" />
            <span v-if="!loading"> simpan </span>
          </v-btn>
        </v-layout>
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
    </v-main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    items: [
      {
        text: 'ganti kata sandi',
        disabled: true,
      },
    ],
    hasSaved: false,
    status: null,
    icon: '',
    message: '',
    isEditing: null,
    password: '',
    passwordRules: [
      (v) => !!v || 'Kata Sandi Tidak Boleh Kosong',
      (v) => (v.length >= 8 && v.length <= 12) || 'Kata Sandi Harus (8-12)',
    ],
    newPassword: '',
    newPasswordRules: [
      (v) => !!v || 'Kata Sandi Baru Tidak Boleh Kosong',
      (v) => (v.length >= 8 && v.length <= 12) || 'Kata Sandi Baru Harus (8-12)',
    ],
    rePassword: '',
    rePasswordRules: [
      (v) => !!v || 'Ulangi Kata Sandi Tidak Boleh Kosong',
      (v) => (v.length >= 8 && v.length <= 12) || 'Ulangi Kata Sandi Harus (8-12)',
    ],
    showPassword: false,
    showNewPassword: false,
    showRePassword: false,
    role: '',
    loading: false,
    checkUppercase: null,
    checkLowercase: null,
    checkSymbol: null,
    checkNumber: null,
  }),
  methods: {
    save() {
      if (this.checkUppercase === null) {
        this.checkUppercase = false;
      }
      if (this.checkLowercase === null) {
        this.checkLowercase = false;
      }
      if (this.checkSymbol === null) {
        this.checkSymbol = false;
      }
      if (this.checkNumber === null) {
        this.checkNumber = false;
      }
      if (this.$refs.form.validate()) {
        if (this.rePassword !== this.newPassword) {
          this.hasSaved = true;
          this.status = false;
          this.message = 'kata sandi baru dan ulangi kata sandi tidak sama';
          this.icon = '$warning';
        } else if (
          this.checkUppercase === false
          || this.checkLowercase === false
          || this.checkSymbol === false
          || this.checkNumber === false
        ) {
          this.hasSaved = true;
          this.status = false;
          this.message = 'kata sandi anda tidak memenuhi syarat';
          this.icon = '$warning';
        } else {
          this.loading = true;
          let endpoint = '';
          if (
            this.role === 'Admin 1'
            || this.role === 'Admin 2'
            || this.role === 'Admin 3'
          ) {
            endpoint = `${this.$store.state.domain}admin/change-password`;
          } else if (this.role === 'Perusahaan') {
            endpoint = `${this.$store.state.domain}umkm/change-password`;
          } else {
            endpoint = `${this.$store.state.domain}job-seeker/change-password`;
          }
          axios({
            baseURL: endpoint,
            method: 'patch',
            headers: {
              'x-api-key': this.$store.state.apiKey,
              authorization: `Bearer ${this.$cookies.get('token')}`,
            },
            data: {
              oldPassword: this.password,
              newPassword: this.newPassword,
            },
          })
            .then((response) => {
              if (
                response.data.data.message.includes('Is Successfully Update')
              ) {
                this.hasSaved = true;
                this.status = true;
                this.message = 'data berhasil disimpan';
                this.icon = '$success';
              } else if (response.data.data.message === 'Password Not Match') {
                this.hasSaved = true;
                this.status = false;
                this.message = 'kata sandi lama anda salah';
                this.icon = '$warning';
              } else {
                this.hasSaved = true;
                this.status = false;
                this.message = 'data tidak bisa disimpan ';
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
              this.loading = false;
              this.isEditing = !this.isEditing;
            });
        }
      }
    },
    changeShowPassword() {
      this.showPassword = !this.showPassword;
    },
    changeShowNewPassword() {
      this.showNewPassword = !this.showNewPassword;
    },
    changeShowRePassword() {
      this.showRePassword = !this.showRePassword;
    },
    checkedFormatPassword() {
      const lowerCaseRegex = '(?=.*[a-z])';
      const upperCaseRegex = '([A-Z])';
      const symbolsRegex = '(?=.*[!@#$%^&*])';
      const numericRegex = '(?=.*[0-9])';
      if (new RegExp(`^${upperCaseRegex}`).test(this.newPassword)) {
        this.checkUppercase = true;
      }
      if (new RegExp(`^${lowerCaseRegex}`).test(this.newPassword)) {
        this.checkLowercase = true;
      }
      if (new RegExp(`^${symbolsRegex}`).test(this.newPassword)) {
        this.checkSymbol = true;
      }
      if (new RegExp(`^${numericRegex}`).test(this.newPassword)) {
        this.checkNumber = true;
      }
      if (this.newPassword === '' || this.newPassword === null) {
        this.checkUppercase = false;
        this.checkLowercase = false;
        this.checkSymbol = false;
        this.checkNumber = false;
      }
    },
  },
  created() {
    this.role = this.$store.state.role;
  },
  beforeDestroy() {
    this.items = null;
    this.hasSaved = null;
    this.isEditing = null;
    this.password = null;
    this.passwordRules = null;
    this.newPassword = null;
    this.newPasswordRules = null;
    this.rePassword = null;
    this.rePasswordRules = null;
    this.showPassword = null;
    this.showNewPassword = null;
    this.showRePassword = null;

    delete this.items;
    delete this.hasSaved;
    delete this.isEditing;
    delete this.password;
    delete this.passwordRules;
    delete this.newPassword;
    delete this.newPasswordRules;
    delete this.rePassword;
    delete this.rePasswordRules;
    delete this.showPassword;
    delete this.showNewPassword;
    delete this.showRePassword;
  },
};
</script>

<style scoped>
.size-max {
  max-width: 1366px;
}
</style>
