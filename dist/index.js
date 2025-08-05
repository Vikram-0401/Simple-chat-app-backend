"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 0;
let allSockets = [];
wss.on("connection", (socket) => {
    allSockets.push(socket);
    userCount = userCount + 1;
    console.log("User connected #" + userCount);
    socket.on("message", (message) => {
        console.log("message received " + message.toString());
        for (let i = 0; i < allSockets.length; i++) {
            const s = allSockets[i];
            // @ts-ignore
            s.send(message.toString() + ":sent from the server");
        }
    });
});
//# sourceMappingURL=index.js.map