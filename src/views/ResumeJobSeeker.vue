<template>
  <div>
    <v-main>
      <v-container class="d-flex flex-column justify-center size-max mb-8">
        <v-form lazy-validation ref="form" class="mt-6">
          <v-card class="rounded-xl" elevation="3" v-if="!skeleton">
            <v-card-text class="pa-4">
              <p class="text-capitalize font-weight-bold text-h6">
                <span class="font-family"> data diri </span>
              </p>
              <v-row>
                <v-col cols="12" lg="4" xl="4" md="4" sm="12" xs="12">
                  <div class="d-flex flex-column">
                    <v-card
                      elevation="3"
                      width="209"
                      height="209"
                      class="rounded-circle mx-auto mb-4"
                    >
                      <img
                        :src="priviewImage"
                        v-if="priviewImage != null"
                        class="preview-img"
                        aspect-ratio="1.7"
                      />
                    </v-card>
                    <v-btn
                      color="primary"
                      :loading="isSelecting"
                      @click="onButtonClick"
                      width="100vw"
                      height="100vh"
                      max-width="132"
                      max-height="44"
                      class="mx-auto"
                    >
                      unggah file
                    </v-btn>
                    <input
                      ref="uploader"
                      class="d-none"
                      type="file"
                      accept="image/*"
                      @change="ChangeImage"
                    />
                  </div>
                  <p class="mb-0 text-center mt-2 error--text text-capitalize">
                    {{ fileMessage }}
                  </p>
                  <p class="mb-0 text-center mt-4 font-italic">
                    Unggah foto ukuran 3x4 Maksimal 1 MB
                  </p>
                </v-col>
                <v-col cols="12" lg="8" xl="8" md="8" sm="12" xs="12">
                  <v-text-field
                    v-model="idCard"
                    :rules="idCardRules"
                    label="Nomor KTP / NIK"
                    required
                  />
                  <v-text-field
                    v-model="fullname"
                    :rules="fullnameRules"
                    label="Nama Lengkap"
                    required
                  />
                  <v-row>
                    <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                      <v-text-field
                        v-model="frontDegree"
                        :rules="frontDegreeRules"
                        label="Gelar Depan"
                        hint="Jika Tidak Ada Silahkan Isi '-'"
                        persistent-hint
                        required
                      />
                    </v-col>
                    <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                      <v-text-field
                        v-model="backwardDegree"
                        :rules="backwardDegreeRules"
                        label="Gelar Belakang"
                        hint="Jika Tidak Ada Silahkan Isi '-'"
                        persistent-hint
                        required
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                      <v-text-field
                        label="Tempat Lahir"
                        required
                        v-model="placeBirth"
                        :rules="placeBirthRules"
                      />
                    </v-col>
                    <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                      <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="computedDateFormatted"
                            label="Tanggal Lahir"
                            :rules="dateRules"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date"
                          @input="menu = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                      <v-select
                        v-model="sex"
                        :rules="sexRules"
                        :items="sexList"
                        item-text="name"
                        item-value="id"
                        label="Pilih Jenis Kelamin"
                      />
                    </v-col>
                    <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                      <v-select
                        v-model="religion"
                        :rules="religionRules"
                        :items="religionList"
                        item-text="name"
                        item-value="name"
                        label="Pilih Agama"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                      <v-select
                        v-model="married"
                        :rules="marriedRules"
                        :items="marriedList"
                        item-text="name"
                        item-value="id"
                        label="Pilih Status Pernikahan"
                      />
                    </v-col>
                    <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                      <v-select
                        v-model="nationality"
                        :rules="nationalityRules"
                        :items="nationalityList"
                        item-text="name"
                        item-value="id"
                        label="Pilih Status Kewarganegaraan"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
                      <v-text-field
                        v-model="height"
                        :rules="heightRules"
                        label="Berat Badan"
                        required
                      />
                    </v-col>
                    <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
                      <v-text-field
                        v-model="weight"
                        :rules="weightRules"
                        label="Tinggi Badan"
                        required
                      />
                    </v-col>
                  </v-row>
                  <v-text-field
                    label="Telepon"
                    required
                    v-model="phone"
                    :rules="phoneRules"
                  />
                  <v-text-field
                    v-model="address"
                    :rules="addressRules"
                    label="Alamat"
                    required
                  />
                  <v-row>
                    <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
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
                        :hint="
                          province.name === undefined
                            ? ''
                            : `data yang disimpan : ${province.name}`
                        "
                        :rules="provinceRules"
                        return-object
                      />
                    </v-col>
                    <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
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
                        :hint="
                          city === null
                            ? 'silahkan pilih provinsi terlebih dahulu'
                            : `data yang disimpan : ${city.name}`
                        "
                        :rules="cityRules"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
                      <v-autocomplete
                        v-model="district"
                        :items="itemsDistrict"
                        :loading="isLoadingDistrict"
                        :search-input.sync="searchDistrict"
                        hide-no-data
                        hide-selected
                        item-text="name"
                        item-value="id"
                        label="Kecamatan"
                        persistent-hint
                        return-object
                        :hint="
                          district === null
                            ? 'silahkan pilih kota/kabupaten terlebih dahulu'
                            : `data yang disimpan : ${district.name}`
                        "
                        :rules="districtRules"
                      />
                    </v-col>
                    <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
                      <v-text-field
                        v-model="postalCode"
                        :rules="postalCodeRules"
                        label="Kode Pos"
                        required
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-skeleton-loader
            ref="skeleton"
            type="card"
            v-if="skeleton"
            class="mt-3"
          ></v-skeleton-loader>
          <v-card class="rounded-xl mt-4" elevation="3" v-if="!skeleton">
            <v-card-text class="pa-4">
              <p class="text-capitalize font-weight-bold text-h6 mb-8">
                <span class="font-family"> Deskripsi Diri </span>
              </p>
              <v-textarea
                filled
                label="Deskripsi Terkait Anda"
                v-model="aboutMe"
                :rules="aboutMeRules"
                :counter="250"
              ></v-textarea>
              <v-row>
                <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                  <tip-tap-vuetify
                    v-model="hobby"
                    placeholder="Hobi"
                    :extensions="extensions"
                    :card-props="{ height: '300', style: 'overflow: auto;' }"
                  />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                  <tip-tap-vuetify
                    v-model="sertification"
                    placeholder="Penghargaan/Sertifikat"
                    :extensions="extensions"
                    :card-props="{ height: '300', style: 'overflow: auto;' }"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-skeleton-loader
            ref="skeleton"
            type="card"
            v-if="skeleton"
            class="mt-3"
          ></v-skeleton-loader>
          <v-row class="mt-4">
            <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
              <v-card class="rounded-xl" elevation="3" v-if="!skeleton">
                <v-card-text class="pa-4">
                  <p class="text-capitalize font-weight-bold text-h6">
                    <span class="font-family"> Pendidikan </span>
                  </p>
                  <v-row>
                    <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
                      <v-select
                        v-model="education"
                        :items="itemSchool"
                        item-text="name"
                        item-value="name"
                        label="Tingkat Pendidikan"
                        :rules="educationRules"
                        single-line
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
                      <v-text-field
                        v-model="instantion"
                        :rules="instantionRules"
                        label="Instansi Pendidikan"
                        required
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
                      <v-text-field
                        v-model="typeEducation"
                        :rules="typeEducationRules"
                        label="Jenis Pendidikan"
                        required
                      />
                    </v-col>
                    <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
                      <v-text-field
                        v-model="mayor"
                        :rules="mayorRules"
                        label="Jurusan"
                        required
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
                      <v-text-field
                        v-model="dateGraduate"
                        :rules="dategraduateRules"
                        label="Tahun Lulus"
                        required
                      />
                    </v-col>
                    <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
                      <v-text-field
                        v-model="score"
                        :rules="scoreRules"
                        label="Nilai Akhir /IPK"
                        required
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              <v-skeleton-loader
                ref="skeleton"
                type="card"
                v-if="skeleton"
                class="mt-3"
              ></v-skeleton-loader>
            </v-col>
            <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
              <v-card class="rounded-xl" elevation="3" v-if="!skeleton">
                <v-card-text class="pa-4">
                  <tip-tap-vuetify
                    v-model="expSchool"
                    placeholder="Riwayat Pendidikan"
                    :extensions="extensions"
                    :card-props="{ height: '362', style: 'overflow: auto;' }"
                  />
                </v-card-text>
              </v-card>
              <v-skeleton-loader
                ref="skeleton"
                type="card"
                v-if="skeleton"
                class="mt-3"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row class="mt-4">
            <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
              <v-card class="rounded-xl mt-4" elevation="3" v-if="!skeleton">
                <v-card-text class="pa-4">
                  <p class="text-capitalize font-weight-bold text-h6">
                    <span class="font-family">
                      Keahlian &amp; Keterampilan
                    </span>
                  </p>
                  <v-row>
                    <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                      <tip-tap-vuetify
                        v-model="skillLanguange"
                        placeholder="Keahlian Bahasa"
                        :extensions="extensions"
                        :card-props="{
                          height: '300',
                          style: 'overflow: auto;',
                        }"
                      />
                    </v-col>
                    <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                      <tip-tap-vuetify
                        v-model="skill"
                        placeholder="Keterampilan"
                        :extensions="extensions"
                        :card-props="{
                          height: '300',
                          style: 'overflow: auto;',
                        }"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-card class="rounded-xl mt-4" elevation="3" v-if="!skeleton">
            <v-card-text class="pa-4">
              <p class="text-capitalize font-weight-bold text-h6">
                <span class="font-family"> Pengalaman Kerja </span>
              </p>
              <tip-tap-vuetify
                v-model="experience"
                placeholder="Pengalaman Kerja"
                :extensions="extensions"
                :card-props="{ height: '300', style: 'overflow: auto;' }"
              />
            </v-card-text>
          </v-card>
          <v-card class="rounded-xl mt-4" elevation="3" v-if="!skeleton">
            <v-card-text class="pa-4">
              <p class="text-capitalize font-weight-bold text-h6">
                <span class="font-family"> Artikel Ilmiah </span>
              </p>
              <tip-tap-vuetify
                v-model="article"
                placeholder="Artikel Ilmiah"
                :extensions="extensions"
                :card-props="{ height: '300', style: 'overflow: auto;' }"
              />
            </v-card-text>
          </v-card>
          <v-card class="rounded-xl mt-4" elevation="3" v-if="!skeleton">
            <v-card-text class="pa-4">
              <p class="text-capitalize font-weight-bold text-h6">
                <span class="font-family">
                  Data Pekerjaan yang Diinginkan
                </span>
              </p>
              <v-row>
                <v-col cols="12" xl="4" lg="4" md="4" sm="12" xs="12">
                  <v-autocomplete
                    v-model="deiredRegion"
                    :items="itemsDeiredRegion"
                    :loading="isLoadingDeiredRegion"
                    :search-input.sync="searchDeiredRegion"
                    hide-no-data
                    hide-selected
                    item-text="name"
                    item-value="name"
                    label="Wilayah yang Diinginkan"
                    persistent-hint
                    :hint="
                      deiredRegion === ''
                        ? ''
                        : `data yang disimpan : ${deiredRegion}`
                    "
                    :rules="deiredRegionRules"
                  />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="12" xs="12">
                  <v-select
                    v-model="location"
                    :items="locationList"
                    item-text="name"
                    item-value="name"
                    label="Penempatan"
                    :rules="locationRules"
                    single-line
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="4" sm="12" xs="12">
                  <v-text-field
                    label="Jabatan"
                    required
                    v-model="desiredPosition"
                    :rules="desiredPositionRules"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <div class="d-flex justify-end mt-4">
            <v-btn color="primary" @click="save">
              <v-progress-circular
                indeterminate
                color="white"
                v-if="loadingSave"
              />
              <p v-if="!loadingSave" class="my-auto">simpan perubahan</p>
            </v-btn>
          </div>
        </v-form>
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
import goTo from 'vuetify/es5/services/goto';
import axios from 'axios';

