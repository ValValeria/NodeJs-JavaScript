class  Connect{    
    constructor(){
       this.mysql=  require("mysql2");
       this.pool= this.mysql.createPool({   
        host: "remotemysql.com",
        user: "******",
        password: "******", 
        database: "******",
        port:3306
      }); 
       this.pool.query(`create table IF NOT EXISTS my(
         id  int auto_increment primary key ,
         receiver varchar(50),
         sender varchar(50),
         ip varchar(100),
         message varchar(300),
         area varchar(100),
         is_letter integer
       ) `)
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