import express, { Request, Response, NextFunction } from 'express';

import MasterRouter from './src/routes/MasterRouter';
import ErrorHandler from './src/models/ErrorHandler';

class Server {
  public app = express();
  public router = MasterRouter;
}

// initialize server app
const server = new Server();

// make server listen on some port
((PORT = process.env.PORT || 5000) => {
  server.app.listen(PORT, () => console.log(`⚡️ [server]: Server is running at https://localhost:${PORT}`));
})();

server.app.use('/api', server.router);

server.app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    status: 'error',
    statusCode: err.statusCode,
    message: err.message
  });
});

