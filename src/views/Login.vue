<template>
  <div>
    <template>
      <v-card class="mx-auto login" max-width="400">
        <v-card-title class="title">
          Welcome to Post Match System
        </v-card-title>
        <v-card-text class="text">
          <form>
            <v-text-field
              v-model="number"
              label="Please enter the number"
              required
              @input="$v.number.$touch()"
              @blur="$v.number.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Please enter the password"
              required
              type="password"
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn class="mr-4" @click="login">login</v-btn>
          </form>
        </v-card-text>
      </v-card>
      <v-row justify="center">
        <v-card></v-card>
      </v-row>
    </template>
  </div>
</template>

<script>
import { LOGIN } from "@/store/types.js";
export default {
  data: () => ({
    number: null,
    password: null
  }),
  methods: {
    login() {
      this.$store.dispatch(LOGIN, {
        number: this.number,
        password: this.password
      });
      if (this.isLogin != null) {
        this.dialog = false;
      }
    }
  }
};
</script>

<style acoped>
.title {
  text-align: center;
  color: white;
  background: rgba(0, 128, 128, 0.712);
}
.input {
  display: flex;
  width: 350px;
  padding: 3px;
  border: 1px solid gray;
  border-radius: 5px;
}
.login {
  top: 150px;
}
</style>
