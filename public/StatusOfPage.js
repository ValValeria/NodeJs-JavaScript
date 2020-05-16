(function(){
    const obj={
        loadElem:document.querySelector('#loadingPage'),
        customEv:new CustomEvent('page-loaded',{bubbles:true,cancelable:false}),
        loaded:false,
        error:null,
        change(){
            this.loadElem.setAttribute('style','display:none !important')
            document.body.style.overflowY="scroll"
            this.loadElem.firstElementChild.classList.remove('loading')
        },
        loading(bool){

            this.change();
            if(!bool) this.loadElem.dispatchEvent(window.videoError);
            this.loadElem.dispatchEvent(this.customEv)
                       
        }
    }
    Object.seal(obj)

    
    requestAnimationFrame(function s(){
        if(location.pathname==="/" && Date.now()-window.timeStart>8600){
            return  obj.loading(true);
        }else if(Date.now()-window.timeStart>6000){
            return  obj.loading(true);
        }else if(document.readyState=="complete"){
          return obj.loading(false)
        }
        requestAnimationFrame(s)
    })

})()
