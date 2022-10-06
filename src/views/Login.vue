<template>
  <div class="login-page py-5">
    <div class="container login-page-content">
      <div class="row d-flex">
        <div class="col-5 d-flex align-items-end">
          <img src="../assets/image/login/login-img.png" class="w-100" />
        </div>
      
        <div class="col-7 login-page-form py-5">
          <div class="row">
            <b-card no-body class="login-page-tab-menu">
              <b-tabs pills card>
                <b-tab title="Sign in" active
                  ><b-card-text>
                    <h4 class="login-page-header">Login Account</h4>

                    <b-form-input
                      v-model="signInForm.phone"
                      class="login-page-input"
                      placeholder="Your phone number"
                    ></b-form-input>
                    <b-button
                      class="login-page-button py-2"
                      @click="loginUser()"
                      >Login</b-button
                    >
                  </b-card-text></b-tab
                >
                <b-tab title="Sing up"
                  ><b-card-text>
                    <h4 class="login-page-header">Create Account</h4>
                    <b-form-input
                      v-model="signUpForm.name"
                      class="login-page-input"
                      placeholder="Your name"
                    ></b-form-input>
                    <b-form-input
                      v-model="signUpForm.mail"
                      class="login-page-input"
                      placeholder="Your mail"
                    ></b-form-input>
                    <b-form-input
                      v-model="signUpForm.phone"
                      class="login-page-input"
                      placeholder="Your phone number"
                    ></b-form-input>
                    <b-button
                      class="login-page-button py-2"
                      @click="createUser()"
                      >Create Account</b-button
                    >
                  </b-card-text></b-tab
                >
              </b-tabs>
            </b-card>

            <div id="recaptcha-container"></div>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Confirm Code"
      v-model="confirmCodeModel"
      hide-footer
    >
      <form ref="form">
        <b-form-group label="Confirm Code">
          <b-form-input v-model="confirmCode" required></b-form-input>
          <b-button variant="success" class="mt-2" @click="signConfirmation()"
            >Confirm code</b-button
          >
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateEmail,
  updateProfile,
  signOut,
} from "../firebase-config/index";
export default {
  data() {
    return {
      confirmCode: null,
      confirmCodeModel: false,
      signInForm: {
        phone: null,
      },
      signUpForm: {
        name: null,
        mail: null,
        phone: null,
      },
    };
  },
  created() {
    console.log("user", auth);
  },

  mounted() {
    this.createVerify();
    if (localStorage.getItem("user")) {
      this.$router.push("/messages");
    }
  },
  methods: {
    createVerify() {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {},
        },
        auth
      );
    },
    createUser() {
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, this.signUpForm.phone, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          this.confirmCodeModel = true;
        })
        .catch((error) => {
          alert(error);
        });
    },
    loginUser() {
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, this.signInForm.phone, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          this.confirmCodeModel = true;
        })
        .catch((error) => {
          alert(error);
        });
    },
    signConfirmation() {
      confirmationResult
        .confirm(this.confirmCode)
        .then((result) => {
          const user = result.user;
          console.log("user", user);
          localStorage.setItem("user", JSON.stringify(user));

          updateProfile(auth.currentUser, {
            displayName: this.signUpForm.name,
          });
          updateEmail(auth.currentUser, this.signUpForm.mail)
            .then(() => {
              console.log("email güncellendi");
            })
            .catch((error) => {
              console.log("mail error", error);
            });
          this.$router.push("/messages");
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
};
</script>

<style lang="scss">
@import "../assets/css/login.scss";
</style>
