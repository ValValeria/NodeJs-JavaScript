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
           return new Promise((resolve,reject)=>{
             this.pool.query("INSERT INTO my (receiver,sender,message,ip,area,is_letter) values(?,?,?,?,?,?)",command,(error,result)=>{
                if(error) reject(error)
                resolve(result)
             })
           })
      
    }
    get_field(){
        return new Promise((res,rej)=>{
          this.pool.execute("SELECT area ,sender, receiver FROM  my ",(error,result)=>{
            if(error) rej(error)
            res(result)
          })
          .then((result)=>{
                require('fs').writeFile('fields.json', JSON.stringify(result), function(error) {
                  if(error) throw new Error();
                })
                return result;
          })
        })
    }
    get_field_spec(area){
      return new Promise((res,rej)=>{
        this.pool.execute("SELECT * FROM  my  where area=? ORDER BY id",[area],(error,result)=>{
          if(error) rej(error)
          res(result)
        })
      })
    }

}

module.exports.con=new Connect();