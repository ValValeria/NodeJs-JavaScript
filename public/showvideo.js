(()=>{
    const _mainObj={
        videoTag:document.getElementById('video'),
        sourceTag:document.getElementById('source'),
        opacity:0,
        changeInitOpacity:0.006,
        timeNow:Date.now(),
        ms:500,
        endOpacity:0.55,
        loadedPage:false,
        homeBanner:document.querySelector('.home-banner'),
        canShow:true,
        changeOpacity(){
          if(!this.canShow) {
              return;
          }
          this.opacity+=this.changeInitOpacity
          this.changeStyleVideo()
          this.changeAttribute();
        },
        changeStyleVideo(){
            if(this.opacity>=this.endOpacity)  return ;
            this.videoTag.style.opacity=this.opacity.toString();
        },
        changeAttribute(){
            this.homeBanner.classList.remove('box-shadow');
            this.restart()
        },
        restart(){
            this.videoTag.classList.add('video')
            this.videoTag.removeAttribute('hidden')
            this.videoTag.setAttribute('autoplay',true)
            this.videoTag.setAttribute('loop',true)
            this.videoTag.play();
        },
        error(){
            this.pause();
            this.videoTag.hidden=true
            this.videoTag.remove();
            this.homeBanner.classList.add('box-shadow'); 
        },
        pause(){
            this.videoTag.pause();
        },
        changed(obj){
           this.scroll(obj)
        },
        scroll(){
            processScroll.call(this)
        }
    }
    
    let videoObj=new Proxy(_mainObj,{
        deleteProperty(_target,_prop){
          throw new Error();
        
        },
        get(target, prop,receiver) { 
         return Reflect.get(target,prop,receiver)
        },
        set(..._args){
         return Reflect.set(..._args);
        }
    });
    
    class DataStorage{
        _prevState=0;
        _newState=0;
        constructor(prevState=0,newState=0){
          this._prevState=prevState;
          this._newState=0;
        }
        set newState(value){
           if(value) this._newState=value
           videoObj.changed({prev:this._prevState,new:this._newState})
           this._prevState=this._newState

        }
        get states(){
            return {prev:this._prevState,new:this._newState}
        }
      }
      const Storage=new DataStorage()



    function entryPoint(){
        setTimeout(function name(){
            videoObj.changeOpacity();
            if(videoObj.opacity<videoObj.endOpacity &&  videoObj.canShow) setTimeout(name,videoObj.ms);
    
          },videoObj.ms)
     }
    
    function func(){
        const move=document.documentElement || document.body ;
    
        Storage.newState=move.scrollTop;
    }
    
    const  videoError=window.videoError   
    
    
    function processScroll(error){
        let { prev:oldscrollHeight,new:newScrollHeight}=Storage.states;
         
        if(error || !this.loadedPage)///1
        {
             this.canShow=false;
             if(error) this.error();
             return false;
        }
        if(this.opacity!=0){
        
            if((newScrollHeight>=oldscrollHeight && this.videoTag.clientHeight+100<newScrollHeight)){
                this.canShow=false;
    
                return this.pause();
           }else if(newScrollHeight-this.videoTag.clientHeight<100 && oldscrollHeight>=newScrollHeight){
                this.canShow=true;
                return this.opacity<this.endOpacity?entryPoint(): this.restart();
           }
        }else{
            if(newScrollHeight-this.videoTag.clientHeight<200 && oldscrollHeight>=newScrollHeight){
                this.canShow=true;
                return entryPoint();
            }
        }
    
    }
    
    
    
    ((videoObj)=>{
       let video=videoObj.videoTag
       const errors=['stalled','error']
       errors.forEach(elem=>{
           video.addEventListener(elem,()=>{
               document.dispatchEvent(videoError)
           })
       })
       video.addEventListener('canplaythrough',()=>{
           videoObj.scroll();/***entry point */
       })      
       
       window.addEventListener('scroll',func);/**change the coordinates */
    
       document.addEventListener('videoError',()=>{
           console.log('error')
           if(video.error && video.read.readyState!="HAVE_ENOUGH_DATA"){
             processScrollMove.scroll=processScrollMove.scroll.bind(processScrollMove,video.error || true)
           }
       })
       document.addEventListener('page-loaded',()=>{
           videoObj.loadedPage=true;
           func();
       })
       
       window.addEventListener('beforeunload',()=>{
           videoObj.pause();
       })

       
    })(videoObj)
        
})()