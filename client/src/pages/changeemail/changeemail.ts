import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HmProvider } from '../../providers/hm/hm'
import{ AlertController } from 'ionic-angular';
/**
 * Generated class for the ChangeemailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changeemail',
  templateUrl: 'changeemail.html',
})
export class ChangeemailPage {
newEmail:String
  constructor(public navCtrl: NavController, public navParams: NavParams, public hmProvider: HmProvider, public alertCtrl: AlertController) {
  }

  resetEmail(){
    if(this.newEmail!=null){
    let body = { email: this.newEmail }
    this.hmProvider.Protected_post_request(body,'http://localhost:8000/userprofile/resetEmail').subscribe(data=>{
    console.log(data);
    this.navCtrl.pop();
    },(err=>{
      console.log('there is an err occured in resetEmail')
    }));
  }else
  {
    let alert= this.alertCtrl.create({
      title: 'Email cannot be empty',
      buttons:['ok']
    });
    alert.present();
  }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeemailPage');
  }

}
