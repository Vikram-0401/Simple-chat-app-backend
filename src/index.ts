  // @ts-ignore
import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8070 });

interface User {
    socket: WebSocket;
    room: string;
}

interface Message {
    type: string;
    payload: {
        roomId?: string;
        message?: string;
    };
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {

    socket.on("message", (message) => {
        // @ts-ignore: WebSocket message needs to be parsed
        const parsedMessage: Message = JSON.parse(message);
        
        if (parsedMessage.type === "join") {
            console.log("user joined room " + parsedMessage.payload.roomId);
            allSockets.push({
                socket,
                  // @ts-ignore
                room: parsedMessage.payload.roomId
            });
        }

        if (parsedMessage.type === "chat") {
            console.log("user wants to chat");
            let currentUserRoom = null;
            for (let i = 0; i < allSockets.length; i++) {
                  // @ts-ignore
                if (allSockets[i].socket === socket) {
                      // @ts-ignore
                    currentUserRoom = allSockets[i].room;
                }
            }

            for (let i = 0; i < allSockets.length; i++) {
                // @ts-ignore
                if (allSockets[i].room === currentUserRoom) {
                    // @ts-ignore: Payload message is guaranteed to exist in chat messages
                    allSockets[i].socket.send(parsedMessage.payload.message);
                }
            }
        }
    });
});