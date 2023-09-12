import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://championsapp-54f3c-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementListInDB = ref(database, "endorsementList");

const inputFieldEl = document.getElementById("input-main");
const publishButtonEl = document.getElementById("publish-btn");
const endorsementListEl = document.getElementById("endorsements-list");

publishButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  push(endorsementListInDB, inputValue);
  console.log("clicked");
  //clearInputFieldEl();
});
