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
const toEl = document.getElementById("to");
const fromEl = document.getElementById("from");

publishButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  push(endorsementListInDB, inputValue);

  clearInputFieldEl();
});

onValue(endorsementListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let endorsementArray = Object.entries(snapshot.val());

    clearEndorsementListEl();

    for (let i = 0; i < endorsementArray.length; i++) {
      let currentEndorsement = endorsementArray[i];
      let currentEndorsementID = currentEndorsement[0];
      let currentEndorsementValue = currentEndorsement[1];

      appendItemToEndorsementListEl(currentEndorsement);
    }
  } else {
    endorsementListEl.innerHTML = "Add an endorsement for your friend...";
  }
});

function clearEndorsementListEl() {
  endorsementListEl.innerHTML = "";
}

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function appendItemToEndorsementListEl(comment) {
  let commentID = comment[0];
  let commentValue = comment[1];

  let newEl = document.createElement("li");

  newEl.textContent = commentValue;

  //REMOVED DELETE FUNCTION FOR SECURITY PURPOSES CAN ADD BACK IF NEEDED
  //newEl.addEventListener("dblclick", function () {
  //  let exactLocationOfItemInDB = ref(database, `endorsementList/${commentID}`);
  //
  //  remove(exactLocationOfItemInDB);
  //   });

  endorsementListEl.append(newEl);
}
