import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HmProvider } from '../../providers/hm/hm';
import { ChangeusernamePage } from '../changeusername/changeusername';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { ChangeemailPage} from '../changeemail/changeemail';
import { AddotheruserPage} from '../addotheruser/addotheruser';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
 id:String;

name:String;
username:String;
email:String;
customer:Object;
accountShare:String;
shareWith:String;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private hmProvider: HmProvider ) {
  }


  changeUsername(){
    this.navCtrl.push(ChangeusernamePage)
  }
  changePassword(){
    this.navCtrl.push(ChangepasswordPage)
  }
  changeEmail(){
    this.navCtrl.push(ChangeemailPage)
  }
  shareAccount(){
    this.navCtrl.push(AddotheruserPage)
  }

  refresh(){
    this.hmProvider.MakeGetProfileRequest().subscribe(data=>{
      this.username=data.customer.username
      this.email=data.customer.email
      this.accountShare=data.customer.accountShare
      this.shareWith=data.customer.shareWith
      
    }, err=>{
      console.log(err)
    })
  }



  ionViewDidLoad() {
    this.hmProvider.MakeGetProfileRequest().subscribe(data=>{
      this.customer=data.customer
      this.name=data.customer.name
    
      this.username=data.customer.username
      this.email=data.customer.email
      this.accountShare= data.customer.accountShare
      this.shareWith=data.customer.shareWith
      console.log(JSON.stringify(data))
      },
    err=>{
      console.log(err)
    })
  }

}
