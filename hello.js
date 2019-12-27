const express= require('express');
const app= express();
const http=require('https').Server(app);

const port= process.env.PORT || 3000;
app.get('/',(req,res)=>{
    res.sendFile('<h1>hELLO</h1>')
})
http.listen(port);