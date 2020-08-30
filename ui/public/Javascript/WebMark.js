bigdivs = 0;
twothree_divs = 0;
fourfive_divs = 0;

items = [];

var config = firebaseConfig;
firebase.initializeApp(config);

var token = sessionStorage.getItem('token');
var number = document.createAttribute("number");
var enter_link = document.getElementById('enter_link');

async function addExistingItems(existing_items) {
  for (const [key, value] of Object.entries(existing_items)) {
    items.push([value.item_id, value.url, value.screenshot]);
  }
};

async function displayFortNite() {
  displayWebMarks();
};

window.addEventListener('load', (event) => {
  const auth = firebase.auth();

  var server = "http://127.0.0.1:5000";
  var appdir = "/items/user";

  $.ajax({
    type: "GET",
    url: server + appdir,
    data: {},
    contentType: "application/x-www-form-urlencoded",
    headers: {
      "Authorization": "token " + token
    },
    success: function(res){
      addExistingItems(res)
        .then(function(result) {
          	displayFortNite()
        	.then(function(result) {
          		loading();
      		});
      });
    },
    error: function(res){
      if (res.responseText == "Unauthorized Access") {
        alert('Please log in to view your WebMarks.');
      } else {
        alert(res.responseJSON["error"]);
      }
      return;
    }
  })
});

enter_link.addEventListener('keyup', function (e) {
  if (e.keyCode == 13) {
    addWebMark();
  }
});

async function addNewItem(item_id, url, screenshot) {
  items.unshift([item_id, url, screenshot]);
};

