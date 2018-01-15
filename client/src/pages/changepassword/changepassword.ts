import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{ AlertController } from 'ionic-angular';
import { HmProvider } from '../../providers/hm/hm';
/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
newPassword :String;
type = 'password';
showPass = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private hmProvider:HmProvider, public alertCtrl:AlertController) {
  }
  showPassword() {
    this.showPass = !this.showPass;
 
    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  getNewPassword(){
    if(this.newPassword==null){
      let alert= this.alertCtrl.create({
        title: 'password can not be empty',
        buttons:['ok']
      })
      alert.present()
    }else{
    let newPassword= this.newPassword 
    this.hmProvider.getNewPassword(newPassword).subscribe(data=>{
    console.log(data)
    this.navCtrl.pop()
    })
  }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

}
