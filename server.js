
const express= require('express');
const app= express();
const http=require('http').Server(app);

const io = require('socket.io')(http);

const cookieParser1 = require("cookie-parser");

const fs=require('fs');

var port= process.env.PORT || 8000;

const bodyParser = require("body-parser");

const json=bodyParser.json();

const database=require('./functions.js').con;


app.set("view engine", "ejs");
app.use(cookieParser1());
app.use(json);

/** Admin area*/

app.use('/admin',(req,res,next)=>{
       res.cookie('admin', 'true', { expires: get_year(), httpOnly: true });
       if(req.cookies.__proto__== null){
              req.cookies=new Object;
       }
       if((req.ip=="::1" || req.ips=="::1" || req.ip=="::ffff:127.0.0.1" )  &&  req.cookies.hasOwnProperty('admin') && req.cookies.admin=='true') {
              next();
       }else{
              res.status(403).send('Forbidden');
              return;   
       }   
       
})
app.get('/admin',(req,res)=>{
       res.clearCookie('id_of_user');
       options=new Object();
       options.com=false;
       options.css=false;
       options.field=false;
       options.title="Admin Area";
       if(req.cookies.__proto__== null){
              req.cookies=new Object;
              options.admin=false;
       }else if(req.cookies.hasOwnProperty('admin')){
              options.admin=true;
       } 

       database.get_field();////write something into file
        
       /**Read file */
       const readonly = fs.createReadStream('fields.json','utf8');
       let fields ="";
       readonly.on('data',(chunks)=>{
              fields+=chunks;
       }) 
       readonly.on('end',()=>{
               let json= fields.length>0 ? fields:false;
               options.area1=JSON.parse(json);
               res.render('admin_p',options);

       })
       
       
       /*Need to get fields of mysql */

})

app.get('/admin/:file',function(req,res,next){
       const file=__dirname+"/admin/"+req.params.file;
       fs.access(file, fs.constants.R_OK ,(err)=>{
              if(err!=null) {
                     next();
                     return ;
              }
              
              else if(fs.lstatSync(file).isFile()){
                    // res.set('Content-Type', 'application/javascript');
                     res.sendFile(file);
              }
       })
      },function (req,res){
             /** name of area */
             /** */

             let options={
              admin:false,
              com:true,
              css:true,
             }
             /** */

             database.get_field_spec(req.params.file);

             const readonl = fs.createReadStream('coversation.json','utf8');

             let fields1="";

             readonl.on('data',(chunks)=>{
                fields1+=chunks;
             }) 

             readonl.on('end',()=>{
                if(fields1.length==0)  options.field=[];
                else options.field=JSON.parse(fields1);  
                options.title="Communication";
                res.render('com',options);
             })
            
             res.cookie('number',req.params.file,{path:req.url})
      }
)


 /**/

 function get (req,res,page){
        Promise.resolve()
        .then(()=>{
              if(typeof(parseInt(req.cookies.number))=='number') {
                     return database.get_field_spec("com"+req.cookies.number)
              }  
              return Promise.resolve() 
        })
        .then((result=null)=>{
              attention(res,page,result,req)    
        })
        .catch((e)=>console.log(e+"||"))     
           
 }

 function attention(res,page,result,req){
       
       let options=new Object();
       
       options.field=result ||[];
          
       options.admin=false;
       options.com=false;
       options.css=false;
       if(page=="contacts"){     
           options.title="Контакты";
      }else if(page=="main"){
           options.title="MyPortfolio - Создание сайтов  ";
      }else if(page=="portfolio"){
           options.title="Примеры работ";
           options.portfolio=true
           ////
           try {
                  const data = JSON.parse(fs.readFileSync('pages.json', 'utf8'))["site_pod_kluch"]["portfolio"]
                  options.portfolio=data

           } catch (err) {
                  options.portfolio=null
           }
      }else if(page=="uslugi"){
           options.title="Услуги";
      }else if (page=="service_descr"){
             service_descr(res,options.field,req)
             return;
      }
      res.render(page,options);
 }
app.get('/',(req,res)=>{
       if(req.cookies.__proto__== null){
              req.cookies=new Object;
       }

       if(req.cookies.number==undefined)  {
              res.cookie('number',getRandomInt(1,50000000),{expires: get_year(), maxAge: 9000000})
       }
       get(req,res,"main");
});

app.get('/services',(req,res)=>{
       get(req,res,'uslugi')
})
app.get('/portfolio',(req,res)=>{
       get(req,res,'portfolio')
})
app.get('/services/:file/',(req,res)=>{
       get(req,res,'service_descr')
})

