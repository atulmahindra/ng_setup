import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

  constructor(private _authService: AuthService) { 
    
  }

  ngOnInit(): void {
    console.log("default load")
    this._authService.autosingIn()
    
  }

}
