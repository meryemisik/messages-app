<template>
  <div class="message-page">
    <div class="message-page-content">
      <div class="row message-page-content-left">
        <div class="col-4 border-end position-relative">
          <div
            v-show="myProfileDetailVisible"
            class="row col-4 my-profile-detail"
          >
            <div class="profile-top-menu" @click="backMessageList">
              <span class="d-flex align-items-center cursor-pointer"
                ><i class="icon icon-arrow-left me-2"></i> Profil</span
              >
            </div>
            <div class="profile-picture">
              <img
                src="../assets/image/messages/profile.jpeg"
                class="profile-img"
              />
            </div>
            <div class="update-name">
              <input v-model="myProfileName" :disabled="myProfileNameDisplay" />
              <i
                class="icon-pencil"
                @click="myProfileNameEdit"
                v-show="myProfileNameDisplay"
              ></i>
              <i
                class="icon-check"
                @click="myProfileNameSave"
                v-show="!myProfileNameDisplay"
              ></i>
            </div>
          </div>
          <div class="row message-page-content-header">
            <div
              class="col-12 d-flex justify-content-between align-items-center"
            >
              <img
                @click="myProfileDetail"
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
                  <b-dropdown-item @click="createNewMessagePopup = true"
                    >Yeni Sohbet</b-dropdown-item
                  >
                  <b-dropdown-item @click="myProfileDetailVisible = true"
                    >Profil</b-dropdown-item
                  >
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
              <div
                class="col-12 message-page-content-messages-list"
                v-for="item in myContacts"
                :key="item"
                @click="selectUser(item)"
              >
                <div class="message-page-content-coming-message-picture">
                  <img
                    src="../assets/image/messages/apom.jpeg"
                    class="message-page-content-profile-picture"
                  />
                  <div
                    class="message-page-content-coming-message-list cursor-pointer"
                  >
                    <div class="message-page-content-message-user">
                      {{ item }}
                    </div>
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
            </div>
          </div>
          <div>
            <button
              class="create-new-messages"
              @click="this.createNewMessagePopup = true"
            >
              <i class="icon-user-follow"></i>
            </button>
          </div>
        </div>
        <div class="col-8 chat-bg" v-show="!isChatActive">
          <img src="../assets/image/messages/chat-bg.png" />
        </div>
        <div class="col-8 message-content" v-show="isChatActive">
          <div class="user-profile-top-menu">
            <div
              @click="userProfileDetail"
              class="d-flex align-items-center cursor-pointer"
            >
              <img
                src="../assets/image/messages/apom.jpeg"
                class="message-page-content-profile-picture"
              />
              {{ this.receiverNumber }}
            </div>
            <div class="user-popup-button">
              <b-dropdown
                size="lg"
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
              >
                <template #button-content>
                  <i class="icon-options-vertical"></i>
                </template>
                <b-dropdown-item @click="userProfileDetailVisible = true"
                  >Kişi Bilgisi</b-dropdown-item
                >
                <b-dropdown-item @click="isChatActive = false"
                  >Sohbeti Kapat</b-dropdown-item
                >
              </b-dropdown>
            </div>
          </div>
          <div class="message-list thin-scrollbar">
            <div class="flex-column">
              <span v-html="currentMessageList"></span>
            </div>
          </div>
          <div
            v-show="userProfileDetailVisible"
            class="col-4 user-profile-detail"
          >
            <div
              class="user-detail-close-button cursor-pointer"
              @click="userDetailClose"
            >
              <i class="icon-close"></i>
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
                v-model="inputMessageText"
              />
              <button @click="sendMessage()" class="send-button">
                <i class="icon-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <b-modal
        v-model="createNewMessagePopup"
        centered
        title="Create New Messages"
        hide-footer
      >
        <b-form-input
          v-model="receiverPhoneNumber"
          placeholder="Enter receiver phone number"
        ></b-form-input>
        <b-form-textarea
          class="mt-2"
          id="textarea"
          v-model="messageContent"
          placeholder="Enter your messages"
          rows="3"
          max-rows="6"
        ></b-form-textarea>
        <b-button
          class="btn-sm mt-2"
          variant="success"
          @click="createNewMessage()"
          >Button</b-button
        >
      </b-modal>
    </div>
  </div>
</template>

