import{ready,clone,el,get_cookie} from "/public/some.js";

document.cookie="admin=true";

var socket = io.connect('http://localhost:3000');


window.onload=function(){
    proccess11();
};

function proccess11(){
    socket.emit('getusers');
    socket.on('list_of_users',(json)=>{
          for(let elem of json){
              if(elem.status=="online")    cl(elem.area,".fulik1");
              else cl(elem.area,".fulik12");
            
          }
         console.log(json)
    })
    socket.on('new_message',function( _mes,area){// id of every connected user
        cl(area,".fulik1")
    })
    
}

function cl(what,where){
    let clone=el('.la')[0].cloneNode(true);
    clone.style.display='block';
    clone.innerHTML=" <div ><a href='/admin/"+what+"' class='link' "+what+"'>"+ "  USER |"+what+"   </a></div>";
    el(where)[0].append(clone);
}
