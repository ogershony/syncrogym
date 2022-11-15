function renderschedule(schedule){
    console.log(schedule);
    days = Object.keys(schedule);
    for(var i = 0;i<days.length;i++){
        var time1 = document.getElementById(days[i]+'_time1');
        var time2 = document.getElementById(days[i]+'_time2');
        var location = document.getElementById(days[i]+'_select');
        var other = document.getElementById(days[i]+'_other');
        var notes = document.getElementById(days[i]+'_notes');
        time1.value = schedule[days[i]][0];
        time2.value = schedule[days[i]][1];
        if(schedule[days[i]][2].charAt(0) == 'o'){
            if(schedule[days[i]][2] == ''){
                other.value = 'Other';
            }
            else{
                other.value = schedule[days[i]][2].substring(1);
            }
        }
        else{
            location.value = schedule[days[i]][2];
        }
        notes.value = schedule[days[i]][3];
    }
}