<script>
import {
  auth,
  signOut,
  collection,
  getDocs,
  db,
  doc,
  setDoc,
} from "../firebase-config/index";
export default {
  data() {
    return {
      createNewMessagePopup: false,
      messageContent: null,
      receiverPhoneNumber: null,
      isChatActive: false,
      userProfileDetailVisible: false,
      myProfileNameDisplay: true,
      myProfileName: null,
      myProfileDetailVisible: false,
      messagedateText: null,
      firstMessageDate: null,
      secondMessageDate: null,
      myContacts: [],
      messageList: [],
      inputMessageText: null,
      senderNumber: null,
      receiverNumber: null,
      currentMessageList: null,
      months: [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık",
      ],
    };
  },
  async created() {
    this.myProfileName = JSON.parse(
      localStorage.getItem("mat-user")
    ).displayName;
    this.getMessages(db);
    this.senderNumber = JSON.parse(
      localStorage.getItem("mat-user")
    ).phoneNumber;
  },

  mounted() {
    if (!localStorage.getItem("mat-user")) {
      this.$router.push("/");
    }
  },
  methods: {
    deneme(receiverPhone,msgContent) {
     return setDoc(
        doc(
          db,
          "messages",
          Date() + JSON.parse(localStorage.getItem("mat-user")).uid
        ),
        {
          messages: msgContent,
          createdDate: Date(),
          sender: this.senderNumber,
          receiver: receiverPhone,
          isRead:false,
          isDelete:false,
        }
      );

    },
    async createNewMessage() {
      console.log(this.receiverPhoneNumber.trim());
      if (
        this.receiverPhoneNumber.trim().length != 0 &&
        this.messageContent.trim().length != 0
      ) {
        await this.deneme(this.receiverPhoneNumber,this.messageContent);
        this.createNewMessagePopup = false;
        this.getMessages(db);
        this.selectUser(this.receiverPhoneNumber);
        this.receiverPhoneNumber = null;
        this.messageContent = null;
      } else {
        alert("alanları doldurunuz");
      }
    },
    userDetailClose() {
      this.userProfileDetailVisible = false;
    },
    userProfileDetail() {
      this.userProfileDetailVisible = true;
    },
    backMessageList() {
      this.myProfileDetailVisible = false;
    },
    myProfileNameSave() {
      this.myProfileNameDisplay = true;
    },
    myProfileNameEdit() {
      this.myProfileNameDisplay = false;
    },
    myProfileDetail() {
      this.myProfileDetailVisible = true;
    },
    writeMessageDate(messageDate) {
      this.firstMessageDate = messageDate;
      if (
        new Date(this.firstMessageDate).getDate() !=
        new Date(this.secondMessageDate).getDate()
      ) {
        if (new Date(this.firstMessageDate).getDate() == new Date().getDate()) {
          this.secondMessageDate = this.firstMessageDate;
          return "Bugün";
        } else if (
          new Date(this.firstMessageDate).getDate() ==
          new Date().getDate() - 1
        ) {
          this.secondMessageDate = this.firstMessageDate;
          return "Dün";
        } else {
          this.secondMessageDate = this.firstMessageDate;
          return `${new Date(this.firstMessageDate).getDate()} ${
            this.months[new Date(this.firstMessageDate).getMonth()]
          } ${new Date(this.firstMessageDate).getFullYear()}`;
        }
      } else {
        return "";
      }
    },
    ScrollToBottom() {
      //window.scrollTo(0,  document.getElementsByClassName('message-list').scrollHeight);
      //document.getElementsByClassName('thin-scrollbar').scrollTo(0, 5000);
      //console.log(document.getElementsByClassName('message-list').scrollBy(0, 5000))
    },
    selectUser(phone) {
      this.isChatActive = true;
      this.receiverNumber = phone;
      this.getMessages(db);
      this.ScrollToBottom();
    },
    listMessages() {
      this.currentMessageList = "";
      this.messageList.filter(item => item.isDelete == false).map((item) => {
        let className = "incoming";
        if (item.sender == this.senderNumber) {
          className = "sending";
        }
        this.currentMessageList += `${this.writeMessageDate(
          item.createdDate
        )}<div class='message-content-${className}'>
                  <span>${item.messages}</span>
                  <span class="messages-time"
                    >${new Date(item.createdDate).getHours()}:${new Date(
          item.createdDate
        ).getMinutes()}</span
                  >
                </div>`;
      });
    },
    async sendMessage() {
      await this.deneme(this.receiverNumber,this.inputMessageText)
      this.messageList.push({
        messages: this.inputMessageText,
        createdDate: Date(),
        sender: this.senderNumber,
        receiver: this.receiverNumber,
      });

      this.inputMessageText = "";
    },
    async getMessages(db) {
      const messagesCol = collection(db, "messages");
      const messagesSnapshot = await getDocs(messagesCol);
      this.messageList = messagesSnapshot.docs
        .filter(
          (doc) =>
            (doc.data().sender == this.receiverNumber ||
              doc.data().sender == this.senderNumber) &&
            (doc.data().receiver == this.receiverNumber ||
              doc.data().receiver == this.senderNumber)
        )
        .map((doc) => doc.data());

      messagesSnapshot.docs
        .filter(
          (doc) =>
            (doc.data().sender == this.senderNumber ||
            doc.data().receiver == this.senderNumber) && doc.data().isDelete == false
        )
        .map((doc) => {
          if (doc.data().sender == this.senderNumber) {
            if (!this.myContacts.includes(doc.data().receiver)) {
              this.myContacts.push(doc.data().receiver);
            }
          }
          if (doc.data().receiver == this.senderNumber) {
            if (!this.myContacts.includes(doc.data().sender)) {
              this.myContacts.push(doc.data().sender);
            }
          }
        });
      this.listMessages();
    },
    logOut() {
      signOut(auth)
        .then(() => {
          localStorage.removeItem("mat-user");
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
