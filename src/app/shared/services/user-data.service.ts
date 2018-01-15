import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpUtilsService } from './../http-utils.service';

@Injectable()
export class UserDataService extends HttpUtilsService {
  constructor(protected http: Http) {
    super();
  }

  get(): Observable<any> {
    return this.http.get(this.api('/auth/user_data'), this.headers())
      .map((data: any) => this.extractData(data))
      .catch((err: any) => this.handleError(err));
  }

}
