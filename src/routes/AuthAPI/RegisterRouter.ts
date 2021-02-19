import { NextFunction, Request, Response, Router } from "express";
import RegisterController from "../../controllers/RegisterController";

class RegisterRouter {
  private _router = Router();
  private _controller = RegisterController;
  private _action = "auth.register";
  public route: string = "/register";

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

export = new RegisterRouter();
