function login(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var loginalert = document.getElementById("login_alert");
    const url = window.location.href;
    const data = {
        "username":username,
        "password":password
    }
    if(username == '' || password == ''){
        loginalert.innerHTML = "Please fill out one of the fields!";
    }else{
        $.post(url,data,function(data){
            if(data['success'] == 'false'){
                loginalert.innerHTML = "Either the username or password is incorrect.";
            }else{
                loginalert.innerHTML = "Success!";
                window.location.href = "/friends";
            }
        });
    }
}
function create(){
    var username = document.getElementById("cusername").value;
    var password = document.getElementById("cpassword").value;
    var cpassword = document.getElementById("cpassword2").value;
    var createalert = document.getElementById("create_alert");
    const url = "/signup";
    const data = {
        "username":username,
        "password":password
    }
    if(password != cpassword || username == '' || password == ''){
        createalert.innerHTML = "Request invalid. Please check the fields and try again.";
    }else{
        $.post(url,data,function(data){
            if(data['success'] == 'false'){
                createalert.innerHTMl = "This username already exists! Please try another one.";
            }else{
                createalert.innerHTML = "Success! Please now log in.";
            }
        
        });
    }
}