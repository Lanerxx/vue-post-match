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
                  <v-btn class="mr-4" @click="login">登陆</v-btn>
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
                  <v-btn
                    @click.stop="dialogR = true"
                    class="mr-4"
                    @click="registerStudent"
                  >
                    学生注册
                  </v-btn>
                  <v-btn
                    @click.stop="dialogR = true"
                    class="mr-4"
                    @click="registerEnterprise"
                  >
                    企业注册
                  </v-btn>
                  <v-dialog v-model="dialogR" max-width="290" v-if="user">
                    <v-card>
                      <v-card-title class="headline" v-if="user">
                        恭喜您，注册成功～
                      </v-card-title>

                      <v-card-text v-if="user">
                        您的账号：{{ user.user.number }}
                      </v-card-text>

                      <v-card-text v-if="user">
                        您的初始密码：{{ user.user.number }}
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                          color="green darken-1"
                          text
                          @click="dialogR = false"
                        >
                          OK
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
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
import { REGISTER_ENTERPRISE } from "@/store/types.js";
import { REGISTER_STUDENT } from "@/store/types.js";
import { mapState } from "vuex";

export default {
  data: () => ({
    dialogR: false,
    tab: null,
    number: null,
    password: null,
    name: null,
    phoneNumber: null
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
    registerStudent() {
      this.$store.dispatch(REGISTER_STUDENT, {
        name: this.name,
        phoneNumber: this.phoneNumber
      });
    },
    registerEnterprise() {
      console.log(this.name),
        console.log(this.phoneNumber),
        this.$store.dispatch(REGISTER_ENTERPRISE, {
          name: this.name,
          phoneNumber: this.phoneNumber
        });
    }
  },
  computed: {
    formatDate() {
      return date => date.replace("T", " ").substring(0, 16);
    },
    ...mapState(["user"])
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
