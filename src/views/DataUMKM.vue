<template>
  <div>
    <v-main>
      <v-container class="d-flex flex-column justify-center size-max">

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
              <!-- <v-text-field
                prepend-icon="$UMKM"
                :disabled="!isEditing"
                v-model="legality"
                :rules="legalityRules"
                label="Bentuk Badan Hukum"
                required
              /> -->
              <v-select
                v-model="legality"
                :items="itemLegality"
                item-text="name"
                item-value="id"
                prepend-icon="$UMKM"
                label="Bentuk Badan Hukum"
                :disabled="!isEditing"
                :rules="legalityRules"
                single-line
                required
              ></v-select>
              <v-text-field
                prepend-icon="$UMKM"
                v-model="typeCompany"
                :rules="typeCompanyRules"
                :disabled="!isEditing"
                label="Bidang Usaha"
                required
              />
              <!-- <v-text-field
                prepend-icon="$UMKM"
                label="Umur Perusahaan"
                :disabled="!isEditing"
                v-model="oldCompany"
                :rules="oldCompanyRules"
                required
              /> -->
               <v-select
                v-model="oldCompany"
                :items="itemOldCompany"
                item-text="name"
                item-value="name"
                prepend-icon="$UMKM"
                label="Umur Perusahaan"
                :rules="oldCompanyRules"
                :disabled="!isEditing"
                single-line
                required
              ></v-select>
              <v-row>
                <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
                  <!-- <v-text-field
                    prepend-icon="$UMKM"
                    :disabled="!isEditing"
                    v-model="branch"
                    :rules="branchRules"
                    label="Jumlah Cabang"
                    required
                  /> -->
                  <v-select
                    v-model="branch"
                    :items="itemBranch"
                    item-text="name"
                    item-value="name"
                    prepend-icon="$UMKM"
                    label="Jumlah Cabang"
                    :rules="branchRules"
                    :disabled="!isEditing"
                    single-line
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
                  <!-- <v-text-field
                    prepend-icon="$UMKM"
                    :disabled="!isEditing"
                    v-model="employee"
                    :rules="employeeRules"
                    label="Jumlah Karyawan"
                    required
                  /> -->
                  <v-select
                    v-model="employee"
                    :items="itemEmployee"
                    item-text="name"
                    item-value="name"
                    prepend-icon="$UMKM"
                    label="Jumlah Karyawan"
                    :rules="employeeRules"
                    :disabled="!isEditing"
                    single-line
                    required
                  ></v-select>
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
              <v-row>
                <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
                  <v-autocomplete
                    v-model="city"
                    :items="itemsCity"
                    :loading="isLoadingCity"
                    :search-input.sync="searchCity"
                    hide-no-data
                    hide-selected
                    item-text="name"
                    item-value="name"
                    label="Kota Perusahaan"
                    prepend-icon="$location"
                    :disabled="!isEditing"
                    dense
                    persistent-hint
                    :hint="city === '' ? '' : `data yang disimpan : ${city}`"
                    v-if="!manuallyCity"
                    :rules="cityRules"
                  />
                  <v-text-field
                    v-model="city"
                    :rules="cityRules"
                    prepend-icon="$location"
                    label="Kota Perusahaan"
                    required
                    persistent-hint
                    :hint="city === '' ? '' : `data yang disimpan : ${city}`"
                    v-if="manuallyCity"
                    :disabled="!isEditing"
                  />
                  <v-btn
                    text
                    class="text-capitalize ml-4"
                    color="primary"
                    @click="changeManuallyCity()"
                    :disabled="!isEditing"
                  >
                    lain-lain
                  </v-btn>
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
                  <v-autocomplete
                    v-model="province"
                    :items="itemsProvince"
                    :loading="isLoadingProvince"
                    :search-input.sync="searchProvince"
                    hide-no-data
                    hide-selected
                    item-text="name"
                    item-value="name"
                    label="Provinsi Perusahaan"
                    prepend-icon="$location"
                    :disabled="!isEditing"
                    dense
                    persistent-hint
                    :hint="
                      province === '' ? '' : `data yang disimpan : ${province}`
                    "
                    v-if="!manuallyProvince"
                    :rules="provinceRules"
                  />
                  <v-text-field
                    v-model="province"
                    :rules="provinceRules"
                    prepend-icon="$location"
                    label="Provinsi Perusahaan"
                    required
                    persistent-hint
                    :hint="
                      province === '' ? '' : `data yang disimpan : ${province}`
                    "
                    v-if="manuallyProvince"
                    :disabled="!isEditing"
                  />
                  <v-btn
                    text
                    class="text-capitalize ml-4"
                    color="primary"
                    @click="changeManuallyProvince()"
                    :disabled="!isEditing"
                  >
                    lain-lain
                  </v-btn>
                </v-col>
              </v-row>
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
              <v-textarea
                filled
                label="Deskripsi Terkait Perusahaan"
                v-model="description"
                :disabled="!isEditing"
                :rules="descriptionRules"
                :counter="250"
              ></v-textarea>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <div class="mt-3 d-flex justify-end">
              <v-btn color="primary" @click="save" :disabled="!isEditing">
                <v-progress-circular
                  indeterminate
                  color="white"
                  v-if="loadingSave"
                />
                <p v-if="!loadingSave" class="text-capitalize my-auto">
                  simpan
                </p>
              </v-btn>
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
    itemLegality: [
      { id: 'Perseorangan', name: 'Perseorangan' },
      { id: 'Firma', name: 'Firma' },
      { id: 'CV', name: 'Perseroan Komanditer' },
      { id: 'PT', name: 'Perseroan Terbatas' },
      { id: 'Koperasi', name: 'Koperasi' },
    ],
    oldCompany: '',
    oldCompanyRules: [(v) => !!v || 'Umur Perusahan Tidak Boleh Kosong'],
    itemOldCompany: [
      { name: '< 1 tahun' },
      { name: '1 - 5 tahun' },
      { name: '5 - 10  tahun' },
      { name: '> 10  tahun' },
    ],
    typeCompany: '',
    typeCompanyRules: [(v) => !!v || 'Bidang Usaha Tidak Boleh Kosong'],
    branch: '',
    branchRules: [(v) => !!v || 'Cabang Perusahaan Tidak Boleh Kosong'],
    itemBranch: [
      { name: '< 5' },
      { name: '5 - 10' },
      { name: '11 - 20' },
      { name: '21 - 30' },
      { name: '31 - 35' },
      { name: ' > 35' },
    ],
    employee: '',
    employeeRules: [(v) => !!v || 'Jumlah Karyawan Tidak Boleh Kosong'],
    itemEmployee: [
      { name: '< 50 Karyawan' },
      { name: '50 - 100 Karyawan' },
      { name: '100 - 1000 Karyawan' },
      { name: '1000 - 5000 Karyawan' },
      { name: '> 5000 Karyawan' },
    ],
    address: '',
    addressRules: [(v) => !!v || 'Alamat Tidak Boleh Kosong'],
    cityRules: [(v) => !!v || 'Kota Tidak Boleh Kosong'],
    provinceRules: [(v) => !!v || 'Provinsi Tidak Boleh Kosong'],
    link: '',
    linkRules: [
      (v) => !!v || 'Link Website Tidak Boleh Kosong',
      (v) => /^http:|https:/.test(v)
        || 'Link Website Harus Dimulai Dengan http:// atau https://',
    ],
    phone: '',
    phoneRules: [
      (v) => !!v || 'Nomor Telepon Tidak Boleh Kosong',
      (v) => /[0-9]/.test(v) || 'Nomor Telepon Harus Angka (0-9)',
      (v) => /^08/.test(v) || 'Nomor Telepon Harus Dimulai Dengan 08...',
    ],
    imageKTPRules: [
      (v) => !!v || 'Gambar KTP Tidak Boleh Kosong',
      (v) => !v || v.size < 1000000 || 'Gambar KTP Harus Kurang Dari 1MB',
    ],
    imageBrandRules: [
      (v) => !!v || 'Gambar Logo Tidak Boleh Kosong',
      (v) => !v || v.size < 1000000 || 'Gambar Logo Harus Kurang Dari 1MB',
    ],
    loadingSave: false,
    hasSaved: false,
    status: null,
    icon: '',
    message: '',
    skeleton: true,
    // add atttribute
    description: '',
    descriptionRules: [
      (v) => !!v || 'Deskripsi Singkat Anda Tidak Boleh Kosong',
      (v) => v.length < 250 || 'Deskripsi Singat Anda Tidak Boleh Lebih Dari 250',
      // eslint-disable-next-line no-useless-escape
      (v) => /^[a-zA-z., ]*$/.test(v)
        || 'Deskripsi Singat Anda Hanya Boleh Huruf, Titik, Koma, dan Spasi',
    ],
    city: '',
    entriesCity: [],
    isLoadingCity: false,
    searchCity: null,
    manuallyCity: false,
    province: '',
    entriesProvince: [],
    isLoadingProvince: false,
    searchProvince: null,
    manuallyProvince: false,
  }),
  computed: {
    itemsCity() {
      return this.entriesCity.map((entry) => {
        const { name } = entry;
        return { ...entry, name };
      });
    },
    itemsProvince() {
      return this.entriesProvince.map((entry) => {
        const { name } = entry;
        return { ...entry, name };
      });
    },
  },
  watch: {
    searchCity() {
      // Items have already been loaded
      if (this.itemsCity.length > 0) return;

      // Items have already been requested
      if (this.isLoadingCity) return;

      this.isLoadingCity = true;

      // Lazily load input items
      fetch(`${this.$store.state.domain}city`, {
        headers: {
          'x-api-key': this.$store.state.apiKey,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          res.data.city.forEach((i) => {
            this.entriesCity.push({
              name: i.city_name,
            });
          });
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        })
        // eslint-disable-next-line no-return-assign
        .finally(() => (this.isLoadingCity = false));
    },
    searchProvince() {
      // Items have already been loaded
      if (this.itemsProvince.length > 0) return;

      // Items have already been requested
      if (this.isLoadingProvince) return;

      this.isLoadingProvince = true;

      // Lazily load input items
      fetch(`${this.$store.state.domain}province`, {
        headers: {
          'x-api-key': this.$store.state.apiKey,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          res.data.province.forEach((i) => {
            this.entriesProvince.push({
              name: i.province,
            });
          });
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        })
        // eslint-disable-next-line no-return-assign
        .finally(() => (this.isLoadingProvince = false));
    },
  },
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
            city: this.city,
            province: this.province,
            linkWebsite: this.link,
            phone: this.phone,
            photoCard: this.priviewImageKTP,
            photoLogo: this.priviewImageBrand,
            description: this.description,
          },
        })
          .then((response) => {
            if (
              response.data.data.message === 'Data UMKM Is Successfully Update'
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
    changeManuallyCity() {
      this.manuallyCity = !this.manuallyCity;
    },
    changeManuallyProvince() {
      this.manuallyProvince = !this.manuallyProvince;
    },
  },
  beforeCreate() {
    if (this.$store.state.role === 'Perusahaan') {
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
            this.description = response.data.data.umkm[0].description;
            if (response.data.data.umkm[0].city === null) {
              this.city = '';
            } else {
              this.city = response.data.data.umkm[0].city;
            }
            if (response.data.data.umkm[0].province === null) {
              this.province = '';
            } else {
              this.province = response.data.data.umkm[0].province;
            }
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
    } else {
      this.$router.push('/access-block');
    }
  },
};
</script>

<style scoped>
.preview-img {
  max-width: 354px;
  max-height: 354px;
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
