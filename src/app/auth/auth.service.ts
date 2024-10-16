import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { UserLoginDto } from '../model/dtos/user-login-dto';
import { UserRegisterDto } from '../model/dtos/user-register-dto';
import { AccessToken } from '../model/data/access-token.model';
import { Auth } from '../model/data/auth.model';
import { ViaCepResponse } from '../model/response/via-cep-response';
import { Client } from '../model/data/client.model';
import { BaseResponse, EmptyResponse } from '../model/response/base-response';
import { UserRole } from '../model/enum/user-role';
import { Employee } from '../model/data/employee.model';
import { authTokenKey, refreshTokenKey, userKey, userRoleKey } from '../model/data/local-storage-keys';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:8080/api/auth';
  registerUrl = `${this.url}/client-register`;
  loginUrl = `${this.url}/login`;
  logoutUrl = `${this.url}/logout`;
  refreshTokenUrl = `${this.url}/refresh-token`;

  private jwtHelper = new JwtHelperService();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }

  constructor(private http: HttpClient) {}

  registerClient(registerDto: UserRegisterDto): Observable<BaseResponse<Client>> {
    return this.http.post<BaseResponse<Client>>(this.registerUrl, JSON.stringify(registerDto), this.httpOptions).pipe(catchError(this.handleError));
  }

  login(loginDto: UserLoginDto): Observable<BaseResponse<Auth>> {
    return this.http.post<BaseResponse<Auth>>(this.loginUrl, JSON.stringify(loginDto), this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  getCepInfo(cep: string): Observable<ViaCepResponse> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get<ViaCepResponse>(url);
  }

  postRefreshToken(accessToken: AccessToken): Observable<AccessToken> {
    return this.http.post<AccessToken>(this.refreshTokenUrl, JSON.stringify(accessToken), this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  saveAccessToken(token: AccessToken): void {
    localStorage.setItem(authTokenKey, token.authToken);
    localStorage.setItem(refreshTokenKey, token.refreshToken);
  }

  logout(): Observable<EmptyResponse> {
    this.removeAccessToken();
    localStorage.removeItem(userKey);
    localStorage.removeItem(userRoleKey);
    return this.http.post<EmptyResponse>(this.logoutUrl, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  getAuthToken(): string | null {
    return localStorage.getItem(authTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(refreshTokenKey);
  }

  getUserRole(): UserRole | null {
    return localStorage.getItem(userRoleKey) as UserRole;
  }

  getUser(): Client | Employee | null {
    const user = localStorage.getItem(userKey);
    if(user){
        if(this.getUserRole() === UserRole.CLIENT){
            return JSON.parse(user) as Client;
        }
        if(this.getUserRole() === UserRole.EMPLOYEE){
            return JSON.parse(user) as Employee;
        }
    }
    return null;
  }

  removeAccessToken(): void {
    localStorage.removeItem(authTokenKey);
    localStorage.removeItem(refreshTokenKey);
  }

  isAuthTokenExpired(): boolean {
    const authToken = this.getAuthToken();
    return authToken ? this.jwtHelper.isTokenExpired(authToken) : true;
  }

  isRefreshTokenExpired(): boolean {
    const refreshToken = this.getRefreshToken();
    return refreshToken ? this.jwtHelper.isTokenExpired(refreshToken) : true;
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message; //cliente
    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`; //servidor
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
