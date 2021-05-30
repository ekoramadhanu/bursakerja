<template>
  <div class="d-flex justify-center">
    <div class="max-width">
        <h3 class="text-center my-2 text-capitalize">
            daftar pencarian kerja
        <hr class="line mx-auto" />
        </h3>
        <v-form class="px-9">
        <v-text-field v-model="search" label="Pencarian" append-outer-icon="$search"/>
        </v-form>
        <v-row v-for="i in returnModuleByFour(10)" :key="i" class="px-9">
        <v-col cols="12" xl="3" lg="3" md="3" sm="6" xs="12" v-for=" j in returnlist(i)" :key="j">
            <v-card width="100%">
            <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
                <v-card-title>Top 10 Australian beaches</v-card-title>
            </v-img>
            <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>
            <v-card-text class="text--primary">
                <div>Whitehaven Beach</div>
                <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>
            <v-card-actions>
                <v-btn color="orange" text>Share</v-btn>
                <v-btn color="orange" text>Explore</v-btn>
            </v-card-actions>
            </v-card>
        </v-col>
        </v-row>
        <div class="text-canter">
            <v-pagination
                v-model="page"
                total-visible="10"
                :length="11"
            ></v-pagination>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: '',
    page: 1,
  }),
  methods: {
    returnModuleByFour(payload) {
      if (payload % 4 === 0) {
        return payload / 4;
      }
      return Math.floor(payload / 4) + 1;
    },
    returnlist(payload) {
      const counter = payload * 4;
      if (counter < 10) {
        return 4;
      }
      return 4 - (counter - 10);
    },
  },
};
</script>

<style scoped>
.line {
  width: 50px;
  border: 1px solid black;
}
.max-width{
    max-width: 1366px;
}
</style>
