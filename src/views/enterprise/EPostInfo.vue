<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="myPosts"
      sort-by="endTime"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>岗位</v-toolbar-title>
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

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="rgba(0, 128, 128, 0.712)"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                添加岗位
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="岗位名"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.count"
                        label="招收人数"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.salary"
                        label="薪水"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.detail"
                        label="详情"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      开始日期：{{ formatDate(editedItem.startTime) }} ---
                      结束日期：{{ formatDate(editedItem.endTime) }}
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.start1"
                        label="开始日期"
                        type="date"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.start2"
                        type="time"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.end1"
                        label="结束日期"
                        type="date"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.end2"
                        type="time"
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
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
        <v-btn class="ma-2" outlined color="teal">
          匹配
        </v-btn>
      </template>
    </v-data-table>
    <br />

    <p class="font-weight-thin text-end">
      ps :请完善你的企业信息和岗位信息后再进行匹配～
    </p>
  </div>
</template>

<script>
import { GET_INDEX_ENTERPRISE } from "@/store/types.js";
import { UPDATE_POST_ENTERPRISE } from "@/store/types.js";
import { ADD_POST_ENTERPRISE } from "@/store/types.js";
import { GET_EXCEPTION } from "@/store/types.js";
import { DELETE_POST_ENTERPRISE } from "@/store/types.js";
import { mapState } from "vuex";
export default {
  data: () => ({
    search: "",
    dialog: false,
    headers: [
      {
        text: "岗位",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "招收人数", value: "count" },
      { text: "开始时间", value: "startTime" },
      { text: "结束时间", value: "endTime" },
      { text: "操作", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      detail: "",
      count: 0,
      salary: 0,
      startTime: "",
      start1: "",
      start2: "12:00",
      endTime: "",
      end1: "",
      end2: "12:00"
    },
    defaultItem: {
      name: "",
      detail: "",
      count: 1,
      salary: 0,
      startTime: "",
      start1: "",
      start2: "12:00",
      endTime: "",
      end1: "",
      end2: "12:00"
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    formatDate() {
      return date => date.replace("T", " ").substring(0, 16);
    },

    ...mapState(["myPosts"])
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.$store.dispatch(GET_INDEX_ENTERPRISE);
  },

  methods: {
    reset() {
      this.$store
        .dispatch(GET_INDEX_ENTERPRISE)
        .then(this.$store.commit(GET_EXCEPTION, { message: "更新成功" }));
    },
    editItem(item) {
      this.editedIndex = this.myPosts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItem.start1 = this.editedItem.startTime.substring(0, 10);
      this.editedItem.start2 = this.editedItem.startTime.substring(11, 16);

      this.editedItem.end1 = this.editedItem.endTime.substring(0, 10);
      this.editedItem.end2 = this.editedItem.endTime.substring(11, 16);

      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.myPosts.indexOf(item);
      confirm("你确定删除这个岗位吗？") && this.myPosts.splice(index, 1);
      this.$store
        .dispatch(DELETE_POST_ENTERPRISE, {
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
      if (this.editedIndex > -1) {
        this.$store
          .dispatch(UPDATE_POST_ENTERPRISE, {
            id: this.myPosts[this.editedIndex].id,
            post: {
              name: this.editedItem.name,
              detail: this.editedItem.detail,
              count: this.editedItem.count,
              salary: this.editedItem.salary
            },
            startTime:
              this.editedItem.start1 + " " + this.editedItem.start2 + ":00",
            endTime: this.editedItem.end1 + " " + this.editedItem.end2 + ":00"
          })
          .then(this.$store.commit(GET_EXCEPTION, { message: "修改成功" }));
        if (flag) this.myPosts[this.editedIndex] = this.editedItem;
      } else {
        this.$store
          .dispatch(ADD_POST_ENTERPRISE, {
            post: {
              name: this.editedItem.name,
              detail: this.editedItem.detail,
              count: this.editedItem.count,
              salary: this.editedItem.salary
            },
            startTime:
              this.editedItem.start1 + " " + this.editedItem.start2 + ":00",
            endTime: this.editedItem.end1 + " " + this.editedItem.end2 + ":00"
          })
          .then(this.$store.commit(GET_EXCEPTION, { message: "添加成功" }));
        if (flag) this.myPosts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
