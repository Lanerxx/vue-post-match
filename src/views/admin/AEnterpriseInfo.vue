<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="enterprises"
      sort-by="endTime"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>企业</v-toolbar-title>
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
                添加企业
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
                        label="企业名"
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

    <p class="font-weight-thin text-end">
      ps :请完善你的企业信息和岗位信息后再进行匹配～
    </p>
  </div>
</template>

<script>
import { GET_ENTERPRISES_ADMIN } from "@/store/types.js";
import { ADD_ENTERPRISE_ADMIN } from "@/store/types.js";
import { DELETE_ENTERPRISE_ADMIN } from "@/store/types.js";
import { GET_EXCEPTION } from "@/store/types.js";

import { mapState } from "vuex";
export default {
  data: () => ({
    search: "",
    dialog: false,
    headers: [
      {
        text: "企业",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "企业号", value: "user.number" },
      { text: "联系电话", value: "phoneNumber" },
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
    ...mapState(["enterprises"])
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.$store.dispatch(GET_ENTERPRISES_ADMIN);
  },

  methods: {
    reset() {
      this.$store.dispatch(GET_ENTERPRISES_ADMIN);
    },
    editItem(item) {
      this.editedIndex = this.enterprises.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.enterprises.indexOf(item);
      this.enterprises.splice(index, 1);
      this.$store
        .dispatch(DELETE_ENTERPRISE_ADMIN, {
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

      this.$store.dispatch(ADD_ENTERPRISE_ADMIN, {
        name: this.editedItem.name,
        phoneNumber: this.editedItem.phoneNumber
      });
      if (flag) this.enterprises.push(this.editedItem);

      this.close();
    }
  }
};
</script>
