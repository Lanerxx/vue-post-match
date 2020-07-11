<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-sheet elevation="2" class="pa-12">
          <v-row>
            <v-col cols="1">
              <v-subheader>企业名</v-subheader>
            </v-col>
            <v-col cols="3">
              <v-text-field label="Name" v-model="name"></v-text-field>
            </v-col>
            <v-col cols="1">
              <v-subheader>性质</v-subheader>
            </v-col>
            <v-col cols="3">
              <v-select :items="natureItems" label="Nature"></v-select>
            </v-col>
            <v-col cols="1">
              <v-subheader>行业</v-subheader>
            </v-col>
            <v-col cols="3">
              <v-text-field label="Industry" value="example"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="2">
              <v-subheader>企业详情</v-subheader>
            </v-col>
            <v-col cols="10">
              <v-text-field label="Detail" value="28.00"></v-text-field>
            </v-col>
          </v-row>

          <v-row></v-row>

          <v-row>
            <v-col cols="2">
              <v-subheader>企业所在地</v-subheader>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Location"
                value="12:30:00"
                type="time"
                suffix="PST"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-subheader>联系电话</v-subheader>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="PhoneNumber"
                value="8000"
                type="date"
                suffix="PST"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-subheader>最高薪资</v-subheader>
            </v-col>
            <v-col cols="4">
              <v-text-field label="Highest Salery" value="20000"></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-subheader>最低薪资</v-subheader>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Lowest Salery"
                value="12:30:00"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2" class="d-flex">
              <v-subheader>学校等级要求</v-subheader>
            </v-col>
            <v-col cols="4">
              <v-select
                :items="schoolRankItems"
                label="School Rank"
                v-model="schoolRank"
              ></v-select>
            </v-col>
            <v-col cols="2" class="d-flex">
              <v-subheader>文凭要求</v-subheader>
            </v-col>
            <v-col cols="4">
              <v-select :items="educationItems" label="Education"></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2" class="d-flex">
              <v-subheader>外语水平要求</v-subheader>
            </v-col>
            <v-col cols="4">
              <v-select
                :items="foreignLanguageProficiencyItems"
                label="Foreign Language Proficiency"
              ></v-select>
            </v-col>
            <v-col cols="2" class="d-flex">
              <v-subheader>性别要求</v-subheader>
            </v-col>
            <v-col cols="4">
              <v-select :items="genderItems" label="Gender"></v-select>
            </v-col>
          </v-row>
          <div class="mt-12 text-center">Value: {{ model }}</div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    schoolRank: null,
    name: "阿里巴巴",
    model: "I'm a text field",
    label: "Hey!",
    hint: "Customize me!",
    placeholder: "",
    schoolRankItems: [
      "985",
      "211",
      "省重点",
      "普通本科",
      "专科",
      "高职",
      "其他"
    ],
    educationItems: ["博士", "硕士", "本科", "高职高专", "其他"],
    natureItems: ["国企", "外企", "民企"],
    foreignLanguageProficiencyItems: ["CET-6", "CET-4", "国外交流经验", "无"],
    genderItems: ["男", "女", "无"]
  })
};
</script>
