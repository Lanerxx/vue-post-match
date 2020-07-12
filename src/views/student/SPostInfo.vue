<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="posts"
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
          <v-btn class="ma-2" outlined fab color="teal">
            匹配
          </v-btn>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">岗位详情</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.name"
                        label="岗位名"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.count"
                        label="招收人数"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.salary"
                        label="薪水"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.detail"
                        label="详情"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.startTime"
                        label="开始日期"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        readonly=""
                        v-model="editedItem.endTime"
                        label="结束日期"
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
      </template>
    </v-data-table>
    <br />

    <p class="font-weight-thin text-end">
      ps :请完善你的企业信息和岗位信息后再进行匹配～
    </p>
  </div>
</template>

<script>
import { GET_INDEX_STUDENT } from "@/store/types.js";
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
      start2: "",
      endTime: "",
      end1: "",
      end2: ""
    }
  }),

  computed: {
    formatDate() {
      return date => date.replace("T", " ").substring(0, 16);
    },
    ...mapState(["posts"])
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.$store.dispatch(GET_INDEX_STUDENT);
  },

  methods: {
    reset() {
      this.$store.dispatch(GET_INDEX_STUDENT);
    },
    editItem(item) {
      this.editedIndex = this.posts.indexOf(item);
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
