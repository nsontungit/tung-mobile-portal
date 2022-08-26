import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavbarComponent } from './modules/main-navbar/main-navbar.component';
import { LaptopManagementOverviewComponent } from './modules/laptop-management-overview/laptop-management-overview.component';
import { MobileManagementOverviewComponent } from './modules/mobile-management-overview/mobile-management-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavbarComponent,
    LaptopManagementOverviewComponent,
    MobileManagementOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
