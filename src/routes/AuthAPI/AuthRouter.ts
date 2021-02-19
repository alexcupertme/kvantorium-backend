import { NextFunction, Request, Response, Router } from "express";
import AuthController from "../../controllers/AuthController";

class AuthRouter {
  private _router = Router();
  private _controller = AuthController;
  public route: string = "/login";

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
            res.status(200).json(result);
          });
        } catch (error) {
          next(error);
        }
      }
    );
  }
}

export = new AuthRouter();
