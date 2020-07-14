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
              <v-text-field
                label="Name"
                v-model="enterprise.enterprise.name"
              ></v-text-field>
            </v-col>
            <v-col cols="1">
              <v-subheader>性质</v-subheader>
            </v-col>
            <v-col cols="3">
              <v-select
                v-if="enterprise"
                :items="natureItems"
                label="Nature"
                v-model="enterprise.enterpriseNature"
              ></v-select>
            </v-col>
            <v-col cols="1">
              <v-subheader>行业</v-subheader>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-if="enterprise"
                label="Industry"
                v-model="enterprise.enterprise.industry"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="2">
              <v-subheader>企业详情</v-subheader>
            </v-col>
            <v-col cols="10">
              <v-text-field
                v-if="enterprise"
                label="Detail"
                v-model="enterprise.enterprise.detail"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="2">
              <v-subheader>企业所在地</v-subheader>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-if="enterprise"
                label="Location"
                v-model="enterprise.enterprise.location"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-subheader>联系电话</v-subheader>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-if="enterprise"
                label="PhoneNumber"
                v-model="enterprise.enterprise.phoneNumber"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-subheader>最高薪资</v-subheader>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-if="enterprise"
                label="Highest Salery"
                v-model="enterprise.enterprise.highestSalery"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-subheader>最低薪资</v-subheader>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-if="enterprise"
                label="Lowest Salery"
                v-model="enterprise.enterprise.lowestSalery"
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
                v-if="enterprise"
                label="School Rank"
                v-model="enterprise.schoolRankCut"
              ></v-select>
            </v-col>
            <v-col cols="2" class="d-flex">
              <v-subheader>文凭要求</v-subheader>
            </v-col>
            <v-col cols="4">
              <v-select
                v-if="enterprise"
                :items="educationItems"
                label="Education"
                v-model="enterprise.educationCut"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2" class="d-flex">
              <v-subheader>外语水平要求</v-subheader>
            </v-col>
            <v-col cols="4">
              <v-select
                v-if="enterprise"
                :items="foreignLanguageProficiencyItems"
                label="Foreign Language Proficiency"
                v-model="enterprise.foreignLanguageProficiency"
              ></v-select>
            </v-col>
            <v-col cols="2" class="d-flex">
              <v-subheader>性别要求</v-subheader>
            </v-col>
            <v-col cols="4">
              <v-select
                v-if="enterprise"
                :items="genderItems"
                label="Gender"
                v-model="enterprise.genderCut"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-subheader>专业要求</v-subheader>
            </v-col>
            <v-col cols="10">
              <v-text-field
                v-if="enterprise"
                label="Detail"
                v-model="enterprise.enterprise.majorCut"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-subheader>其他要求</v-subheader>
            </v-col>
            <v-col cols="10">
              <v-text-field
                v-if="enterprise"
                label="Detail"
                v-model="enterprise.enterprise.otherRequirements"
              ></v-text-field>
            </v-col>
          </v-row>
          <div class="mt-12 text-right">
            <v-btn color="basil" outlined @click="submit">SUBMIT</v-btn>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GET_INDEX_ENTERPRISE } from "@/store/types.js";
import { UPDATE_INFORMATION_ENTERPRISE } from "@/store/types.js";
import { GET_EXCEPTION } from "@/store/types.js";
import { mapState } from "vuex";

export default {
  data: () => ({
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
  }),
  created() {
    this.$store.dispatch(GET_INDEX_ENTERPRISE);
  },
  methods: {
    submit() {
      this.$store
        .dispatch(UPDATE_INFORMATION_ENTERPRISE, {
          enterprise: {
            name: this.enterprise.enterprise.name,
            detail: this.enterprise.enterprise.detail,
            majorCut: this.enterprise.enterprise.majorCut,
            lowestSalery: this.enterprise.enterprise.lowestSalery,
            highestSalery: this.enterprise.enterprise.highestSalery,
            industry: this.enterprise.enterprise.industry,
            location: this.enterprise.enterprise.location,
            phoneNumber: this.enterprise.enterprise.phoneNumber,
            otherRequirements: this.enterprise.enterprise.otherRequirements
          },
          genderCut: this.enterprise.genderCut,
          schoolRankCut: this.enterprise.schoolRankCut,
          educationCut: this.enterprise.educationCut,
          foreignLanguageProficiency: this.enterprise
            .foreignLanguageProficiency,
          enterpriseNature: this.enterprise.enterpriseNature
        })
        .then(this.$store.commit(GET_EXCEPTION, { message: "修改成功" }));
    }
  },
  computed: {
    formatDate() {
      return date => date.replace("T", " ").substring(0, 16);
    },
    ...mapState(["enterprise"])
  }
};
</script>
