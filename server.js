
const express= require('express');
const app= express();
const http=require('http').Server(app);

const io = require('socket.io')(http);

const cookieParser1 = require("cookie-parser");

const fs=require('fs');

var port= process.env.PORT || 3000;

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

const database=require('./functions.js').con;

app.use(cookieParser1());



app.set("view engine", "ejs");


/** Admin area*/
app.use('/admin',(req,res,next)=>{
       res.cookie('admin', 'true', { expires: new Date(Date.now() + 900e0988880), httpOnly: true });
       if(req.cookies.__proto__== null){
              req.cookies=new Object;
       }
       if((req.ip=="::1" || req.ips=="::1")  &&  req.cookies.hasOwnProperty('admin') && req.cookies.admin=='true') {
              next();
       }else{
              res.status(403).send('Forbidden');
              console.log()
              return;   
       }   
       
})
app.get('/admin',(req,res)=>{
       res.clearCookie('id_of_user');
       res.cookie('admin','true', { maxAge: 9000000, httpOnly: true });
       options=new Object();
       options.com=false;
       options.css=false;
       if(req.cookies.__proto__== null){
              req.cookies=new Object;
              options.admin=false;
       }else if(req.cookies.hasOwnProperty('admin')){
              options.admin=true;
       }


       /*Need to get fields of mysql */
       database.get_field();////write something into file
        
       /**Read file */
       const readonly = fs.createReadStream('fields.json','utf8');
       let fields="";
       readonly.on('data',(chunks)=>{
              fields+=chunks;
       }) 
       readonly.on('end',()=>{
              if(fields.length==0) options.field=false
              else  options.field=JSON.parse(fields);
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
             res.clearCookie('id_of_user');

             let options={
              admin:false,
              com:true,
              css:true
             }
             /** */
             database.get_field_spec(req.params.file);
             const readonl = fs.createReadStream('coversation.json','utf8');
             let fields1="";
             readonl.on('data',(chunks)=>{
                fields1+=chunks;
             }) 
             readonl.on('end',()=>{
                if(fields1.length==0) options.field=false
                else  options.field=JSON.parse(fields1);
                res.render('com',options);
             })
            /*Need to get fields of mysql */
             /** */
             res.cookie('id_of_user',req.params.file);
           
      }
)


 /**/

app.get('/',(req,res)=>{
       res.clearCookie('id_of_user');
       res.clearCookie('id_of_admin');

       res.sendFile('/node_modules/socket.io/socket.io.js');
       options=new Object();
       if(req.cookies.__proto__== null){
              req.cookies=new Object;
       }

       options.admin=false;
       options.com=false;
       options.css=false;
       options.field=false;
       res.render('main',options);
});

app.get('/services',(req,res)=>{
       options=new Object();
       options.admin=false;
       options.com=false;
       options.css=false;
       options.field=false;
       res.render('uslugi',options);

})
app.get('/services/:file/',(req,res)=>{
       options=new Object();
       let array=['site_pod_kluch','shops','landing'];
       options.admin=false;
       options.com=false;
       options.css=false;
       options.field=false;
       if(array.includes(req.params.file)){
            res.render(req.params.file,options);
       }
})
app.get('/contacts',(req,res)=>{
       options=new Object();
       options.admin=false;
       options.com=false;
       options.css=false;
       options.field=false;
       res.render('contacts',options);
})
app.post('/',urlencodedParser,(request,response)=>{
   if(!request.body) return response.sendStatus(400);
   database.insert_all('admin',request.body.email,request.body.message,request.ip);
   response.redirect(301,"/" );
})

/**If nothing was found */
app.use('/',(req,res)=>{
       let options=new Object();
       options.admin=false;
       options.com=false;
       options.css=false;
       options.field=false;
       res.render('404',options)
})

io.on('connection', function (socket){
      function new_user(){
       for( let prop in io.sockets.sockets){
              obj=io.sockets.sockets;
              if(obj[prop].handshake.headers.cookie!=undefined && obj[prop].id!=socket.id){//если это не сам админ
                     if(obj[prop].handshake.headers.cookie.includes('admin=true;')&& (obj[prop].request.connection.remoteAddress=="::ffff:127.0.0.1"
                     || obj[prop].request.connection.remoteAddress=="::1")){
                            obj[prop].send(socket.id);///посылаем  id юзера
                     }else socket.emit('not_found')
              }else socket.emit('not_found');
        }
      }
      socket.on('get_users',()=>{
          if(!socket.handshake.headers.cookie.includes('admin=true;')) return;
          io.clients((error,clients)=>{
                 for(let id of clients){
                        if(socket.id !== id) {
                        socket.send(id);
                        console.log("id "+ id +" | "+" admin "+ socket.id);
                        }
                 }
          })
      });
       /**
        * socket.request.connection.remoteAddress=="::ffff:127.0.0.1"|| socket.request.connection.remoteAddress=="::1"
        * socket_admin.handshake.headers.cookie.
        * param id- id of userr
        * param id_s-id  of admin
        */
      

       socket.on('start_of',(text,id,admin)=>{
           if(id!=undefined && io.sockets.sockets[id]!=undefined)
           io.sockets.sockets[id].emit('new_message',text);
           if(typeof admin==null || typeof admin==undefined) {
              database.insert_all('admin',socket.id,text,socket.request.connection.remoteAddress);
           }//написал юзер
           else {
              database.insert_all(socket.id,'admin',text,socket.request.connection.remoteAddress);
           } //написал админ
       })

       socket.on('exchange_of_id',()=>{
              new_user();
       })
       socket.on('exchange_of_id_admin',(id_of_user)=>{
             console.log('id_of_user '+id_of_user)
             if(id_of_user!=undefined && io.sockets.sockets[id_of_user]!=undefined)
             io.sockets.sockets[id_of_user].emit('id_of_admin',socket.id);

       })
       socket.on('disconnect',()=>{
               if(socket.request.headers.cookie!=null || socket.request.headers.cookie!=undefined){
                      let cook=get_cookie(socket.request.headers.cookie);
                      let id=cook.id_of_admin;
                      if(id!=undefined && io.sockets.sockets[id]!=undefined){
                            io.sockets.sockets[id].emit('dis_connected');
                      }
               }
       })
       socket.on('n_end_of',(message)=>{//add to database the comment of the user
             database.connect(socket.id,message,socket.request.connection.remoteAddress);
             console.log('hello')
       })
})
 function get_cookie(cookies_string){
       let cookies=cookies_string.split(";");
       let obj= new Object();
       for (let elem of cookies ){
           let ar=elem.trim().split('=');
           obj[ar[0]]=ar[1];
       }
       return obj;
}
app.use('/public',express.static(__dirname+'/public'));

http.listen(port,()=>console.log('hello'));