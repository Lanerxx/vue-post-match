<template>
  <v-card min-width="1370px">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-1.5 basil--text">企业信息</h1>
    </v-card-title>

    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab>
        基本信息
      </v-tab>
      <v-tab>
        岗位信息
      </v-tab>
      <v-tab>
        安全信息
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-card-text><basucInfo /></v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text><postInfo /></v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text><safetyInfo /></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {
  components: {
    basucInfo: () => import("@/views/enterprise/EBasicInfo.vue"),
    postInfo: () => import("@/views/enterprise/EPostInfo.vue"),
    safetyInfo: () => import("@/views/enterprise/ESafetyInfo.vue")
  },
  data() {
    return {
      tab: null
    };
  }
};
</script>

<style>
/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>
