import{ready,clone,el,get_cookie} from "/public/some.js";

document.cookie="admin=true";

var socket = io.connect('http://localhost:3000');


window.onload=function(){
   ready(function(){
        clone('admin');
    });
    el('.write_mes')[0].style.display='none';
    proccess11();
};

function proccess11(){
    let counter=0;
    socket.emit('get_users');
    socket.on('message',function(data){// id of every connected user
        if(data==get_cookie().io) return;
        counter++;
        let clone=el('.la')[0].cloneNode(true);
        clone.style.display='block'
        clone.innerHTML=" <div ><a href='http://localhost:3000/admin/"+data+"' class='link' data-id_of_user='"+data+"'>"+ "<strong> "+counter+"</strong> | USER </a></div>";
        el('.fulik')[0].append(clone);
    })
    
}

