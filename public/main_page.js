import {ready,el,clone,get_cookie} from "/public/some.js";
/**
 * План 
 * 1.Вначале  юзер шлёт  id админу
 * 2.Сервер смотрит не написал ли это юзер , и если нет то шлёт  id админ.джс 
 * 3.При нажатии на ссылку создается куки   и админ шлёт что готов принять сообщение юзеру( тоесть своё айди)
 * 4.Тогда срабатывает событие и отправляется первое сообщение админу (айди админа + сообщение из LocalStorage)
 * 5.И у админа и у юзера есть событие  new_message, оно отрисовует события 

 */
let socket=process1();
let con={};
con.connected=false;
localStorage.setItem('value','[]');

window.onload=function(){
    let counter=0;
    let obj1=JSON.parse(localStorage.getItem('value'));
    ready(function(){
        counter++;
        clone('user');
        obj1.push(el('#call').value);
        localStorage.setItem('value',JSON.stringify(obj1));
        if(counter==1) {
            socket.emit('exchange_of_id');
        }
        else{
            if(con['connected']) socket.emit('start_of',el('#call').value,get_cookie().id_of_admin);
        }
    });
}


window.onbeforeunload= function(){
    if(localStorage.getItem('not_found')==true || localStorage.getItem('not_found')=='true'){
        let array=JSON.parse(localStorage.getItem('value'));
        for(let ar of array){
            socket.emit('n_end_of',ar);
        }
        localStorage.clear();
     }
}

function process1(){/// when user decide to write something
        var socket = io.connect('https://guarded-garden-20402.herokuapp.com/')
        
        socket.on('id_of_admin',(id)=>{
            document.cookie="id_of_admin="+id;
            con['connected']=true;

            let array=JSON.parse(localStorage.getItem('value'));
            for(let ar of array){
                socket.emit('start_of',ar,get_cookie().id_of_admin);
            }
            localStorage.clear();
            
        })
        socket.on('new_message',(text)=>{
           clone('admin',text);
        })
        socket.on('dis_connected',()=>{
            clone('Message','Админ покинул чат','error');
        })
        socket.on('not_found',()=>{
            clone('Message','Мы не можем найти Админа . Пожалуйста укажите как с вами можно будет связаться','error');
            localStorage.setItem('not_found',true);
        })
        return socket;
}
