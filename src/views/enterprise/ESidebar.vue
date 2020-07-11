<template>
  <v-card class="mx-auto" width="380" min-height="620" outlined>
    <v-list>
      <v-list-item to="/enterpriseInformation">
        <v-list-item-icon>
          <v-icon>mdi-account-circle</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          User
        </v-list-item-title>
      </v-list-item>

      <v-list-group prepend-icon="mdi-home">
        <template v-slot:activator>
          <v-list-item-title>Home</v-list-item-title>
        </template>

        <v-list-item to="/enterprisePost">
          <v-list-item-title>List of Courses</v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-water</v-icon>
          </v-list-item-icon>
        </v-list-item>

        <v-list-item to="/enterpriseStudent">
          <v-list-item-title>List of Students</v-list-item-title>
          <v-list-item-action>
            <v-icon>mdi-water</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>
