<template >
    <div class="login-page py-5">
       <div class="container login-page-content">
            <div class="row d-flex">
                <div class="col-4 d-flex align-items-end">
                   <img src="../assets/image/login/login-img.png" class="w-100">
                </div>
                <div class="col-8 login-page-form py-5">
                   <h5 class="login-page-header">Create Account</h5>
                   <b-form-input v-model="text" class="login-page-input-name" placeholder="Your name"></b-form-input>
                   <b-form-input v-model="text" class="login-page-input-mail" placeholder="Your mail"></b-form-input>
                   <b-form-input v-model="text" class="login-page-input-phone" placeholder="Your phone number"></b-form-input>
                   <b-button class="login-page-button">Create Account</b-button>
                </div>
            </div>
       </div>
    </div>
</template>

<style  lang="scss">
@import '../assets/css/login.scss';

</style>