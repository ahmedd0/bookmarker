// ======= GET HTML ELEMENT ===================
var webSiteName = document.getElementById("name");
var url = document.getElementById("url");
var bookmarks = document.getElementById("bookmarks");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var searchBtn = document.getElementById("searchBtn");
var urlAlert = document.getElementById("urlAlert");
var nameAlert = document.getElementById("nameAlert");

// ======= GLOBAL VARIABLE  ======
var bookmarksList;
if (localStorage.getItem("bookmarks") == null) {
  bookmarksList = [];
} else {
  bookmarksList = JSON.parse(localStorage.getItem("bookmarks"));
  console.log("here");
}
var CRUDS = {
  add: function () {
    var bookmark = {
      name: webSiteName.value,
      url: `${url.value}`,
    };
    sliceHttp(bookmark);
    if (bookmark.name && bookmark.url) {
      bookmarksList.push(bookmark);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
      clearForm();
    } else {
      alert("COMPLETE ALL REQUIRED DATA");
    }
  },
  display: function () {
    var container = "";
    for (let i = 0; i < bookmarksList.length; i++) {
      container += `
      <div class="col-lg-3 col-md-4  mb-4">
                    <div class="item  py-3 text-center text-white">
                        <h5 class="bookMarkName text-uppercase text-dark font-weight-bold">${bookmarksList[i].name}</h5>
                        <hr>
                        <div class="icons mt-3">
                            <button onclick="CRUDS.delete(${i})" class="btn btn-danger removeBtn pr-2"><i class="fas fa-trash"></i></button>
                            <a href="#form-section" onclick="CRUDS.update(${i})" class="btn btn-dark pr-2"><i class="fas fa-edit"></i></a>
                            <a href='https://${bookmarksList[i].url}' target="_blank" class="pr-2 btn btn-info text-white"><i class="fas fa-external-link-alt"></i></a>


                        </div>
                    </div>
                </div>
      `;
    }
    bookmarks.innerHTML = container;
  },
  delete: function (index) {
    bookmarksList.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
    CRUDS.display();
  },
  search: function (val) {
    var container = "";
    for (let i = 0; i < bookmarksList.length; i++) {
      if (bookmarksList[i].name.toLowerCase().includes(val.toLowerCase())) {
        container += `
      <div class="col-lg-3 col-md-4  mb-4">
                    <div class="item  py-3 text-center text-white">
                        <h5 class="bookMarkName text-dark font-weight-bold text-uppercase">${bookmarksList[i].name}</h5>
                        <hr>
                        <div class="icons mt-3">
                            <button onclick="CRUDS.delete(${i})" class="btn btn-danger removeBtn pr-2"><i class="fas fa-trash"></i></button>
                            <a href="#form-section" onclick="CRUDS.update(${i})" class="btn btn-dark pr-2"><i class="fas fa-edit"></i></a>
                            <a href='https://${bookmarksList[i].url}' target="_blank" class="pr-2 btn btn-info text-white"><i class="fas fa-external-link-alt"></i></a>


                        </div>
                    </div>
                </div>
      `;
      }
    }
    bookmarks.innerHTML = container;
  },
  update: function (index) {
    webSiteName.value = bookmarksList[index].name;
    url.value = bookmarksList[index].url;
    chnageBtn("UPDATE", "updateBtn", `CRUDS.saveEdit(${index})`);
    hideErrMessage();
    hideSuccessMessage();
  },
  saveEdit: function (index) {
    var bookmark = {
      name: webSiteName.value,
      url: `${url.value}`,
    };
    sliceHttp(bookmark);
    if (bookmark.name && bookmark.url) {
      bookmarksList[index].name = bookmark.name;
      bookmarksList[index].url = bookmark.url;
      localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
      CRUDS.display();
      clearForm();
    } else {
      alert(console.log("COMPLETE ALL REQUIRED DATA"));
    }
    chnageBtn("ADD BOOKMARK", "addBtn", `addData(${index})`);
    document.getElementById("addBtn").setAttribute("disabled", "true");
  },
};
// ====================  DISPLAY ALL BOOKMARKS ===========================
CRUDS.display();
// =====================  Helper Function ====================================

function addData() {
  CRUDS.add();
  CRUDS.display();
  disableAddBtn();
  disabledUpdateBtn();
  hideSuccessMessage();
}

function chnageBtn(name, id, fn) {
  document.getElementById("btn").innerHTML = `
    <button onclick="${fn}"
        class="btn btn-add btn-dark text-center p-3 rounded-pill border-0 position-relative font-weight-bold"
        id="${id}">
        ${name}
        <div class="btn-effect d-flex position-absolute">
            <div class="sub-divs div-1"></div>
            <div class="sub-divs div-2"></div>
            <div class="sub-divs div-3"></div>
            <div class="sub-divs div-4"></div>
            <div class="sub-divs div-5"></div>

        </div>
    </button>

    `;
}

function clearForm() {
  webSiteName.value = "";
  url.value = "";
}
// ======================= FORM VALIDATION ===========================
var nameRegex = /^[a-zA-Z0-9\- ]{3,20}$/;
var urlRegex = /^(http(s)?:\/\/)?www\.[a-zA-Z]{3,}\.[a-z]{1,}([a-zA-Z0-9\/=&\-#@:])*$/;
webSiteName.onkeyup = function () {
  validateInput(this, nameAlert, nameRegex);
  isDataValid();
};
url.onkeyup = function () {
  validateInput(this, urlAlert, urlRegex);
  isDataValid();
};
function validateInput(input, alertDiv, regex) {
  var nameRejex = regex;
  var isValid = nameRejex.test(input.value);
  if (!isValid) {
    alertDiv.classList.remove("d-none");
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
  } else {
    alertDiv.classList.add("d-none");
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  }
}
function isDataValid() {
  if (
    webSiteName &&
    url &&
    nameRegex.test(webSiteName.value) &&
    urlRegex.test(url.value)
  ) {
    enableAddBtn();
    enableUpdateBtn();
  } else {
    disableAddBtn();
    disabledUpdateBtn();
  }
}
isDataValid();
// ==================== Enabled And DISABLED BTNS ===============
function enableAddBtn() {
  var addBtn = document.getElementById("addBtn");
  if (addBtn) {
    addBtn.removeAttribute("disabled");
  }
}
function enableUpdateBtn() {
  var updateBtn = document.getElementById("updateBtn");
  if (updateBtn) {
    updateBtn.removeAttribute("disabled");
  }
}
function disableAddBtn() {
  var addBtn = document.getElementById("addBtn");
  if (addBtn) {
    addBtn.setAttribute("disabled", "true");
  }
}
function disabledUpdateBtn() {
  var updateBtn = document.getElementById("updateBtn");
  if (updateBtn) {
    updateBtn.setAttribute("disabled", "true");
  }
}
function sliceHttp(bookmark) {
  let https = "https://";
  let http = "http://";
  if (bookmark.url.startsWith(https)) {
    bookmark.url = bookmark.url.slice(https.length - 1);
  } else if (bookmark.url.startsWith(http)) {
    bookmark.url = bookmark.url.slice(https.length - 1);
  }
}
function hideErrMessage() {
  nameAlert.classList.add("d-none");
  urlAlert.classList.add("d-none");
  webSiteName.classList.remove("is-invalid");
  url.classList.remove("is-invalid");
}
function hideSuccessMessage() {
  webSiteName.classList.remove("is-valid");
  url.classList.remove("is-valid");
}
