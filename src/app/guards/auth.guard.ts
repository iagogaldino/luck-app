import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivate,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigAppService } from '../services/config-app.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private _configAppService: ConfigAppService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this._configAppService.token) {
      this.router.navigate(['']);
      return false;
    }
    if (
      window.location.pathname.includes('confirmation') &&
      this._configAppService.codeConfirmed
    ) {
      this.router.navigate(['game']);
    }

    if (
      window.location.pathname.includes('game') &&
      this._configAppService.gameWin
    ) {
      this.router.navigate(['ticket']);
    }

    return true;
  }
}
