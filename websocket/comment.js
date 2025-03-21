import { app, appWs } from "../app.js";
import { Comments } from "../database/models/Comment.js";

export const commentWebSocket = () => {
  app.ws("/ws/comments", (ws, req) => {
    console.log("WebSocket connection is open");
  
    Comments.findAll()
      .then((comments) => {
        ws.send(JSON.stringify({ type: "INIT_COMMENTS", data: comments }));
      })
      .catch((err) => {
        console.error("Error when uploading comments:", err);
      });
  
    ws.on("message", async (message) => {
      console.log("Получено сообщение:", message)
      const data = JSON.parse(message);
      console.log(data) 
  
      switch (data.type) {
        case "ADD_COMMENT": {
          console.log(data.payload)
          const newComment = await Comments.create(data.payload);
          await newComment.save();
  
          appWs.getWss().clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
              client.send(JSON.stringify({ type: "NEW_COMMENT", data: newComment }));
            }
          });
          break;
        }
  
        case "EDIT_COMMENT": {
          const { commentId, text } = data.payload;
          const updatedComment = await Comments.findByIdAndUpdate(
            commentId,
            { text, updatedAt: new Date() },
            { new: true }
          );
  
          appWs.getWss().clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
              client.send(JSON.stringify({ type: "UPDATED_COMMENT", data: updatedComment }));
            }
          });
          break;
        }
  
        case "DELETE_COMMENT": {
          const { commentId } = data.payload;
          const comment = await Comments.findByPk(commentId);
          await comment.destroy();
  
          appWs.getWss().clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
              client.send(JSON.stringify({ type: "DELETED_COMMENT", data: { commentId } }));
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
  





