const express=require("express"),app=express(),cors=require("cors"),server=require("http").createServer(app),io=require("socket.io")(server,{cors:"https://roniroy2080.github.io/video/"});app.use(cors());const PORT=6500;server.listen(PORT,()=>console.log(`We Are Live At PORT : ${PORT}`)),app.get("/",(e,o)=>{o.json({name:"webcalling server",password:"test"})}),io.on("connection",e=>{e.on("leave:room",o=>{let{room_id:r,name:t}=o;e.broadcast.to(r).emit("other:leave:room",t),e.leave(r)}),e.on("joining:room",o=>{let{to:r,name:t,uuid:s}=o,n=io.sockets.adapter.rooms;null==n.get(r)?(e.join(r),io.to(r).emit("i:joined:successfully")):1==n.get(r).size?(e.join(r),e.broadcast.to(r).emit("other:joined:room",t)):2==n.get(r).size&&(e.join(r+s),io.to(r+s).emit("room:full",s),console.log(n),setTimeout(()=>{e.leave(r+s),console.log("leaves"),console.log(n)},1500))}),e.on("other:joined:success",o=>{let{name:r,to:t,offer:s}=o;e.broadcast.to(t).emit("other:joined:room:success",{name:r,offer:s})}),e.on("answer:server",o=>{let{answer:r,to:t}=o;e.broadcast.to(t).emit("answer:client",r)}),e.on("nego:offer:server",o=>{let{to:r,offer:t}=o;e.broadcast.to(r).emit("nego:offer:client",t)}),e.on("nego:answer:server",o=>{let{to:r,answer:t}=o;e.broadcast.to(r).emit("nego:answer:client",t)}),e.on("disconnect",()=>console.log("a user disconnected"))});
