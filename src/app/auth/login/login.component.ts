import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormControl,  FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { SharedServicesService } from 'src/app/shared/shared-services.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  empData:any;
  hide: any;
  loginForm: FormGroup | any;
  display_err:any;
  errors = this._shared_serviec.errorMsgs
 


  constructor(private formBuilder: FormBuilder,private _authService: AuthService, private _shared_serviec: SharedServicesService, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ])
    });
    
  }

  //method for error in login
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  public submitLoginForm = () => {
    if (this.loginForm.valid) {
     
    }
    console.log(this.loginForm.value);

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this._authService.SingIn(email, password).subscribe(res =>{
      console.log(res);
      // this.view_data();
      this.router.navigate(['backend']);
      this.opensnacbar('login success');
      
    }),
    (err:any)=>{
      
      this.display_err = err;
      
    // this.display_err = this.errors[err.error.error.message];
    // if(!err.error || !err.error.error){
    //   this.display_err = this.errors[]
    // }
    }
  }

  opensnacbar(message:string){
    console.log("sancbar");
    // this._snackBar.openFromComponent(SnackbarComponent,{
    //   data:{
    //     message:message,
    //     snackBar:this._snackBar
    //   }
    // })
    this._shared_serviec.opensnacbar(message);
  }

  // view_data(){
  //   this._authService.fetchdata().subscribe((respons)=>{
  //     const data = JSON.stringify(respons)
  //     this.empData = respons;
  //     console.log(this.empData);
  //   })
  // }
}

