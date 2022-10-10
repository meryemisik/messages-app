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
                  <div class="message-page-content-coming-message-list">
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
        </div>
        <div class="col-8 message-content">
          <div class="message-list thin-scrollbar">
            <div class="flex-column">
              <div v-for="item in messageList" :key="item" >
              <span class="messages-date">{{writeMessageDate(item.createdDate)}}</span>
                <div
                  class="message-content-sending"
                  v-if="item.sender == this.senderNumber"
                >
                  <span>{{ item.messages }} </span>
                  <span class="messages-time">{{ new Date(item.createdDate).getHours() }}:{{
                      new Date(item.createdDate).getMinutes()
                    }}</span>
                </div>
                <div class="message-content-incoming" v-else>
                  <span>{{ item.messages }} </span>
                  <span class="messages-time"
                    >{{ new Date(item.createdDate).getHours() }}:{{
                      new Date(item.createdDate).getMinutes()
                    }}</span
                  >
                </div>
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
      firstMessageDate: null,
      secondMessageDate: null,
      myContacts: [],
      messageList: [],
      inputMessageText: null,
      senderNumber: null,
      receiverNumber: null,
      months : ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
    };
  },
  async created() {
   
    console.log(Date());
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
    writeMessageDate(messageDate){
      console.log("===============")
      console.log('messageDate',messageDate)
      this.firstMessageDate = messageDate;
      
      if( new Date(this.firstMessageDate).getDate() == new Date(this.secondMessageDate).getDate()){
        console.log("firsMessage",this.firstMessageDate)
      }
      else{
        this.secondMessageDate = this.firstMessageDate;
        console.log("seconMessage",this.secondMessageDate)
        // if( new Date(this.firstMessageDate).getDate() == new Date().getDate()){
        //  return 'Bugün'
        // }
        // else if(new Date(this.firstMessageDate).getDate() == new Date().getDate() - 1){
        //   return 'Dün'
        // }
        // else{
        //   return  `${new Date(this.firstMessageDate).getDate()} ${ this.months[new Date(this.firstMessageDate).getMonth()]} ${new Date(this.firstMessageDate).getFullYear()}` 
        // }
        
       
      }
     
    },
    ScrollToBottom() {
      //biz tarihi gönderirken saati ile gönderiyor muyduk
      //window.scrollTo(0,  document.getElementsByClassName('message-list').scrollHeight);
      //document.getElementsByClassName('thin-scrollbar').scrollTo(0, 5000);
      //console.log(document.getElementsByClassName('message-list').scrollBy(0, 5000))
    },
    selectUser(phone) {
      this.receiverNumber = phone;
      this.getMessages(db);
      this.ScrollToBottom();
    },
    async sendMessage() {
      await setDoc(
        doc(
          db,
          "messages",
          Date() + JSON.parse(localStorage.getItem("mat-user")).uid
        ),
        {
          messages: this.inputMessageText,
          createdDate: Date(),
          sender: this.senderNumber,
          receiver: this.receiverNumber,
        }
      );
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
            doc.data().sender == this.senderNumber ||
            doc.data().receiver == this.senderNumber
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
