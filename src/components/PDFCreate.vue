<template>
    <div>
        <v-btn color="primary" @click="createPDF()">
            <v-icon size="20" class="mr-2">$pdf</v-icon>
            <p class="ma-0 text-capitalize">unduh CV</p>
        </v-btn>
    </div>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export default {
  props: {
    data: {
      type: [Array, Object],
      required: true,
    },
  },
  methods: {
    createPDF() {
      let frontDegree = null;
      let backwardDegree = null;
      let fullname = null;
      let gender = null;
      const date = this.data.dateOfBirth.split('-');
      const languange = this.data.language.match(/<li>.*?<\/li>/g);
      const hobby = this.data.hobby.match(/<li>.*?<\/li>/g);
      const skill = this.data.skill.match(/<li>.*?<\/li>/g);
      const experience = this.data.experience.match(/<li>.*?<\/li>/g);
      const expSchool = this.data.expSchool.match(/<li>.*?<\/li>/g);
      const certification = this.data.certification.match(/<li>.*?<\/li>/g);
      const listLanguange = [];
      const listHobby = [];
      const listSkill1 = [];
      const listSkill2 = [];
      const listExperience = [];
      const listExpSchool = [];
      const listCertification = [];
      const modulo = skill.length % 2 === 0;
      // const language = this.data.language.split(/<p>/g);
      for (let index = 0; index < languange.length; index += 1) {
        languange[index] = languange[index].replace(/(<([^>]+)>)/ig, '');
        listLanguange.push({
          text: languange[index],
          style: ['subtitle3'],
        });
      }
      for (let index = 0; index < hobby.length; index += 1) {
        hobby[index] = hobby[index].replace(/(<([^>]+)>)/ig, '');
        listHobby.push({
          text: hobby[index],
          style: ['subtitle3'],
        });
      }
      for (let index = 0; index < skill.length; index += 1) {
        skill[index] = skill[index].replace(/(<([^>]+)>)/ig, '');
        if (modulo && index <= index / 2) {
          listSkill1.push({
            text: skill[index],
            style: ['subtitle3'],
          });
        } else if (!modulo && index <= Math.ceil(index / 2)) {
          listSkill1.push({
            text: skill[index],
            style: ['subtitle3'],
          });
        } else {
          listSkill2.push({
            text: skill[index],
            style: ['subtitle3'],
          });
        }
      }
      for (let index = 0; index < experience.length; index += 1) {
        experience[index] = experience[index].replace(/(<([^>]+)>)/ig, '');
        listExperience.push({
          text: experience[index],
          style: ['subtitle3'],
        });
      }
      for (let index = 0; index < expSchool.length; index += 1) {
        expSchool[index] = expSchool[index].replace(/(<([^>]+)>)/ig, '');
        listExpSchool.push({
          text: expSchool[index],
          style: ['subtitle3'],
        });
      }
      for (let index = 0; index < certification.length; index += 1) {
        certification[index] = certification[index].replace(/(<([^>]+)>)/ig, '');
        listCertification.push({
          text: certification[index],
          style: ['subtitle3'],
        });
      }
      if (this.data.frontDegree === '-') {
        frontDegree = '';
      } else {
        frontDegree = this.data.frontDegree;
      }
      if (this.data.backwardDegree === '-') {
        backwardDegree = '';
      } else {
        backwardDegree = this.data.backwardDegree;
      }
      if (this.data.sex === 'L') {
        gender = 'Laki-Laki';
      } else {
        gender = 'Perempuan';
      }
      fullname = `${frontDegree} ${this.data.fullname} ${backwardDegree}`;
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      const docDefinition = {
        permissions: {
          modifying: false,
          copying: false,
        },
        pageSize: 'LETTER',
        watermark: { text: 'Bursa Kerja', opacity: 0.05 },
        pageMargins: [0, 0, 0, 0],
        content: [
          {
            layout: 'noBorders',
            table: {
              widths: ['35%', '65%'],
              body: [
                [
                  // column one
                  {
                    stack: [
                      {
                        text: fullname,
                        style: ['title', 'bold'],
                      },
                      {
                        // if you specify width, image will scale proportionally
                        image: this.data.image,
                        fit: [120, 120],
                        style: 'center',
                        margin: [0, 15, 0, 0],
                      },
                      {
                        text: 'Identitas',
                        style: ['subtitle1', 'bold'],
                        margin: [0, 20, 0, 0],
                      },
                      {
                        canvas: [{
                          type: 'line', x1: 0, y1: 3, x2: 180, y2: 3, lineWidth: 0.8,
                        }],
                      },
                      {
                        text: 'Jenis Kelamin',
                        style: ['subtitle3', 'bold'],
                        margin: [0, 10, 0, 0],
                      },
                      {
                        text: gender,
                        style: 'subtitle3',
                      },
                      {
                        text: 'Tempat dan Tanggal Lahir',
                        style: ['subtitle3', 'bold'],
                        margin: [0, 10, 0, 0],
                      },
                      {
                        text: `${this.data.placeOfBirth}, ${date[2]}
                      ${this.$store.state.month[date[1] - 1]} ${date[0]}`,
                        style: 'subtitle3',
                      },
                      {
                        text: 'Kewarganegaraan',
                        style: ['subtitle3', 'bold'],
                        margin: [0, 10, 0, 0],
                      },
                      {
                        text: this.data.nasionality,
                        style: 'subtitle3',
                      },
                      {
                        text: 'Agama',
                        style: ['subtitle3', 'bold'],
                        margin: [0, 10, 0, 0],
                      },
                      {
                        text: this.data.religion,
                        style: 'subtitle3',
                      },
                      {
                        text: 'Sudah Menikah',
                        style: ['subtitle3', 'bold'],
                        margin: [0, 10, 0, 0],
                      },
                      {
                        text: this.data.religion,
                        style: 'subtitle3',
                      },
                      {
                        text: 'Alamat Email',
                        style: ['subtitle3', 'bold'],
                        margin: [0, 10, 0, 0],
                      },
                      {
                        text: this.data.email,
                        style: 'subtitle3',
                      },
                      {
                        text: 'Nomor Telepon',
                        style: ['subtitle3', 'bold'],
                        margin: [0, 10, 0, 0],
                      },
                      {
                        text: this.data.phone,
                        style: 'subtitle3',
                      },
                      {
                        text: 'Alamat',
                        style: ['subtitle3', 'bold'],
                        margin: [0, 10, 0, 0],
                      },
                      {
                        text: `${this.data.address},
                        kec ${this.data.district}, kab/kota ${this.data.city},
                        provinsi ${this.data.province}`,
                        style: 'subtitle3',
                      },
                      {
                        text: 'Tinggi / Berat Badan',
                        style: ['subtitle3', 'bold'],
                        margin: [0, 10, 0, 0],
                      },
                      {
                        text: `${this.data.height} cm / ${this.data.weight}`,
                        style: 'subtitle3',
                      },
                      {
                        text: 'Bahasa Yang Dikuasai',
                        style: ['subtitle1', 'bold'],
                        margin: [0, 20, 0, 0],
                      },
                      {
                        canvas: [{
                          type: 'line', x1: 0, y1: 3, x2: 180, y2: 3, lineWidth: 0.8,
                        }],
                      },
                      {
                        ul: listLanguange,
                        margin: [0, 10, 0, 0],
                      },
                      {
                        text: 'Hobi',
                        style: ['subtitle1', 'bold'],
                        margin: [0, 20, 0, 0],
                      },
                      {
                        canvas: [{
                          type: 'line', x1: 0, y1: 3, x2: 180, y2: 3, lineWidth: 0.8,
                        }],
                      },
                      {
                        ul: listHobby,
                        margin: [0, 10, 0, 0],
                      },
                    ],
                    margin: [15, 30, 5, 35],
                    fillColor: '#D0CECF',
                  },
                  // column two
                  {
                    stack: [
                      { text: 'Deskripsi Singkat', style: ['subtitle1', 'bold'] },
                      {
                        canvas: [{
                          type: 'line', x1: 0, y1: 3, x2: 350, y2: 3, lineWidth: 0.8,
                        }],
                      },
                      {
                        text: this.data.aboutMe,
                        style: 'subtitle3',
                        margin: [0, 10, 0, 15],
                      },
                      { text: 'Keterampilan', style: ['subtitle1', 'bold'] },
                      {
                        canvas: [{
                          type: 'line', x1: 0, y1: 3, x2: 350, y2: 3, lineWidth: 0.8,
                        }],
                      },
                      {
                        columns: [
                          {
                            width: '50%',
                            ul: listSkill1,
                          },
                          {
                            width: '50%',
                            ul: listSkill2,
                          },
                        ],
                        margin: [0, 10, 0, 15],
                      },
                      { text: 'Pengalaman Kerja', style: ['subtitle1', 'bold'] },
                      {
                        canvas: [{
                          type: 'line', x1: 0, y1: 3, x2: 350, y2: 3, lineWidth: 0.8,
                        }],
                      },
                      {
                        ul: listExperience,
                        margin: [0, 10, 0, 15],
                      },
                      { text: 'Pendidikan', style: ['subtitle1', 'bold'] },
                      {
                        canvas: [{
                          type: 'line', x1: 0, y1: 3, x2: 350, y2: 3, lineWidth: 0.8,
                        }],
                      },
                      {
                        ul: listExpSchool,
                        margin: [0, 10, 0, 15],
                      },
                      { text: 'Sertifikat', style: ['subtitle1', 'bold'] },
                      {
                        canvas: [{
                          type: 'line', x1: 0, y1: 3, x2: 350, y2: 3, lineWidth: 0.8,
                        }],
                      },
                      {
                        ul: listCertification,
                        margin: [0, 10, 0, 15],
                      },
                    ],
                    margin: [15, 30, 5, 30],
                  },
                ],
              ],
            },
          },
        ],
        styles: {
          bakgroundGrey: {
            background: '#D0CECF',
          },
          title: {
            fontSize: 16,
          },
          subtitle1: {
            fontSize: 14,
          },
          subtitle2: {
            fontSize: 12,
          },
          subtitle3: {
            fontSize: 11,
          },
          bold: {
            bold: true,
          },
          center: {
            alignment: 'center',
          },
        },
      };
      pdfMake.createPdf(docDefinition).open();
    },
  },
};
</script>

<style scoped>

</style>
