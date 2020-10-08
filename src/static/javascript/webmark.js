items = [];

var config = firebaseConfig;
firebase.initializeApp(config);

var token = sessionStorage.getItem('token');
var enter_link = document.getElementById('enter_link');
var sign_in_button = document.getElementById('signin_button');
var webmark_logo = document.getElementById('logo');


async function addExistingItems(existing_items) {
  for (const [key, value] of Object.entries(existing_items)) {
    items.push([value.item_id, value.url, value.screenshot]);
  }
};

window.addEventListener('load', (event) => {
  start_loading_popup()
    .then(function(result) {
      getWebMarks();
    });
});

async function getWebMarks() {
  const auth = firebase.auth();

  $.ajax({
    type: "GET",
    url: "/items/user",
    data: {},
    contentType: "application/x-www-form-urlencoded",
    headers: {
      "Authorization": "token " + token
    },
    success: function(res) {
      addExistingItems(res)
        .then(function(result) {
          displayWebMarks()
            .then(function(result) {
              stop_loading_popup();
            });
        });
    },
    error: function(res) {
      if (res.responseText == "Unauthorized Access") {
        stop_loading_popup()
          .then(function(result) {
            alert('Please log in to view your WebMarks.');
            sign_in_button.style.visibility = "visible";
            webmark_logo.setAttribute("onclick", "location.href = 'home';");
            return;
          });
      } else {
        stop_loading_popup()
          .then(function(result) {
            alert(res.responseJSON["error"]);
            return;
          });
      }
      return;
    }
  })
};

enter_link.addEventListener('keyup', function (e) {
  if (e.keyCode == 13) {
    addNewBlankItem()
      .then(function(result) {
        displayWebMarks()
          .then(function(result) {
            start_item_loading()
              .then(function(result) {
                addWebMark()
              });
          });
      });
  }
});

async function addNewDetailedItem(item_id, url, screenshot) {
  items[0] = [item_id, url, screenshot];
};

async function addNewBlankItem() {
  items.unshift(["", "", ""]);
};

async function deleteNewBlankItem() {
  items.splice(0, 1);
};

function addWebMark() {
  const auth = firebase.auth();

  const newInput = enter_link.value;

  if (newInput.length < 1) {
    deleteNewBlankItem()
      .then(function(result) {
        displayWebMarks()
          .then(function(result) {
            alert('Please enter a URL to add as a WebMark.');
            return;
          });
      });
  }

  var url_data = {"url": newInput};

  $.ajax({
    type: "POST",
    url: "/items/create",
    data: url_data,
    dataType: "json",
    contentType: "application/x-www-form-urlencoded",
    headers: {
      "Authorization": "token " + token
    },
    success: function(res) {
      addNewDetailedItem(res.item_id, res.url, res.screenshot)
        .then(function(result) {
          	displayFirstWebMark()
              .then(function(result) {
              	stop_item_loading();
              });
          	enter_link.value = "";
            enter_link.placeholder = "Upload Link Here"
        });
    },
    error: function(res) {
      if (res.responseText == "Unauthorized Access") {
        deleteNewBlankItem()
          .then(function(result) {
            displayWebMarks()
              .then(function(result) {
                alert('Please log in to add a new WebMark.');
                sign_in_button.style.visibility = "visible";
                webmark_logo.setAttribute("onclick", "location.href = 'home';");
                return;
              });
          });
      } else {
        deleteNewBlankItem()
          .then(function(result) {
            displayWebMarks()
              .then(function(result) {
                alert(res.responseJSON["error"]);
                return;
              });
          });
      }
    }
  })
};

async function deleteExistingItem(webmark_id) {
  var index = -1;

  for (i = 0; i < items.length; i++) {
    if (items[i][0] == webmark_id) {
      index = i;
    }
  }

  if (index > -1) {
    items.splice(index, 1);
  }
};

function deleteWebMark(webmark_id) {
  const auth = firebase.auth();

  $.ajax({
    type: "DELETE",
    url: "/items/delete/" + webmark_id,
    data: {},
    headers: {
      "Authorization": "token " + token,
      'Content-Type': 'application/json'
    },
    success: function(res) {
      deleteExistingItem(webmark_id)
        .then(function(result) {
          displayWebMarks()
            .then(function(result) {
              stop_delete_popup();
            });
        });
    },
    error: function(res) {
      if (res.responseText == "Unauthorized Access") {
        stop_delete_popup()
          .then(function(result) {
            alert('Please log in to delete a WebMark.');
            sign_in_button.style.visibility = "visible";
            webmark_logo.setAttribute("onclick", "location.href = 'home';");
            return;
          });
      } else {
        stop_delete_popup()
          .then(function(result) {
            alert(res.responseJSON["error"]);
            return;
          });
      }
    }
  })
};

