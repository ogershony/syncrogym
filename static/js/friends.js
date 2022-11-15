window.onload = function renderfriends(){
    const url = '/getfriends';
    const data = {};
    $.post(url,data,function(data){
        friends = data['friends'];
        addfriends(friends);
    });
}
function loadschedule(username){
    window.location.href = '/schedule/'+username;
}
function addfriend(username){
    const url = '/addfriend';
    const data = {
        'username':username
    };
    $.post(url,data,function(data){
        window.location.href = '/friends';
    });
}
function removefriend(username){
    const url = '/removefriend';
    const data = {
        'username':username
    };
    $.post(url,data,function(data){
        window.location.href = '/friends';
    });
}
function search(){
    document.getElementById('displaylist').innerHTML = '';
    var query = document.getElementById("search_input").value;
    const url = '/searchfriend';
    const data = {
        'query':query
    }
    $.post(url,data,function(data){
        displayfriends(data['friends'])
    });
}
function addfriends(friends){
    var friendslist = document.getElementById('friendslist');
    for(var i = 0;i<friends.length;i++){
        var friend_name = friends[i];
        var list = document.createElement('li');
        var name = document.createElement('p');
        var profile = document.createElement('input');
        var remove = document.createElement('input');
        var trashimg = document.createElement('img');
        list.setAttribute('class','friend align');
        list.setAttribute('id',friend_name+'_container');
        name.setAttribute('class','name');
        name.textContent = friend_name;
        trashimg.setAttribute('src','/static/img/trash.png');
        trashimg.setAttribute('class','trashimg');
        trashimg.setAttribute('id',friend_name);
        trashimg.onclick=function(){removefriend(this.id);};
        profile.setAttribute('class','fbutton');
        profile.setAttribute('value','View Schedule');
        profile.setAttribute('type','submit');
        profile.setAttribute('id',"1"+friend_name);
        profile.onclick =  function(){loadschedule(this.id.substring(1));};
        friendslist.appendChild(list);
        list.appendChild(name);
        list.appendChild(profile);
        list.appendChild(trashimg);
    }
}
function displayfriends(friends){
    var displaylist = document.getElementById('displaylist');
    for(var i = 0;i<friends.length;i++){
        var username = friends[i]
        var list = document.createElement('li');
        var name = document.createElement('p');
        var add = document.createElement('input');
        list.setAttribute('class','friend align');
        list.setAttribute('id',username+'_searchcontainer');
        name.setAttribute('class','name');
        name.textContent = username;
        add.setAttribute('class','fbutton');
        add.setAttribute('value','Add');
        add.setAttribute('type','submit');
        add.setAttribute('id',username);
        add.onclick =  function(){addfriend(this.id);};
        displaylist.appendChild(list);
        list.appendChild(name);
        list.appendChild(add);
    }
}