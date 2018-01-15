import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ListPage } from '../pages/list/list';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ChangeusernamePage } from '../pages/changeusername/changeusername';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { ChangeemailPage } from '../pages/changeemail/changeemail';
import { AddotheruserPage } from '../pages/addotheruser/addotheruser';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HmProvider } from '../providers/hm/hm';
import { BgpProvider } from '../providers/bgp/bgp';
import { HttpModule} from '@angular/http';


@NgModule({
  declarations: [
    MyApp,
    ListPage ,
    ProfilePage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    ChangeusernamePage ,
    ChangepasswordPage,
    ChangeemailPage,
    AddotheruserPage 
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    ProfilePage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    ChangeusernamePage ,
    ChangepasswordPage,
    ChangeemailPage,
    AddotheruserPage  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HmProvider,
    BgpProvider
  ]
})
export class AppModule {}
