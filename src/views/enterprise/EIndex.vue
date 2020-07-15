<template>
  <v-container fluid class="grey lighten-5">
    <v-row align="stretch" justify="space-around" top="120">
      <v-col cols="3">
        <v-card class="mx-auto" width="380" min-height="640" outlined>
          <v-list>
            <v-list-item to="/enterpriseBasicInfo">
              <v-list-item-icon>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-title>基础信息</v-list-item-title>
            </v-list-item>

            <v-list-item to="/enterprisePostInfo">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>岗位信息</v-list-item-title>
            </v-list-item>

            <v-list-item to="/enterpriseSafetyInfo">
              <v-list-item-icon>
                <v-icon>mdi-lock</v-icon>
              </v-list-item-icon>
              <v-list-item-title>安全信息</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="9">
        <router-view id="router" :key="$route.path"></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    item: 0
  })
};
</script>