async function displayWebMarks() {

  document.querySelectorAll('.bigdivs').forEach(function(a) {
    a.remove()
  })

  for (counter = 0; counter < items.length; counter++) {

      if (counter % 5 == 0) {

        WebMarks_div = document.createElement('div');
        WebMarks_div.setAttribute("id", "WebMarks");
        WebMarks_div.setAttribute("class", "bigdivs");
        document.body.appendChild(WebMarks_div);

        first_row = document.createElement('div');
        first_row.setAttribute("id", "firstrow");
        WebMarks_div.appendChild(first_row);

        one_mark = document.createElement('div');
        one_mark.setAttribute("id", "one");
        one_mark.setAttribute("class", "mark");

        one_mark.setAttribute("item_id", counter);
        first_row.appendChild(one_mark);

        if (items[counter][2] == "screenshot unavailable") {
          one_img = document.createElement('IMG');
          one_img.setAttribute("class", "WebMark_img");
          one_img.src = "static/media/unavailable.png";
          one_mark.appendChild(one_img);
        }

        else if (items[counter][2] == "check iframe") {
          one_iframe = document.createElement('iframe');
          one_iframe.setAttribute("class", "WebMark_img");
          one_iframe.src = items[counter][1];
          one_mark.appendChild(one_iframe);
        }

        else if (items[counter][2] == "") {
          one_blank_img = document.createElement('IMG');
          one_blank_img.setAttribute("class", "WebMark_blank_img");
          one_mark.appendChild(one_blank_img);
        }

        else {
          one_img = document.createElement('IMG');
          one_img.setAttribute("class", "WebMark_img");
          one_img.src = "data:image/gif;base64," + items[counter][2] + "";
          one_mark.appendChild(one_img);
        }

        one_close = document.createElement('span');
        one_close.innerHTML = "&times";
        one_close.setAttribute("class","close");

        if (items[counter][2] == "") {
          one_close.style.visibility = "hidden";
        }

        one_mark.appendChild(one_close);
      }

      else if (counter % 5 == 1) {

        twothree_mark = document.createElement('div');
        twothree_mark.setAttribute("id", "twothree");
        first_row.appendChild(twothree_mark);

        two_mark = document.createElement('div');
        two_mark.setAttribute("id", "two");
        two_mark.setAttribute("class", "mark");
        two_mark.setAttribute("item_id", counter);
        twothree_mark.appendChild(two_mark);

        if (items[counter][2] == "screenshot unavailable") {
          two_img = document.createElement('IMG');
          two_img.setAttribute("class", "WebMark_img");
          two_img.src = "static/media/unavailable.png";
          two_mark.appendChild(two_img);
        }

        else if (items[counter][2] == "check iframe") {
          two_iframe = document.createElement('iframe');
          two_iframe.setAttribute("class", "WebMark_img");
          two_iframe.src = items[counter][1];
          two_mark.appendChild(two_iframe);
        }

        else {
          two_img = document.createElement('IMG');
          two_img.setAttribute("class", "WebMark_img");
          two_img.src = "data:image/gif;base64," + items[counter][2] + "";
          two_mark.appendChild(two_img);
        }

        two_close = document.createElement('span');
        two_close.innerHTML = "&times";
        two_close.setAttribute("class","close");
        two_mark.appendChild(two_close);
      }

      else if (counter % 5 == 2) {

        three_mark = document.createElement('div');
        three_mark.setAttribute("id", "three");
        three_mark.setAttribute("class", "mark");
        three_mark.setAttribute("item_id", counter);
        twothree_mark.appendChild(three_mark);

        if (items[counter][2] == "screenshot unavailable") {
          three_img = document.createElement('IMG');
          three_img.setAttribute("class", "WebMark_img");
          three_img.src = "static/media/unavailable.png";
          three_mark.appendChild(three_img);
        }

        else if (items[counter][2] == "check iframe") {
          three_iframe = document.createElement('iframe');
          three_iframe.setAttribute("class", "WebMark_img");
          three_iframe.src = items[counter][1];
          three_mark.appendChild(three_iframe);
        }

        else {
          three_img = document.createElement('IMG');
          three_img.setAttribute("class", "WebMark_img");
          three_img.src = "data:image/gif;base64," + items[counter][2] + "";
          three_mark.appendChild(three_img);
        }

        three_close = document.createElement('span');
        three_close.innerHTML = "&times";
        three_close.setAttribute("class","close");
        three_mark.appendChild(three_close);
      }

      else if (counter % 5 == 3) {

        second_row = document.createElement('div');
        second_row.setAttribute("id", "secondrow");
        WebMarks_div.appendChild(second_row);

        four_mark = document.createElement('div');
        four_mark.setAttribute("id", "four");
        four_mark.setAttribute("class", "mark");
        four_mark.setAttribute("item_id", counter);
        WebMarks_div.appendChild(four_mark);
        second_row.appendChild(four_mark);

        if (items[counter][2] == "screenshot unavailable") {
          four_img = document.createElement('IMG');
          four_img.setAttribute("class", "WebMark_img");
          four_img.src = "static/media/unavailable.png";
          four_mark.appendChild(four_img);
        }

        else if (items[counter][2] == "check iframe") {
          four_iframe = document.createElement('iframe');
          four_iframe.setAttribute("class", "WebMark_img");
          four_iframe.src = items[counter][1];
          four_mark.appendChild(four_iframe);
        }

        else {
          four_img = document.createElement('IMG');
          four_img.setAttribute("class", "WebMark_img");
          four_img.src = "data:image/gif;base64," + items[counter][2] + "";
          four_mark.appendChild(four_img);
        }

        four_close = document.createElement('span');
        four_close.innerHTML = "&times";
        four_close.setAttribute("class","close");
        four_mark.appendChild(four_close);
      }

      else if (counter % 5 == 4) {

        five_mark = document.createElement('div');
        five_mark.setAttribute("id", "five");
        five_mark.setAttribute("class", "mark");
        five_mark.setAttribute("item_id", counter);
        second_row.appendChild(five_mark);

        if (items[counter][2] == "screenshot unavailable") {
          five_img = document.createElement('IMG');
          five_img.setAttribute("class", "WebMark_img");
          five_img.src = "static/media/unavailable.png";
          five_mark.appendChild(five_img);
        }

        else if (items[counter][2] == "check iframe") {
          five_iframe = document.createElement('iframe');
          five_iframe.setAttribute("class", "WebMark_img");
          five_iframe.src = items[counter][1];
          five_mark.appendChild(five_iframe);
        }

        else {
          five_img = document.createElement('IMG');
          five_img.setAttribute("class", "WebMark_img");
          five_img.src = "data:image/gif;base64," + items[counter][2] + "";
          five_mark.appendChild(five_img);
        }

        five_close = document.createElement('span');
        five_close.innerHTML = "&times";
        five_close.setAttribute("class","close");
        five_mark.appendChild(five_close);
      }
    }

    items_array = document.querySelectorAll(".mark");

    items_array.forEach(function(item) {
      item.childNodes[0].addEventListener("click", function() {
          item_id = parseInt(item.getAttribute("item_id"));
          window.open(items[item_id][1], '_blank');
      });
    });

    items_array.forEach(function(item) {
      item.childNodes[1].addEventListener("click", function() {
        start_delete_popup()
          .then(function(result) {
            item_id = parseInt(item.getAttribute("item_id"));
            deleteWebMark(items[item_id][0]);
        });
      });
    });
};

