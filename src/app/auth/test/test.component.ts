import { Component, OnInit } from '@angular/core';
import { SharedServicesService } from 'src/app/shared/shared-services.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  empData:any;
  constructor(private _shaeard_ser:SharedServicesService) { }

  ngOnInit(): void {
    this.view_data();
  }

  view_data(){
    this._shaeard_ser.fetchdata().subscribe((respons)=>{
      const data = JSON.stringify(respons)
      this.empData = respons;
      console.log(this.empData);
    })
  }

}
