import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthorizationInterface } from '../types/authorization.interface';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { DefaultResponseInterface } from '../../../shared/types/default-response.interface';
import { environment } from '../../../../environments/environment';
import { CurrentUserInterface } from '../types/current-user.interface';
import { LoginInterface } from '../types/login.interface';
import { ProfileInterface } from '../types/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static accessTokenKey = 'accessToken';
  static refreshTokenKey = 'refreshToken';

  public isLogged$: Subject<boolean> = new Subject<boolean>();
  public isLogged = false;

  constructor(private http: HttpClient) {
    this.isLogged = !!localStorage.getItem(AuthService.accessTokenKey);
  }

  public getLoggedIn(): boolean {
    return this.isLogged;
  }

  register(
    params: AuthorizationInterface,
  ): Observable<CurrentUserInterface | DefaultResponseInterface> {
    return this.http.post<CurrentUserInterface | DefaultResponseInterface>(
      environment.api + 'auth/register',
      params,
    );
  }

  login(
    params: AuthorizationInterface,
  ): Observable<LoginInterface | DefaultResponseInterface> {
    return this.http.post<LoginInterface | DefaultResponseInterface>(
      environment.api + 'auth/login',
      params,
    );
  }

  refresh(): Observable<LoginInterface | DefaultResponseInterface> {
    const token = this.getTokens();
    if (token && token.refreshToken) {
      return this.http
        .post<LoginInterface>(`${environment.api}auth/refresh`, {
          refreshToken: token.refreshToken,
        })
        .pipe(
          catchError((error) => {
            return throwError(() => new Error(error));
          }),
        );
    }

    throw throwError(() => 'Can not use token');
  }

  setToken(accessToken: string, refreshToken: string): void {
    try {
      localStorage.setItem(AuthService.accessTokenKey, accessToken);
      localStorage.setItem(AuthService.refreshTokenKey, refreshToken);
      this.isLogged = true;
      this.isLogged$.next(true);
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  public getTokens(): {
    accessToken: string | null;
    refreshToken: string | null;
  } {
    return {
      accessToken: localStorage.getItem(AuthService.accessTokenKey),
      refreshToken: localStorage.getItem(AuthService.refreshTokenKey),
    };
  }

  removeToken(): void {
    localStorage.removeItem(AuthService.accessTokenKey);
    this.isLogged = false;
    this.isLogged$.next(false);
  }

  getUser(): Observable<ProfileInterface> {
    return this.http
      .get<ProfileInterface>(`${environment.api}auth/profile`)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error));
        }),
      );
  }
}