function service_descr(res,result,req){
       options=new Object();
       let array=['site_pod_kluch','shops','landing'];
       options.admin=false;
       options.com=false;
       options.css=false;
       options.field=result
       options.title=" Мои услуги"
       options.portfolio=true
       if(array.includes(req.params.file)){
            fs.readFile(__dirname+'/pages.json','utf8',(error,data)=>{
                   if(error !=null) res.statusCode('03');
                   const json= JSON.parse(data)[req.params.file];
                   for (let prop in json){
                          options[prop]=json[prop];
                   }

                   database.get_field_spec("com"+req.cookies.number);

                   fs.readFile('coversation.json',"utf8",(err,d)=>{
                     options.url=req.url;
                     options.field=JSON.parse(d);
                     res.render("landing",options);
                     res.end()
                   })
                  
            })   
       }
}
app.get('/contacts',(req,res)=>{
       
       get(req,res,'contacts');

})

app.post('/post',json,(request,response)=>{
       database.insert_all('admin',request.body.email,request.body.message,request.ip,"com"+request.cookies.number,1)
       
       response.send();
})


     
/**If nothing was found */


io.on('connection', function (socket){
    /**::ffff:127.0.0.1    ::1  */  

      let clientIp=socket.request.connection.remoteAddress;

       socket.on('message_of_user',(message,number)=>{
              if(!typeof(parseInt(number))=='number') return false;
              database.insert_all('admin',"user"+number,message,clientIp,"com"+number,0)
              .catch((error)=>{
                     console.log(error)
              })      
              find_user(socket,io,number,true,'new_message',message,"com"+number)          
             
       })

       socket.on("exchange_of_id_admin",(number,message)=>{//когда админ хочет написать пользователю
              if(!typeof(parseInt(number))=='number') return false;

             if(number==undefined) return;
             my_num=number.substr(number.indexOf('com')+3);

             database.insert_all("user"+my_num,"admin",message,clientIp,number);

             find_user(socket,io,my_num,false,'message_from_admin',message);
       })

       socket.on('getusers',()=>{
              fs.readFile('fields.json',"utf8",(error,data)=>{
                  if(error!=null)  return; 

                  let array=JSON.parse(data);
                  let json=[];
                  let promise=new Promise((res,rej)=>{

                     array.forEach((elem,index)=>{

                            let com_id=elem.sender=="admin"? elem.receiver:elem.sender;
                            let  id1=com_id.substr(com_id.indexOf('user')+4);
                            
                            let k=find_user(socket,io,id1,false);

                            if(k==false){
                                stat="ofline";
                            }else stat="online";
                         
                            let line={area:elem.area,status:stat};
                            
                                
                            if(json.findIndex(el=>el.area==elem.area)==-1){
                                   json.push(line);
                            }

                            if(index+1==array.length){
                                   res(json)
                            }
                     })
                  })
                  promise
                   .then(json=>{
                          socket.emit("list_of_users",json)
                    })
                   .catch(error=>console.log(error))
              })
       })
})


app.use('/public',express.static(__dirname+'/public'));


app.use(function(req, res, next) {
       options=new Object();
       options.admin=false;
       options.com=false;
       options.css=false;
       options.field=false;
       options.title="404";
       res.status(404).render('404',options);
});


function getRandomInt(min, max) {
       min = Math.ceil(min);
       max = Math.floor(max);
       return Math.floor(Math.random() * (max - min)) + min; //Включно з мінімальним та виключаючи максимальне значення 
}




function find_user(socket,io ,number,admin=false,event,...options){
   let obj=io.sockets.sockets;   
   let id=socket.id;   
   ///socket,io,my_num,false,'message_from_admin',message,number
   if(admin){
     for(let elem in obj){
       let soc=io.sockets.sockets[elem];
       if((soc.request.headers.cookie!==undefined) && (soc.request.connection.remoteAddress=="::ffff:127.0.0.1" ||
       soc.request.connection.remoteAddress=="::1" )){
              if(soc.request.headers.cookie.includes("admin=true;")){
                     if(typeof event !="undefined") {
                            io.sockets.sockets[soc.id].emit(event,...options);
                     }       
                     socket.emit("admin_found");

              }
       }
     }
   }else{
       for (let prop in obj){
              let arr=[];
              if(obj[prop].id!=id){
                  if(obj[prop].request.headers.cookie.includes("number="+number)) {
                     if(typeof event !="undefined") io.sockets.sockets[obj[prop].id].emit(event,...options);  
                     arr.push(obj[prop].id);
                   }
              }

              if(arr.length>0) {return true;}
              else {return false;}
       }
       
   }
  
}
process.on('uncaughtException', err => {
       console.log(err)
})

function get_year(){
let CookieDate = new Date;
CookieDate.setFullYear(CookieDate.getFullYear() +10);
return CookieDate.toUTCString();
}
http.listen(port,()=>console.log('hello'));
