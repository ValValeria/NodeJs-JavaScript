import {ready} from "/public/some.js";
document.addEventListener('DOMContentLoaded',gsx)

function gsx(){
    
    ready();
    document.getElementsByClassName('submit')[0].onclick= async (e)=>{
        let obj={
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        }
        /**https://guarded-garden-20402.herokuapp.com/ */
        let promise= await fetch(location.protocol+"//"+location.hostname+":"+location.port,{
            "method":'POST',
            "headers":{
                'Content-Type':"application/json;charset=utf-8"
            },
            "body": JSON.stringify(obj)
        });
        if(promise.ok){
            document.getElementsByClassName('know')[0].style.display="block";
            document.getElementsByClassName('know')[0].innerHTML="<strong> Ваше сообщение отправлено </strong>"
           if(location.href!=location.protocol+"//"+location.hostname){
            document.querySelector('.blue').style.paddingBottom="100px";
           }
        }      
    }
    
    check();
}

function check(){
       let pathname=location.pathname;

       if(pathname.indexOf('/services')!=-1)  pathname="/services";
       
        for (let elem of document.querySelectorAll('.ul>li')){
            if(elem.firstElementChild.dataset.href==pathname){
                 elem.firstElementChild.classList.add('active')
                 return;
            }
            elem.firstElementChild.classList.remove('active')
        }
    
}
