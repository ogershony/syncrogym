window.onload = function getschedule(){
    const url = '/schedule/get'; 
    const data = {
        'username':location.pathname.split('/')[2]
    };
    $.post(url,data,function(data){
        console.log(data)
        renderschedule(JSON.parse(data['schedule']));
    });
}