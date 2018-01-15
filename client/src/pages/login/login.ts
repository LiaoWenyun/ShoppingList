import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { HmProvider } from '../../providers/hm/hm';
import{ AlertController } from 'ionic-angular';
//import { flashMessage } from ''
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: any;
  password: any;

  type = 'password';
  showPass = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,private hmProvider: HmProvider , public alertCtrl:AlertController) {
    
  }

  showPassword() {
    this.showPass = !this.showPass;
 
    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  logIn(){
    let customer={
      username:this.username,
      password: this.password
    }
    
    this.hmProvider.MakeLoginReq(customer).subscribe(data=>{
      if(data.success){
        
        this.hmProvider. StoreCustomerInLocal(data.token,data.customer)
        this.navCtrl.push(TabsPage);  
      }else{
        console.log(data.msg)
        let alert= this.alertCtrl.create({
          title: data.msg,
          buttons:['ok']
        })
        alert.present()
        this.navCtrl.push(LoginPage); 
      }
    })
    

      
  }
  signUpPage(){
    this.navCtrl.push(SignupPage);
  }

  


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
