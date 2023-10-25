import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ConfigAppService } from './config-app.service';

@Injectable({
  providedIn: 'root',
})
export class WebServiceService {

  private url = 'http://192.168.1.18:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'text/plain'
    })
  };
  public loading = false;

  constructor(
    private _http: HttpClient,
    private _configAppService: ConfigAppService
  ) {}

  getQRcode(): Observable<any> {
    const url = `${this.url}/getQRcode`;
    return this._http.get(url, this.httpOptions);
  }

  validateItemGame(id: number): Observable<any> {
    const url = `${this.url}/validateItemGame?id=${id}`;
    return this._http.get(url);
  }

  getConfigGame(): Observable<any> {
    const url = `${this.url}/getConfigGame`;
    return this._http.get(url);
  }

  login(params: { name: string; phone: string }): Observable<any> {
    const flowType = this._configAppService.flowType;
    const queryParams = this.objectToQueryParams(params);
    const url = `${this.url}/login?flowType=${flowType}&${queryParams}`;
    return this._http.get(url);
  }

  sendSMS(): Observable<any> {
    const url = `${this.url}/sendSMS`;
    return this._http.get(url);
  }

  validateCode(params: any): Observable<any> {
    const queryParams = this.objectToQueryParams(params);
    const url = `${this.url}/validateCode?${queryParams}`;
    return this._http.get(url);
  }

  getConfigApp(): Observable<any> {
    const url = `${this.url}/getConfigApp`;
    return this._http.get(url);
  }

  toggleItem(idGame: string): Observable<any> {
    const url = `${this.url}/getConfigApp`;
    return this._http.post(url, {idGame});
  }






  objectToQueryParams(obj: any) {
    const queryParams = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        queryParams.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
        );
      }
    }

    return `${queryParams.join('&')}`;
  }
}
