import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HmProvider } from '../../providers/hm/hm';
import{ AlertController } from 'ionic-angular';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  name ='';
  username='';
  password='';
  email='';

  type = 'password';
  showPass = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private hmProvider:HmProvider, public alertCtrl:AlertController) {
    //this.navCtrl.setRoot(SignupPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  showPassword() {
    this.showPass = !this.showPass;
 
    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }


  backToLogIn(){
    this.navCtrl.pop();
  }


  signUp(){
    if(this.name==null ||this.username==null|| this.password==null ||this.email==null){
      let alert= this.alertCtrl.create({
        title: 'please fill up all fields',
        buttons:['ok']
      })
      alert.present()
    }else{
    let customer ={
      name: this.name,
      username:this.username,
      password:this.password,
      email:this.email
    }
    this.hmProvider.MakeSignUpRequest(customer).subscribe(data=>{
      if(data.success){
        let alert= this.alertCtrl.create({
          title: data.msg,
          subTitle: 'please log in',
          buttons:['ok']
        })
        alert.present()
        this.navCtrl.pop();
        console.log(JSON.stringify(data))
      }else{
        let alert= this.alertCtrl.create({
          title: data.msg,
          subTitle: 'please choose a new username',
          buttons:['ok']
        })
        alert.present()
      }
    })
      
  }
}

}
