function checkPass()
{
    //Store the password field objects into variables ...
    var password = document.getElementById('password');
    var confirm  = document.getElementById('confirmpassword');
    //Store the Confirmation Message Object ...
    var message = document.getElementById('confirm-message2');
    //Set the colors we will be using ...
    var good_color = "#66cc66";
    var bad_color  = "#ff6666";
    //Compare the values in the password field 
    //and the confirmation field
    if(password.value == confirm.value){
        confirm.style.backgroundColor = good_color;
    }
}  