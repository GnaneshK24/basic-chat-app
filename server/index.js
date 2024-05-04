import { createServer } from "http"
import { Server} from "socket.io"

const httpServer = createServer ()

 const io = new Server(httpServer,{
    cors:{
        origin : process.env.ENV_NODE === 'production' ? false : ['http://localhost:5500','http://127.0.0.1:5500']
        
    }
 })

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)

    
    socket.on('message',data=>{
        console.log(data)
        io.emit('message', `${socket.id.substring(0,8)}:${data}`) 
    })
})
httpServer.listen(45000,()=>console.log("listening on port 45000"))