import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { LoginInterface } from '../types/login.interface';
import { Router } from '@angular/router';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getTokens();

  if (token && token.accessToken) {
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    });

    return next(modifiedReq).pipe(
      catchError((error) => {
        if (
          error.status === 401 &&
          !modifiedReq.url.includes('/login') &&
          !modifiedReq.url.includes('/refresh')
        ) {
          return authService.refresh().pipe(
            switchMap((result) => {
              const resultResponse = result as LoginInterface;
              authService.setToken(resultResponse.access_token, resultResponse.refresh_token);
              const refreshReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${resultResponse.access_token}`,
                },
              });
              return next(refreshReq);
            }),
            catchError((err) => {
              authService.removeToken();
              router.navigate(['/']);
              return throwError(() => err);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
  return next(req);
};