mark_id = 0;
counter = 0;
bigdivs = 0;

items = [];

var config = firebaseConfig;
firebase.initializeApp(config);

var token = sessionStorage.getItem('token');
var number = document.createAttribute("number");
var enter_link = document.getElementById('enter_link');

enter_link.addEventListener('keyup', function (e) {
  if (e.keyCode == 13) {
    addWebMarkBackend();
  }
});

async function addItem(item_id, url, screenshot) {
  items.push([item_id, url, screenshot]);
}

function addWebMarkBackend() {
  const auth = firebase.auth();

  if (token == null || token == "") {
    alert('Please log in and try again.');
    return;
  }

  const newInput = enter_link.value;

  if (newInput.length < 1) {
    alert('Please enter a url to add as a WebMark.');
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
      addItem(res.item_id, res.url, res.screenshot)
        .then(function(result) {
          addWebMarkFrontend();
      });
    }
  })
};

function addWebMarkFrontend() {
  mark_id = mark_id + 1;

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
      one_mark.setAttribute("number", mark_id);
      first_row.appendChild(one_mark);

      one_img = document.createElement('IMG');
      one_img.setAttribute("class", "WebMark_img");
      one_img.src = "data:image/gif;base64,"+items[counter][2]+"";
      one_mark.appendChild(one_img);

      one_close = document.createElement('span');
      one_close.innerHTML = "&times";
      one_close.setAttribute("class","close");
      one_mark.appendChild(one_close);

      one_close.addEventListener("click", function() {
        deleteWebMarkBackend(webmark_id);
      });

      one_mark.scrollIntoView({behavior: "smooth"});
    }

    else if (counter % 5 == 1) {

      twothree_mark = document.createElement('div');
      twothree_mark.setAttribute("id", "twothree");
      first_row.appendChild(twothree_mark);

      two_mark = document.createElement('div');
      two_mark.setAttribute("id", "two");
      two_mark.setAttribute("class", "mark");
      two_mark.setAttribute("number", mark_id);
      twothree_mark.appendChild(two_mark);

      two_img = document.createElement('IMG');
      two_img.setAttribute("class", "WebMark_img");
      two_img.src = "data:image/gif;base64,"+items[counter][2]+"";
      two_mark.appendChild(two_img);

      two_close = document.createElement('span');
      two_close.innerHTML = "&times";
      two_close.setAttribute("class","close");
      two_mark.appendChild(two_close);

      two_close.addEventListener("click", function() {
        deleteWebMarkBackend(webmark_id);
      });

      two_mark.scrollIntoView({behavior: "smooth"});
    }

    else if (counter % 5 == 2) {

      three_mark = document.createElement('div');
      three_mark.setAttribute("id", "three");
      three_mark.setAttribute("class", "mark");
      three_mark.setAttribute("number", mark_id);
      twothree_mark.appendChild(three_mark);

      three_img = document.createElement('IMG');
      three_img.setAttribute("class", "WebMark_img");
      three_img.src = "data:image/gif;base64,"+items[counter][2]+"";
      three_mark.appendChild(three_img);

      three_close = document.createElement('span');
      three_close.innerHTML = "&times";
      three_close.setAttribute("class","close");
      three_mark.appendChild(three_close);

      three_close.addEventListener("click", function() {
        deleteWebMarkBackend(webmark_id);
      });

      three_mark.scrollIntoView({behavior: "smooth"});
    }

    else if (counter % 5 == 3) {

      second_row = document.createElement('div');
      second_row.setAttribute("id", "secondrow");
      WebMarks_div.appendChild(second_row);

      four_mark = document.createElement('div');
      four_mark.setAttribute("id", "four");
      four_mark.setAttribute("class", "mark");
      four_mark.setAttribute("number", mark_id);
      WebMarks_div.appendChild(four_mark);
      second_row.appendChild(four_mark);

      four_img = document.createElement('IMG');
      four_img.setAttribute("class", "WebMark_img");
      four_img.src = "data:image/gif;base64,"+items[counter][2]+"";
      four_mark.appendChild(four_img);

      four_close = document.createElement('span');
      four_close.innerHTML = "&times";
      four_close.setAttribute("class","close");
      four_mark.appendChild(four_close);

      four_close.addEventListener("click", function() {
        deleteWebMarkBackend(webmark_id);
      });

      four_mark.scrollIntoView({behavior: "smooth"});
    }

    else if (counter % 5 == 4) {

      five_mark = document.createElement('div');
      five_mark.setAttribute("id", "five");
      five_mark.setAttribute("class", "mark");
      five_mark.setAttribute("number", mark_id);
      second_row.appendChild(five_mark);

      five_img = document.createElement('IMG');
      five_img.setAttribute("class", "WebMark_img");
      five_img.src = "data:image/gif;base64,"+items[counter][2]+"";
      five_mark.appendChild(five_img);

      five_close = document.createElement('span');
      five_close.innerHTML = "&times";
      five_close.setAttribute("class","close");
      five_mark.appendChild(five_close);

      five_close.addEventListener("click", function() {
        deleteWebMarkBackend(webmark_id);
      });

      five_mark.scrollIntoView({behavior: "smooth"});
    }

      counter = counter + 1;

      if(counter > 1){
        resrc()
      }

};

function resrc(){
  div_iter = 0;
  for(i = items.length - 1;i >= 0; i--){
    div = document.getElementsByClassName("mark")[div_iter];
    img = div.getElementsByTagName('img')[0];
    img.src = "data:image/gif;base64,"+items[i][2]+"";
    div_iter = div_iter + 1;
  }
}

function deleteWebMarkBackend(webmark_id) {
  const auth = firebase.auth();

  if (token == null || token == "") {
    alert('Please log in and try again.');
    return;
  }

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
      deleteWebMarkFrontend();
    }
  })
};

function deleteWebMarkFrontend() {
  mark_id = parseInt(mark_id);
  last_element_id = mark_id - 1;

  array = document.getElementsByClassName("mark");
  array[last_element_id].remove();

  mark_id = mark_id - 1;
  counter = counter - 1;

  if (counter % 5  == 0 | counter == 0) {
    last_bigdiv = bigdivs - 1;
    WebMarks_divs = document.getElementsByClassName("bigdivs");
    WebMarks_divs[last_bigdiv].remove();
    bigdivs = bigdivs - 1;
  }
};
