import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AUTH} from "../constants";
import {UserService} from "../services/user.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('avvio intercettore');
    const authToken = this.userService.getToken();
    console.log(request.url + ' ' + request.params + ' ' + authToken);
    if (authToken !== null && authToken !== undefined && authToken !== '') {
      console.log('adding token into header');
      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      const authReq = request.clone({
        headers: request.headers.set(AUTH, `Bearer ${authToken}`)
      });
      return next.handle(authReq);
    } else {
      return next.handle(request);
    }
  }
}
