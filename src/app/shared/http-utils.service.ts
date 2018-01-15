import { Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { environment } from '../../environments/environment';

export class HttpUtilsService {
  protected apiUrl: string;

  constructor() {
    this.apiUrl = environment.apiUrl;
  }

  api(resource: string): string {
    return this.apiUrl + resource;
  }

  getBaseUrl(): string {
    return this.apiUrl;
  }

  headers(): any {
    let headersParams = {'Content-Type': 'application/json'};
    if (localStorage['token']) {
      headersParams['PayWithRuby-Auth-Token'] = localStorage['token'];
    }

    let headers = new Headers(headersParams);
    let options = new RequestOptions({headers: headers});

    return options;
  }

  extractData(response: Response): any {
    return response.json() || {};
  }

  handleError(error: Response | any): any {
    return Observable.throw(JSON.parse(error._body));
  }

  getEnv(): any {
    return environment;
  }

}
