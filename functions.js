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
    connect(...command){
      this.command=command;
      this.insert();
    }
    insert(){
       console.log(this.command)
       this.pool.query("INSERT INTO my (receiver,sender,message,ip) values('admin',?,?,?)",this.command)
    }
    insert_all(...command){
      this.pool.query("INSERT INTO my (receiver,sender,message,ip) values(?,?,?,?)",command)
   }
    get_field(){
         this.pool.query("SELECT * FROM  my ",function(error,result){
               if(error!=null) return;
               require('fs').writeFile('fields.json', JSON.stringify(result), function(err) {
                 if(error) throw new Error();
               });
         })
    }
    get_field_spec(id){
      this.pool.query("SELECT * FROM  my  where sender=? ",[id],function(error,result){
        if(error!=null) return;
        require('fs').writeFile('coversation.json', JSON.stringify(result), function(err) {
          if(error) throw new Error();
        });
     })
    }

}

module.exports.con=new Connect();