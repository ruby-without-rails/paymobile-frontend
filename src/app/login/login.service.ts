import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpUtilsService } from './../shared/http-utils.service';

declare let CryptoJS: any;

@Injectable()
export class LoginService extends HttpUtilsService {
  constructor(protected http: Http) {
    super();
  }

  authentication(payload: any): Observable<any> {
    return this.http.post(this.api('/auth/login'), payload, this.headers())
      .map((data: any) => this.extractData(data))
      .catch((err: any) => this.handleError(err));
  }

  logout(): Observable<any> {
    return this.http.get(this.api('/auth/logout'), this.headers())
      .map((data: any) => this.extractData(data))
      .catch((err: any) => this.handleError(err));
  }

  isAuthenticated(): any {
    if (localStorage.getItem('token')) {
      let token = CryptoJS.AES.decrypt(localStorage.getItem('token').toString(), this.getEnv().cryptKey);
      if (token.toString(CryptoJS.enc.Utf8).length === 255) {
        return true;
      }

      localStorage.removeItem('token');
    }

    return false;
  }

}
