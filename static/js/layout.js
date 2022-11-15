function logout(){
    const url = '/logout';
    const data = {};
    $.post(url,data,function(data){
        window.location.href = '/';
    });
}