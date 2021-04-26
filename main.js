
(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {uiopl;[]
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('zmdi-eye');
            $(this).find('i').addClass('zmdi-eye-off');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').addClass('zmdi-eye');
            $(this).find('i').removeClass('zmdi-eye-off');
            showPass = 0;
        }
        
    });


})(jQuery);

var alertText = document.getElementById("textalert");
var username = "thanongsakhom.gas@gmail.com"
var username1 = "admin"
var password = "1234"
document.getElementById("form-login").onsubmit = function(e){
    e.preventDefault()
    var user = document.getElementById("email").value
    var pass = document.getElementById("password").value
    if(user ===username && pass === password || user ===username1 && pass === password ){
        localStorage.setItem("username",user)
        window.location = "home1.html"
        alertText.style.color = 'green'
        alertText.innerHTML = "Success !"

    }else{
        alertText.innerHTML = "Invalid username or password!"
    }

}
