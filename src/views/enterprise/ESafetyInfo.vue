<template>
  <div>
    <v-expansion-panels v-model="panel" :readonly="readonly" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>
          --- 企业号 : {{ enterprise.enterprise.user.number }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          企业号作为企业的唯一标识，在注册时自动生成，不可更改。用作登陆时的账号。
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          --- 密码 : **********
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          初始登陆密码为您的企业号：
          {{
            enterprise.enterprise.user.number
          }}，请首次登陆后立即修改密码，保障账户安全。
          <v-btn
            class="ma-2"
            fab
            outlined
            color="indigo"
            small
            @click.stop="dialog = true"
          >
            修改
          </v-btn>
          <v-dialog v-model="dialog" max-width="350">
            <v-card>
              <v-card-text class="text">
                <form>
                  <v-card-title class="title">
                    Update Your Password
                  </v-card-title>
                  <v-text-field
                    v-model="oldPassword"
                    label="请输入旧密码"
                    required
                    type="password"
                    @input="$v.oldPassword.$touch()"
                    @blur="$v.oldPassword.$touch()"
                  ></v-text-field>
                  <v-text-field
                    v-model="newPassword"
                    label="请输入新密码"
                    required
                    type="password"
                    @input="$v.newPassword.$touch()"
                    @blur="$v.newPassword.$touch()"
                  ></v-text-field>
                  <v-text-field
                    v-model="newPasswordR"
                    label="请重复输入新密码"
                    required
                    type="password"
                    @input="$v.newPasswordR.$touch()"
                    @blur="$v.newPasswordR.$touch()"
                  ></v-text-field>
                  <v-spacer></v-spacer>
                </form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="green darken-1" text @click="dialog = false">
                  Cancel
                </v-btn>

                <v-btn color="green darken-1" text @click="updatePsw()">
                  Update
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          --- 手机号 : {{ enterprise.enterprise.phoneNumber }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          待扩张····
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { GET_INDEX_ENTERPRISE } from "@/store/types.js";
import { UPDATE_PASSWORD } from "@/store/types.js";

import { mapState } from "vuex";

export default {
  data: () => ({
    dialog: false,
    newPassword: null,
    newPasswordR: null,
    oldPassword: null,
    panel: [0, 1],
    readonly: true
  }),
  created() {
    this.$store.dispatch(GET_INDEX_ENTERPRISE);
  },

  computed: {
    ...mapState(["enterprise"])
  },
  methods: {
    updatePsw() {
      this.dialog = false;
      this.$store.dispatch(UPDATE_PASSWORD, {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        newPasswordR: this.newPasswordR
      });
    }
  }
};
</script>
