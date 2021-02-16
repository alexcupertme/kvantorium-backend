import { Router } from 'express';
import ThemeARouter from './themeA/ThemeARouter';
import ThemeBRouter from './themeB/ThemeBRouter';

class MasterRouter {
  private _router = Router();
  private _subrouterA = ThemeARouter;
  private _subrouterB = ThemeBRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  
  /**
   * Connect routes to their matching routers.
   */
  private _configure() {
    this._router.use(this._subrouterA.thisRoute, this._subrouterA.router); // Theme A
    this._router.use(this._subrouterB.thisRoute, this._subrouterB.router); // Theme B
  }
}

export = new MasterRouter().router;