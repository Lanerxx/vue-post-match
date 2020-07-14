<template>
  <v-container fluid class="grey lighten-5">
    <v-row align="stretch" justify="space-around">
      <v-col>
        <MyHeader id="MyHeader" />
      </v-col>
    </v-row>
    <v-row align="stretch" justify="space-around" top="120">
      <eIndex id="eIndex" v-if="isEnterprise" />
      <sIndex id="sIndex" v-if="isStudent" />
      <aIndex id="aIndex" v-if="isAdmin" />
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
    sIndex: () => import("@/views/student/SIndex.vue"),
    eIndex: () => import("@/views/enterprise/EIndex.vue"),
    aIndex: () => import("@/views/admin/AIndex.vue"),
    MyHeader,
    MyFooter
  },
  computed: {
    ...mapState(["isLogin", "isEnterprise", "isAdmin", "isStudent"])
  }
};
</script>
