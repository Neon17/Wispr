const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

const userRouter = require('./routes/UserRouter');

app.use(express.json());

const corsOptions = {
  origin : [
    "http://localhost:3000",
    "http://192.168.1.9:3000",
    "http://localhost:3000/auth",
    "http://192.168.1.9:3000/auth"
  ]
}

app.use(cors(corsOptions));

app.get('/',(req,res)=>{
    res.send("Hello World");
    res.end();
  })
  
app.get('/message.txt',(req,res)=>{
    let data;
    try {
      data = fs.readFileSync(__dirname + '/message.txt','utf-8');
    }
    catch(err){
      console.log(err.message);
    }
    // res.send(r.text());
    res.status(200);
    res.setHeader('Content-Type','application/json');
    res.json({
      status: 'success',
      data: data
    })
    
    res.end();
})

app.use('/api/v1/users',userRouter);


module.exports = app;