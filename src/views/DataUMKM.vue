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
        <v-card elevation="3" class="mt-3" v-if="!skeleton">
          <v-toolbar flat color="primary">
            <v-icon class="mr-2 white--text">$CV</v-icon>
            <v-toolbar-title
              class="font-weight-light text-capitalize white--text"
            >
              data UMKM
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="white" fab small @click="isEditing = !isEditing">
              <v-icon v-if="isEditing" class="primary--text">
                mdi-close
              </v-icon>
              <v-icon v-else class="primary--text"> mdi-pencil </v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="py-4 px-6">
            <v-form ref="form" lazy-validation>
              <v-text-field
                prepend-icon="$UMKM"
                :disabled="!isEditing"
                v-model="nameCompany"
                :rules="nameCompanyRules"
                label="Nama Perusahaan"
                required
              />
              <v-text-field
                prepend-icon="$UMKM"
                :disabled="!isEditing"
                v-model="owner"
                :rules="ownerRules"
                label="Pemilik Perusahaan"
                required
              />
              <v-text-field
                prepend-icon="$UMKM"
                :disabled="!isEditing"
                v-model="legality"
                :rules="legalityRules"
                label="Bentuk Badan Hukum"
                required
              />
              <v-text-field
                prepend-icon="$UMKM"
                v-model="typeCompany"
                :rules="typeCompanyRules"
                :disabled="!isEditing"
                label="Bidang Usaha"
                required
              />
              <v-text-field
                prepend-icon="$UMKM"
                label="Umur Perusahaan"
                :disabled="!isEditing"
                v-model="oldCompany"
                :rules="oldCompanyRules"
                required
              />
              <v-row>
                <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                  <v-text-field
                    prepend-icon="$UMKM"
                    :disabled="!isEditing"
                    v-model="branch"
                    :rules="branchRules"
                    label="Jumlah Cabang"
                    required
                  />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="12">
                  <v-text-field
                    prepend-icon="$UMKM"
                    :disabled="!isEditing"
                    v-model="employee"
                    :rules="employeeRules"
                    label="Jumlah Karyawan"
                    required
                  />
                </v-col>
              </v-row>
              <v-text-field
                prepend-icon="$UMKM"
                label="Alamat Kantor"
                :disabled="!isEditing"
                v-model="address"
                :rules="addressRules"
                required
              />
              <v-text-field
                prepend-icon="$UMKM"
                label="Link website"
                :disabled="!isEditing"
                v-model="link"
                :rules="linkRules"
                required
              />
              <v-text-field
                prepend-icon="$UMKM"
                label="Nomor Telepon"
                :disabled="!isEditing"
                v-model="phone"
                :rules="phoneRules"
                required
              />
              <v-file-input
                label="Unggah Foto KTP (Maks 1 MB)"
                accept="image/png, image/jpeg, image/bmp"
                required
                ref="fileInput"
                enctype="multipart/form-data"
                :rules="priviewImageKTP !== null ? [] : imageKTPRules"
                :disabled="!isEditing"
                @change="ChangeImageKTP"
              ></v-file-input>
              <img
                :src="priviewImageKTP"
                v-if="priviewImageKTP != null"
                class="preview-img"
                contain
                aspect-ratio="1.7"
              />
              <v-file-input
                label="Unggah Logo Perusahaan (Maks 1 MB)"
                accept="image/png, image/jpeg, image/bmp"
                required
                ref="fileInput"
                enctype="multipart/form-data"
                :rules="priviewImageBrand !== null ? [] : imageBrandRules"
                :disabled="!isEditing"
                @change="ChangeImageBrand"
              ></v-file-input>
              <img
                :src="priviewImageBrand"
                v-if="priviewImageBrand != null"
                class="preview-img"
                contain
                aspect-ratio="1.7"
              />
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <div class="mt-3 d-flex justify-end">
              <v-btn
                color="primary"
                @click="save"
                :disabled="!isEditing"
              >
                <v-progress-circular indeterminate color="white" v-if="loadingSave" />
                <p v-if="!loadingSave" class="text-capitalize my-auto">simpan</p>
              </v-btn
              >
            </div>
          </v-card-actions>
        </v-card>
        <v-skeleton-loader
          ref="skeleton"
          type="card"
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
    </v-main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    items: [
      {
        text: 'data UMKM',
        disabled: true,
      },
    ],
    isEditing: null,
    priviewImageBrand: null,
    priviewImageKTP: null,
    nameCompany: '',
    nameCompanyRules: [(v) => !!v || 'Nama Perusahaan Tidak Boleh Kosong'],
    owner: '',
    ownerRules: [(v) => !!v || 'Pemilik Perusahaan Tidak Boleh Kosong'],
    legality: '',
    legalityRules: [(v) => !!v || 'Badan Hukum Tidak Boleh Kosong'],
    oldCompany: '',
    oldCompanyRules: [(v) => !!v || 'Umur Perusahan Tidak Boleh Kosong'],
    typeCompany: '',
    typeCompanyRules: [(v) => !!v || 'Bidang Usaha Tidak Boleh Kosong'],
    branch: '',
    branchRules: [(v) => !!v || 'Cabang Perusahaan Tidak Boleh Kosong'],
    employee: '',
    employeeRules: [(v) => !!v || 'Jumlah Karyawan Tidak Boleh Kosong'],
    address: '',
    addressRules: [(v) => !!v || 'Alamat Tidak Boleh Kosong'],
    link: '',
    linkRules: [(v) => !!v || 'Link Website Tidak Boleh Kosong'],
    phone: '',
    phoneRules: [
      (v) => !!v || 'Nomor Telepon Tidak Boleh Kosong',
      (v) => /[0-9]/.test(v) || 'Nomor Telepon Harus Angka (0-9)',
      (v) => /^08/.test(v) || 'Nomor Telepon Harus Dimulai Dengan 08...',
    ],
    imageKTPRules: [(v) => !!v || 'Gambar KTP Tidak Boleh Kosong'],
    imageBrandRules: [(v) => !!v || 'Gambar Logo Tidak Boleh Kosong'],
    loadingSave: false,
    hasSaved: false,
    status: null,
    icon: '',
    message: '',
    skeleton: true,
  }),
  methods: {
    ChangeImageKTP(event) {
      // this.image = event;
      if (event == null) {
        this.priviewImageKTP = null;
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.priviewImageKTP = e.target.result;
        };
        reader.readAsDataURL(event);
      }
    },
    ChangeImageBrand(event) {
      // this.image = event;
      if (event == null) {
        this.priviewImageBrand = null;
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.priviewImageBrand = e.target.result;
        };
        reader.readAsDataURL(event);
      }
    },
    save() {
      if (this.$refs.form.validate()) {
        this.loadingSave = true;
        axios({
          baseURL: `${this.$store.state.domain}umkm/identity`,
          method: 'patch',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            name: this.nameCompany,
            owner: this.owner,
            legality: this.legality,
            type: this.typeCompany,
            old: this.oldCompany,
            branches: this.branch,
            employee: this.employee,
            address: this.address,
            linkWebsite: this.link,
            phone: this.phone,
            photoCard: this.priviewImageKTP,
            photoLogo: this.priviewImageBrand,
          },
        })
          .then((response) => {
            if (response.data.data.message === 'Data UMKM Is Successfully Update') {
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
          })
          .catch(() => {
            this.hasSaved = true;
            this.status = false;
            this.message = 'server mengalami error';
            this.icon = '$warning';
          })
          .finally(() => {
            this.isEditing = false;
            this.loadingSave = false;
          });
      }
    },
  },
  beforeCreate() {
    axios({
      baseURL: `${this.$store.state.domain}umkm/token`,
      method: 'get',
      headers: {
        'x-api-key': this.$store.state.apiKey,
        authorization: `Bearer ${this.$cookies.get('token')}`,
      },
    })
      .then((response) => {
        if (response.data.data.umkm.length > 0) {
          this.nameCompany = response.data.data.umkm[0].name;
          this.owner = response.data.data.umkm[0].owner;
          this.legality = response.data.data.umkm[0].legality;
          this.typeCompany = response.data.data.umkm[0].type;
          this.oldCompany = response.data.data.umkm[0].old;
          this.branch = response.data.data.umkm[0].branches;
          this.employee = response.data.data.umkm[0].employee;
          this.address = response.data.data.umkm[0].address;
          this.link = response.data.data.umkm[0].linkWebsite;
          this.phone = response.data.data.umkm[0].phone;
          this.priviewImageKTP = response.data.data.umkm[0].imageCard;
          this.priviewImageBrand = response.data.data.umkm[0].imageLogo;
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
  },
};
</script>

<style scoped>
.preview-img {
  max-width: 354px;
  max-height: 354px;
}
</style>
