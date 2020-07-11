<template>
  <v-app-bar
    app
    absolute
    color="#43a047"
    dark
    shrink-on-scroll
    prominent
    src="https://picsum.photos/1920/1080?random"
    fade-img-on-scroll
    scroll-target="#scrolling-techniques-5"
    scroll-threshold="500"
    max-height="100px"
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
      ></v-img>
    </template>
    <v-spacer></v-spacer>

    <v-btn class="ma-2" x-large text color="indigo" disabled>
      Post_Match
    </v-btn>
    <v-btn class="ma-2" @click="logout" outlined fab color="teal">
      <v-icon>mdi-format-list-bulleted-square</v-icon>
    </v-btn>
    <v-btn class="ma-2" outlined fab color="indigo">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  methods: {
    logout() {}
  }
};
</script>
