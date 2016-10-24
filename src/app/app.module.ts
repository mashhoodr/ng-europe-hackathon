import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AgGridModule } from 'ag-grid-ng2/main';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageComponent } from './components/manage/manage.component';

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyB-WpylkLng-JrOXdkXQTV5cj2WPobK6kw",
  authDomain: "rastgar-app.firebaseapp.com",
  databaseURL: "https://rastgar-app.firebaseio.com",
  storageBucket: "rastgar-app.appspot.com",
  messagingSenderId: "1041297263372"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    ManageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AgGridModule.withNg2ComponentSupport(),
    RouterModule.forRoot([
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'manage',
        component: ManageComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
