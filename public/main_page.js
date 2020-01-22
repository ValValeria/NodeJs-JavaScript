import {el,clone,get_cookie} from "/public/some.js";

document.addEventListener('DOMContentLoaded',loaded);

localStorage.setItem('counter',0);
let socket=io();

function loaded(){

    document.querySelector('.strelka').onclick=()=>{
        if(el('#call').value.trim()=="" ||  el('#call').value.length>600 ) {
            return false;
        }
        if(localStorage.getItem('counter')==0 && localStorage.getItem("id_of_admin")==undefined){
            clone('user');
            clone('Message',"Похоже, что админ офлайн .Укажите  как с вами можно связаться","error")

        }else   clone('user');


        localStorage.setItem('counter',1);

        socket.emit('message_of_user',el('#call').value,get_cookie().number);

    }
    socket.on('admin_found',()=>{
        el('.error')[0].classList.add('yes');
        el('.error')[0].textContent="Похоже, что админ online ."
    })
    socket.on('message_from_admin',(message)=>{
       clone('admin',message);
   })
}

window.onbeforeunload=()=>{
    socket.emit("close",get_cookie().number);
}


