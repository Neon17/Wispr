const express = require('express');
const app = express();

const userRouter = require('./routes/UserRouter');

app.use(express.json());

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