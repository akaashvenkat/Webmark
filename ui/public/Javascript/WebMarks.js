mark_id = 0;
counter = 0;
bigdivs = 0;

var number = document.createAttribute("number");
var enter_link = document.getElementById('enter_link');

enter_link.addEventListener('keyup', function (e) {
  if (e.keyCode == 13) {
    addWebMark();
  }
});

function addWebMark() {

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
    one_mark.setAttribute("number",mark_id);
    first_row.appendChild(one_mark);

    one_div = document.createElement('div');
    one_mark.appendChild(one_div);

    one_close = document.createElement('span');
    one_close.innerHTML = "&times";
    one_close.setAttribute("class","close");
    one_mark.appendChild(one_close);

    one_close.addEventListener("click", function() {
      var x = one_close.parentElement.getAttribute("number");
      // one_close.parentElement.remove();
      deleteWebMark(x);
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
    two_mark.setAttribute("number",mark_id);
    twothree_mark.appendChild(two_mark);

    two_div = document.createElement('div');
    two_mark.appendChild(two_div);

    two_close = document.createElement('span');
    two_close.innerHTML = "&times";
    two_close.setAttribute("class","close");
    two_mark.appendChild(two_close);

    two_close.addEventListener("click", function() {
      var x = two_close.parentElement.getAttribute("number");
      // two_close.parentElement.remove();
      deleteWebMark(x);
    });

    two_mark.scrollIntoView({behavior: "smooth"});
  }

  else if (counter % 5 == 2) {

    three_mark = document.createElement('div');
    three_mark.setAttribute("id", "three");
    three_mark.setAttribute("class", "mark");
    three_mark.setAttribute("number",mark_id);
    twothree_mark.appendChild(three_mark);

    three_div = document.createElement('div');
    three_mark.appendChild(three_div);

    three_close = document.createElement('span');
    three_close.innerHTML = "&times";
    three_close.setAttribute("class","close");
    three_mark.appendChild(three_close);

    three_close.addEventListener("click", function() {
      var x = three_close.parentElement.getAttribute("number");
      // three_close.parentElement.remove();
      deleteWebMark(x);
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
    four_mark.setAttribute("number",mark_id);
    WebMarks_div.appendChild(four_mark);
    second_row.appendChild(four_mark);

    four_div = document.createElement('div');
    four_mark.appendChild(four_div);

    four_close = document.createElement('span');
    four_close.innerHTML = "&times";
    four_close.setAttribute("class","close");
    four_mark.appendChild(four_close);

    four_close.addEventListener("click", function() {
      var x = four_close.parentElement.getAttribute("number");
      // four_close.parentElement.remove();
      deleteWebMark(x);
    });

    four_mark.scrollIntoView({behavior: "smooth"});
  }

  else if (counter % 5 == 4) {

    five_mark = document.createElement('div');
    five_mark.setAttribute("id", "five");
    five_mark.setAttribute("class", "mark");
    five_mark.setAttribute("number",mark_id);
    second_row.appendChild(five_mark);

    five_div = document.createElement('div');
    five_mark.appendChild(five_div);

    five_close = document.createElement('span');
    five_close.innerHTML = "&times";
    five_close.setAttribute("class","close");
    five_mark.appendChild(five_close);

    five_close.addEventListener("click", function() {
      var x = five_close.parentElement.getAttribute("number");
      // five_close.parentElement.remove();
      deleteWebMark(x);
    });

    five_mark.scrollIntoView({behavior: "smooth"});
  }

  counter = counter + 1;
};

function deleteWebMark(x) {
  mark_id = parseInt(mark_id);
  last_element_id = mark_id-1;

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
