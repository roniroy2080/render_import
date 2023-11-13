const Server = require('http').createServer();
const io = require('socket.io')(Server,{
    cors: 'https://roniroy2080.github.io/render/',
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
