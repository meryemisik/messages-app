<template>
  <div class="message-page">
    <div class="message-page-content">
      <div class="row message-page-content-left">
        <div class="col-4 border-end position-relative">
          <div
            v-show="myProfileDetailVisible"
            class="row col-12 my-profile-detail"
          >
            <div class="profile-top-menu" @click="backMessageList">
              <span class="d-flex align-items-center cursor-pointer"
                ><i class="icon icon-arrow-left me-2"></i> Profil</span
              >
            </div>
            <div class="profile-picture">
              <img
                src="../assets/image/messages/profile.png"
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
                src="../assets/image/messages/profile.png"
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
                class="col-12 message-page-content-messages-list cursor-pointer"
                v-for="item in myContacts"
                :key="item"
                @click="selectUser(item.phone)"
              >
                <div class="message-page-content-coming-message-picture">
                  <img
                    src="../assets/image/messages/contacts.png"
                    class="message-page-content-profile-picture"
                  />
                  <div
                    class="message-page-content-coming-message-list cursor-pointer"
                  >
                    <div class="message-page-content-message-user">
                      {{ item.phone }}
                    </div>
                    <div class="message-page-content-message-content">
                      {{ item.message }}
                    </div>
                  </div>
                </div>

                <div class="message-page-content-coming-message-time">
                  <div>{{ item.createdDate }}</div>
                  <div class="message-page-content-coming-message-count d-none">
                    4
                  </div>
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
                src="../assets/image/messages/contacts.png"
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
                <b-dropdown-item @click="deleteUser(this.receiverNumber)"
                  >Sohbeti Sil</b-dropdown-item
                >
              </b-dropdown>
            </div>
          </div>
          <div class="message-list thin-scrollbar">
            <div class="flex-column">
              <div v-html="currentMessageList"></div>
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
  query,
  orderBy,
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
    this.refreshMessages()
    this.myProfileName = JSON.parse(
      localStorage.getItem("mat-user")
    ).displayName;
    this.getContacts(db);
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
    refreshMessages(){
      setInterval(() => {
        
       if(this.receiverNumber != null){
        this.getContacts(db);
       }
      },3000);
    },
    addZero(num) {
      if (num < 10) {
        return `0${num}`;
      }
      return num;
    },
    dateSort() {
      var date = new Date();
      return `${date.getFullYear()}-${this.addZero(
        date.getMonth() + 1
      )}-${this.addZero(date.getDate())}-${this.addZero(
        date.getHours()
      )}-${this.addZero(date.getMinutes())}-${this.addZero(
        date.getSeconds()
      )}-${this.addZero(date.getMilliseconds())}`;
    },
    messageStructure(receiverPhone, msgContent) {
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
          isRead: false,
          isDelete: false,
          messageSorting: this.dateSort(),
        }
      );
    },
    async createNewMessage() {
      if (
        this.receiverPhoneNumber.trim().length != 0 &&
        this.messageContent.trim().length != 0
      ) {
        await this.messageStructure(
          this.receiverPhoneNumber,
          this.messageContent
        );
        this.createNewMessagePopup = false;
       
        this.myContacts.map((e, index) => {
        if(e.phone == this.receiverPhoneNumber){
          this.myContacts.splice(index,1)
        }
      })
        this.myContacts.splice(0, 0, {
          phone: this.receiverPhoneNumber,
          message: this.messageContent,
          createdDate: this.writeMessageTime(new Date()),
        });
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
    writeMessageTime(messageDate) {
      if (new Date(messageDate).getDate() == new Date().getDate()) {
        return `${this.addZero(
          new Date(messageDate).getHours()
        )}:${this.addZero(new Date(messageDate).getMinutes())}`;
      } else if (new Date(messageDate).getDate() == new Date().getDate() - 1) {
        return "Dün";
      } else {
        return `${this.addZero(new Date(messageDate).getDate())} ${this.addZero(
          this.months[new Date(messageDate).getMonth()]
        )} ${this.addZero(new Date(messageDate).getFullYear())}`;
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
    async deleteUser(phone) {

      this.isChatActive = false;
      this.receiverNumber = null;
    
      this.myContacts.map((e, index) => {
        if (e.phone == phone) {
          this.myContacts.splice(index, 1);
        }
      });

      const messagesCol = collection(db, "messages");
      const messagesSnapshot = await getDocs(messagesCol);
      this.messageList = await Promise.all(
        messagesSnapshot.docs
          .filter(
            (doc) =>
              (doc.data().sender == phone ||
                doc.data().sender == this.senderNumber) &&
              (doc.data().receiver == phone ||
                doc.data().receiver == this.senderNumber) &&
              doc.data().isDelete == false
          )
          .map(async (doc) => {
            await this.deleteMessage(doc.id);
          })
      );
    },

    async deleteMessage(id) {
      setDoc(
        doc(db, "messages", id),
        {
          isDelete: true,
        },
        { merge: true }
      );
    },
    listMessages() {

      this.currentMessageList = "";
      this.messageList
        .filter((item) => item.isDelete == false)
        .map((item) => {
          let className = "incoming";
          if (item.sender == this.senderNumber) {
            className = "sending";
          }
          this.currentMessageList += `${this.writeMessageDate(
            item.createdDate
          )}<div class='message-content-${className}'>
                  <span>${item.messages}</span>
                  <span class="messages-time"
                    >${this.addZero(
                      new Date(item.createdDate).getHours()
                    )}:${this.addZero(
            new Date(item.createdDate).getMinutes()
          )}</span
                  >
                </div>`;
        });
    },
   
    async sendMessage() {
      await this.messageStructure(this.receiverNumber, this.inputMessageText);
      this.messageList.push({
        messages: this.inputMessageText,
        createdDate: Date(),
        sender: this.senderNumber,
        receiver: this.receiverNumber,
      });

      this.myContacts.map((e, index) => {
        if(e.phone == this.receiverNumber){
          this.myContacts.splice(index,1)
          this.myContacts.splice(0, 0, {
          phone: this.receiverNumber,
          message: this.inputMessageText,
          createdDate: this.writeMessageTime(new Date()),
        });
        }
      })

      this.inputMessageText = "";
      this.getMessages(db);
    },
    async getMessages(db) {
      const messagesCol = collection(db, "messages");
      const sorting = query(messagesCol, orderBy("messageSorting"));
      const messagesSnapshot = await getDocs(sorting);
      this.messageList = messagesSnapshot.docs
        .filter(
          (doc) =>
            (doc.data().sender == this.receiverNumber ||
              doc.data().sender == this.senderNumber) &&
            (doc.data().receiver == this.receiverNumber ||
              doc.data().receiver == this.senderNumber) &&
            doc.data().isDelete == false
        )
        .map((doc) => doc.data());

      this.listMessages();
    },
    async getContacts(db) {
      const messagesCol = collection(db, "messages");
      const sorting = query(messagesCol, orderBy("messageSorting"));
      const messagesSnapshot = await getDocs(sorting);

      messagesSnapshot.docs
        .slice(0)
        .reverse()
        .filter(
          (doc) =>
            (doc.data().sender == this.senderNumber ||
              doc.data().receiver == this.senderNumber) &&
            doc.data().isDelete == false
        )
        .map((doc) => {
         

          if (doc.data().sender == this.senderNumber) {
            let isData = false;
            this.myContacts.map((e) => {
              if (e.phone == doc.data().receiver) {
                isData = true;
              }
            });

            if (isData == false) {
              this.myContacts.push({
                phone: doc.data().receiver,
                message: doc.data().messages,
                createdDate: this.writeMessageTime(doc.data().createdDate),
              });
            }
          }
          if (doc.data().receiver == this.senderNumber) {
            let isData = false;
            this.myContacts.map((e) => {
              if (e.phone == doc.data().sender) {
                isData = true;
              }
            });

            if (isData == false) {
              this.myContacts.push({
                phone: doc.data().sender,
                message: doc.data().messages,
                createdDate: this.writeMessageTime(doc.data().createdDate),
              });
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
