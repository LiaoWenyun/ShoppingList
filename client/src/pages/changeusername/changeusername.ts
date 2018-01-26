import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{ AlertController } from 'ionic-angular';
import { HmProvider } from '../../providers/hm/hm';

/**
 * Generated class for the ChangeusernamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changeusername',
  templateUrl: 'changeusername.html',
})
export class ChangeusernamePage {
 newUsername:String;
 customer:Object;

  constructor(public navCtrl: NavController, public navParams: NavParams,private hmProvider: HmProvider,public alertCtrl: AlertController) {
  }
c
  getNewUsername(){
    if(this.newUsername==null){
      let alert= this.alertCtrl.create({
        title: 'username cannot be empty',
        buttons:['ok']
      })
      alert.present()
    }else{
    let body ={ username: this.newUsername}
    this.hmProvider.Protected_post_request(body,'http://localhost:8000/userprofile/resetUsername').subscribe(data=>{
    console.log(data)
    this.navCtrl.pop()
    })
  }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeusernamePage');
  }
}
