mark_id = 0;
counter = 0;
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

window.addEventListener('load', (event) => {
  const auth = firebase.auth();

  if (token == null || token == "") {
    alert('Please log in and try again.');
    return;
  }

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
          addExistingWebMarks();
      });
    }
  })
});

function addExistingWebMarks() {

  for (i = 0; i < items.length; i++) {

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

        if(items[counter][2] == "screenshot unavailable"){
          one_img = document.createElement('IMG');
          one_img.setAttribute("class", "WebMark_img");
          one_img.src = "../images/unavailable.png"
          one_mark.appendChild(one_img);
        }

        else if(items[counter][2] == "check iframe"){
          one_iframe = document.createElement('iframe');
          one_iframe.setAttribute("class", "WebMark_img");
          one_iframe.src = items[counter][1];
          one_mark.appendChild(one_iframe);
        }

        else{
          one_img = document.createElement('IMG');
          one_img.setAttribute("class", "WebMark_img");
          one_img.src = "data:image/gif;base64,"+items[counter][2]+"";
          one_mark.appendChild(one_img);
        }

        one_close = document.createElement('span');
        one_close.innerHTML = "&times";
        one_close.setAttribute("class","close");
        one_mark.appendChild(one_close);

        one_close.addEventListener("click", function() {
          deleteWebMarkFrontend();
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

        if(items[counter][2] == "screenshot unavailable"){
          two_img = document.createElement('IMG');
          two_img.setAttribute("class", "WebMark_img");
          two_img.src = "../images/unavailable.png"
          two_mark.appendChild(tw_img);
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

        two_close.addEventListener("click", function() {
          deleteWebMarkFrontend();
        });

        two_mark.scrollIntoView({behavior: "smooth"});
      }

      else if (counter % 5 == 2) {

        three_mark = document.createElement('div');
        three_mark.setAttribute("id", "three");
        three_mark.setAttribute("class", "mark");
        three_mark.setAttribute("number", mark_id);
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

        three_close.addEventListener("click", function() {
          deleteWebMarkFrontend();
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

        four_close.addEventListener("click", function() {
          deleteWebMarkFrontend();
        });

        four_mark.scrollIntoView({behavior: "smooth"});
      }

      else if (counter % 5 == 4) {

        five_mark = document.createElement('div');
        five_mark.setAttribute("id", "five");
        five_mark.setAttribute("class", "mark");
        five_mark.setAttribute("number", mark_id);
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

        five_close.addEventListener("click", function() {
          deleteWebMarkFrontend();
        });

        five_mark.scrollIntoView({behavior: "smooth"});
      }

      counter = counter + 1;
    }
};


enter_link.addEventListener('keyup', function (e) {
  if (e.keyCode == 13) {
    addWebMarkBackend();
  }
});

async function addNewItem(item_id, url, screenshot) {
  items.unshift([item_id, url, screenshot]);
};

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
      addNewItem(res.item_id, res.url, res.screenshot)
        .then(function(result) {
          addWebMarkFrontend();
      });
    }
  })
};

