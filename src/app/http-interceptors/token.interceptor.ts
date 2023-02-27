import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs";
import { AuthService } from "../auth/auth.service"; 

@Injectable()

export class TokenInterceptor  implements HttpInterceptor{

    constructor(public _authService: AuthService){}
    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    intercept(req:HttpRequest<any>,next:HttpHandler){

        
        return this._authService.user.pipe(
            take(1),
            exhaustMap((user: any)=>{

                if(!user){
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth',user.token)
                })
                return next.handle(modifiedReq);
            })
            )
        
    }

}