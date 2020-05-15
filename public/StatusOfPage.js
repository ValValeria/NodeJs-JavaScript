(function(){
    const obj={
        loadElem:document.querySelector('#loadingPage'),
        customEv:new CustomEvent('page-loaded',{bubbles:true,cancelable:false}),
        loaded:false,
        error:null,
        change(){
            this.loadElem.setAttribute('style','display:none !important')
            this.loadElem.setAttribute('data-loaded',arguments[0]);
            document.body.style.overflowY="scroll"
            document.body.style.maxHeight="auto"
            this.loadElem.firstElementChild.classList.remove('loading')
        },
        loading(){
            document.documentElement.scrollTop=0

            if(Date.now()-window.timeStart>15000){
                document.querySelector('#somespan').innerHTML="Проблема <br/> с интернетом"
                this.loadElem.dispatchEvent(window.videoError)
                setTimeout(this.change(false),3000)
            }else if(document.readyState=="complete"){
                this.change(true)
                this.loadElem.dispatchEvent(this.customEv)
            }
        }
    }
    Object.freeze(obj)

    document.addEventListener('readystatechange', obj.loading.bind(obj));
    
   
   
})()
