<template>
  <div>
    <v-file-input
      label="Unggah File CSV"
      accept=""
      required
      ref="fileInput"
      enctype="multipart/form-data"
      @change="ChangeImage"
    ></v-file-input>
    <v-btn color="primary" @click="submit()">
        send
    </v-btn>
  </div>
</template>

<script>
import csvToJson from 'csvtojson';

export default {
  data() {
    return {
      csv: '',
    };
  },
  methods: {
    ChangeImage(event) {
    //   this.csv = event;
      const reader = new FileReader();
      reader.readAsText(event);
      reader.onload = () => {
        this.csv = `${reader.result}`;
        // eslint-disable-next-line no-console
        console.log(reader.result);
      };
    },
    submit() {
      (async () => {
        const jsonObj = await csvToJson().fromString(this.csv);
        // eslint-disable-next-line no-console
        console.log(jsonObj);
      })();
    },
  },
};
</script>
