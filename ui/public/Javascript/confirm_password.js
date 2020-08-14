function checkPass()
{
    var password = document.getElementById('signup_password');
    var confirm  = document.getElementById('signup_confirm_password');
    var message = document.getElementById('signup_confirm_message');

    var good_color = "#66cc66";
    var bad_color  = "#ff6666";

    if ((password.value != confirm.value & confirm.value == 0) | (password.value == confirm.value & confirm.value == 0)) {
      confirm.style.backgroundColor = 'white';
    }
    else if(password.value == confirm.value){
      confirm.style.backgroundColor = good_color;
    }
    else{
      confirm.style.backgroundColor = bad_color;
    }
}
