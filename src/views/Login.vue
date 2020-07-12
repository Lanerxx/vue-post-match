<template>
  <div>
    <br />
    <br />
    <br />
    <v-card max-width="450px" class="mx-auto">
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab>
          Login
        </v-tab>
        <v-tab>
          Register
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
            <v-card class="mx-auto " max-width="450">
              <v-card-title class="title">
                Login with your number and password!
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
                  <v-btn class="mr-4" @click="login">Login</v-btn>
                </form>
              </v-card-text>
            </v-card>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card class="mx-auto " max-width="450">
              <v-card-title class="title">
                Register by your name and phonenumber!
              </v-card-title>
              <v-card-text class="text">
                <form>
                  <v-text-field
                    v-model="name"
                    label="Please enter your name"
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                  ></v-text-field>
                  <v-text-field
                    v-model="phoneNumber"
                    label="Please enter your phonenumber"
                    required
                    @input="$v.phoneNumber.$touch()"
                    @blur="$v.phoneNumber.$touch()"
                  ></v-text-field>
                  <v-spacer></v-spacer>
                  <v-btn class="mr-4" @click="register">Register</v-btn>
                </form>
              </v-card-text>
            </v-card>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import { LOGIN } from "@/store/types.js";
export default {
  data: () => ({
    tab: null,
    number: null,
    password: null,
    name: null,
    phoneNumbwer: null
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
    },
    register() {}
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
