(function(){
    const obj={
        loadElem:document.querySelector('#loadingPage'),
        customEv:new CustomEvent('page-loaded',{bubbles:true,cancelable:false}),
        loading(){
            if(document.readyState=="complete"){
                this.loadElem.setAttribute('style','display:none !important')
                this.loadElem.setAttribute('data-loaded','true');
                document.body.style.overflowY="scroll"
                this.loadElem.dispatchEvent(this.customEv)
                this.loadElem.firstElementChild.classList.remove('loading')
            }
            
        }
    }
    Object.freeze(obj)

    document.addEventListener('readystatechange', obj.loading.bind(obj));
    
   
})()
