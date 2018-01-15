import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HmProvider } from '../../providers/hm/hm';
import { LoginPage } from '../login/login';
import { leave } from '@angular/core/src/profile/wtf_impl';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public Hmprovider: HmProvider) {
  }




}
