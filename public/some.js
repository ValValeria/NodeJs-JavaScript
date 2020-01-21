
export function el(data){
    if(data.startsWith('.'))  return  document.querySelectorAll(data);
    else if(data.startsWith('#')) return document.querySelector(data);
    else if(document.body.dataset.hasOwnProperty(data)) return document.querySelectorAll("["+data+"="+document.body.dataset.data+"]")
    else  {
           return undefined;
    }
  }
export function ready(process=()=>{},opt=true){
      let i=el('#kick');
     i.addEventListener('click',()=>{
           let is_open=i.dataset.open;
           if(document.documentElement.clientWidth<934){
              if(is_open=='false'){//it wasn't open
              i.dataset.open='true';
              el('.ul')[0].style.display='block';
             }
            else {// it is open
               i.dataset.open='false';
              el('.ul')[0].style.display='none';
            }
           }
      })
  
      document.body.onresize=()=>{
         if(document.body.clientWidth>934){
            el('.ul')[0].style.display='inherit';
         }else{
          el('.ul')[0].style.display='none';
         }
      }

      if(opt){
         el('.headline')[0].addEventListener('click',function(){
         el('.message_area')[0].style.display='block';
         el('.krest')[0].addEventListener('click',()=>{
            el('.message_area')[0].style.display='none';

         })
      })}
  }

export function clone(role,value=el('#call').value,css){
   let clone=el('.mes')[0].cloneNode(true);
   clone.setAttribute('data-role',role);
   if(css !=undefined || css !=null )  clone.classList.add(css);
   clone.innerHTML=" <div >"+role+"</div>"+value;
   el('#ulik').append(clone);
}

export function get_cookie(){
   let cookies=document.cookie.split(";");
   let obj= new Object();
   for (let elem of cookies ){
       let ar=elem.trim().split('=');
       obj[ar[0]]=ar[1];
   }
   return obj;
}
