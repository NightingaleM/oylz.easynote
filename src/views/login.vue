<template>
  <div id="login-page">
    <h1 class="title">esaynote login</h1>
    <template>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model.trim="email" :rules="rules.emailRules" label="E-mail" required></v-text-field>
        <v-text-field
          :append-icon="showPassword ? 'visibility_off' : 'visibility'"
          :rules="[rules.required, rules.min]"
          :type="showPassword ? 'text' : 'password'"
          name="input-10-2"
          label="password"
          hint="At least 8 characters"
          v-model.trim="password"
          class="input-group--focused"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-btn style="margin:0" :disabled="!valid" color="success" @click="validate">login</v-btn>
        <v-btn color="rgb(197, 239, 216)" to="/register">register</v-btn>
      </v-form>
    </template>
  </div>
</template>


<script>
import { mapMutations, mapGett, mapState, mapActions } from "vuex";

export default {
  data: () => ({
    valid: true,
    email: "",
    password: "",
    showPassword: false,
    rules: {
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\.{1}.+/.test(v) || "E-mail must be valid"
      ],
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters"
    }
  }),
  methods: {
    ...mapActions(["login"]),
    ...mapMutations(["awakeSnackbar", "closeSnackbar"]),
    validate() {
      if (this.$refs.form.validate()) {
        this.login({
          email: this.email,
          password: this.password
        })
          .then(res => {
            this.$router.push("/");
          })
          .catch(e => {
            this.awakeSnackbar({
              text: e.response.data[0].message
            });
          });
      }
    }
    // ...mapMutations("user", {
    //   signIn: types.USER_SIGNIN,
    //   hide: types.HIDE_LOGIN_FORM
    // }),
  },
  computed: {
    // ...mapState("user", ["isLoginFormShow", "isRegistFirst"])
  },
  created() {
    console.log(this.$store);
  }
};
</script>

<style lang="less" scoped>
#login-page {
  padding: 30px;
  padding-top: 60px;
  .title {
    text-align: center;
  }
}
</style>
