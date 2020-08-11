
    counter = 0;

    enter_link = document.getElementById('enter_link');

    enter_link.addEventListener('keyup', function (e) {
      if (e.keyCode == 13) {
        // Simulate clicking on the submit button.
        addWebMark();
      }
    });


    function addWebMark() {

            if (counter%5  == 0){ 

                WebMarks_div = document.createElement('div');
                WebMarks_div.setAttribute("id", "WebMarks");
                document.body.appendChild(WebMarks_div);

                first_row = document.createElement('div');
                first_row.setAttribute("id", "firstrow");
                WebMarks_div.appendChild(first_row);

                one_mark = document.createElement('div');
                one_mark.setAttribute("id", "one");
                first_row.appendChild(one_mark);

                // one_div = document.createElement('div');
                // one_mark.appendChild(one_div);
 

                close = document.createElement('span');
                close.innerHTML = "&times";
                close.setAttribute("class","close");
                one_mark.appendChild(close);


                one_mark.scrollIntoView({behavior: "smooth"});
            }

             else if (counter%5 == 1){ 


                twothree_mark = document.createElement('div');
                twothree_mark.setAttribute("id", "twothree");
                first_row.appendChild(twothree_mark);

                two_mark = document.createElement('div');
                two_mark.setAttribute("id", "two");
                twothree_mark.appendChild(two_mark);

                // two_div = document.createElement('div');
                // two_mark.appendChild(two_div);

                close = document.createElement('span');
                close.innerHTML = "&times";
                close.setAttribute("class","close");
                two_mark.appendChild(close);

                two_mark.scrollIntoView({behavior: "smooth"});
            }


             else if (counter%5 == 2){ 

                three_mark = document.createElement('div');
                three_mark.setAttribute("id", "three");
                twothree_mark.appendChild(three_mark);

                // three_div = document.createElement('div');
                // three_mark.appendChild(three_div);

                close = document.createElement('span');
                close.innerHTML = "&times";
                close.setAttribute("class","close");
                three_mark.appendChild(close);

                three_mark.scrollIntoView({behavior: "smooth"});
            }

            else if (counter%5 == 3){ 

                second_row = document.createElement('div');
                second_row.setAttribute("id", "secondrow");
                WebMarks_div.appendChild(second_row);

                four_mark = document.createElement('div');
                four_mark.setAttribute("id", "four");
                second_row.appendChild(four_mark);

                // four_div = document.createElement('div');
                // four_mark.appendChild(four_div);

                close = document.createElement('span');
                close.innerHTML = "&times";
                close.setAttribute("class","close");
                four_mark.appendChild(close);

                four_mark.scrollIntoView({behavior: "smooth"});
            }

            else if (counter%5 == 4){ 

                five_mark = document.createElement('div');
                five_mark.setAttribute("id", "five");
                second_row.appendChild(five_mark);

                // five_div = document.createElement('div');
                // five_mark.appendChild(five_div);

                close = document.createElement('span');
                close.innerHTML = "&times";
                close.setAttribute("class","close");
                five_mark.appendChild(close);


                five_mark.scrollIntoView({behavior: "smooth"});

            }
            counter = counter + 1;
        };



