<template>
  <v-card min-width="1370px">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-1 basil--text">管理信息</h1>
    </v-card-title>
    <v-divider class="mx-4" color="rgba(0, 128, 128, 0.712)"></v-divider>
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab>
        学生信息
      </v-tab>
      <v-tab>
        企业信息
      </v-tab>
      <v-tab>
        安全信息
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-card-text><studentInfo /></v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text><enterpriseInfo /></v-card-text>
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
    studentInfo: () => import("@/views/admin/AStudentInfo.vue"),
    enterpriseInfo: () => import("@/views/admin/AEnterpriseInfo.vue"),
    safetyInfo: () => import("@/views/admin/ASafetyInfo.vue")
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
