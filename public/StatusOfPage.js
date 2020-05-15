(function(){
    const obj={
        loadElem:document.querySelector('#loadingPage'),
        customEv:new CustomEvent('page-loaded',{bubbles:true,cancelable:false}),
        dataStart: Date.now(),
        change(){
            this.loadElem.setAttribute('style','display:none !important')
            this.loadElem.setAttribute('data-loaded',arguments[0]);
            document.body.style.overflowY="scroll"
            this.loadElem.firstElementChild.classList.remove('loading')
        },
        loading(){
            if(document.readyState=="complete"){
                this.change(true)
                this.loadElem.dispatchEvent(this.customEv)
            }
        }
    }
    Object.freeze(obj)

    document.addEventListener('readystatechange', obj.loading.bind(obj));
    
   
})()
