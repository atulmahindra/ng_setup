import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, catchError, map, tap } from 'rxjs';
import { SharedServicesService } from '../shared/shared-services.service';
import { User } from './app-user/user.model';
import { AuthRespons } from './auth-respons-interface/auth-respons.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenExpirationTimer:any;

 user  = new BehaviorSubject<User | unknown>(null)

  constructor(private http:HttpClient, private _shared_serviec: SharedServicesService,  private router:Router ) { 
    
  }

  SingIn(email:any,password:any){
   return this.http.post<AuthRespons>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD1NnqWxMub5KjsQqtV9LOxogWuvsw4tSY',{
    email:email,
    password:password,
    returnSecureToken:true,
    }).pipe(
      catchError(err=>{
       return this._shared_serviec.err_hand(err);
       
      }),
      tap((res:any)=>{
        this.authenticatedUser(res.email, res.localId, res.idToken, +res.expiresIn)
      })
    )
  }
  
  autosingIn(){
    const userData = JSON.parse(localStorage.getItem('loggedin user data')|| '{}') ;
    
    if(!userData){
      return;
    }
    const loggedInUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if(loggedInUser.token){
      this.user.next(loggedInUser);
      const expirationduration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime() 
      this.autoSingOUt(expirationduration)
    }
    
  }

  singOut(){
    this.user.next(null);
    this.router.navigate(['']);
    localStorage.removeItem("loggedin user data");

    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null;
  }

  autoSingOUt(expirationDuration:number){

   this.tokenExpirationTimer =  setTimeout(() => {
      this.singOut();
    }, expirationDuration);
    console.log("expdate", this.tokenExpirationTimer);
  }

  authenticatedUser(email:string, userId:string, token:string, expiresIn:any){

    const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
    const user  = new User(email,userId,token, expirationDate);
    console.log("users data",user.token)
    this.user.next(user);

    this.autoSingOUt(expiresIn*1000)
    localStorage.setItem('loggedin user data', JSON.stringify(user) )
  }

  // fetchdata(){
  //   return this.http.get<any>('https://fire-crud-fa8f2-default-rtdb.firebaseio.com/students-list.json').pipe(
  //     map( (resdata:any) =>{
  //       const userArray : string[] = [];
  //       for(const key in resdata){
  //         if(resdata.hasOwnProperty(key)){
  //           userArray.push({userId:key,...resdata[key]})
  //         }
  //       }
  //       return userArray;
  //     })
  //   )
  // }
  
}
