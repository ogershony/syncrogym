window.onload = function getschedule(){
    const url = '/schedule/get';
    const data = {
        'username':''
    };
    $.post(url,data,function(data){
        renderschedule(JSON.parse(data['schedule']));
    });
}

function save(){
    info = {'Sunday':[],'Monday':[],'Tuesday':[],'Wednesday':[],'Thursday':[],'Friday':[],'Saturday':[]};
    days = Object.keys(info);
    console.log(days.length);
    for(var i = 0;i<days.length;i++){
        var time1 = document.getElementById(days[i]+'_time1').value;
        var time2 = document.getElementById(days[i]+'_time2').value;
        var location = document.getElementById(days[i]+'_select').value;
        var other = document.getElementById(days[i]+'_other').value;
        var notes = document.getElementById(days[i]+'_notes').value;
        info[days[i]].push(time1);
        info[days[i]].push(time2);
        if(location == 'Other'){
            info[days[i]].push('o'+other);
        }
        else{
            info[days[i]].push(location);
        }
        info[days[i]].push(notes);
    }
    schedule = JSON.stringify(info);
    push(schedule);
}
function push(schedule){
    const url = 'schedule/push';
    const data = {
        "schedule":schedule
    };
    $.post(url,data,function(data){
        window.location.href = '/schedule';
    });
}