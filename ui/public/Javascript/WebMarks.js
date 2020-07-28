
    counter = 0;

    enter_link = document.getElementById('enter_link');

    enter_link.addEventListener('keyup', function (e) {
      if (e.keyCode == 13) {
        // Simulate clicking on the submit button.
        addWebMark();
      }
    });


    function addWebMark() {
            beginning_url = 'https://www.';

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

                one_iframe = document.createElement('iframe');
                one_mark.appendChild(one_iframe);

                user_url = document.getElementById("enter_link").value
                one_iframe.src = beginning_url.concat(user_url,'/');

                one_mark.scrollIntoView({behavior: "smooth"});
            }

             else if (counter%5 == 1){ 


                twothree_mark = document.createElement('div');
                twothree_mark.setAttribute("id", "twothree");
                first_row.appendChild(twothree_mark);

                two_mark = document.createElement('div');
                two_mark.setAttribute("id", "two");
                twothree_mark.appendChild(two_mark);

                two_iframe = document.createElement('iframe');
                two_mark.appendChild(two_iframe);

                user_url = document.getElementById("enter_link").value
                two_iframe.src = beginning_url.concat(user_url,'/');

                two_mark.scrollIntoView({behavior: "smooth"});
            }


             else if (counter%5 == 2){ 

                three_mark = document.createElement('div');
                three_mark.setAttribute("id", "three");
                twothree_mark.appendChild(three_mark);

                three_iframe = document.createElement('iframe');
                three_mark.appendChild(three_iframe);

                user_url = document.getElementById("enter_link").value
                three_iframe.src = beginning_url.concat(user_url,'/');
                
                three_mark.scrollIntoView({behavior: "smooth"});
            }

            else if (counter%5 == 3){ 

                second_row = document.createElement('div');
                second_row.setAttribute("id", "secondrow");
                WebMarks_div.appendChild(second_row);

                four_mark = document.createElement('div');
                four_mark.setAttribute("id", "four");
                second_row.appendChild(four_mark);

                four_iframe = document.createElement('iframe');
                four_mark.appendChild(four_iframe);

                user_url = document.getElementById("enter_link").value
                four_iframe.src = beginning_url.concat(user_url,'/');

                four_mark.scrollIntoView({behavior: "smooth"});
            }

            else if (counter%5 == 4){ 

                five_mark = document.createElement('div');
                five_mark.setAttribute("id", "five");
                second_row.appendChild(five_mark);

                five_iframe = document.createElement('iframe');
                five_mark.appendChild(five_iframe);

                user_url = document.getElementById("enter_link").value
                five_iframe.src = beginning_url.concat(user_url,'/');

                five_mark.scrollIntoView({behavior: "smooth"});

            }
            counter = counter + 1;
        };