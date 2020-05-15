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
        loading(){
            console.log(Date.now()-window.timeStart)

            if(Date.now()-window.timeStart>6000){
                document.querySelector('#somespan').innerHTML="Проблема <br/> с интернетом"
                this.loadElem.dispatchEvent(window.videoError)
                setTimeout(this.change.bind(this,false),1000)
            }else if(document.readyState=="complete"){
                this.change(true)
                this.loadElem.dispatchEvent(this.customEv)
            }
        }
    }
    Object.freeze(obj)

    document.addEventListener('readystatechange', ()=>{
        obj.loading();
    });
    
    requestAnimationFrame(()=>{
        console.log(document.readyState)
    })
   
})()
