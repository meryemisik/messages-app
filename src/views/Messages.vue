<template>
  <div class="message-page">
    <div class="message-page-content">
      <div class="row message-page-content-left">
        <div class="col-4 border-end">
          <div class="row message-page-content-header">
            <div
              class="col-12 d-flex justify-content-between align-items-center"
            >
              <img
                src="../assets/image/messages/profile.jpeg"
                class="message-page-content-profile-picture"
              />
              <div>
                <b-dropdown
                  size="lg"
                  variant="link"
                  toggle-class="text-decoration-none"
                  no-caret
                >
                  <template #button-content>
                    <i class="icon-settings btn"></i>
                  </template>
                  <b-dropdown-item href="#">Action</b-dropdown-item>
                  <b-dropdown-item href="#">Another action</b-dropdown-item>
                  <b-dropdown-item @click="logOut">Çıkış</b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
          </div>
          <div class="row message-page-content-list">
            <div class="col-12 message-page-content-search">
              <input
                class="form-control message-page-content-search-input"
                type="search"
                placeholder="Search"
                aria-label="Search"
                size="small"
              />
            </div>

            <div class="message-page-content-left-scroll thin-scrollbar">
              <div class="col-12 message-page-content-messages-list">
                <div class="message-page-content-coming-message-picture">
                  <img
                    src="../assets/image/messages/apom.jpeg"
                    class="message-page-content-profile-picture"
                  />
                  <div class="message-page-content-coming-message-list">
                    <div class="message-page-content-message-user">APO BEY</div>
                    <div class="message-page-content-message-content">
                      Son mesaj
                    </div>
                  </div>
                </div>

                <div class="message-page-content-coming-message-time">
                  <div>14:59</div>
                  <div class="message-page-content-coming-message-count">4</div>
                </div>
              </div>
              <div class="col-12 message-page-content-messages-list">
                <div class="message-page-content-coming-message-picture">
                  <img
                    src="../assets/image/messages/apom.jpeg"
                    class="message-page-content-profile-picture"
                  />
                  <div class="message-page-content-coming-message-list">
                    <div class="message-page-content-message-user">APO BEY</div>
                    <div class="message-page-content-message-content">
                      Son mesaj
                    </div>
                  </div>
                </div>

                <div class="message-page-content-coming-message-time">
                  14:59
                </div>
              </div>
              <div class="col-12 message-page-content-messages-list">
                <div class="message-page-content-coming-message-picture">
                  <img
                    src="../assets/image/messages/apom.jpeg"
                    class="message-page-content-profile-picture"
                  />
                  <div class="message-page-content-coming-message-list">
                    <div class="message-page-content-message-user">APO BEY</div>
                    <div class="message-page-content-message-content">
                      Son mesaj
                    </div>
                  </div>
                </div>

                <div class="message-page-content-coming-message-time">
                  14:59
                </div>
              </div>
              <div class="col-12 message-page-content-messages-list">
                <div class="message-page-content-coming-message-picture">
                  <img
                    src="../assets/image/messages/apom.jpeg"
                    class="message-page-content-profile-picture"
                  />
                  <div class="message-page-content-coming-message-list">
                    <div class="message-page-content-message-user">APO BEY</div>
                    <div class="message-page-content-message-content">
                      Son mesaj
                    </div>
                  </div>
                </div>

                <div class="message-page-content-coming-message-time">
                  14:59
                </div>
              </div>
              <div class="col-12 message-page-content-messages-list">
                <div class="message-page-content-coming-message-picture">
                  <img
                    src="../assets/image/messages/apom.jpeg"
                    class="message-page-content-profile-picture"
                  />
                  <div class="message-page-content-coming-message-list">
                    <div class="message-page-content-message-user">APO BEY</div>
                    <div class="message-page-content-message-content">
                      Son mesaj
                    </div>
                  </div>
                </div>

                <div class="message-page-content-coming-message-time">
                  14:59
                </div>
              </div>
              <div class="col-12 message-page-content-messages-list">
                <div class="message-page-content-coming-message-picture">
                  <img
                    src="../assets/image/messages/apom.jpeg"
                    class="message-page-content-profile-picture"
                  />
                  <div class="message-page-content-coming-message-list">
                    <div class="message-page-content-message-user">APO BEY</div>
                    <div class="message-page-content-message-content">
                      Son mesaj
                    </div>
                  </div>
                </div>

                <div class="message-page-content-coming-message-time">
                  14:59
                </div>
              </div>
              <div class="col-12 message-page-content-messages-list">
                <div class="message-page-content-coming-message-picture">
                  <img
                    src="../assets/image/messages/apom.jpeg"
                    class="message-page-content-profile-picture"
                  />
                  <div class="message-page-content-coming-message-list">
                    <div class="message-page-content-message-user">APO BEY</div>
                    <div class="message-page-content-message-content">
                      Son mesaj
                    </div>
                  </div>
                </div>

                <div class="message-page-content-coming-message-time">
                  14:59
                </div>
              </div>
              <div class="col-12 message-page-content-messages-list">
                <div class="message-page-content-coming-message-picture">
                  <img
                    src="../assets/image/messages/apom.jpeg"
                    class="message-page-content-profile-picture"
                  />
                  <div class="message-page-content-coming-message-list">
                    <div class="message-page-content-message-user">APO BEY</div>
                    <div class="message-page-content-message-content">
                      Son mesaj
                    </div>
                  </div>
                </div>

                <div class="message-page-content-coming-message-time">
                  14:59
                </div>
              </div>
              <div class="col-12 message-page-content-messages-list">
                <div class="message-page-content-coming-message-picture">
                  <img
                    src="../assets/image/messages/apom.jpeg"
                    class="message-page-content-profile-picture"
                  />
                  <div class="message-page-content-coming-message-list">
                    <div class="message-page-content-message-user">APO BEY</div>
                    <div class="message-page-content-message-content">
                      Son mesaj
                    </div>
                  </div>
                </div>

                <div class="message-page-content-coming-message-time">
                  14:59
                </div>
              </div>
              <div class="col-12 message-page-content-messages-list">
                <div class="message-page-content-coming-message-picture">
                  <img
                    src="../assets/image/messages/apom.jpeg"
                    class="message-page-content-profile-picture"
                  />
                  <div class="message-page-content-coming-message-list">
                    <div class="message-page-content-message-user">APO BEY</div>
                    <div class="message-page-content-message-content">
                      Son mesaj
                    </div>
                  </div>
                </div>

                <div class="message-page-content-coming-message-time">
                  14:59
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-8 message-content">
          <div class="message-list thin-scrollbar">
            <div class="flex-column">
              <div class="message-content-incoming">
                <span> Lorem Ipsum, </span>
              </div>
              <div class="message-content-incoming">
                <span>
                  Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır
                  metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir
                </span>
              </div>
              <div class="message-content-sending">
                <span>
                  Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır
                  metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir
                </span>
              </div>
              <div class="message-content-sending">
                <span>
                  Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır
                  metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir
                </span>
              </div>

              <div class="message-content-incoming">
                <span> Lorem Ipsum, </span>
              </div>
              <div class="message-content-incoming">
                <span>
                  Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır
                  metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir
                </span>
              </div>
              <div class="message-content-incoming">
                <span>
                  Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır
                  metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir
                </span>
              </div>
              <div class="message-content-sending">
                <span>
                  Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır
                  metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir
                </span>
              </div>
              <div class="message-content-sending">
                <span>
                  Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır
                  metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir
                </span>
              </div>

              <div class="message-content-incoming">
                <span> Lorem Ipsum, </span>
              </div>
              <div class="message-content-sending">
                <span>
                  Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır
                  metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir
                </span>
              </div>
              <div class="message-content-sending">
                <span>
                  Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır
                  metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir
                </span>
              </div>

              <div class="message-content-incoming">
                <span> Lorem Ipsum, </span>
              </div>
              <div class="message-content-sending">
                <span>
                  Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır
                  metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir
                </span>
              </div>
              <div class="message-content-sending">
                <span>
                  Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır
                  metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir
                </span>
              </div>

              <div class="message-content-incoming">
                <span> Lorem Ipsum, </span>
              </div>
              <div class="message-content-sending">
                <span>
                  Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır
                  metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir
                </span>
              </div>
              <div class="message-content-sending">
                <span>
                  Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır
                  metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir
                </span>
              </div>

              <div class="message-content-incoming">
                <span> Lorem Ipsum, </span>
              </div>
              <div class="message-content-sending">
                <span>
                  Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır
                  metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir
                </span>
              </div>
              <div class="message-content-sending">
                <span>
                  Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır
                  metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir
                </span>
              </div>
            </div>
          </div>
          <div class="">
            <div class="message-search">
              <input
                class="form-control"
                type="search"
                placeholder="Send message"
                aria-label="Search"
                size="small"
              />
              <button class="send-button">
                <i class="icon-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, signOut } from "../firebase-config/index";
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    console.log("test", auth.currentUser);
    if (!localStorage.getItem("user")) {
      this.$router.push("/");
    }
  },
  methods: {
    logOut() {
      signOut(auth)
        .then(() => {
          console.log("logout success");
          localStorage.removeItem("user");
          this.$router.push("/");
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
};
</script>

<style lang="scss">
@import "../assets/css/messages.scss";
</style>
