<template>
  <div>
    <v-card class="d-flex flex-row-reverse">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            class="ma-2"
            outlined
            fab
            color="#5482ba"
            @click="downloadTemplate"
          >
            <v-icon>mdi-format-list-bulleted-square</v-icon>
          </v-btn>
        </template>
        <span>下载模板</span>
      </v-tooltip>
      <v-card-actions>
        <form>
          <label class="upload">
            <input
              class="file"
              display="false"
              type="file"
              @change="readFile"
              accept=".xls,.xlsx"
            />
            批量添加学生信息
          </label>
        </form>
      </v-card-actions>
    </v-card>

    <v-divider></v-divider>
    <template v-if="studentsInfo">
      <v-btn
        block
        x-large
        outlined
        color="#5482ba"
        dark
        class="mb-2"
        @click="submit"
      >
        提交信息
      </v-btn>

      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">姓名</th>
              <th class="text-left">性别</th>
              <th class="text-left">成绩</th>
              <th class="text-left">毕业学校</th>
              <th class="text-left">毕业学校级别</th>
              <th class="text-left">··· ···</th>
              <th class="text-left">论文数</th>
              <th class="text-left">工作经验</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in studentsInfo" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.gender }}</td>
              <td>{{ item.grade }}</td>
              <td>{{ item.graduationSchoolName }}</td>
              <td>{{ item.graduationSchoolRank }}</td>
              <td>··· ···</td>
              <td>{{ item.paperCount }}</td>
              <td>{{ item.workExperience }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-divider></v-divider>
    </template>
    <v-divider></v-divider>
    <v-card-text class="text-end">
      ps：请先下载模版，然后按照固定格式批量上传信息
    </v-card-text>
    <v-data-table
      :headers="headers"
      :items="students"
      sort-by="endTime"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>学生</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-btn color="rgba(0, 128, 128, 0.712)" text @click="reset">
            Reset The Tablen
          </v-btn>

          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="rgba(0, 128, 128, 0.712)"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                添加学生
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.name"
                        label="学生名"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.phoneNumber"
                        label="电话号"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <!-- <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon> -->
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon small @click="deleteItem(item)" v-bind="attrs" v-on="on">
              mdi-delete
            </v-icon>
          </template>
          <span>删除</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <br />
  </div>
</template>

<script>
import { readStudentFile } from "@/util/ExcelUtils.js";
import { ADD_STUDENTSINFO_ADMIN } from "@/store/types.js";
import { GET_STUDENTS_ADMIN } from "@/store/types.js";
import { ADD_STUDENT_ADMIN } from "@/store/types.js";
import { DELETE_STUDENT_ADMIN } from "@/store/types.js";
import { GET_EXCEPTION } from "@/store/types.js";

import { mapState } from "vuex";
export default {
  data: () => ({
    studentsInfo: null,
    search: "",
    dialog: false,
    headers: [
      {
        text: "学生",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "联系电话", value: "phoneNumber" },
      { text: "毕业学校", value: "graduationSchoolName" },
      { text: "期望薪资", value: "expectedSalary" },
      { text: "操作", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      phoneNumber: "00000000"
    },
    defaultItem: {
      name: "",
      phoneNumber: "00000000"
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    formatDate() {
      return date => date.replace("T", " ").substring(0, 16);
    },
    ...mapState(["students"])
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.$store.dispatch(GET_STUDENTS_ADMIN);
  },

  methods: {
    reset() {
      this.$store
        .dispatch(GET_STUDENTS_ADMIN)
        .then(this.$store.commit(GET_EXCEPTION, { message: "更新成功" }));
    },
    editItem(item) {
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.students.indexOf(item);
      confirm("你确定删除这个学生吗？") && this.students.splice(index, 1);
      this.$store
        .dispatch(DELETE_STUDENT_ADMIN, {
          id: item.id
        })
        .then(this.$store.commit(GET_EXCEPTION, { message: "删除成功" }));
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      var flag = true;
      // if (
      //   isNaN(this.editedItem.weight) ||
      //   this.editedItem.weight > 1 ||
      //   this.editedItem.weight < 0 ||
      //   isNaN(this.editedItem.lowestMark) ||
      //   this.editedItem.lowestMark > 100 ||
      //   this.editedItem.lowestMark < 0
      // ) {
      //   flag = false;
      // }

      this.$store.dispatch(ADD_STUDENT_ADMIN, {
        name: this.editedItem.name,
        phoneNumber: this.editedItem.phoneNumber
      });
      if (flag) this.students.push(this.editedItem);
      this.close();
    },
    readFile(event) {
      let file = event.target.files[0];
      readStudentFile(file).then(data => {
        this.studentsInfo = data[0];
      });
    },

    downloadTemplate() {
      window.open("./file/StudentTemplate.xls");
    },
    submit() {
      var stus = [];
      var j = 0;
      var len = this.studentsInfo.length;
      for (j; j < len; j++) {
        var stu = {
          student: {
            name: null,
            grade: 0,
            graduationSchoolName: null,
            major: null,
            graduationDate: null,
            nativePlace: null,
            expectedSalary: 0,
            expectedPosition: null,
            expectedIndustry: null,
            employmentIntentionPlace: null,
            phoneNumber: null,
            majorCourse: null,
            skill: null,
            paperCount: 0,
            workExperience: 0,
            personalStatement: null
          },
          gender: null,
          ForeignLanguageProficiency: null,
          SchoolRank: null,
          Education: null
        };
        stu.student.name = this.studentsInfo[j].name;
        stu.student.grade = this.studentsInfo[j].grade;
        stu.student.graduationSchoolName = this.studentsInfo[
          j
        ].graduationSchoolName;
        stu.student.major = this.studentsInfo[j].major;
        stu.student.graduationDate = this.studentsInfo[j].graduationDate;
        stu.student.nativePlace = this.studentsInfo[j].nativePlace;
        stu.student.expectedSalary = this.studentsInfo[j].expectedSalary;
        stu.student.expectedPosition = this.studentsInfo[j].expectedPosition;
        stu.student.expectedIndustry = this.studentsInfo[j].expectedIndustry;
        stu.student.employmentIntentionPlace = this.studentsInfo[
          j
        ].employmentIntentionPlace;
        stu.student.phoneNumber = this.studentsInfo[j].phoneNumber;
        stu.student.majorCourse = this.studentsInfo[j].majorCourse;
        stu.student.skill = this.studentsInfo[j].skill;
        stu.student.paperCount = this.studentsInfo[j].paperCount;
        stu.student.workExperience = this.studentsInfo[j].workExperience;
        stu.student.personalStatement = this.studentsInfo[j].personalStatement;

        stu.gender = this.studentsInfo[j].gender;
        stu.foreignLanguageProficiency = this.studentsInfo[
          j
        ].foreignlanguageproficiency;
        stu.schoolRank = this.studentsInfo[j].graduationSchoolRank;
        stu.education = this.studentsInfo[j].education;
        stus.push(stu);
      }
      this.$store
        .dispatch(ADD_STUDENTSINFO_ADMIN, stus)
        .then(this.$store.commit(GET_EXCEPTION, { message: "提交成功" }));
    }
  }
};
</script>

<style scoped>
.upload {
  padding: 4px 10px;
  height: 20px;
  line-height: 20px;
  position: relative;
  border: 1px solid #999;
  text-decoration: none;
  color: #666;
}
.file {
  position: absolute;
  overflow: hidden;
  right: 0;
  top: 0;
  opacity: 0;
}
</style>
