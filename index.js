const express = require('express');
const app = express();
const cors = require('cors');
const Server = require('http').createServer(app);
const io = require('socket.io')(Server,{
    cors: 'http://localhost',
})
app.use(cors());
app.get('/verify',(req,res)=>{
    res.json({
        'name':'ronit kumar',
        'class':"BCA"
    })
})

const PORT = 6500
Server.listen(PORT,()=> console.log(`We Are Live At PORT : ${PORT}`))

io.on('connection', socket => {
    socket.on('joining:room', room_details => {
        let {to,name } = room_details
        console.log(to,name)
        socket.join(to);
        socket.broadcast.to(to).emit('other:joined:room',name);
    })

    socket.on('other:user:joined', other_user_detail => {
        let {to,name} = other_user_detail;
        socket.broadcast.to(to).emit('other:user:joined:success',name);
    })

    socket.on('other:user:name', room_details =>{
        let {to,name} = room_details;
        console.log(to,name)
    })

    socket.on('offer:server', offer_get =>{
        let {offer,to} = offer_get;
        socket.broadcast.to(to).emit('offer:client',offer);
    })

    socket.on('answer:server', answer_get =>{
        let {answer,to} = answer_get;
        socket.broadcast.to(to).emit('answer:client',answer);
    })

    socket.on('nego:needed:server:offer', offer_gett => {
        let {offer,to} = offer_gett;
        socket.broadcast.to(to).emit('nego:needed:client:offer',offer);
    })

    socket.on('nego:answer:need:server', answer_gett =>{
        let {answer,to} = answer_gett;
        socket.broadcast.to(to).emit('nego:answer:need:client', answer);
    })

})
