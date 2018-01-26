import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HmProvider } from '../../providers/hm/hm';
import{ AlertController } from 'ionic-angular';

/**
 * Generated class for the AddotheruserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addotheruser',
  templateUrl: 'addotheruser.html',
})
export class AddotheruserPage {

other_username: String
  constructor(public navCtrl: NavController, public navParams: NavParams, public hmProvider:HmProvider,public alertCtrl: AlertController) {
  }

shareAccount(){
  let body={shareWith: this.other_username}
  this.hmProvider.Protected_post_request(body,'http://localhost:8000/userprofile/addOtherUser').subscribe(data=>{
    if(data.add){
      let alert= this.alertCtrl.create({
        title: data.share,
        buttons:['ok']
      })
      alert.present();  

    }else{
      let alert= this.alertCtrl.create({
        title: data.msg,
        buttons:['ok']
      });
      alert.present();

    }
          this.other_username = null ;
  },err=>{
    console.log('err: the user is not in accountShare');
  });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddotheruserPage');
  }

}
