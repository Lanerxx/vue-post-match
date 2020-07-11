<template>
  <v-container fluid class="grey lighten-5">
    <v-row align="stretch" justify="space-around">
      <v-col>
        <MyHeader id="MyHeader" />
      </v-col>
    </v-row>
    <v-spacer>
      <br />
    </v-spacer>
    <v-row align="stretch" justify="space-around" top="120">
      <v-col cols="3">
        <eIndex id="eIndex" v-if="isEnterprise" />
        <sSidebar id="sSidebar" v-if="isStudent" />
      </v-col>
      <v-col cols="9">
        <router-view id="router" :key="$route.path"></router-view>
      </v-col>
    </v-row>
    <v-row>
      <MyFooter id="MyFooter" />
    </v-row>
  </v-container>
</template>
<script>
import MyFooter from "@/views/Footer.vue";
import MyHeader from "@/views/Header.vue";
import { mapState } from "vuex";

export default {
  components: {
    sSidebar: () => import("@/views/student/SSidebar.vue"),
    eIndex: () => import("@/views/enterprise/EIndex.vue"),
    MyHeader,
    MyFooter
  },
  computed: {
    ...mapState(["isLogin", "isEnterprise", "isAdmin", "isStudent"])
  }
};
</script>
