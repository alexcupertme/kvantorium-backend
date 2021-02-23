import { NextFunction, Request, Response, Router } from "express";
import QueryUserInfoController from "../../controllers/QueryUserInfoController";

class QueryUserInfoRouter {
  private _router = Router();
  private _controller = QueryUserInfoController;
  public route: string = "/getuserinfo";
  private _action = "user.queryUserInfo";

  get router() {
    return this._router;
  }

  get thisRoute() {
    return this.route;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  private _configure() {
    this._router.post(
      "/",
      (req: Request, res: Response, next: NextFunction) => {
        try {
          this._controller.defaultMethod(req, (result) => {
            result.action = this._action;
            res.status(200).json(result);
          });
        } catch (error) {
          next(error);
        }
      }
    );
  }
}

export = new QueryUserInfoRouter();
