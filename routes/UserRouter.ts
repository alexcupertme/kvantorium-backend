import express, { NextFunction, Request, Response } from "express";

class UserRouter {
  private _router = express.Router();
  public route: string = "/login";
  private _action = "auth.login";

  private _helloWorld() {
    this._router.get("/", (req: Request, res: Response, next: NextFunction) => {
      res.status(200).send("hi");
    });
  }

  constructor() {
    this._helloWorld();
  }
}

export = new UserRouter();
