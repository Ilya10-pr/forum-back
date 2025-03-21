import { app, appWs } from "../app.js";
import { Message } from "../database/models/message.js";

export const messageWebSocket = () => {
  app.ws("/ws/message", (ws, req) => {
    console.log("WebSocket connection is open");
  
    Message.findAll()
      .then((message) => {
        ws.send(JSON.stringify({ type: "INIT_MESSAGE", data: message }));
      })
      .catch((err) => {
        console.error("Error when uploading message:", err);
      });
  
    ws.on("message", async (message) => {
      console.log("Получено сообщение:", message)
      const data = JSON.parse(message);
  
      switch (data.type) {
        case "ADD_MESSAGE": {
          const newMessage = await Message.create(data.payload);
          await newMessage.save();
  
          appWs.getWss().clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
              client.send(JSON.stringify({ type: "NEW_MESSAGE", data: newMessage }));
            }
          }); 
          break;
        }
  
        case "DELETE_COMMENT": {
          const { messageId } = data.payload;
          const message = await Message.findByPk(messageId);
          await message.destroy();
  
          appWs.getWss().clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
              client.send(JSON.stringify({ type: "DELETED_COMMENT", data: { messageId } }));
            }
          });
          break;
        }
  
        default:
          console.log("Unknown type of the message:", data.type);
      }
    });
  
    ws.on("close", () => {
      console.log("WebSocket connection is close");
    });
  });  
}
