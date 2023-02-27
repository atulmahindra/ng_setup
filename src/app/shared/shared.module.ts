import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { SharedServicesService } from './shared-services.service';
import { HttpClientModule } from '@angular/common/http';





@NgModule({
  declarations: [
    SnackbarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule,
    AppMaterialModule
  ],
  providers:[
    SharedServicesService,
    // httpInterceptorProviders
    // {
    //   provide:HTTP_INTERCEPTORS,
    //   useClass: AtuhInterceptor,
    //   multi:true
    // }
  ]
})
export class SharedModule { }
