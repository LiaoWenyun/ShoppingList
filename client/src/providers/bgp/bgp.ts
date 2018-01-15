import { HttpModule, Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the BgpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BgpProvider {

  constructor(public http: Http) {
    console.log('Hello BgpProvider Provider');
  }

}
