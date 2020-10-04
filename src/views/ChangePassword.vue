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
              kami sarankan untuk mengganti kata sandi minimal 3 bulan sekali
              untuk eningkatkan keamanan
            </p>
          </div>
        </v-card>
        <v-card class="overflow-hidden mt-3">
          <v-toolbar flat color="primary">
            <v-icon class="mr-2 white--text">$padlock</v-icon>
            <v-toolbar-title
              class="font-weight-light text-capitalize white--text"
              >ganti kata sandi</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn color="white" fab small @click="isEditing = !isEditing">
              <v-icon v-if="isEditing" class="primary--text">mdi-close</v-icon>
              <v-icon v-else class="primary--text">mdi-pencil</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                prepend-icon="$padlock"
                label="Kata Sandi lama"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? '$eye' : '$eyeSlash'"
                v-model="password"
                :rules="passwordRules"
                :disabled="!isEditing"
                @click:append="changeShowPassword()"
                required
              />
              <v-text-field
                prepend-icon="$padlock"
                label="Kata Sandi Baru"
                :type="showNewPassword ? 'text' : 'password'"
                :append-icon="showNewPassword ? '$eye' : '$eyeSlash'"
                v-model="newPassword"
                :rules="newPasswordRules"
                :disabled="!isEditing"
                @click:append="changeShowNewPassword()"
                required
              />
              <v-text-field
                prepend-icon="$padlock"
                label="Ulangi Kata Sandi Baru"
                :type="showRePassword ? 'text' : 'password'"
                :append-icon="showRePassword ? '$eye' : '$eyeSlash'"
                v-model="rePassword"
                :rules="rePasswordRules"
                :disabled="!isEditing"
                @click:append="changeShowRePassword()"
                required
              />
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!isEditing"
              color="primary"
              @click="save"
              class="text-capitalize"
            >
              simpan
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        text: 'ganti kata sandi',
        disabled: true,
      },
    ],
    hasSaved: false,
    isEditing: null,
    password: '',
    passwordRules: [
      (v) => !!v || 'Kata Sandi Tidak Boleh Kosong',
      (v) => (v.length >= 6 && v.length <= 12) || 'Kata Sandi Harus (6-12)',
    ],
    newPassword: '',
    newPasswordRules: [
      (v) => !!v || 'Kata Sandi Baru Tidak Boleh Kosong',
      (v) => (v.length >= 6 && v.length <= 12) || 'Kata Sandi Baru Harus (6-12)',
    ],
    rePassword: '',
    rePasswordRules: [
      (v) => !!v || 'Ulangi Kata Sandi Tidak Boleh Kosong',
      (v) => (v.length >= 6 && v.length <= 12) || 'Ulangi Kata Sandi Harus (6-12)',
    ],
    showPassword: false,
    showNewPassword: false,
    showRePassword: false,
  }),
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        this.isEditing = !this.isEditing;
        this.hasSaved = true;
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
