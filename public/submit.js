document.addEventListener('DOMContentLoaded',ready)
function ready(){
    document.getElementsByClassName('submit')[0].onclick= async (e)=>{
        let obj={
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        }
        /**https://guarded-garden-20402.herokuapp.com/ */
        let promise= await fetch('https://guarded-garden-20402.herokuapp.com',{
            "method":'POST',
            "headers":{
                'Content-Type':"application/json;charset=utf-8"
            },
            "body": JSON.stringify(obj)
        });
        if(promise.ok){
            document.getElementsByClassName('blue')[0].style.paddingBottom="120px";
            document.getElementsByClassName('know')[0].style.display="block";
            document.getElementsByClassName('know')[0].innerHTML="<strong> Ваше сообщение отправлено </strong>"
        }

    }
}
