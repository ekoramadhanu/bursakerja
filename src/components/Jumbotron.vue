<template>
  <div class="fullscreen d-flex justify-center">
    <v-row class="ma-0 max-width hidden-xs-only">
      <v-col
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="6"
        xs="12"
        class="pl-9 pr-1 d-flex align-center"
      >
        <div class="d-flex flex-column">
          <h1>Bursa Kerja</h1>
          <h3 class="text-justify">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Doloremque, doloribus obcaecati quisquam labore, nihil consequatur
            aut sit molestiae consequuntur excepturi autem! Optio voluptatibus
            odio dolorem ipsam enim adipisci molestiae incidunt.
          </h3>
          <div class="d-flex">
            <v-btn
              width="150"
              class="mr-2 text-capitalize"
              color="primary"
              to="/job-seeker/adfab9c56b8b16d6c067f8d3cff8818e"
              >Cari Karyawan</v-btn
            >
            <v-btn
              width="150"
              color="primary"
              class="text-capitalize"
              to="/job-vacancy"
              :outlined="outlined"
              @mouseover="changeOutlined()"
              @mouseout="changeOutlined()"
              >Cari Lowongan</v-btn
            >
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="6"
        xs="12"
        class="d-flex align-center"
      >
        <v-img
          src="@/assets/jumbotron.svg"
          max-height="547"
          height="auto"
          aspect-ratio="1.7"
          contain
        ></v-img>
      </v-col>
    </v-row>
    <v-row class="hidden-sm-and-up max-width">
      <v-col cols="12" xs="12" class="pl-6 pr-6 d-flex align-center">
        <div class="d-flex flex-column">
          <h1>Bursa Kerja</h1>
          <h3 class="text-justify">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Doloremque, doloribus obcaecati quisquam labore, nihil consequatur
            aut sit molestiae consequuntur excepturi autem! Optio voluptatibus
            odio dolorem ipsam enim adipisci molestiae incidunt.
          </h3>
          <div class="d-flex flex-column mt-3">
            <v-btn
              class="text-capitalize"
              color="primary"
              to="/job-seeker/adfab9c56b8b16d6c067f8d3cff8818e"
              >Cari Karyawan</v-btn
            >
            <v-btn
              color="primary"
              to="/job-vacancy"
              class="text-capitalize mt-3"
              :outlined="outlined"
              @mouseover="changeOutlined()"
              @mouseout="changeOutlined()"
              >Cari Lowongan</v-btn
            >
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    outlined: true,
  }),
  methods: {
    changeOutlined() {
      this.outlined = !this.outlined;
    },
  },
  beforeDestroy() {
    this.outlined = null;

    delete this.outlined;
  },
};
</script>

<style scoped>
.fullscreen {
  height: 100vh;
  width: 100vw;
  max-width: 100vw;
  max-height: 571px;
}
.max-width {
  max-width: 1366px;
}
@media screen and (max-width: 600px) {
  .max-width {
    max-width: 100vw;
  }
}
</style>
