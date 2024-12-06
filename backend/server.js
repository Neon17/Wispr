const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const fs = require('fs');
const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config({path: './config.env'});

const httpServer = http.createServer(app);
const io = new Server(httpServer, { 
  cors: {
    origin: ["http://localhost:3000","http://192.168.1.9:3000"],
    methods: ["GET","POST"]
  }
 });


mongoose.connect(process.env.CONN_STR).then((conn)=>{
  console.log('Connected Successfully');
}).catch((err)=>{
  console.error(err.message);
})


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
  socket.on('group-message-send',(message)=>{
    let returnData = {
      status: ''
    };
    const axiosConfig = {
      headers: {
        "Authorization": `Bearer ${message.token}`
      }
    };
    axios.post("http://localhost:5000/api/v1/users/sendMessage",{
      "groupId": message.groupId,
      "message": message.message
    }, axiosConfig).then((res)=>{
      returnData.status = 'success';
      returnData.data = res.data;
      socket.in(message.groupId).emit('send-message-status',returnData);
      socket.in(message.groupId).emit('new-message-received');
    }).catch((err)=>{
      console.log(err);
      returnData.status = 'error';
      returnData.message = err.message;
      socket.in(message.groupId).emit('send-message-status',returnData);
    })
  })
});

const port = process.env.PORT || 5000;
httpServer.listen(port,()=>{
  console.log(`Listening at http://localhost:${port}`);
});
