<template>
  <div>
    <v-main>
      <v-container class="d-flex flex-column justify-center size-max">
        <div v-if="this.$store.state.uploadData && !skeleton">
          <v-alert
            text
            color="error"
          >
            <div class="d-flex">
              <v-icon class="error--text mr-2">$warning</v-icon>
              <p class="text-subtitle-1 my-auto text-capitalize">
                silahkan isi identitas UMKM terlebih dahulu
              </p>
            </div>
          </v-alert>
        </div>
        <v-card elevation="3" class="mt-3" v-if="!skeleton">
          <v-toolbar flat color="primary">
            <v-icon class="mr-2 white--text">$CV</v-icon>
            <v-toolbar-title
              class="font-weight-light text-capitalize white--text"
            >
              data UMKM
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="white" fab small @click="isEditing = !isEditing || loadingSave">
              <v-icon v-if="isEditing" class="primary--text">
                mdi-close
              </v-icon>
              <v-icon v-else class="primary--text"> mdi-pencil </v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="py-4 px-6">
            <v-form ref="form" lazy-validation>
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family">nama perusahaan</span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <v-text-field
                :disabled="!isEditing"
                v-model="nameCompany"
                :rules="nameCompanyRules"
                label="Nama Perusahaan"
                required
                single-line
                dense
                class="font-family"
                outlined
              />
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family">pemilik perusahaan</span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <v-text-field
                :disabled="!isEditing"
                v-model="owner"
                :rules="ownerRules"
                label="Pemilik Perusahaan"
                required
                single-line
                dense
                class="font-family"
                outlined
              />
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family">betuk badan hukum</span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <v-select
                v-model="legality"
                :items="itemLegality"
                item-text="name"
                item-value="id"
                label="Bentuk Badan Hukum"
                :disabled="!isEditing"
                :rules="legalityRules"
                required
                single-line
                dense
                class="font-family"
                outlined
              ></v-select>
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family">bidang usaha</span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <v-text-field
                v-model="typeCompany"
                :rules="typeCompanyRules"
                :disabled="!isEditing"
                label="Bidang Usaha"
                required
                single-line
                dense
                class="font-family"
                outlined
              />
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family">umur perusahaan</span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <v-select
                v-model="oldCompany"
                :items="itemOldCompany"
                item-text="name"
                item-value="name"
                label="Umur Perusahaan"
                :rules="oldCompanyRules"
                :disabled="!isEditing"
                required
                single-line
                dense
                class="font-family"
                outlined
              ></v-select>
              <v-row>
                <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family">umur perusahaan</span>
                    <span class="ml-1 error--text"> * </span>
                  </p>
                  <v-select
                    v-model="branch"
                    :items="itemBranch"
                    item-text="name"
                    item-value="name"
                    label="Jumlah Cabang"
                    :rules="branchRules"
                    :disabled="!isEditing"
                    required
                    single-line
                    dense
                    class="font-family"
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family">umur perusahaan</span>
                    <span class="ml-1 error--text"> * </span>
                  </p>
                  <v-select
                    v-model="employee"
                    :items="itemEmployee"
                    item-text="name"
                    item-value="name"
                    label="Jumlah Karyawan"
                    :rules="employeeRules"
                    :disabled="!isEditing"
                    required
                    single-line
                    dense
                    class="font-family"
                    outlined
                  ></v-select>
                </v-col>
              </v-row>
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family">alamat perusahaan</span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <v-text-field
                label="Alamat Peruhasaaan"
                :disabled="!isEditing"
                v-model="address"
                :rules="addressRules"
                required
                single-line
                dense
                class="font-family"
                outlined
              />
              <v-row>
                <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family">Provinsi</span>
                    <span class="ml-1 error--text"> * </span>
                  </p>
                  <v-autocomplete
                    v-model="province"
                    :items="itemsProvince"
                    :loading="isLoadingProvince"
                    :search-input.sync="searchProvince"
                    hide-no-data
                    hide-selected
                    item-text="name"
                    item-value="id"
                    label="Provinsi"
                    persistent-hint
                    :disabled="!isEditing"
                    :hint="
                      province === ''
                        ? ''
                        : `Data Yang Disimpan : ${province.name}`
                    "
                    :rules="provinceRules"
                    return-object
                    required
                    single-line
                    dense
                    class="font-family"
                    outlined
                  />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family">kota / kabupaten</span>
                    <span class="ml-1 error--text"> * </span>
                  </p>
                  <v-autocomplete
                    v-model="city"
                    :items="itemsCity"
                    :loading="isLoadingCity"
                    :search-input.sync="searchCity"
                    hide-no-data
                    hide-selected
                    item-text="name"
                    item-value="id"
                    label="Kota/Kabupaten"
                    :disable-lookup="province === null ? true : false"
                    persistent-hint
                    return-object
                     :disabled="!isEditing"
                    :hint="
                      city === ''
                        ? 'silahkan pilih provinsi terlebih dahulu'
                        : `Data Yang Disimpan : ${city.name}`
                    "
                    :rules="cityRules"
                    required
                    single-line
                    dense
                    class="font-family"
                    outlined
                  />
                </v-col>
              </v-row>
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family">link website</span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <v-text-field
                label="Link website"
                :disabled="!isEditing"
                v-model="link"
                :rules="linkRules"
                required
                single-line
                dense
                class="font-family"
                outlined
              />
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family">nomor telepon</span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <v-text-field
                label="Nomor Telepon"
                :disabled="!isEditing"
                v-model="phone"
                :rules="phoneRules"
                required
                single-line
                dense
                class="font-family"
                outlined
              />
              <p class="mb-0 black--text">
                <span class="font-family">Unggah Foto KTP JPG/ PNG (Maks 1 MB) </span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <v-file-input
                label="Unggah Foto KTP (Maks 1 MB)"
                accept="image/png, image/jpeg, image/jpg"
                required
                ref="fileInput"
                enctype="multipart/form-data"
                :rules="priviewImageKTP !== null ? [] : imageKTPRules"
                :disabled="!isEditing"
                prepend-icon="$fileUpload"
                @change="ChangeImageKTP"
                single-line
                dense
                class="font-family"
                outlined
              ></v-file-input>
              <img
                :src="priviewImageKTP"
                v-if="priviewImageKTP != null"
                class="preview-img"
                contain
                aspect-ratio="1.7"
              />
              <p class="mb-0 black--text">
                <span class="font-family">Unggah Logo Perusahaan (Maks 1 MB) </span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <v-file-input
                label="Unggah Logo Perusahaan (Maks 1 MB)"
                accept="image/png, image/jpeg, image/jpg"
                required
                ref="fileInput"
                enctype="multipart/form-data"
                :rules="priviewImageBrand !== null ? [] : imageBrandRules"
                :disabled="!isEditing"
                @change="ChangeImageBrand"
                prepend-icon="$fileUpload"
                single-line
                dense
                class="font-family"
                outlined
              ></v-file-input>
              <img
                :src="priviewImageBrand"
                v-if="priviewImageBrand != null"
                class="preview-img"
                contain
                aspect-ratio="1.7"
              />
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family">deskripsi terkait perusahaan</span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <v-textarea
                label="Deskripsi Terkait Perusahaan"
                v-model="description"
                :disabled="!isEditing"
                :rules="descriptionRules"
                :counter="250"
                single-line
                dense
                class="font-family"
                outlined
              ></v-textarea>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <div v-if="loadingSave" class="my-2">
              <p class="text-capitalize mb-0 text-subtitle-1 font-weight-bold">
                progress upload file
              </p>
              <v-progress-linear
                :value="percentCompleted"
                color="light-blue"
                height="10"
                striped
              />
            </div>
            <v-spacer></v-spacer>
            <div class="mt-3 d-flex justify-end">
              <v-btn color="primary" @click="save" :disabled="!isEditing || loadingSave">
                <p  class="text-capitalize my-auto">
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
      { name: '< 5 Cabang' },
      { name: '5 - 10 Cabang' },
      { name: '11 - 20 Cabang' },
      { name: '21 - 30 Cabang' },
      { name: '31 - 35 Cabang' },
      { name: ' > 35 Cabang' },
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
      (v) => (v || '').length <= 250
        || 'Deskripsi Singkat Tidak Boleh Lebih Dari 250',
      // eslint-disable-next-line no-useless-escape
      (v) => /^[a-zA-z., ]*$/.test(v)
        || 'Deskripsi Singat Anda Hanya Boleh Huruf, Titik, Koma, dan Spasi',
    ],
    city: '',
    entriesCity: [],
    isLoadingCity: false,
    searchCity: null,
    province: '',
    entriesProvince: [],
    isLoadingProvince: false,
    searchProvince: null,
    percentCompleted: 0,
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
      fetch(`${this.$store.state.domain}city/province/${this.province.id}`, {
        headers: {
          'x-api-key': this.$store.state.apiKey,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          res.data.attributes.data.forEach((i) => {
            this.entriesCity.push({
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
          res.data.attributes.forEach((i) => {
            this.entriesProvince.push({
              id: i.id,
              name: this.capitalizeEachWord(i.name),
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
    async save() {
      if (this.$refs.form.validate()) {
        try {
          const context = this;
          this.loadingSave = true;
          const response = await axios({
            baseURL: `${this.$store.state.domain}umkm/identity`,
            method: 'patch',
            headers: {
              'x-api-key': this.$store.state.apiKey,
              Authorization: `Bearer ${this.$cookies.get('token')}`,
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
              city: this.city.name,
              province: this.province.name,
              linkWebsite: this.link,
              phone: this.phone,
              photoCard: this.priviewImageKTP,
              photoLogo: this.priviewImageBrand,
              description: this.description,
            },
            onUploadProgress(progressEvent) {
              context.percentCompleted = Math.round((progressEvent.loaded * 100)
              / progressEvent.total);
            },
          });
          if (
            response.data.data.attributes.data === 'Data UMKM Is Successfully Update'
          ) {
            this.hasSaved = true;
            this.status = true;
            this.message = 'data berhasil diubah';
            this.icon = '$success';
            this.$store.commit('changeUploadData', false);
          } else {
            this.hasSaved = true;
            this.status = false;
            this.message = 'data tidak berhasil diubah';
            this.icon = '$warning';
          }
          this.isEditing = false;
          this.loadingSave = false;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      }
    },
    capitalizeEachWord(str) {
      return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
      );
    },
  },
  async beforeCreate() {
    if (this.$store.state.role === 'Perusahaan') {
      try {
        const response = await axios({
          baseURL: `${this.$store.state.domain}umkm/token`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        });
        if (response.data.data.attributes.length > 0) {
          this.nameCompany = response.data.data.attributes[0].name;
          this.owner = response.data.data.attributes[0].owner;
          this.legality = response.data.data.attributes[0].legality;
          this.typeCompany = response.data.data.attributes[0].type;
          this.oldCompany = response.data.data.attributes[0].old;
          this.branch = response.data.data.attributes[0].branches;
          this.employee = response.data.data.attributes[0].employee;
          this.address = response.data.data.attributes[0].address;
          this.link = response.data.data.attributes[0].linkWebsite;
          this.phone = response.data.data.attributes[0].phone;
          this.description = response.data.data.attributes[0].description;
          if (response.data.data.attributes[0].city === null) {
            this.city = '';
          } else {
            this.city = { ...{ name: response.data.data.attributes[0].city } };
          }
          if (response.data.data.attributes[0].province === null) {
            this.province = '';
          } else {
            this.province = { ...{ name: response.data.data.attributes[0].province } };
          }
          if (response.data.data.attributes[0].imageLogo !== null) {
            const response1 = await axios({
              baseURL: `${this.$store.state.domain}umkm/stream-brand`,
              method: 'get',
              headers: {
                'x-api-key': this.$store.state.apiKey,
                Authorization: `Bearer ${this.$cookies.get('token')}`,
              },
              responseType: 'blob',
            });
            const reader = new FileReader();
            reader.onload = (e) => {
              this.priviewImageBrand = e.target.result;
            };
            reader.readAsDataURL(response1.data);
          }
          if (response.data.data.attributes[0].imageCard !== null) {
            const response2 = await axios({
              baseURL: `${this.$store.state.domain}umkm/stream-card`,
              method: 'get',
              headers: {
                'x-api-key': this.$store.state.apiKey,
                Authorization: `Bearer ${this.$cookies.get('token')}`,
              },
              responseType: 'blob',
            });
            const reader = new FileReader();
            reader.onload = (e) => {
              this.priviewImageKTP = e.target.result;
            };
            reader.readAsDataURL(response2.data);
          }
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
