function entryPoint(){
    setTimeout(function name(){
        videoObj.changeOpacity();
        if(videoObj.opacity<videoObj.endOpacity &&  videoObj.canShow) setTimeout(name,videoObj.ms);

      },videoObj.ms)
}
const  videoError=new CustomEvent('videoError',{
    cancelable:true,
    bubbles:true
})

window.addEventListener('scroll',()=>{
    const move=document.documentElement || document.body ;
    console.log(processScrollMove.scrollPrevHeight+"||"+move.scrollTop)
    processScrollMove.scroll(null,processScrollMove.scrollPrevHeight,move.scrollTop)

    processScrollMove.scrollPrevHeight=move.scrollTop;

})
document.addEventListener('videoError',()=>{
    processScrollMove.scroll=processScrollMove.scroll.bind(processScrollMove,1)
})


const _mainObj={
    videoTag:document.getElementById('video'),
    sourceTag:document.getElementById('source'),
    opacity:0,
    changeInitOpacity:0.006,
    timeNow:Date.now(),
    ms:500,
    endOpacity:0.55,
    homeBanner:document.querySelector('.home-banner'),
    canShow:true,
    changeOpacity(){
         
      if(!this.canShow) {
          this.homeBanner.classList.add('box-shadow');
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
        this.videoTag.remove();
    },
    pause(){
        this.videoTag.pause();
        this.videoTag.setAttribute('hidden',true)
        this.homeBanner.classList.add('box-shadow'); 
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

const processScrollMove={
      scroll:processScroll.bind(this),
      scrollPrevHeight:0
}




function processScroll(error,oldscrollHeight,newScrollHeight){
    if(error)
    {
         videoObj.canShow=false;
         videoObj.error();
         return false;
    }
    if(newScrollHeight>oldscrollHeight && videoObj.videoTag.clientHeight+100<newScrollHeight){
            videoObj.canShow=false;
            console.log(videoObj.videoTag.currentTime)

            return videoObj.pause();
    }
    videoObj.canShow=true;
    return entryPoint();
}



((videoObj)=>{
   let video=videoObj.videoTag
   video.addEventListener('canplaythrough',()=>{
        entryPoint();
   })
   video.addEventListener('error',()=>{
      document.dispatchEvent(videoError)

   })
   video.addEventListener('abort',()=>{
      document.dispatchEvent(videoError)
   })

})(videoObj)



