import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { UserLoginDto } from '../dtos/user-login-dto';
import { UserRegisterDto } from '../dtos/user-register-dto';
import { AccessToken } from '../model/access-token.model';
import { AuthResponse } from '../model/auth-reponse.model';
import { ViaCepResponse } from '../model/via-cep-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'localhost:8080/api/auth';
  registerUrl = `${this.url}/autocadastro`;
  loginUrl = `${this.url}/login`;
  refreshTokenUrl = `${this.url}/refresh-token`;

  private jwtHelper = new JwtHelperService();
  private authTokenKey = 'auth-token';
  private refreshTokenKey = 'refresh-token';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }

  constructor(private http: HttpClient) {}

  register(registerDto: UserRegisterDto): Observable<any> {
    return this.http.post<any>(this.registerUrl, JSON.stringify(registerDto), this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  login(loginDto: UserLoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.loginUrl, JSON.stringify(loginDto), this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  getCepInfo(cep: string): Observable<ViaCepResponse> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get<any>(url);
  }

  postRefreshToken(accessToken: AccessToken): Observable<AccessToken> {
    return this.http.post<AccessToken>(this.refreshTokenUrl, JSON.stringify(accessToken), this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  saveAccessToken(token: AccessToken): void {
    localStorage.setItem(this.authTokenKey, token.authToken);
    localStorage.setItem(this.refreshTokenKey, token.refreshToken);
  }

  logout(): void {
    this.removeAccessToken();
    //TODO rota de logout na api
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  removeAccessToken(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
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
