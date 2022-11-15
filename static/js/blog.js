window.onload = function getblogs(){
    const url = '/blog/get';
    const data = {};
    $.post(url,data,function(data){
        var blogs = data['blogs'];
        renderblogs(blogs);
    });
}
function renderblogs(blogs){
    var blog_container = document.getElementById("blogs");
    for(var i = 0;i<blogs.length;i++){
        var info = blogs[i];
        var container = document.createElement("div");
        var header = document.createElement("h2");
        var content = document.createElement("p");
        var br = document.createElement("br");
        container.setAttribute("class","blogcontainer center");
        header.innerHTML = info['username'];
        content.innerHTML = info['content'];
        container.appendChild(header);
        container.appendChild(content);
        blog_container.appendChild(container);
        blog_container.appendChild(br);
    }
}
function createPost(){
    var create = document.getElementById('create');
    create.setAttribute('style','visibility:hidden');
    var prompt = document.createElement("h2");
    var post = document.getElementById("createPost");
    var textarea = document.createElement("textarea");
    var br = document.createElement('br');
    var submit = document.createElement("input");
    var cancel = document.createElement("input");
    var br2 = document.createElement('br');
    prompt.innerHTML = 'Submit when ready!';
    textarea.setAttribute('rows','15');
    textarea.setAttribute('cols','75');
    textarea.setAttribute('id','payload');
    submit.setAttribute('class','create');
    submit.setAttribute('type','submit');
    submit.setAttribute('value','Submit');
    submit.onclick = function(){push();};
    cancel.setAttribute('class','create');
    cancel.setAttribute('type','submit');
    cancel.setAttribute('value','Cancel');
    cancel.onclick = function(){cancelCreate();};
    post.appendChild(prompt);
    post.appendChild(textarea);
    post.appendChild(br);
    post.appendChild(cancel);
    post.appendChild(submit);
}
function cancelCreate(){
    var create = document.getElementById('create');
    create.setAttribute('style','visibility:visible');
    var post = document.getElementById("createPost");
    post.innerHTML = '';
}

function push(){
    const url = '/blog/push';
    payload = document.getElementById('payload').value;
    const data = {
        'payload':payload
    };
    $.post(url,data,function(data){
        window.location.href = '/blog';
    });
}