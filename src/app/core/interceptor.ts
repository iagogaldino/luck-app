import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigAppService } from '../services/config-app.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private _configAppService: ConfigAppService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Obtenha o token de autorização de onde quer que esteja armazenado
    const authToken = this._configAppService.token ;

    // Clone a solicitação e adicione o cabeçalho de autorização
    const authReq = req.clone({
      setHeaders: {
        Authorization: `${authToken}`,
      },
    });

    // Continue a solicitação com a solicitação modificada
    return next.handle(authReq);
  }
}