export default {
  data: () => ({
    items: [
      {
        text: 'Curiculum Vitae',
        disabled: true,
      },
    ],
    date: '',
    menu: false,
    sex: '',
    idCard: '',
    idCardRules: [
      (v) => !!v || 'Nomor KTP/NIK Tidak Boleh Kosong',
      (v) => /^[0-9]*$/.test(v) || 'Nomor KTP/NIK Harus Angka (0-9)',
    ],
    frontDegree: '',
    frontDegreeRules: [(v) => !!v || 'Gelar Depan Tidak Boleh Kosong'],
    placeBirth: '',
    placeBirthRules: [(v) => !!v || 'Tempat Tanggal Lahir Tidak Boleh Kosong'],
    fullname: '',
    fullnameRules: [(v) => !!v || 'Nama lengkap Tidak Boleh Kosong'],
    backwardDegree: '',
    backwardDegreeRules: [(v) => !!v || 'Gelar Belakang Tidak Boleh Kosong'],
    dateRules: [(v) => !!v || 'Tanggal Lahir Tidak Boleh Kosong'],
    sexList: [
      { id: 'L', name: 'Laki-Laki' },
      { id: 'P', name: 'Perempuan' },
    ],
    sexRules: [(v) => !!v || 'Jenis Kelamin Tidak Boleh Kosong'],
    religion: '',
    religionRules: [(v) => !!v || 'Agama Tidak Boleh Kosong'],
    religionList: [
      { name: 'Islam' },
      { name: 'Protestan' },
      { name: 'Katolik' },
      { name: 'Hindu' },
      { name: 'Buddha' },
      { name: 'Konghuchu' },
    ],
    married: '',
    marriedList: [
      { id: 'Belum', name: 'Belum Menikah' },
      { id: 'Sudah', name: 'Sudah Menikah' },
    ],
    marriedRules: [(v) => !!v || 'Status Pernikahan Tidak Boleh Kosong'],
    nationality: '',
    nationalityRules: [(v) => !!v || 'Kewarganegaraa Tidak Boleh Kosong'],
    nationalityList: [
      { id: 'WNI', name: 'Warga Negara Indonesia' },
      { id: 'WNA', name: 'Warga Negara Asing' },
    ],
    height: '',
    heightRules: [
      (v) => !!v || 'Berat Badan Tidak Boleh Kosong',
      (v) => /^[0-9]*$/.test(v) || 'Berat Badan Harus Angka (0-9)',
    ],
    weight: '',
    weightRules: [
      (v) => !!v || 'Tinggi Badan Tidak Boleh Kosong',
      (v) => /^[0-9]*$/.test(v) || 'Tinggi Badan Harus Angka (0-9)',
    ],
    phone: '',
    phoneRules: [
      (v) => !!v || 'Nomor Telepon Tidak Boleh Kosong',
      (v) => /^[0-9]*$/.test(v) || 'Nomor Telepon Harus Angka',
      (v) => /^08/.test(v) || 'Nomor Telepon Harus Dimulai Dengan 08...',
    ],
    address: '',
    addressRules: [(v) => !!v || 'Alamat Tidak Boleh Kosong'],
    districtRules: [(v) => !!v || 'Kecamatan Tidak Boleh Kosong'],
    cityRules: [(v) => !!v || 'Kota Tidak Boleh Kosong'],
    provinceRules: [(v) => !!v || 'Provinsi Tidak Boleh Kosong'],
    postalCode: '',
    postalCodeRules: [
      (v) => !!v || 'Kode Pos Tidak Boleh Kosong',
      (v) => /[0-9]/.test(v) || 'Kode Pos Harus Angka (0-9)',
    ],
    education: '',
    educationRules: [(v) => !!v || 'Tingkat Pendidikan Tidak Boleh Kosong'],
    itemSchool: '',
    instantion: '',
    instantionRules: [
      (v) => !!v || 'Nama Instansi Pendidikan Tidak Boleh Kosong',
    ],
    typeEducation: '',
    typeEducationRules: [(v) => !!v || 'Jenis Pendidikan Tidak Boleh Kosong'],
    mayor: '',
    mayorRules: [(v) => !!v || 'Jurusan Tidak Boleh Kosong'],
    dateGraduate: '',
    dategraduateRules: [
      (v) => !!v || 'Tahun Kelulusan Tidak Boleh Kosong',
      (v) => /^[0-9]*$/.test(v) || 'Tahun Kelulusan Harus Angka (0-9)',
    ],
    score: '',
    scoreRules: [
      (v) => !!v || 'Nilai Ijazah /IPK Tidak Boleh Kosong',
      (v) => /^[0-9.]*$/.test(v) || 'Nilai Ijazah /IPK Hanya Bisa Angka Dan Titik',
    ],
    fileMessage: '',
    location: '',
    locationRules: [(v) => !!v || 'Penempatan Tidak Boleh Kosong'],
    locationList: [{ name: 'Dalam Negeri' }, { name: 'Luar Negeri' }],
    // deiredRegion: '',
    deiredRegionRules: [
      (v) => !!v || 'Wilayah Yang Diinginkan Tidak Boleh Kosong',
    ],
    desiredPosition: '',
    desiredPositionRules: [
      (v) => !!v || 'Jabatan Yang Diinginkan Tidak Boleh Kosong',
    ],
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
    // starting editor's content
    aboutMe: '',
    aboutMeRules: [
      (v) => !!v || 'Deskripsi Singkat Anda Tidak Boleh Kosong',
      (v) => /^[a-zA-z., ]*$/.test(v)
        || 'Deskripsi Singat Anda Hanya Boleh Huruf, Titik, Koma, dan Spasi',
      (v) => (v || '').length <= 250
        || 'Deskripsi Singkat Tidak Boleh Lebih Dari 250',
    ],
    skillLanguange: '',
    skill: '',
    experience: '',
    hobby: '',
    sertification: '',
    article: '',
    expSchool: '',
    priviewImage: null,
    isEditing: null,
    hasSaved: false,
    loadingSave: false,
    status: null,
    icon: '',
    message: '',
    skeleton: true,
    // add user
    city: {},
    entriesCity: [],
    isLoadingCity: false,
    searchCity: null,
    manuallyCity: false,
    province: {},
    entriesProvince: [],
    isLoadingProvince: false,
    searchProvince: null,
    district: {},
    entriesDistrict: [],
    isLoadingDistrict: false,
    searchDistrict: null,
    deiredRegion: '',
    entriesDeiredRegion: [],
    isLoadingDeiredRegion: false,
    searchDeiredRegion: null,
    selectedFile: null,
    isSelecting: false,
  }),
  computed: {
    computedDateFormatted() {
      if (this.date !== '') {
        const [year, month, day] = this.date.split('-');
        return `${day}/${month}/${year}`;
      }
      return '';
    },
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
    itemsDistrict() {
      return this.entriesDistrict.map((entry) => {
        const { name } = entry;
        return { ...entry, name };
      });
    },
    itemsDeiredRegion() {
      return this.entriesDeiredRegion.map((entry) => {
        const { name } = entry;
        return { ...entry, name };
      });
    },
    districtLookup() {
      return this.city === null && this.province === null;
    },
    buttonText() {
      return this.selectedFile ? this.selectedFile : '';
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
          res.data.city.forEach((i) => {
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
    searchDeiredRegion() {
      // Items have already been loaded
      if (this.entriesDeiredRegion.length > 0) return;

      // Items have already been requested
      if (this.isLoadingDeiredRegion) return;

      this.isLoadingDeiredRegion = true;

      // Lazily load input items
      fetch(`${this.$store.state.domain}city`, {
        headers: {
          'x-api-key': this.$store.state.apiKey,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          res.data.city.forEach((i) => {
            this.entriesDeiredRegion.push({
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
        .finally(() => (this.isLoadingDeiredRegion = false));
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
    searchDistrict() {
      // Items have already been loaded
      if (this.itemsDistrict.length > 0) return;

      // Items have already been requested
      if (this.isLoadingDistrict) return;

      this.isLoadingDistrict = true;

      // Lazily load input items
      if (this.city !== null && this.province !== null) {
        fetch(`${this.$store.state.domain}district/city/${this.city.id}`, {
          headers: {
            'x-api-key': this.$store.state.apiKey,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            res.data.district.forEach((i) => {
              this.entriesDistrict.push({
                id: i.id,
                name: this.capitalizeEachWord(i.name),
                cityId: i.cityId,
              });
            });
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err);
          })
          // eslint-disable-next-line no-return-assign
          .finally(() => (this.isLoadingDistrict = false));
      } else {
        this.isLoadingDistrict = false;
      }
    },
  },
  components: {
    'tip-tap-vuetify': TiptapVuetify,
  },
  methods: {
    ChangeImage(event) {
      this.selectedFile = [...event.target.files];
      if (event.target.files[0].size <= 1000000) {
        this.fileMessage = '';
      } else {
        this.fileMessage = 'file tidak boleh lebih dari 1MB';
      }
      if (event == null) {
        this.priviewImage = null;
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.priviewImage = e.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    },
    save() {
      if (this.$refs.form.validate() && this.selectedFile !== null) {
        if (this.selectedFile[0].size > 1000000) {
          goTo(0);
        } else if (this.skillLanguange === '<p></p>') {
          this.hasSaved = true;
          this.status = false;
          this.message = 'keahlian bahasa harus diisi jika tidak punya silahkan isi(-)';
          this.icon = '$warning';
        } else if (this.skill === '<p></p>') {
          this.hasSaved = true;
          this.status = false;
          this.message = 'keterampilan harus diisi jika tidak punya silahkan isi(-)';
          this.icon = '$warning';
        } else if (this.experience === '<p></p>') {
          this.hasSaved = true;
          this.status = false;
          this.message = 'pengalaman kerja harus diisi jika tidak punya silahkan isi(-)';
          this.icon = '$warning';
        } else if (this.hobby === '<p></p>') {
          this.hasSaved = true;
          this.status = false;
          this.message = 'hobi harus diisi jika tidak punya silahkan isi(-)';
          this.icon = '$warning';
        } else {
          this.loadingSave = true;
          axios({
            baseURL: `${this.$store.state.domain}job-seeker/identity`,
            method: 'patch',
            headers: {
              'x-api-key': this.$store.state.apiKey,
              authorization: `Bearer ${this.$cookies.get('token')}`,
            },
            data: {
              idCard: this.idCard,
              fullname: this.fullname,
              frontDegree: this.frontDegree,
              backwardDegree: this.backwardDegree,
              placeOfBirth: this.placeBirth,
              dateOfBirth: this.date,
              sex: this.sex,
              religion: this.religion,
              married: this.married,
              nasionality: this.nationality,
              weight: this.weight,
              height: this.height,
              phone: this.phone,
              address: this.address,
              district: this.district.name,
              city: this.city.name,
              province: this.province.name,
              postalCode: this.postalCode,
              degreeSchool: this.education,
              nameSchool: this.instantion,
              typeSchool: this.typeEducation,
              majors: this.mayor,
              yearsGraduate: this.dateGraduate,
              score: this.score,
              language: this.skillLanguange,
              skill: this.skill,
              experience: this.experience,
              photo: this.priviewImage,
              desiredRegion: this.deiredRegion,
              desiredPosition: this.desiredPosition,
              placement: this.location,
              hobby: this.hobby,
              article: this.article,
              certification: this.sertification,
              expSchool: this.expSchool,
              aboutMe: this.aboutMe,
            },
          })
            .then((response) => {
              if (
                response.data.data.message
                === 'Data Job Seeker Is Successfully Update'
              ) {
                this.hasSaved = true;
                this.status = true;
                this.message = 'data berhasil disimpan';
                this.icon = '$success';
                this.isEditing = false;
              } else if (
                response.data.data.message === 'Id Card Has Been Used'
              ) {
                this.hasSaved = true;
                this.status = false;
                this.message = 'NIK sudah digunakan';
                this.icon = '$warning';
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
              this.loadingSave = false;
            });
        }
      }
    },
    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener(
        'focus',
        () => {
          this.isSelecting = false;
        },
        { once: true },
      );

      this.$refs.uploader.click();
    },
    capitalizeEachWord(str) {
      return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
      );
    },
  },
  beforeCreate() {
    if (this.$store.state.role === 'Pencaker') {
      axios({
        baseURL: `${this.$store.state.domain}job-seeker/token`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      })
        .then((response) => {
          if (response.data.data.jobSeeker.length > 0) {
            this.selectedFile = [{ size: 900000 }];
            this.idCard = response.data.data.jobSeeker[0].idCard;
            this.fullname = response.data.data.jobSeeker[0].fullname;
            this.frontDegree = response.data.data.jobSeeker[0].frontDegree;
            this.backwardDegree = response.data.data.jobSeeker[0].backwardDegree;
            if (response.data.data.jobSeeker[0].dateOfBirth === null) {
              this.date = '';
            } else {
              this.date = response.data.data.jobSeeker[0].dateOfBirth;
            }
            this.sex = response.data.data.jobSeeker[0].sex;
            this.religion = response.data.data.jobSeeker[0].religion;
            this.married = response.data.data.jobSeeker[0].married;
            this.nationality = response.data.data.jobSeeker[0].nasionality;
            this.weight = response.data.data.jobSeeker[0].weight;
            this.height = response.data.data.jobSeeker[0].height;
            this.phone = response.data.data.jobSeeker[0].phone;
            this.address = response.data.data.jobSeeker[0].address;
            this.district.name = response.data.data.jobSeeker[0].district;
            this.city.name = response.data.data.jobSeeker[0].city;
            this.province.name = response.data.data.jobSeeker[0].province;
            this.postalCode = response.data.data.jobSeeker[0].postalCode;
            this.education = response.data.data.jobSeeker[0].degreeSchool;
            this.instantion = response.data.data.jobSeeker[0].nameSchool;
            this.typeEducation = response.data.data.jobSeeker[0].typeSchool;
            this.mayor = response.data.data.jobSeeker[0].majors;
            this.dateGraduate = response.data.data.jobSeeker[0].yearsGraduate;
            this.score = response.data.data.jobSeeker[0].score;
            this.skillLanguange = response.data.data.jobSeeker[0].language;
            this.skill = response.data.data.jobSeeker[0].skill;
            this.experience = response.data.data.jobSeeker[0].experience;
            this.priviewImage = response.data.data.jobSeeker[0].image;
            this.deiredRegion = response.data.data.jobSeeker[0].desiredRegion;
            this.desiredPosition = response.data.data.jobSeeker[0].desiredPosition;
            this.location = response.data.data.jobSeeker[0].placement;
            this.placeBirth = response.data.data.jobSeeker[0].placeOfBirth;
            this.hobby = response.data.data.jobSeeker[0].hobby;
            this.expSchool = response.data.data.jobSeeker[0].expSchool;
            this.sertification = response.data.data.jobSeeker[0].certification;
            this.article = response.data.data.jobSeeker[0].article;
            this.aboutMe = response.data.data.jobSeeker[0].aboutMe;
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
  created() {
    this.itemSchool = [...this.$store.state.itemsSchool];
  },
};
</script>

<style scoped>
.size-max {
  max-width: 1366px;
}
.tip-tap-size {
  overflow: auto;
  max-height: 300px;
}
.preview-img {
  position: relative;
  width: 209px;
  height: 209px;
  overflow: hidden;
  border-radius: 50%;
}
div >>> ul > li {
  line-height: 25px !important;
}
div >>> ol > li {
  line-height: 25px !important;
}
div >>> li > p {
  margin-bottom: 5px !important;
}
div >>> li {
  margin-bottom: 10px;
}
div >>> li > ol {
  margin: 0px;
}
div >>> li > ul {
  margin: 0px;
}
</style>
