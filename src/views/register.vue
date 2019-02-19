<template>
  <div id="register-page">
    <h1 class="title">esaynote login</h1>
    <template>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model.trim="name"
          :counter="10"
          :rules="rules.nameRules"
          label="Name"
          required
        ></v-text-field>
        <v-text-field v-model.trim="email" :rules="rules.emailRules" label="E-mail" required></v-text-field>
        <v-text-field
          :append-icon="showPassword ? 'visibility_off' : 'visibility'"
          :rules="[rules.required, rules.min]"
          :type="showPassword ? 'text' : 'password'"
          name="input-10-2"
          label="Not visible"
          hint="At least 8 characters"
          v-model.trim="password"
          class="input-group--focused"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-radio-group v-model="sex" :rules="[rules.required]">
          <v-radio
            v-for="(n,index) in sexuality"
            :key="index"
            :label="`${n.text}`"
            :value="n.value"
          ></v-radio>
        </v-radio-group>
        <v-btn :disabled="!valid" color="success" @click="validate">register</v-btn>
        <v-btn color="rgb(214, 235, 255)" to="login">go login</v-btn>
      </v-form>
    </template>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState, mapActions } from "vuex";
import { setTimeout } from "timers";

export default {
  data: () => ({
    valid: true,
    showPassword: false,
    name: "",
    email: "",
    sex: "",
    password: "",
    sexuality: [
      { text: "I'm ♂.", value: "man" },
      { text: "I'm ♀.", value: "woman" },
      { text: "I don't know,maybe both,maybe neither.😏", value: "unknow" }
    ],
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
    ...mapMutations(["awakeSnackbar", "closeSnackbar"]),
    validate() {
      if (this.$refs.form.validate()) {
        this.register();
      }
    },
    register() {
      this.$http
        .register({
          email: this.email,
          username: this.name,
          password: this.password,
          sex: this.sex
        })
        .then(res => {
          console.log(res);
          console.log(" ccccccccccccccc ");
          this.awakeSnackbar({
            text: "注册成功~",
            timeout: 10000
          });
          setTimeout(() => {
            this.closeSnackbar();
            this.$router.push("login");
          }, 3000);
        })
        .catch(e => {
          this.awakeSnackbar({
            text: e.response.data.message[0].message
          });
          console.log("sssssssssssssssss");
          console.log(e);
        });
    }
  }
};
</script>

<style lang="less" scoped>
#register-page {
  padding: 30px;
  padding-top: 60px;
  .title {
    text-align: center;
  }
}
</style>

