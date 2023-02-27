import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';
import { SharedServicesService } from 'src/app/shared/shared-services.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
empData:any
  constructor(private _shaeard_ser:SharedServicesService, private _authService: AuthService) { }

  ngOnInit(): void {
    this.view_data()
  }

  view_data(){
    this._shaeard_ser.fetchdata().subscribe((respons:any)=>{
      const data = JSON.stringify(respons)
      this.empData = respons;
      console.log(this.empData);
    })
  }

  singout(){
    this._authService.singOut();
    
  }
}
