import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headers = req.headers.set('Content-Type', 'application/json')
                            .set('Access-Control-Allow-Origin', '*')
                            .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
                            .set('Access-Control-Allow-Headers', 'Content-Type')
                            .set('Access-Control-Allow-Credentials', "true");
    const authToken = this.authService.getAuthToken();
    if (authToken) {
        headers = headers.set('Authorization', `Bearer ${authToken}`);
    }
    const cloned = req.clone({ headers });
    return next.handle(cloned);
  }
}