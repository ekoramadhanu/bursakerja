/*
  Nama        : Eko Ramadhanu Aryputra
  Log Date    : 30 Januri 2020 -> check data  after change image base 64 to link
                               -> add request every get per item
  Log Note    :-
*/
<template>
  <div>
    <v-main>
      <v-container class="d-flex flex-column justify-center size-max">
        <v-row>
          <v-spacer
            class="d-none d-md-flex d-lg-none d-lg-flex d-xl-none d-xl-flex"
          ></v-spacer>
          <v-col lg="4" md="4">
            <div class="d-flex justify-end">
              <v-select
                :items="filter"
                label="Pilih Status yang Ditampilkan"
                class="font-family"
                v-model="type"
                dense
                @change="searchCardJobSeeker()"
                outlined
              >
              </v-select>
            </div>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headerJobSeeker"
          :items="jobSeeker"
          class="elevation-3 mt-3 font-family"
          hide-default-footer
          :loading="loadingTable"
          v-if="!skeleton"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <div class="d-flex">
                  <p class="ma-0 font-family">Daftar Karyawan</p>
                </div>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogAdd" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2 mr-3 font-weight-bold"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon size="15" class="white--text mr-2">$add</v-icon>
                    <p class="ma-0 white--text font-family">tambah</p>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="primary d-flex justify-space-between">
                    <p
                      class="headline white--text text-capitalize font-family mb-0"
                    >
                      menambah kartu karyawan
                    </p>
                    <v-btn @click="closeAdd()" icon color="white">
                      <v-icon>$close</v-icon>
                    </v-btn>
                  </v-card-title>

                  <v-card-text class="pt-5">
                    <v-form ref="form" lazy-validation>
                      <p class="mb-0 black--text text-capitalize">
                        <span class="font-family">
                          nomor kartu bursa kerja
                        </span>
                        <span class="ml-1 error--text"> * </span>
                      </p>
                      <v-text-field
                        v-model="editedItemJobSeeker.bursaCard"
                        :rules="bursaCardRules"
                        label="Nomor Kartu Bursa Kerja"
                        required
                        single-line
                        dense
                        outlined
                        class="font-family"
                      />
                      <p class="mb-0 black--text text-capitalize">
                        <span class="font-family"> PIN kartu bursa kerja </span>
                        <span class="ml-1 error--text"> * </span>
                      </p>
                      <v-text-field
                        v-model="editedItemJobSeeker.pin"
                        :rules="pinRules"
                        label="PIN Kartu Bursa Kerja"
                        required
                        single-line
                        dense
                        outlined
                        class="font-family"
                      />
                    </v-form>
                  </v-card-text>

                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary "
                      class="mr-2"
                      @click="closeAdd()"
                    >
                      batal
                    </v-btn>
                    <v-btn
                      color="primary"
                      class="white--text font-family font-weight-bold"
                      @click="saveAdd()"
                      text
                    >
                      <v-progress-circular
                        indeterminate
                        color="primary"
                        v-if="loadingAdd"
                      />
                      <p class="my-auto" v-if="!loadingAdd">
                        simpan
                      </p>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogBatchAdd" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2 font-weight-bold"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon size="15" class="white--text mr-2">$add</v-icon>
                    <p class="ma-0 white--text font-family">CSV</p>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="primary d-flex justify-space-between">
                    <p
                      class="white--text text-capitalize font-family text-h6 mb-0"
                    >
                      menambah kartu karyawan
                    </p>
                    <v-btn @click="closeBatchAdd()" icon color="white">
                      <v-icon>$close</v-icon>
                    </v-btn>
                  </v-card-title>

                  <v-card-text>
                    <v-form ref="form" lazy-validation class="mt-4">
                      <p class="mb-0 black--text text-capitalize">
                        <span class="font-family"> file CSV </span>
                        <span class="ml-1 error--text"> * </span>
                      </p>
                      <v-file-input
                        label="Unggah File CSV (Maks 1 MB)"
                        accept=".csv"
                        required
                        ref="fileInput"
                        enctype="multipart/form-data"
                        class="font-family"
                        :rules="CSVRules"
                        @change="ChangeFile"
                        single-line
                        outlined
                        dense
                        prepend-icon="$fileUpload"
                      />
                    </v-form>
                  </v-card-text>

                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      class="mr-2"
                      @click="closeBatchAdd()"
                    >
                      batal
                    </v-btn>
                    <v-btn
                      color="primary"
                      @click="saveBatchAdd()"
                      text
                    >
                      <v-progress-circular
                        indeterminate
                        color="primary"
                        v-if="loadingBatch"
                      />
                      <p class="my-auto" v-if="!loadingBatch">
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
              label="Pencarian Nomor Kartu"
              class="px-5 font-family"
              single-line
              outlined
              dense
              @click:append="searchCardJobSeeker()"
            />
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="openDialogUpdate(item)"
                  small
                  elevation="0"
                  color="orange"
                  icon
                  v-if="item.status === 'Tidak Aktif'"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>$accountEdit</v-icon>
                </v-btn>
              </template>
              <span class="font-family text-capitalize">ubah data</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  small
                  elevation="0"
                  color="primaryDark"
                  icon
                  v-if="
                    item.status === 'Aktif' &&
                    $store.state.role === 'Admin 3' &&
                    item.name !== '-'
                  "
                  v-bind="attrs"
                  v-on="on"
                  @click="openDialogDetail(item)"
                >
                  <v-icon>$accountCog</v-icon>
                </v-btn>
              </template>
              <span class="font-family text-capitalize">lihat data</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  small
                  elevation="0"
                  color="error"
                  icon
                  v-if="
                    item.status === 'Aktif' && $store.state.role === 'Admin 3'
                  "
                  v-bind="attrs"
                  v-on="on"
                  @click="openDialogResetPassword(item)"
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
            v-if="!skeleton"
            @input="pagination()"
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
      <v-dialog v-model="dialogUpdate" max-width="500px" persistent>
        <v-card>
          <v-card-title class="primary d-flex justify-space-between">
            <p class="headline white--text text-capitalize text-h6">
              mengubah kartu karyawan
            </p>
            <v-btn @click="closeUpdate()" icon color="white">
              <v-icon>$close</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-form ref="form" lazy-validation>
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> nomor kartu bursa kerja </span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <v-text-field
                v-model="editedItemJobSeeker.bursaCard"
                :rules="bursaCardRules"
                label="Nomor Kartu Bursa Kerja"
                required
                single-line
                dense
                outlined
                class="font-family"
              />
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> PIN kartu bursa kerja </span>
                <span class="ml-1 error--text"> * </span>
              </p>
              <v-text-field
                v-model="editedItemJobSeeker.pin"
                :rules="pinRules"
                label="PIN Kartu Bursa Kerja"
                required
                single-line
                dense
                outlined
                class="font-family"
              />
            </v-form>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="primary" class="mr-2" @click="closeUpdate()">
              batal
            </v-btn>
            <v-btn color="primary" @click="saveUpdate()" text>
              <v-progress-circular
                indeterminate
                color="primary"
                v-if="loadingUpdate"
              />
              <p class="my-auto" v-if="!loadingUpdate">simpan</p>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogResetPassword" persistent max-width="450">
        <v-card>
          <v-card-title class="primary d-flex justify-space-between">
            <p class="white--text text-capitalize text-h6">
              reset kata sandi akun pencaker
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
              color="primary"
              class="text-capitalize"
              @click="closeResetPassword()"
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
      <v-dialog
        v-model="dialogDetail"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar class="primary">
            <div class="size-max mx-auto d-flex">
              <v-btn icon @click="dialogDetail = false">
                <v-icon class="white--text">mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title class="text-capitalize white--text my-auto ml-1">
                <span class="font-family"> lihat data pencaker </span>
              </v-toolbar-title>
              <v-spacer></v-spacer>
            </div>
          </v-toolbar>
          <v-card-text class="px-0 py-1 mx-auto size-max">
            <v-form v-if="!loadingDialog">
              <v-img
                :src="previewImg"
                class="preview-img mx-auto"
                aspect-ratio="1.7"
              />
              <div class="d-flex justify-center">
                <v-btn
                  color="primary"
                  class="my-1"
                  @click="download()"
                >
                  <v-progress-circular
                    indeterminate
                    color="white"
                    v-if="loadingDownload"
                  />
                  <p class="my-auto white--text" v-if="!loadingDownload">
                    unduh
                  </p>
                </v-btn>
              </div>
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> nama lengkap</span>
              </p>
              <v-text-field
                v-model="fullname"
                label="Nama Lengkap"
                readonly
                outlined
                required
                dense
                single-line
              />
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> NIK </span>
              </p>
              <v-text-field
                v-model="idCard"
                label="NIK"
                readonly
                outlined
                required
                dense
                single-line
              />
              <v-row>
                <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> Gelar Depan </span>
                  </p>
                  <v-text-field
                    v-model="frontDegree"
                    label="Gelar Depan"
                    readonly
                    outlined
                    required
                    dense
                    single-line
                  />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> Gelar belakang </span>
                  </p>
                  <v-text-field
                    v-model="backwardDegree"
                    label="Gelar Belakang"
                    readonly
                    outlined
                    required
                    dense
                    single-line
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> tempat lahir </span>
                  </p>
                  <v-text-field
                    v-model="placeBirth"
                    label="Tempat Lahir"
                    readonly
                    outlined
                    required
                    dense
                    single-line
                  />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> tanggal lahir </span>
                  </p>
                  <v-text-field
                    v-model="date"
                    label="Tanggal Lahir"
                    readonly
                    outlined
                    required
                    dense
                    single-line
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> jenis kelamin </span>
                  </p>
                  <v-text-field
                    v-model="sex"
                    label="Pilih Jenis Kelamin"
                    readonly
                    outlined
                    required
                    dense
                    single-line
                  />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> agama </span>
                  </p>
                  <v-text-field
                    v-model="religion"
                    label="Pilih Agama"
                    readonly
                    outlined
                    required
                    dense
                    single-line
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> status pernikahan </span>
                  </p>
                  <v-text-field
                    v-model="married"
                    label="Pilih Status Pernikahan"
                    outlined
                    readonly
                    required
                    dense
                    single-line
                  />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> status kewarganegaraan </span>
                  </p>
                  <v-text-field
                    v-model="nationality"
                    label="Pilih Status Kewarganegaraan"
                    outlined
                    readonly
                    required
                    dense
                    single-line
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> berat badan </span>
                  </p>
                  <v-text-field
                    v-model="height"
                    label="Berat Badan"
                    readonly
                    outlined
                    required
                    dense
                    single-line
                  />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> tinggi badan </span>
                  </p>
                  <v-text-field
                    v-model="weight"
                    label="Tinggi Badan"
                    readonly
                    outlined
                    required
                    dense
                    single-line
                  />
                </v-col>
              </v-row>
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> Telepon </span>
              </p>
              <v-text-field
                label="Telepon"
                v-model="phone"
                readonly
                outlined
                required
                dense
                single-line
              />
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> Alamat </span>
              </p>
              <v-text-field
                v-model="address"
                label="Alamat"
                readonly
                outlined
                required
                dense
                single-line
              />
              <v-row>
                <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> Provinsi </span>
                  </p>
                  <v-text-field
                    v-model="province"
                    label="Provinsi"
                    readonly
                    outlined
                    required
                    dense
                    single-line
                  />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> Kota Kabupaten </span>
                  </p>
                  <v-text-field
                    v-model="city"
                    label="Kota / Kabupaten"
                    readonly
                    outlined
                    required
                    dense
                    single-line
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> kecamatan </span>
                  </p>
                  <v-text-field
                    v-model="district"
                    label="Kecamatan"
                    readonly
                    outlined
                    required
                    dense
                    single-line
                  />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> kode pos </span>
                  </p>
                  <v-text-field
                    v-model="postalCode"
                    label="Kode Pos"
                    readonly
                    outlined
                    required
                    dense
                    single-line
                  />
                </v-col>
              </v-row>
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> deskripsi terkait anda </span>
              </p>
              <v-textarea
                label="Deskripsi Terkait Anda"
                v-model="aboutMe"
                readonly
                outlined
                required
                dense
                single-line
              ></v-textarea>
              <v-row>
                <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> hobi anda </span>
                  </p>
                  <v-textarea
                    label="Hobi Anda"
                    v-model="hobby"
                    readonly
                    outlined
                    required
                    dense
                    single-line
                  ></v-textarea>
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> penghargaan </span>
                  </p>
                  <v-textarea
                    label="Penghargaan/Sertifikat"
                    v-model="sertification"
                    readonly
                    outlined
                    required
                    dense
                    single-line
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> tingkat pendidikan </span>
                  </p>
                  <v-text-field
                    v-model="education"
                    label="Tingkat Pendidikan"
                    readonly
                    outlined
                    required
                    dense
                    single-line
                  ></v-text-field>
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> sekolah </span>
                  </p>
                  <v-text-field
                    v-model="instantion"
                    label="Sekolah"
                    readonly
                    outlined
                    required
                    dense
                    single-line
                  />
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> jenis pendidikan </span>
                  </p>
                  <v-text-field
                    v-model="typeEducation"
                    label="Jenis Pendidikan"
                    readonly
                    outlined
                    required
                    dense
                    single-line
                  ></v-text-field>
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> jurusan </span>
                  </p>
                  <v-text-field
                    v-model="mayor"
                    label="Jurusan"
                    readonly
                    outlined
                    required
                    dense
                    single-line
                  />
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> tahun lulus </span>
                  </p>
                  <v-text-field
                    v-model="dateGraduate"
                    label="Tahun Lulus"
                    readonly
                    outlined
                    required
                    dense
                    single-line
                  />
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> nilai akhir / IPK </span>
                  </p>
                  <v-text-field
                    v-model="score"
                    label="Nilai Akhir /IPK"
                    readonly
                    outlined
                    required
                    dense
                    single-line
                  />
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12" class="py-0">
                  <p class="mb-0 black--text text-capitalize">
                    <span class="font-family"> riwayat pendidikan </span>
                  </p>
                  <v-textarea
                    v-model="expSchool"
                    label="Riwayat Pendidikan"
                    readonly
                    outlined
                    required
                    dense
                    single-line
                  ></v-textarea>
                </v-col>
              </v-row>
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> keahlian bahasa </span>
              </p>
              <v-textarea
                v-model="skillLanguange"
                label="Keahlian Bahasa"
                readonly
                outlined
                required
                dense
                single-line
              ></v-textarea>
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> keterampilan </span>
              </p>
              <v-textarea
                v-model="skill"
                label="Keterampilan"
                readonly
                outlined
                required
                dense
                single-line
              ></v-textarea>
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> pengelaman kerja </span>
              </p>
              <v-textarea
                label="Pengalaman Kerja"
                v-model="experience"
                readonly
                outlined
                required
                dense
                single-line
              ></v-textarea>
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> artikel ilmiah </span>
              </p>
              <v-textarea
                label="Artikel Ilmiah"
                v-model="article"
                readonly
                outlined
                required
                dense
                single-line
              ></v-textarea>
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> penempatan </span>
              </p>
              <v-text-field
                v-model="location"
                label="Penempatan"
                readonly
                outlined
                required
                dense
                single-line
              ></v-text-field>
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> kota yang diinginkan </span>
              </p>
              <v-text-field
                v-model="deiredRegion"
                label="Kota"
                readonly
                outlined
                required
                dense
                single-line
              />
              <p class="mb-0 black--text text-capitalize">
                <span class="font-family"> jabatan yang diinginkan </span>
              </p>
              <v-text-field
                v-model="position"
                label="Jabatan Yang Dinginkan"
                readonly
                outlined
                required
                dense
                single-line
              />
            </v-form>
            <div v-if="loadingDialog" class="d-flex justify-center align-center full-height">
              <v-progress-circular
                indeterminate
                color="primary"
                size="64"
              />
            </div>
          </v-card-text>
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
import csvToJson from 'csvtojson';

