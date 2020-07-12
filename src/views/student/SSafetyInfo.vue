<template>
  <div>
    <v-expansion-panels v-model="panel" :readonly="readonly" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>
          --- 用户号 :
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          用户号作为用户的唯一标识，在注册时自动生成，不可更改。用作登陆时的账号。
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          --- 密码 : **********
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          初始登陆密码为您的企业号： ，请首次登陆后立即修改密码，保障账户安全。
          <v-btn class="ma-2" fab outlined color="indigo" small>修改</v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          --- 手机号 :
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          待扩张····
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
// import { GET_INDEX_ENTERPRISE } from "@/store/types.js";
// import { mapState } from "vuex";

export default {
  data: () => ({
    panel: [0, 1],
    readonly: true
  })
  // created() {
  //   this.$store.dispatch(GET_INDEX_ENTERPRISE);
  // },

  // computed: {
  //   ...mapState(["enterprise"])
  // }
};
</script>