function addWebMark() {
  const auth = firebase.auth();

  const newInput = enter_link.value;

  if (newInput.length < 1) {
    alert('Please enter a URL to add as a WebMark.');
    return;
  }

  var url_data = {"url": newInput};
  var server = "http://127.0.0.1:5000";
  var appdir = "/items/create";

  $.ajax({
    type: "POST",
    url: server + appdir,
    data: url_data,
    dataType: "json",
    contentType: "application/x-www-form-urlencoded",
    headers: {
      "Authorization": "token " + token
    },
    success: function(res){
      addNewItem(res.item_id, res.url, res.screenshot)
      .then(function(result) {
          	displayFortNite()
        	.then(function(result) {
          		loading();
          		enter_link.value = "";
          enter_link.placeholder = "Upload Link Here"
      		});
      });
    },
    error: function(res){
      if (res.responseText == "Unauthorized Access") {
        alert('Please log in to add a new WebMark.');
      } else {
        alert(res.responseJSON["error"]);
      }
      return;
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

  var server = "http://127.0.0.1:5000";
  var appdir = "/items/delete/" + webmark_id;

  $.ajax({
    type: "DELETE",
    url: server + appdir,
    data: {},
    headers: {
      "Authorization": "token " + token,
      'Content-Type': 'application/json'
    },
    success: function(res){
      deleteExistingItem(webmark_id)
        .then(function(result) {
          displayWebMarks();
      });
    },
    error: function(res){
      if (res.responseText == "Unauthorized Access") {
        alert('Please log in to delete a WebMark.');
      } else {
        alert(res.responseJSON["error"]);
      }
      return;
    }
  })
};


function displayWebMarks() {

  document.querySelectorAll('.bigdivs').forEach(function(a){
    a.remove()
  })

  for (counter = 0; counter < items.length; counter++) {

      if (counter % 5 == 0) {

        WebMarks_div = document.createElement('div');      
        WebMarks_div.setAttribute("id", "WebMarks");
        WebMarks_div.setAttribute("class", "bigdivs");
        bigdivs = bigdivs + 1;
        document.body.appendChild(WebMarks_div);

        first_row = document.createElement('div');
        first_row.setAttribute("id", "firstrow");
        WebMarks_div.appendChild(first_row);

        one_mark = document.createElement('div');
        one_mark.setAttribute("id", "one");
        one_mark.setAttribute("class", "mark");

        //loading();


        one_mark.setAttribute("item_id", counter);
        first_row.appendChild(one_mark);

        if(items[counter][2] == "screenshot unavailable"){
          // done_loading();
          one_img = document.createElement('IMG');
          one_img.setAttribute("class", "WebMark_img");
          one_img.src = "../images/unavailable.png"
          one_mark.appendChild(one_img);
        }

        else if(items[counter][2] == "check iframe"){
          // done_loading();
          one_iframe = document.createElement('iframe');
          one_iframe.setAttribute("class", "WebMark_img");
          one_iframe.src = items[counter][1];
          one_mark.appendChild(one_iframe);
        }

        else{
          // done_loading();
          one_img = document.createElement('IMG');
          one_img.setAttribute("class", "WebMark_img");
          one_img.src = "data:image/gif;base64,"+items[counter][2]+"";
          one_mark.appendChild(one_img);
        }

        one_close = document.createElement('span');
        one_close.innerHTML = "&times";
        one_close.setAttribute("class","close");
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

        if(items[counter][2] == "screenshot unavailable"){
          two_img = document.createElement('IMG');
          two_img.setAttribute("class", "WebMark_img");
          two_img.src = "../images/unavailable.png"
          two_mark.appendChild(two_img);
        }

        else if(items[counter][2] == "check iframe"){
          two_iframe = document.createElement('iframe');
          two_iframe.setAttribute("class", "WebMark_img");
          two_iframe.src = items[counter][1];
          two_mark.appendChild(two_iframe);
        }

        else{
          two_img = document.createElement('IMG');
          two_img.setAttribute("class", "WebMark_img");
          two_img.src = "data:image/gif;base64,"+items[counter][2]+"";
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

        if(items[counter][2] == "screenshot unavailable"){
          three_img = document.createElement('IMG');
          three_img.setAttribute("class", "WebMark_img");
          three_img.src = "../images/unavailable.png"
          three_mark.appendChild(three_img);
        }

        else if(items[counter][2] == "check iframe"){
          three_iframe = document.createElement('iframe');
          three_iframe.setAttribute("class", "WebMark_img");
          three_iframe.src = items[counter][1];
          three_mark.appendChild(three_iframe);
        }

        else{
          three_img = document.createElement('IMG');
          three_img.setAttribute("class", "WebMark_img");
          three_img.src = "data:image/gif;base64,"+items[counter][2]+"";
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

        if(items[counter][2] == "screenshot unavailable"){
          four_img = document.createElement('IMG');
          four_img.setAttribute("class", "WebMark_img");
          four_img.src = "../images/unavailable.png"
          four_mark.appendChild(four_img);
        }

        else if(items[counter][2] == "check iframe"){
          four_iframe = document.createElement('iframe');
          four_iframe.setAttribute("class", "WebMark_img");
          four_iframe.src = items[counter][1];
          four_mark.appendChild(four_iframe);
        }

        else{
          four_img = document.createElement('IMG');
          four_img.setAttribute("class", "WebMark_img");
          four_img.src = "data:image/gif;base64,"+items[counter][2]+"";
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

        if(items[counter][2] == "screenshot unavailable"){
          five_img = document.createElement('IMG');
          five_img.setAttribute("class", "WebMark_img");
          five_img.src = "../images/unavailable.png"
          five_mark.appendChild(five_img);
        }

        else if(items[counter][2] == "check iframe"){
          five_iframe = document.createElement('iframe');
          five_iframe.setAttribute("class", "WebMark_img");
          five_iframe.src = items[counter][1];
          five_mark.appendChild(five_iframe);
        }

        else {
          five_img = document.createElement('IMG');
          five_img.setAttribute("class", "WebMark_img");
          five_img.src = "data:image/gif;base64,"+items[counter][2]+"";
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
      item.childNodes[1].addEventListener("click", function() {
        item_id = parseInt(item.getAttribute("item_id"));
        deleteWebMark(items[item_id][0]);
      });
    });
};


function loading(){
        x = document.getElementsByClassName("mark");
        x = x[0];
        x.style.border = "2px solid green";
        spinner = document.createElement('div');
        spinner.setAttribute("id","spinner");
        x.appendChild(one_spinner);
}

function done_loading(){
      spinner = document.getElementById("spinner");
      spinner.remove();
      x = document.getElementsByClassName("mark");
      x = x[0];
      x.style.border = "none";
}
