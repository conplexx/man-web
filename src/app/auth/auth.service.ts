import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ViaCepResponse } from '../model/via-cep-response.model';
import { UserRegisterDto } from '../dtos/user-register-dto';
import { AuthResponse } from '../model/auth-reponse.model';
import { UserLoginDto } from '../dtos/user-login-dto';
import { RefreshTokenDto } from '../dtos/refresh-token-dto';
import { AccessToken } from '../model/access-token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'localhost:8080/api/auth';
  registerUrl = `${this.url}/autocadastro`;
  loginUrl = `${this.url}/login`;
  refreshTokenUrl = `${this.url}/refresh-token`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) {}

  getCepInfo(cep: string): Observable<ViaCepResponse> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get<any>(url);
  }

  register(registerDto: UserRegisterDto): Observable<any> {
    return this.http.post<any>(this.registerUrl, JSON.stringify(registerDto), this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  login(loginDto: UserLoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.loginUrl, JSON.stringify(loginDto), this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  refreshToken(refreshDto: RefreshTokenDto): Observable<AccessToken> {
    return this.http.post<AccessToken>(this.refreshTokenUrl, JSON.stringify(refreshDto), this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
