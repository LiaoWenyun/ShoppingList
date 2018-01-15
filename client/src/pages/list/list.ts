import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HmProvider } from '../../providers/hm/hm';
/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
customer:Object 
items:String 
Item :String 


  constructor(public navCtrl: NavController, public navParams: NavParams,private hmProvider:HmProvider) {
  }

  refresh(){
    this.hmProvider.MakeGetProfileRequest().subscribe(data=>{
      this.items=data.customer.item
    }, err=>{
      console.log(err)
    })
  }

addItems(){
  if(this.Item==null){
    console.log('can not have null as item')
  }
  else{
  this.hmProvider.addItem(this.Item).subscribe(data=>{
          this.items=data.item
          this.Item=null

    },err=>{
    console.log("err occurs when making request")
    })
  }
}
removeItems(){
  this.hmProvider.removeItem(this.Item).subscribe(data=>{
    this.items=data.item
    this.Item=null
  },
  err=>{
    console.log("err occurs when making request")
  })
}


  ionViewDidLoad() {
    this.hmProvider.MakeGetProfileRequest().subscribe(data=>{
      this.customer=data.customer
      this.items=data.customer.item
      
      console.log(JSON.stringify(data))
      },
    err=>{
      console.log(err)
   
  })
}
}


