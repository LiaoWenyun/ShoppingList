import { HttpModule, Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the HmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HmProvider {
  Token: any;
  Customer: any;

  constructor(public http: Http) {
    console.log('Hello HmProvider Provider');
  }

  MakeLoginReq(customer){
    
      let body=customer;
      let headers = new Headers({
        'Content-Type': "application/json"
      });
      console.log("get to the request");
     return this.http.post('http://localhost:8000/customers/login',body,{headers: headers }).map(res=>res.json());
    
  }


  StoreCustomerInLocal(token,customer){
    this.Token=token;
    this.Customer=customer; 
    localStorage.setItem('id_token',token);
    localStorage.setItem('customer',customer);
     
  }



  MakeSignUpRequest(customer){
    let body=customer 
    let headers=new Headers({
      'Content-Type': "application/json"
    });
    return this.http.post('http://localhost:8000/customers/signup',body,{headers: headers }).map(res=>res.json());
  }

//for home/profile/list page 
GetWebTokenFromLocal(){
  this.Token= localStorage.getItem('id_token');
}



MakeGetProfileRequest(){
  this.GetWebTokenFromLocal();
  console.log(this.Token);
  let headers=new Headers({
    'Authorization':this.Token,
    'Content-Type': "application/json"
  });
  return this.http.get('http://localhost:8000/userprofile/showProfile',{headers: headers }).map(res=>res.json());

}


Protected_post_request(body, path: string){
  this.GetWebTokenFromLocal();
  let headers =new Headers({
    'Authorization':this .Token,
    'Content-Type':"application/json"
  });
  //console.log(this.BASE_URL+endpoint);
  return this.http.post(path,body,{headers: headers}).map(res=>res.json());
  }
}
