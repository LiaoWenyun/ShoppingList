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
      console.log("get to the request")
     return this.http.post('http://localhost:8000/customers/login',body,{headers: headers }).map(res=>res.json());
    
  }


  StoreCustomerInLocal(token,customer){
    this.Token=token
    this.Customer=customer 
    localStorage.setItem('id_token',token)
    localStorage.setItem('customer',customer)
     
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
  this.Token= localStorage.getItem('id_token')
}



MakeGetProfileRequest(){
  this.GetWebTokenFromLocal()
  console.log(this.Token)
  let headers=new Headers({
    'Authorization':this.Token,
    'Content-Type': "application/json"
  })
  return this.http.get('http://localhost:8000/userprofile/showProfile',{headers: headers }).map(res=>res.json());

}


getNewUsername(newUsername){
  this.GetWebTokenFromLocal()
  let body={username: newUsername}

  let headers=new Headers({
    'Authorization':this.Token,
    'Content-Type': "application/json"
  })
  return this.http.post('http://localhost:8000/userprofile/resetUsername',body,{headers: headers}).map(res=>res.json());

  }

  getNewEmail(newEmail){
    this.GetWebTokenFromLocal()
    let body={email:newEmail}
    let headers=new Headers({
      'Authorization':this.Token,
      'Content-Type': "application/json"
    })
    return this.http.post('http://localhost:8000/userprofile/resetEmail',body,{headers: headers}).map(res=>res.json());

  }

  getNewPassword(newPassword){
    this.GetWebTokenFromLocal()
    let body={password: newPassword}
    let headers=new Headers({
      'Authorization':this.Token,
      'Content-Type': "application/json"
    })
    return this.http.post('http://localhost:8000/userprofile/resetPassword',body,{headers: headers}).map(res=>res.json());

  }


addItem(item){
  this.GetWebTokenFromLocal()
  let body={item: item}
  let headers=new Headers({
    'Authorization':this.Token,
    'Content-Type': "application/json"
  })

  return this.http.post('http://localhost:8000/shoppinglist/addItem',body,{headers: headers}).map(res=>res.json());
}

removeItem(item){

  this.GetWebTokenFromLocal()
  let body={item: item}
  let headers=new Headers({
    'Authorization':this.Token,
    'Content-Type': "application/json"
  })

  return this.http.post('http://localhost:8000/shoppinglist/removeItem',body,{headers: headers}).map(res=>res.json());
}


add_one_user(the_username){
  
  this.GetWebTokenFromLocal()
  let body={shareWith: the_username}
  let headers=new Headers({
    'Authorization':this.Token,
    'Content-Type': "application/json"
  })
  return this.http.post('http://localhost:8000/userprofile/addOtherUser',body,{headers: headers}).map(res=>res.json());

}





  
}
