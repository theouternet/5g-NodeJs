<template>
  <v-container id="login" fluid class="fill-height">
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="auto">
        <v-card class="px-10" elevation="10" width="500">
          <div class="text-h5 text-center py-10">Welcome</div>

          <v-alert v-if="error" class="text-center" type="error" dense text>{{
            error
          }}</v-alert>

          <v-text-field
            v-model="username"
            label="Username"
            class="mb-5"
            outlined
            full-width
          />
          <v-text-field
            v-model="password"
            label="Password"
            class="mb-10"
            type="password"
            outlined
            full-width
          />

          <v-row class="pb-10" justify="center" no-gutters>
            <v-col cols="auto">
              <v-btn color="primary" x-large @click.stop="login">Login</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Login",

  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },

  computed: mapState(["token"]),

  methods: {
    ...mapActions(["setToken"]),

    async login() {
      this.error = "";
      this.setToken(false);

      const username = this.username.trim();
      const password = this.password.trim();

      try {
        const loginResponse = await this.$http.post("/api/users/login", {
          username,
          password
        });

        this.setToken(loginResponse.data.token);
        this.$router.replace({ name: "Projects" });
      } catch (error) {
        this.error = "Incorrect Username / Password";
      }
    }
  },

  mounted() {
    if (this.token) {
      this.$router.replace({ name: "Projects" });
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  background: #ddd;
}
</style>
