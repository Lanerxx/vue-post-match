<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="matchStudent"
      sort-by="endTime"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>匹配学生</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-btn color="rgba(0, 128, 128, 0.712)" text @click="reset">
            Reset The Table
          </v-btn>

          <v-spacer></v-spacer>

          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-btn
            class="ma-2"
            outlined
            fab
            color="teal"
            to="/enterprisePostInfo"
          >
            返回
          </v-btn>
          <v-dialog v-model="dialog" max-width="750px">
            <v-card>
              <v-card-title>
                <span class="headline">学生详情</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.student.name"
                        label="学生名"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.student.graduationSchoolName"
                        label="毕业学校"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.student.graduationSchoolRank"
                        label="学校等级"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.student.gender"
                        label="性别"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.student.grade"
                        label="成绩"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.student.graduationDate"
                        label="毕业时间"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.student.paperCount"
                        label="论文数"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.student.workExperience"
                        label="工作经验"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.student.education"
                        label="文凭"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.student.major"
                        label="专业"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.student.foreignlanguageproficiency"
                        label="外语等级"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.student.skill"
                        label="技能"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.student.majorCourse"
                        label="主修课程"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.student.nativePlace"
                        label="籍贯"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.student.phoneNumber"
                        label="联系电话"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.student.expectedSalary"
                        label="期望薪资"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.student.expectedIndustry"
                        label="期望行业"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.student.expectedPosition"
                        label="期望岗位"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.student.employmentIntentionPlace"
                        label="期望工作地"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.student.personalStatement"
                        label="个人陈述"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn class="ma-2" outlined color="teal" @click="editItem(item)">
          详情
        </v-btn>
        <v-btn class="ma-2" outlined color="indigo">
          下载
        </v-btn>
      </template>
    </v-data-table>
    <br />

    <p class="font-weight-thin text-end">
      ps :请完善你的企业信息和岗位信息后再进行匹配～indexOfname
    </p>
  </div>
</template>

<script>
import { MATCH_POST_ENTERPRISE } from "@/store/types.js";
import { mapState } from "vuex";
export default {
  props: ["pid"],
  created() {
    console.log(this.$route.params.pid);
    this.$store.dispatch(MATCH_POST_ENTERPRISE, {
      id: this.$route.params.pid
    });
  },
  data: () => ({
    search: "",
    dialog: false,
    headers: [
      {
        text: "姓名",
        align: "start",
        sortable: false,
        value: "student.name"
      },
      { text: "匹配度", value: "score" },
      { text: "毕业学校", value: "student.graduationSchoolName" },
      { text: "平均成绩", value: "student.grade" },
      { text: "专业", value: "student.major" },
      { text: "联系电话", value: "student.phoneNumber" },
      { text: "操作", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      student: {}
    }
  }),

  computed: {
    formatDate() {
      return date => date.replace("T", " ").substring(0, 16);
    },
    ...mapState(["matchStudent"])
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    reset() {
      console.log(this.pid);
      this.$store.dispatch(MATCH_POST_ENTERPRISE, {
        id: this.pid
      });
    },
    editItem(item) {
      this.editedIndex = this.matchStudent.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.close();
    }
  }
};
</script>
