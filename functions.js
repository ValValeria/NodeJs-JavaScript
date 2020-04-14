class  Connect{    
    constructor(){
       this.mysql=  require("mysql2");
       this.pool= this.mysql.createPool({
        host: "remotemysql.com",
        user: "C5CTjjXhqo",
        password: "Eu6f3raCnq", 
        database: "C5CTjjXhqo",
        port:3306
      }); 
    }
   
    insert_all(...command){
      if(command.length==5)  command.push(0);
      this.pool.query("INSERT INTO my (receiver,sender,message,ip,area,is_letter) values(?,?,?,?,?,?)",command)
   }
    get_field(){
         this.pool.query("SELECT area ,sender, receiver FROM  my ",function(error,result){
               if(error!=null) return;
               require('fs').writeFile('fields.json', JSON.stringify(result), function(err) {
                 if(error) throw new Error();
               })
         })
    }
    get_field_spec(area,resolve,reject){
      this.pool.query("SELECT * FROM  my  where area=? ORDER BY id",[area],function(error,result){
        if(error!=null) return;
        require('fs').writeFile('coversation.json', JSON.stringify(result),  'utf8', function(err) {
          if(err){
            if(reject!=undefined) reject(result );
          }   
          if(resolve!=undefined) resolve(result);
        });
        
      })  
    }

}

module.exports.con=new Connect();