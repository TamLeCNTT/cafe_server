const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors')
const app = express();
const helmet = require("helmet")
const dotenv = require('dotenv');
const config = require("./config");
const compression = require("compression");
const server = http.createServer(app);
app.use(cors())
const io = socketIo(server, {
    cors: {
        origin: "*"
    }
});
app.use(cors({ origin: "*" }))
app.use(helmet())
app.use(compression())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
    return res.send("helll")
})
require("./app/router/userRouter.js")(app);
// require("./app/router/roleRouter.js")(app);
require("./app/router/odersaveRouter.js")(app);
require("./app/router/oderRouter.js")(app);
require("./app/router/productRouter.js")(app);
require("./app/router/GetProductRouter.js")(app);
require("./app/router/CoHuuRouter.js")(app);
io.on('connection', (socket) => {


    socket.on('chat message', (message) => {
        io.emit('chat message', message);

    });
    socket.on('chat messages', (message) => {
        io.emit('chat messages', message);

    });
    socket.on('disconnect', () => {

    });
});

server.listen(3001, () => {
    console.log('Server listening on port 3001');
});
