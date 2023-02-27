import {  HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, throwError } from 'rxjs';
import { SnackbarComponent } from './snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SharedServicesService {

  constructor(private http:HttpClient,private _snackBar: MatSnackBar) { }

  opensnacbar(message:string){
    console.log("sancbar");
    this._snackBar.openFromComponent(SnackbarComponent,{
      data:{
        message:message,
        snackBar:this._snackBar
      },
      panelClass:'panel-done',
      duration:1000,
      horizontalPosition:'right',
      verticalPosition:'top',
    })
  }

  errorMsgs:any = {
    UNKNOWN: 'PLS CHECK INTERNET',
    INVALID_EMAIL:'PLS CHECK EMAIL',
    INVALID_PASSWORD: 'INVALID PASSWORD',
  }

err_hand(err:HttpErrorResponse){
   
    return throwError(this.opensnacbar(this.errorMsgs[err.error.error.message]))

    // this.display_err = this.errors[err.error.error.message];
  }


  // fetchdata(){
  //   return this.http.get<any>('https://fire-crud-fa8f2-default-rtdb.firebaseio.com/students-list.json').pipe(
  //     map( resdata =>{
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


  fetchdata(){
    return this.http.get<any>('https://fire-crud-fa8f2-default-rtdb.firebaseio.com/students-list.json').pipe(
      map( (resdata:any) =>{
        const userArray : string[] = [];
        for(const key in resdata){
          if(resdata.hasOwnProperty(key)){
            userArray.push({userId:key,...resdata[key]})
          }
        }
        return userArray;
      })
    )
  }
  
}