async function start_item_loading() {
  x = document.getElementsByClassName("mark");
  y = x[0];
  y.style.border = "2px solid #FF8E2D";
  spinner = document.createElement('IMG');
  spinner.setAttribute("id","spinner");
  spinner.src = "static/media/bookmark.png";
  y.appendChild(spinner);
}

async function stop_item_loading() {
  items_array = document.querySelectorAll(".mark");
  item = items_array[0]
  item.style.border = "none";
  item.childNodes[2].remove();
}

async function displayFirstWebMark() {

  items_array = document.querySelectorAll(".mark");
  counter = 0;

  item = items_array[counter];

  if (items[counter][2] == "screenshot unavailable") {
    one_img = document.createElement('IMG');
    one_img.setAttribute("class", "WebMark_img");
    one_img.src = "static/media/unavailable.png";
    item.replaceChild(one_img, item.childNodes[0]);
  }

  else if (items[counter][2] == "check iframe") {
    one_iframe = document.createElement('iframe');
    one_iframe.setAttribute("class", "WebMark_img");
    one_iframe.src = items[counter][1];
    item.replaceChild(one_iframe, item.childNodes[0]);
  }

  else {
    one_img = document.createElement('IMG');
    one_img.setAttribute("class", "WebMark_img");
    one_img.src = "data:image/gif;base64," + items[counter][2] + "";
    item.replaceChild(one_img, item.childNodes[0]);
  }

  item.childNodes[0].addEventListener("click", function() {
    item_id = parseInt(item.getAttribute("item_id"));
    window.open(items[counter][1], '_blank');
  });

  item.childNodes[1].style.visibility = "visible";
};

async function start_loading_popup() {
  popup = document.createElement("div");
  popup.setAttribute("id","loading_popup");
  popup.innerHTML = "Loading WebMarks";

  loading_dots = document.createElement("div");
  loading_dots.setAttribute("id","loading_spinner");
  popup.appendChild(loading_dots);

  dot_1 = document.createElement("div");
  dot_1.setAttribute("class","bounce1");

  dot_2 = document.createElement("div");
  dot_2.setAttribute("class","bounce2");

  dot_3 = document.createElement("div");
  dot_3.setAttribute("class","bounce3");

  loading_dots.appendChild(dot_1);
  loading_dots.appendChild(dot_2);
  loading_dots.appendChild(dot_3);
  document.body.appendChild(popup);
}

async function stop_loading_popup() {
  popup = document.getElementById("loading_popup");
  popup.remove();
}

async function start_delete_popup() {
  popup = document.createElement("div");
  popup.setAttribute("id", "delete_popup");
  popup.innerHTML = "Deleting WebMark...";
  document.body.appendChild(popup);
}

async function stop_delete_popup() {
  popup = document.getElementById("delete_popup");
  popup.remove();
}