function addWebMarkFrontend() {
  mark_id = mark_id + 1;
  console.log(counter);

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

      if(items[counter][2] == "screenshot unavailable"){
        one_img = document.createElement('IMG');
        one_img.setAttribute("class", "WebMark_img");
        one_img.src = "../images/unavailable.png"
        one_mark.appendChild(one_img);
      }

      else if(items[counter][2] == "check iframe"){
        one_iframe = document.createElement('iframe');
        one_iframe.setAttribute("class", "WebMark_img");
        one_iframe.src = items[counter][1];
        one_mark.appendChild(one_iframe);
      }

      else{
        one_img = document.createElement('IMG');
        one_img.setAttribute("class", "WebMark_img");
        one_img.src = "data:image/gif;base64,"+items[counter][2]+"";
        one_mark.appendChild(one_img);
      }

      one_close = document.createElement('span');
      one_close.innerHTML = "&times";
      one_close.setAttribute("class","close");
      one_mark.appendChild(one_close);


      one_close.addEventListener("click", function() {
        its_number = one_close.parentElement.getAttribute("number");
        its_number = parseInt(its_number)-1;
        deleteWebMarkFrontend(items[its_number][0])
      });

      one_mark.scrollIntoView({behavior: "smooth"});
    }

    else if (counter % 5 == 1) {

      twothree_mark = document.createElement('div');
      twothree_mark.setAttribute("id", "twothree");
      twothree_mark.setAttribute("class", "twothreedivs");
      twothree_divs= twothree_divs+1;
      first_row.appendChild(twothree_mark);

      two_mark = document.createElement('div');
      two_mark.setAttribute("id", "two");
      two_mark.setAttribute("class", "mark");
      two_mark.setAttribute("number", mark_id);
      twothree_mark.appendChild(two_mark);

      if(items[counter][2] == "screenshot unavailable"){
        two_img = document.createElement('IMG');
        two_img.setAttribute("class", "WebMark_img");
        two_img.src = "../images/unavailable.png"
        two_mark.appendChild(tw_img);
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

      two_close.addEventListener("click", function() {
        its_number = two_close.parentElement.getAttribute("number");
        its_number = parseInt(its_number)-1;
        deleteWebMarkFrontend(items[its_number][0]);
      });

      two_mark.scrollIntoView({behavior: "smooth"});
    }

    else if (counter % 5 == 2) {

      three_mark = document.createElement('div');
      three_mark.setAttribute("id", "three");
      three_mark.setAttribute("class", "mark");
      three_mark.setAttribute("number", mark_id);
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

      three_close.addEventListener("click", function() {
        its_number = three_close.parentElement.getAttribute("number");
        its_number = parseInt(its_number)-1;
        deleteWebMarkFrontend(items[its_number][0])
      });

      three_mark.scrollIntoView({behavior: "smooth"});
    }

    else if (counter % 5 == 3) {

      second_row = document.createElement('div');
      second_row.setAttribute("id", "secondrow");
      second_row.setAttribute("class", "fourfivedivs");
      fourfive_divs = fourfive_divs + 1;
      WebMarks_div.appendChild(second_row);

      four_mark = document.createElement('div');
      four_mark.setAttribute("id", "four");
      four_mark.setAttribute("class", "mark");
      four_mark.setAttribute("number", mark_id);
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

      four_close.addEventListener("click", function() {
        its_number = four_close.parentElement.getAttribute("number");
        its_number = parseInt(its_number)-1;
        deleteWebMarkFrontend(items[its_number][0]);
      });

      four_mark.scrollIntoView({behavior: "smooth"});
    }

    else if (counter % 5 == 4) {

      five_mark = document.createElement('div');
      five_mark.setAttribute("id", "five");
      five_mark.setAttribute("class", "mark");
      five_mark.setAttribute("number", mark_id);
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

      five_close.addEventListener("click", function() {
        its_number = five_close.parentElement.getAttribute("number");
        its_number = parseInt(its_number)-1;
        deleteWebMarkFrontend(items[its_number][0])
      });

      five_mark.scrollIntoView({behavior: "smooth"});
    }

    enter_link.value = "";

     console.log(counter);
    counter = counter + 1;
     console.log(counter);

    if (counter > 1) {
      resrc()
    }

};

function resrc() {
  div_iter = 0;
  for (i = 0; i < items.length; i++) {
    if(items[i][2] == "check iframe"){
      div = document.getElementsByClassName("mark")[div_iter];
      iframe = document.createElement('iframe');
      iframe.setAttribute("class", "WebMark_img");
      div.replaceChild(iframe, div.childNodes[0]);
      iframe.src = items[i][1];
    }
    else{
      div = document.getElementsByClassName("mark")[div_iter];
      img = document.createElement('IMG');
      img.setAttribute("class", "WebMark_img");
      div.replaceChild(img, div.childNodes[0]);
      img.src = "data:image/gif;base64,"+items[i][2]+"";
    }
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
      //deleteWebMarkFrontend(items[counter][0])
    }
  })
};

function deleteWebMarkFrontend(item_id) {
  console.log(item_id);
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

  else if (counter % 5 == 1) {
    last_twothreediv = twothree_divs - 1;
    get_twothree_divs = document.getElementsByClassName("twothreedivs");
    get_twothree_divs[last_twothreediv].remove();
    twothree_divs = twothree_divs - 1;
  }

   else if (counter % 5 == 3) {
    last_fourfivediv = fourfive_divs - 1;
    get_fourfive_divs = document.getElementsByClassName("fourfivedivs");
    get_fourfive_divs[last_fourfivediv].remove();
    fourfive_divs = fourfive_divs - 1;
  }

  for (i = 0; i < mark_id; ++i) {
    if(items[i][2] == "check iframe" && items[i][0] == item_id){
      console.log("iframe shit")
      div = document.getElementsByClassName("mark")[i];
      iframe = document.createElement('iframe');
      iframe.setAttribute("class", "WebMark_img");
      div.replaceChild(iframe, div.childNodes[0]);
      i = i +1;
      iframe.src = items[i][1];
    }
     else if(items[i][2] == "check iframe" && items[i][0] != item_id){
      console.log("iframe shit")
      div = document.getElementsByClassName("mark")[i];
      iframe = document.createElement('iframe');
      iframe.setAttribute("class", "WebMark_img");
      div.replaceChild(iframe, div.childNodes[0]);
      i = i +1;
      iframe.src = items[i][1];
    }
    else if(items[i][0] == item_id){
      console.log("pic shit")
      div = document.getElementsByClassName("mark")[i];
      img = document.createElement('IMG');
      img.setAttribute("class", "WebMark_img");
      div.replaceChild(img, div.childNodes[0]);
      i = i +1;
      img.src = "data:image/gif;base64,"+items[i][2]+"";
    }
    else if(items[i][0] != item_id){
      console.log("pic shit")
      div = document.getElementsByClassName("mark")[i];
      img = document.createElement('IMG');
      img.setAttribute("class", "WebMark_img");
      div.replaceChild(img, div.childNodes[0]);
      i = i +1;
      img.src = "data:image/gif;base64,"+items[i][2]+"";
    }
  }
};
