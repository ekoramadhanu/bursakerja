<template>
    <div class="fullscreen d-flex justify-center align-center pa-2">
      <div class="d-flex flex-column">
        <img src="@/assets/maintenance-animate.svg" alt="Halaman Tidak Ditemukan" />
        <h1 class="text-center">Server Sedang Maintenance</h1>
        <div class="border pa-5 mt-3">
          <vue-countdown :time="time" :interval="100" tag="div">
            <template slot-scope="props">
              <v-row class="d-flex justify-space-around card-countdown mx-auto">
                <v-col
                  class="d-flex justify-space-around py-0 px-2"
                  cols="12"
                  xl="3"
                  lg="3"
                  md="3"
                  sm="3"
                >
                  <div>
                    <p
                      class="text-h2 primary--text font-weight-bold mb-0 text-center font-family-1"
                    >
                      <span>
                        {{ props.days }}
                      </span>
                    </p>
                    <p
                      class="text-h6 primary--text mb-0 font-weight-bold font-family-1 text-center"
                    >
                      Hari
                    </p>
                  </div>
                  <div class="hidden-xs-only">
                    <p class="text-h2 my-auto font-weight-bold primary--text">:</p>
                  </div>
                </v-col>
                <v-col
                  class="d-flex justify-space-around py-0 px-2"
                  cols="12"
                  xl="3"
                  lg="3"
                  md="3"
                  sm="3"
                >
                  <div>
                    <p
                      class="text-h2 primary--text font-weight-bold mb-0 font-family-1 text-center"
                    >
                      {{ props.hours }}
                    </p>
                    <p
                      class="text-h6 primary--text mb-0 font-weight-bold font-family-1 text-center"
                    >
                      Jam
                    </p>
                  </div>
                  <div class="hidden-xs-only">
                    <p class="text-h2 my-auto font-weight-bold primary--text">:</p>
                  </div>
                </v-col>
                <v-col
                  class="d-flex justify-space-around py-0 px-2"
                  cols="12"
                  xl="3"
                  lg="3"
                  md="3"
                  sm="3"
                >
                  <div>
                    <p
                      class="text-h2 primary--text font-weight-bold mb-0 font-family-1 text-center"
                    >
                      {{ props.minutes }}
                    </p>
                    <p
                      class="text-h6 primary--text mb-0 font-weight-bold font-family-1 text-center"
                    >
                      Menit
                    </p>
                  </div>
                  <div class="hidden-xs-only">
                    <p class="text-h2 my-auto font-weight-bold primary--text">:</p>
                  </div>
                </v-col>
                <v-col
                  class="d-flex justify-space-around py-0 px-2"
                  cols="12"
                  xl="3"
                  lg="3"
                  md="3"
                  sm="3"
                >
                  <div>
                    <p
                      class="text-h2 primary--text font-weight-bold mb-0 font-family-1 text-center"
                    >
                      {{ props.seconds }}
                    </p>
                    <p
                      class="text-h6 primary--text mb-0 font-weight-bold font-family-1 text-center"
                    >
                      Detik
                    </p>
                  </div>
                </v-col>
              </v-row>
            </template>
          </vue-countdown>
        </div>
      </div>
    </div>
</template>

<script>
import VueCountdown from '@chenfengyuan/vue-countdown';

export default {
  name: 'App',

  components: {
    'vue-countdown': VueCountdown,
  },

  data: () => ({
    counting: false,
  }),
  computed: {
    time() {
      const now = new Date();
      const newYear = new Date(now.getFullYear(), 3, 12);
      return newYear - now;
    },
  },
  methods: {
    startCountdown() {
      this.counting = true;
    },
    handleCountdownEnd() {
      this.counting = false;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display+SC&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400&display=swap");

.font-family {
  font-family: "Playfair Display SC" !important;
}

.font-family-1 {
  font-family: "Source Sans Pro" !important;
}

.fullscreen {
  width: 100vw;
  min-height: 100vh;
}
.background {
  background: #0D47A1;
  background-image: -webkit-linear-gradient( top, #2196F3, #0D47A1),url("~@/assets/background.svg");
  /* url("~@/assets/background.svg") */
  background-blend-mode: overlay;
  background-size: cover;
  width: 100vw;
  min-height: 100vh;
}
.card-text {
  max-width: 900px;
}
.card-countdown {
  max-width: 600px;
}

.border {
  border: 3px solid primary;
}
</style>
