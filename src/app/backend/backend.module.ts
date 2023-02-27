import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackendRoutingModule } from './backend-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BackendService } from './backend.service';




@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    BackendRoutingModule
  ],
  providers:[
    BackendService,
    // httpInterceptorProviders
    // {
    //   provide:HTTP_INTERCEPTORS,
    //   useClass: AtuhInterceptor,
    //   multi:true
    // }
  ]
})
export class BackendModule { }
