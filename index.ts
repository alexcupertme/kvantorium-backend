import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import fs from "fs";
import path from "path";

import MasterRouter from "./src/routes/MasterRouter";
import ErrorHandler from "./src/models/Methods/ErrorHandler";
import databaseConnect from "./DatabaseConnection";

class Server {
  public app = express();
  public router = MasterRouter;
}

/**Main server router initalizator */
const server = new Server();

// make server listen on some port
((PORT = process.env.PORT || 5000) => {
  server.app.use(bodyParser.json());
  let accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    { flags: "a" }
  );
  server.app.use(morgan("combined", { stream: accessLogStream }));
  server.app.listen(PORT, () => {
    console.log(`⚡️ [server]: Server is running at http://localhost:${PORT}`);
    databaseConnect();
  });
})();

server.app.use("/api", server.router); // Main route

server.app.use(
  (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    res.set("Access-Control-Allow-Origin", "http://localhost");
    res.status(err.statusCode || 500).json({
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
    });
  }
);
