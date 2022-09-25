<template >
    <div class="login-page py-5">
       <div class="container login-page-content">
            <div class="row d-flex">
                <div class="col-5 d-flex align-items-end">
                   <img src="../assets/image/login/login-img.png" class="w-100">
                </div>
                <div class="col-7 login-page-form py-5">
                   <h4 class="login-page-header">Create Account</h4>
                   <b-form-input v-model="text" class="login-page-input" placeholder="Your name"></b-form-input>
                   <b-form-input v-model="text" class="login-page-input" placeholder="Your mail"></b-form-input>
                   <b-form-input v-model="text" class="login-page-input" placeholder="Your phone number"></b-form-input>
                  <router-link to="/messages">
                    <b-button class="login-page-button py-2">Create Account</b-button>
                  </router-link>
                </div>
            </div>
       </div>
    </div>
</template>

<style  lang="scss">
@import '../assets/css/login.scss';

</style>