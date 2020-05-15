(function(){
    const obj={
        loadElem:document.querySelector('#loadingPage'),
        customEv:new CustomEvent('page-loaded',{bubbles:true,cancelable:false}),
        loaded:false,
        error:null,
        change(){
            if(arguments[0]==true) this.error=1
            this.loadElem.setAttribute('style','display:none !important')
            document.body.style.overflowY="scroll"
            this.loadElem.firstElementChild.classList.remove('loading')
        },
        loading(){

            if(this.error!=null) return null;
            
            if(document.readyState=="complete"){
                this.change(true)
                this.loadElem.dispatchEvent(this.customEv)
            }
        }
    }
    Object.seal(obj)

    document.addEventListener('readystatechange', ()=>{
        obj.loading();
    });
    
    requestAnimationFrame(()=>{
        if(Date.now()-window.timeStart>6000){
            
            document.querySelector('#somespan').innerHTML="Проблема <br/> с интернетом"
            obj.loadElem.dispatchEvent(window.videoError)
            
            setTimeout(this.change.bind(this,true),1000)
        }
    })
   
})()
