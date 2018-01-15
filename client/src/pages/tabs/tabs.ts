import { Component } from '@angular/core';

import { ListPage } from '../list/list';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {


  tab1Root = HomePage;
  tab2Root = ListPage;
  tab3Root = ProfilePage;

  constructor() {
    
  }
}
