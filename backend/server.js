const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require('cors');
const fs = require('fs');

let readFile = fs.readFileSync('message.txt','utf8');

const app = express();
const corsOptions = {
  origin : [
    "http://localhost:3000",
    "http://192.168.1.9:3000"
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

const httpServer = http.createServer(app);
const io = new Server(httpServer, { 
  cors: {
    origin: ["http://localhost:3000","http://192.168.1.9:3000"],
    methods: ["GET","POST"]
  }
 });

io.on("connection", (socket) => {
  // ...
  socket.on("setup",(x)=>{
    // console.log(`Setting up with ${x}`);
  })
  socket.on('button-clicked',()=>{
    console.log("Button Clicked");
  })
  socket.on('join chat',(room)=>{
    console.log("User Joined Room: "+room);
    socket.join(room);
  })
  socket.on('new-message',(message)=>{
    fs.writeFileSync('message.txt',message.text);
    socket.in(message.id).emit('message-received',message);
    console.log('message-received');
  })
});

const port = 5000;
httpServer.listen(port,()=>{
  console.log(`Listening at http://localhost:${port}`);
});
