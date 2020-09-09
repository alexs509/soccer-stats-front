import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './app/components/user/login/login.component';
import { RegisterComponent } from './app/components/user/register/register.component';
import { NavbarComponent } from './app/components/common/navbar/navbar.component';
import { FooterComponent } from './app/components/common/footer/footer.component';
import { HomeComponent } from './app/components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
