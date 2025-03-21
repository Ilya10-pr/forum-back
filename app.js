import express from "express";
import cors from "cors";
import { sequelize, dbConnection } from "./database/connact.js";
import dotenv from "dotenv"
import { router } from "./routes/index.js";
import { strategyPassport } from "./middleware/passport.js";
import expressWs from "express-ws";
import { fileURLToPath } from 'url';
import path from 'path';
import { commentWebSocket } from "./websocket/comment.js";
import { messageWebSocket } from "./websocket/message.js";

dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;
const jsonBodyMiddleware = express.json();
export const appWs = expressWs(express());
export const app = appWs.app
app.use(cors())
app.use(jsonBodyMiddleware);
app.use(router);
app.use(strategyPassport.initialize());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.static(__dirname));
app.use("/images", express.static(path.join(__dirname, "images")));


app.listen(PORT, async () => {
  try {
    app.get('/', (req, res) => {
      res.send('Hello World!')
    })
    await sequelize.sync({ alter: true });
    await dbConnection()
    console.log(`Server started on port: ${PORT}`);
  } catch (error) {
    console.log(`Error of connect with database: ${error}`);
  }
})

commentWebSocket()
messageWebSocket()





 