// auth.guard.ts
import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { catchError, map, Observable, of } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AccessToken } from "../model/data/access-token.model";

export const authGuard: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const authService = inject(AuthService);
    const jwtHelper = new JwtHelperService();
    const router = inject(Router);
    const authToken = authService.getAuthToken();

    if(!authToken){
        authService.logout();
        return router.createUrlTree(['/auth/login']);
    }

    if (jwtHelper.isTokenExpired(authToken)) {
        const refreshToken = authService.getRefreshToken();
        if(refreshToken && !jwtHelper.isTokenExpired(refreshToken)) {
            const accessToken = { authToken, refreshToken } as AccessToken;
            return authService.postRefreshToken(accessToken).pipe(
                map((newToken) => {
                    authService.saveAccessToken(newToken);
                    return true;
                }),
                catchError(() => {
                    authService.logout();
                    return of(router.createUrlTree(['/auth/login']));
                })
            );
        }
    }
    return true;
};