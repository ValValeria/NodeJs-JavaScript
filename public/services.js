if(!Promise.allSettle) {
    Promise.allSettled = function(promises) {
      return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
        state: 'fulfilled',
        value: value
      }), error => ({
        state: 'rejected',
        reason: error
      }))));
    };
}


window.onload=fun

let somefun=(e)=>{

new Promise((res,req)=>{
               console.log(1)
                 
               if ( e.target.classList.contains('showme')){
                    
                let url=e.target.closest('.hove').dataset.url
                 
                res(url)
               }else if(e.target.classList.contains('fines')) {
                 res(e.target.dataset.url)
               }
               else {
                 req(null)
              }
            })
            .then(url=>{
                
                let img=document.querySelector('#s')
                img.src=url
                let fix= document.querySelector('.fixs')
                img.onload=()=>{
                 fix.style.display='block'
                 fix.children[1].onclick=()=>{
                    fix.style.display='none'
                 }
                }

            })
            .catch(()=>console.log())
}

function fun(){
   
   let urls=[]  

   let elements=document.querySelectorAll('.bas')
   for(let elem of elements){
     if(elem.matches('a')){
         urls.push(elem.dataset.url)
     }
   }
   Promise.allSettled(urls.map(url=>Promise.resolve({response:fetch(url),url:url})))
   .then((results)=>{
     results.forEach(result=>{
       if(result.state=="fulfilled"){
           if(result.value.response){
               for(let el of elements){
                    if(el.dataset.url==result.value.url){
                        document.querySelector('.bab').classList.remove('none')
                        el.classList.remove('none')
                        let children=el.children
                        for(let child of children){
                            if(child.matches('.lightgray')){
                                child.onclick=(e)=>{
                                    somefun(e)
                                }
                                child.firstElementChild.firstElementChild.onclick=(e)=>{
                                    somefun(e)
                                }
                            }
                        }
                    }
               }
           }
       }
     })
   })
}