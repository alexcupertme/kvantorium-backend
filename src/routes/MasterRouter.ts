import { Router, Request, Response } from "express";

import RegisterRouter from "./AuthAPI/RegisterRouter";
import AuthRouter from "./AuthAPI/AuthRouter";
import QueryUserInfoRouter from "./UserAPI/QueryUserInfoRouter";

class MasterRouter {
  private _router = Router();
  private _registerRouter = RegisterRouter;
  private _userInfoRouter = QueryUserInfoRouter;
  private _authRouter = AuthRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._mainPage();
    this._configure();
  }

  private _mainPage() {
    this._router.get("/", (req: Request, res: Response) => {
      res.send("API for server-kvantorium");
    });
  }

  /**
   * Connect routes to their matching routers.
   */
  private _configure() {
    this._router.use(
      this._registerRouter.thisRoute,
      this._registerRouter.router
    ); // Register API

    this._router.use(
      this._userInfoRouter.thisRoute,
      this._userInfoRouter.router
    ); // Get user info by query API
    this._router.use(this._authRouter.thisRoute, this._authRouter.router); // Authenticate user by login and password
  }
}

export = new MasterRouter().router;
