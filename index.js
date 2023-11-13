const express = require('express');
const app = express();
const cors = require('cors');
const Server = require('http').createServer(app);
const io = require('socket.io')(Server,{
    cors: 'https://roniroy2080.github.io/render/',
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
    console.log('a new user connected')

    socket.on('offer:server', offer =>{
        socket.broadcast.emit('offer:client',offer);
    })

    socket.on('answer:server', answer =>{
        socket.broadcast.emit('answer:client',answer);
    })

    socket.on('nego:needed:server:offer', offer => {
        socket.broadcast.emit('nego:needed:client:offer',offer);
    })

    socket.on('nego:answer:need:server', answer =>{
        socket.broadcast.emit('nego:answer:need:client', answer);
    })

})

console.log('update');
