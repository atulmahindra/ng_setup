import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppMaterialModule } from '../app-material/app-material.module';
import { AuthService } from './auth.service';

import { TestComponent } from './test/test.component';








@NgModule({
  declarations: [
    LoginComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  providers:[
    AuthService,
    // httpInterceptorProviders
  ]
})
export class AuthModule { }
