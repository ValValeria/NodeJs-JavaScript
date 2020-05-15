(function(){
    const obj={
        loadElem:document.querySelector('#loadingPage'),
        customEv:new CustomEvent('page-loaded',{bubbles:true,cancelable:false}),
        dataStart: Date.now(),
        change(bool){              
                this.loadElem.setAttribute('style','display:none !important')
                this.loadElem.setAttribute('data-loaded',bool);
                document.body.style.overflowY="scroll"
                this.loadElem.firstElementChild.classList.remove('loading')
        },
        loading(){
            console.log(window.timeStart-this.dataStart)
            if(window.timeStart-this.dataStart>2 ){
               document.querySelector('#somespan').textContent="Видео не удалось загрузить"
              setTimeout(()=>this.change(false),2000);
            }
            else if(document.readyState=="complete"){
                this.change(true);
                this.loadElem.dispatchEvent(this.customEv)
            }            
        }
    }
    Object.freeze(obj)

    document.addEventListener('readystatechange', obj.loading.bind(obj));
    
   
})()
