const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

const userRouter = require('./routes/UserRouter');

app.use(express.json());
app.use(express.static('./public'));
app.use(express.static(`${__dirname}/upload`));

// Parse frontend URLs from environment variable (comma-separated)
const frontendUrls = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
  : ["http://localhost:3000"];

// Add /auth paths for each URL
const corsOrigins = [
  ...frontendUrls,
  ...frontendUrls.map(url => `${url}/auth`)
];

const corsOptions = {
  origin: corsOrigins
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