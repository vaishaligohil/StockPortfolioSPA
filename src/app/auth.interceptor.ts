import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    httpRequest = httpRequest.clone({
      setHeaders: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json'
      }
    });
    return next.handle(httpRequest);
  }
}
