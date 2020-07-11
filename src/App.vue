<template>
  <v-app id="app">
    <v-container fluid class="grey lighten-5">
      <v-row align="stretch" justify="space-around">
        <v-col>
          <MyHeader id="MyHeader" />
        </v-col>
      </v-row>
      <v-col>
        <welcome v-if="isLogin" />
        <login v-else />
      </v-col>
      <v-row>
        <MyFooter id="MyFooter" />
      </v-row>
    </v-container>
    <alertdialog />
  </v-app>
</template>
<script>
import MyFooter from "@/views/Footer.vue";
import MyHeader from "@/views/Header.vue";
import { mapState } from "vuex";

export default {
  components: {
    login: () => import("@/views/Login.vue"),
    welcome: () => import("@/views/Welcome.vue"),
    MyHeader,
    MyFooter,
    alertdialog: () => import("@/components/AlertDialog.vue")
  },
  computed: {
    ...mapState(["isLogin"])
  }
};
</script>