export default {
  data: () => ({
    dialogAdd: false,
    dialogUpdate: false,
    dialogBatchAdd: false,
    dialogResetPassword: false,
    dialogDetail: false,
    loadingAdd: false,
    loadingUpdate: false,
    loadingBatch: false,
    loadingTable: false,
    loadingResetPassword: false,
    loadingDialog: false,
    headerJobSeeker: [
      {
        text: 'Nomor',
        sortable: false,
        value: 'number',
      },
      { text: 'Nomor Kartu', value: 'bursaCard', sortable: false },
      { text: 'PIN', value: 'pin', sortable: false },
      { text: 'Status', value: 'status', sortable: false },
      { text: 'Nama Pemegang', value: 'name', sortable: false },
      { text: 'Aksi', value: 'actions', sortable: false },
    ],
    jobSeeker: [],
    editedIndex: -1,
    editedItemJobSeeker: {
      bursaCard: '',
      pin: '',
    },
    defaultItem: {
      bursaCard: '',
      pin: '',
    },
    page: 1,
    pageCount: 3,
    search: '',
    type: 'Tampilkan Semua',
    filter: ['Aktif', 'Tidak Aktif', 'Tampilkan Semua'],
    pinRules: [(v) => !!v || 'PIN Bursa Kerja Tidak Boleh Kosong'],
    csv: null,
    nameFile: 'Silahkan Pilih File CSV',
    CSVRules: [
      (v) => !!v || 'File CSV Tidak Boleh Kosong',
      (v) => !v || v.size < 1000000 || 'File CSV Harus Kurang Dari 1MB',
    ],
    bursaCardRules: [
      (v) => !!v || 'Nomor Bursa Kerja Tidak Boleh Kosong',
      (v) => /^BK01/.test(v) || 'Nomor Bursa Kerja Tidak Valid',
    ],
    skeleton: true,
    hasSaved: false,
    status: null,
    icon: '',
    message: '',
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
    fullname: '',
    idCard: '',
    frontDegree: '',
    backwardDegree: '',
    placeBirth: '',
    date: '',
    sex: '',
    religion: '',
    married: '',
    nationality: '',
    height: '',
    weight: '',
    phone: '',
    address: '',
    province: '',
    city: '',
    district: '',
    postalCode: '',
    aboutMe: '',
    hobby: '',
    sertification: '',
    education: '',
    instantion: '',
    typeEducation: '',
    mayor: '',
    dateGraduate: '',
    score: '',
    expSchool: '',
    skillLanguange: '',
    skill: '',
    experience: '',
    article: '',
    location: '',
    deiredRegion: '',
    position: '',
    previewImg: '',
    id: '',
    typeFile: '',
    loadingDownload: false,
  }),
  methods: {
    pagination() {
      this.loadingTable = true;
      this.jobSeeker.splice(0, this.jobSeeker.length);
      this.methodGetCardjobSeeker();
    },
    searchCardJobSeeker() {
      this.loadingTable = true;
      this.page = 1;
      this.jobSeeker.splice(0, this.jobSeeker.length);
      this.methodGetCardjobSeeker();
    },
    closeAdd() {
      this.dialogAdd = false;
      this.$nextTick(() => {
        this.editedItemJobSeeker = { ...this.defaultItem };
        this.editedIndex = -1;
        this.$refs.form.resetValidation();
      });
    },
    async saveAdd() {
      if (this.$refs.form.validate()) {
        try {
          this.loadingAdd = true;
          const response = await axios({
            baseURL: `${this.$store.state.domain}job-seeker/card`,
            method: 'post',
            headers: {
              'x-api-key': this.$store.state.apiKey,
              Authorization: `Bearer ${this.$cookies.get('token')}`,
            },
            data: {
              bursaCard: this.editedItemJobSeeker.bursaCard,
              pin: this.editedItemJobSeeker.pin,
            },
          });
          if (
            response.data.data.attributes.data
              === 'Data Job Seeker Is Successfully Created'
          ) {
            this.hasSaved = true;
            this.status = true;
            this.message = 'data berhasil disimpan';
            this.icon = '$success';
          } else if (
            response.data.data.attributes.data === 'Bursa Card Already Exist'
          ) {
            this.hasSaved = true;
            this.status = false;
            this.message = 'nomor kartu sudah ada';
            this.icon = '$warning';
          } else {
            this.hasSaved = true;
            this.status = false;
            this.message = 'data tidak berhasil disimpan';
            this.icon = '$warning';
          }
          this.loadingTable = true;
          this.page = 1;
          if (this.jobSeeker.length > 0) {
            this.jobSeeker.splice(0, this.jobSeeker.length);
          }
          this.methodGetCardjobSeeker();
          this.loadingAdd = false;
          this.closeAdd();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      }
    },
    openDialogUpdate(item) {
      this.editedIndex = this.jobSeeker.indexOf(item);
      this.editedItemJobSeeker = { ...item };
      this.dialogUpdate = true;
    },
    async saveUpdate() {
      if (this.$refs.form.validate()) {
        try {
          this.loadingUpdate = true;
          const response = await axios({
            baseURL: `${this.$store.state.domain}job-seeker/card/${
              this.jobSeeker[this.editedIndex].id
            }`,
            method: 'patch',
            headers: {
              'x-api-key': this.$store.state.apiKey,
              Authorization: `Bearer ${this.$cookies.get('token')}`,
            },
            data: {
              bursaCard: this.editedItemJobSeeker.bursaCard,
              pin: this.editedItemJobSeeker.pin,
            },
          });
          if (
            response.data.data.attributes.data
              === 'Data Job Seeker Is Successfully Updated'
          ) {
            this.hasSaved = true;
            this.status = true;
            this.message = 'data berhasil diubah';
            this.icon = '$success';
          } else if (
            response.data.data.attributes.data === 'Bursa Card Already Exist'
          ) {
            this.hasSaved = true;
            this.status = false;
            this.message = 'nomor kartu sudah ada';
            this.icon = '$warning';
          } else {
            this.hasSaved = true;
            this.status = false;
            this.message = 'data tidak berhasil diubah';
            this.icon = '$warning';
          }
          this.loadingTable = true;
          this.page = 1;
          if (this.jobSeeker.length > 0) {
            this.jobSeeker.splice(0, this.jobSeeker.length);
          }
          this.methodGetCardjobSeeker();
          this.loadingUpdate = false;
          this.closeUpdate();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      }
    },
    closeUpdate() {
      this.dialogUpdate = false;
      this.$nextTick(() => {
        this.editedItemJobSeeker = { ...this.defaultItem };
        this.editedIndex = -1;
        this.$refs.form.resetValidation();
      });
    },
    ChangeFile(event) {
      const reader = new FileReader();
      if (event !== undefined) {
        this.nameFile = event.name;
        reader.onload = () => {
          this.csv = `${reader.result}`;
        };
        reader.readAsText(event);
      }
    },
    closeBatchAdd() {
      this.dialogBatchAdd = false;
      this.nameFile = 'Silahkan Pilih File CSV';
      this.csv = undefined;
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
    },
    async saveBatchAdd() {
      if (this.$refs.form.validate()) {
        const jsonObj = await csvToJson().fromString(this.csv);
        this.loadingBatch = true;
        axios({
          baseURL: `${this.$store.state.domain}job-seeker/csv`,
          method: 'post',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          data: {
            cardJson: JSON.stringify(jsonObj),
          },
        })
          .then((response) => {
            if (response.data.data.attributes.data === 'File CSV Not Valid') {
              this.hasSaved = true;
              this.status = false;
              this.message = 'format file CSV tidak sesuai';
              this.icon = '$warning';
            } else if (
              response.data.data.attributes.data === 'Bursa Card Is Already Exist'
            ) {
              this.hasSaved = true;
              this.status = false;
              this.message = 'nomor kartu sudah ada';
              this.icon = '$warning';
            } else if (response.data.data.attributes.data === 'Data Job Seeker Is Successfully Created') {
              this.hasSaved = true;
              this.status = true;
              this.message = 'data berhasil ditambahkan';
              this.icon = '$success';
            } else {
              this.hasSaved = true;
              this.status = false;
              this.message = 'server mengalami error';
              this.icon = '$warning';
            }
            this.loadingTable = true;
            this.page = 1;
            if (this.jobSeeker.length > 0) {
              this.jobSeeker.splice(0, this.jobSeeker.length);
            }
            this.methodGetCardjobSeeker(1);
          })
          .catch(() => {
            this.hasSaved = true;
            this.status = false;
            this.message = 'server mengalami error';
            this.icon = '$warning';
          })
          .finally(() => {
            this.loadingBatch = false;
            this.closeBatchAdd();
          });
      }
    },
    openDialogResetPassword(item) {
      this.editedIndex = this.jobSeeker.indexOf(item);
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
          baseURL: `${this.$store.state.domain}job-seeker/reset-password/${
            this.jobSeeker[this.editedIndex].id
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
            === 'Data Job Seeker Is Successfully Update'
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
        if (this.jobSeeker.length > 0) {
          this.jobSeeker.splice(0, this.jobSeeker.length);
        }
        this.methodGetCardjobSeeker();
        this.loadingResetPassword = false;
        this.closeResetPassword();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    async openDialogDetail(item) {
      this.dialogDetail = true;
      this.loadingDialog = true;
      this.id = item.id;
      const response = await axios({
        baseURL: `${this.$store.state.domain}job-seeker/${item.id}`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          Authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      });
      const response1 = await axios({
        baseURL: `${this.$store.state.domain}job-seeker/stream-photo/${item.id}`,
        method: 'get',
        headers: {
          'x-api-key': this.$store.state.apiKey,
          Authorization: `Bearer ${this.$cookies.get('token')}`,
        },
        responseType: 'blob',
      });
      this.fullname = response.data.data.attributes[0].fullname;
      this.idCard = response.data.data.attributes[0].idCard;
      this.frontDegree = response.data.data.attributes[0].frontDegree;
      this.backwardDegree = response.data.data.attributes[0].backwardDegree;
      this.placeBirth = response.data.data.attributes[0].placeOfBirth;
      this.date = response.data.data.attributes[0].dateOfBirth;
      this.sex = response.data.data.attributes[0].sex;
      this.religion = response.data.data.attributes[0].religion;
      this.married = response.data.data.attributes[0].married;
      this.nationality = response.data.data.attributes[0].nasionality;
      this.height = response.data.data.attributes[0].height;
      this.weight = response.data.data.attributes[0].weight;
      this.phone = response.data.data.attributes[0].phone;
      this.address = response.data.data.attributes[0].address;
      this.province = response.data.data.attributes[0].province;
      this.city = response.data.data.attributes[0].city;
      this.district = response.data.data.attributes[0].district;
      this.postalCode = response.data.data.attributes[0].postalCode;
      this.aboutMe = response.data.data.attributes[0].aboutMe;
      this.hobby = response.data.data.attributes[0].hobby;
      this.sertification = response.data.data.attributes[0].certification;
      this.education = response.data.data.attributes[0].degreeSchool;
      this.instantion = response.data.data.attributes[0].nameSchool;
      this.typeEducation = response.data.data.attributes[0].typeSchool;
      this.mayor = response.data.data.attributes[0].majors;
      this.dateGraduate = response.data.data.attributes[0].yearsGraduate;
      this.score = response.data.data.attributes[0].score;
      this.expSchool = response.data.data.attributes[0].expSchool;
      this.skillLanguange = response.data.data.attributes[0].language;
      this.skill = response.data.data.attributes[0].skill;
      this.experience = response.data.data.attributes[0].experience;
      this.article = response.data.data.attributes[0].article;
      this.location = response.data.data.attributes[0].placement;
      this.deiredRegion = response.data.data.attributes[0].desiredRegion;
      this.position = JSON.parse(response.data.data.attributes[0].desiredPosition).join(', ');
      this.typeFile = response1.data.type;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImg = e.target.result;
      };
      reader.readAsDataURL(response1.data);
      this.loadingDialog = false;
    },
    async download() {
      try {
        this.loadingDownload = true;
        const response = await axios({
          baseURL: `${this.$store.state.domain}job-seeker/stream-photo/${this.id}`,
          method: 'get',
          headers: {
            'x-api-key': this.$store.state.apiKey,
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        if (this.typeFile.includes('png')) {
          link.setAttribute('download', 'image.png');
        } else {
          link.setAttribute('download', 'image.jpg');
        }
        document.body.appendChild(link);
        link.click();
        this.loadingDownload = false;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    // method universal
    async methodGetCardjobSeeker() {
      try {
        const header = {
          'x-api-key': this.$store.state.apiKey,
          Authorization: `Bearer ${this.$cookies.get('token')}`,
        };
        if (this.type === 'Aktif') {
          header.status = 'activate';
        } else if (this.type === 'Tidak Aktif') {
          header.status = 'deactivate';
        }

        if (this.search !== '') {
          header.keyword = this.search;
        }

        const response = await axios({
          baseURL: `${this.$store.state.domain}job-seeker/card/${this.page}`,
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
          let nameCard = '';
          response.data.data.attributes.forEach((i) => {
            counter += 1;
            if (i.status === '0') {
              nameStatus = 'Tidak Aktif';
            } else {
              nameStatus = 'Aktif';
            }
            if (i.name === null) {
              nameCard = '-';
            } else {
              nameCard = i.name;
            }
            this.jobSeeker.push({
              id: i.id,
              number: counter,
              name: nameCard,
              bursaCard: i.bursa_card,
              status: nameStatus,
              pin: i.pin,
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
      const lettersSetArray = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
      ];
      const symbolsSetArray = [
        '=',
        '+',
        '-',
        '^',
        '?',
        '!',
        '%',
        '&',
        '*',
        '$',
        '#',
        '^',
        '@',
        '|',
      ];
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
          passwordArray[i] = lettersSetArray[
            Math.floor(Math.random() * lettersSetArray.length)
          ].toUpperCase();
        } else {
          passwordArray[i] = lettersSetArray[Math.floor(Math.random() * lettersSetArray.length)];
        }
      }

      // Add digits to password
      for (i = 0; i < this.settings.digits; i += 1) {
        const digit = Math.round(Math.random() * 9);
        const numberIndex = digitsPositionArray[
          Math.floor(Math.random() * digitsPositionArray.length)
        ];

        passwordArray[numberIndex] = digit;

        const j = digitsPositionArray.indexOf(numberIndex);
        if (i !== -1) {
          digitsPositionArray.splice(j, 1);
        }
      }

      // add special charachters "symbols"
      for (i = 0; i < this.settings.symbols; i += 1) {
        const symbol = symbolsSetArray[Math.floor(Math.random() * symbolsSetArray.length)];
        const symbolIndex = digitsPositionArray[
          Math.floor(Math.random() * digitsPositionArray.length)
        ];

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
    if (
      this.$store.state.role === 'Admin 1'
      || this.$store.state.role === 'UMKM'
      || this.$store.state.role === 'Magang'
      || this.$store.state.role === 'Umum'
      || this.$store.state.role === 'Profesional'
      || this.$store.state.role === 'Informal'
    ) {
      this.$router.push('/access-block');
    } else {
      try {
        const response = await axios({
          baseURL: `${this.$store.state.domain}job-seeker/card/1`,
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
          let nameCard = '';
          response.data.data.attributes.forEach((i) => {
            counter += 1;
            if (i.status === '0') {
              nameStatus = 'Tidak Aktif';
            } else {
              nameStatus = 'Aktif';
            }
            if (i.name === null) {
              nameCard = '-';
            } else {
              nameCard = i.name;
            }
            this.jobSeeker.push({
              id: i.id,
              number: counter,
              name: nameCard,
              bursaCard: i.bursa_card,
              status: nameStatus,
              pin: i.pin,
            });
          });
        } else {
          this.pageCount = 0;
        }
        this.skeleton = false;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  },
  beforeDestroy() {
    this.dialogAdd = null;
    this.dialogUpdate = null;
    this.dialogBatchAdd = null;
    this.dialogResetPassword = null;
    this.dialogDetail = null;
    this.loadingAdd = null;
    this.loadingUpdate = null;
    this.loadingBatch = null;
    this.loadingTable = null;
    this.loadingResetPassword = null;
    this.loadingDialog = null;
    this.headerJobSeeker = null;
    this.jobSeeker = null;
    this.editedIndex = null;
    this.editedItemJobSeeker = null;
    this.defaultItem = null;
    this.page = null;
    this.pageCount = null;
    this.search = null;
    this.type = null;
    this.filter = null;
    this.pinRules = null;
    this.csv = null;
    this.nameFile = null;
    this.CSVRules = null;
    this.bursaCardRules = null;
    this.skeleton = null;
    this.hasSaved = null;
    this.status = null;
    this.icon = null;
    this.message = null;
    this.resetPassword = null;
    this.resetPaswordRules = null;
    this.settings = null;
    this.fullname = null;
    this.idCard = null;
    this.frontDegree = null;
    this.backwardDegree = null;
    this.placeBirth = null;
    this.date = null;
    this.sex = null;
    this.religion = null;
    this.married = null;
    this.nationality = null;
    this.height = null;
    this.weight = null;
    this.phone = null;
    this.address = null;
    this.province = null;
    this.city = null;
    this.district = null;
    this.postalCode = null;
    this.aboutMe = null;
    this.hobby = null;
    this.sertification = null;
    this.education = null;
    this.instantion = null;
    this.typeEducation = null;
    this.mayor = null;
    this.dateGraduate = null;
    this.score = null;
    this.expSchool = null;
    this.skillLanguange = null;
    this.skill = null;
    this.experience = null;
    this.article = null;
    this.location = null;
    this.deiredRegion = null;
    this.position = null;
    this.previewImg = null;
    this.id = null;
    this.typeFile = null;

    delete this.dialogAdd;
    delete this.dialogUpdate;
    delete this.dialogBatchAdd;
    delete this.dialogResetPassword;
    delete this.dialogDetail;
    delete this.loadingAdd;
    delete this.loadingUpdate;
    delete this.loadingBatch;
    delete this.loadingTable;
    delete this.loadingResetPassword;
    delete this.loadingDialog;
    delete this.headerJobSeeker;
    delete this.jobSeeker;
    delete this.editedIndex;
    delete this.editedItemJobSeeker;
    delete this.defaultItem;
    delete this.page;
    delete this.pageCount;
    delete this.search;
    delete this.type;
    delete this.filter;
    delete this.pinRules;
    delete this.csv;
    delete this.nameFile;
    delete this.CSVRules;
    delete this.bursaCardRules;
    delete this.skeleton;
    delete this.hasSaved;
    delete this.status;
    delete this.icon;
    delete this.message;
    delete this.resetPassword;
    delete this.resetPaswordRules;
    delete this.settings;
    delete this.fullname;
    delete this.idCard;
    delete this.frontDegree;
    delete this.backwardDegree;
    delete this.placeBirth;
    delete this.date;
    delete this.sex;
    delete this.religion;
    delete this.married;
    delete this.nationality;
    delete this.height;
    delete this.weight;
    delete this.phone;
    delete this.address;
    delete this.province;
    delete this.city;
    delete this.district;
    delete this.postalCode;
    delete this.aboutMe;
    delete this.hobby;
    delete this.sertification;
    delete this.education;
    delete this.instantion;
    delete this.typeEducation;
    delete this.mayor;
    delete this.dateGraduate;
    delete this.score;
    delete this.expSchool;
    delete this.skillLanguange;
    delete this.skill;
    delete this.experience;
    delete this.article;
    delete this.location;
    delete this.deiredRegion;
    delete this.position;
    delete this.previewImg;
    delete this.id;
    delete this.typeFile;
  },
};
</script>

<style scoped>
.size-max {
  width: 100vw;
  max-width: 1044px;
}
.preview-img {
  position: relative;
  width: 209px;
  height: 209px;
  overflow: hidden;
  border-radius: 50%;
}
</style>
