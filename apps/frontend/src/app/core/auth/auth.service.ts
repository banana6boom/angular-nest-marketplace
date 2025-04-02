import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthorizationInterface } from './types/authorization.interface';
import { Observable, Subject } from 'rxjs';
import { DefaultResponseInterface } from '../../shared/types/default-response.interface';
import { environment } from '../../../environments/environment';
import { CurrentUserInterface } from './types/current-user.interface';
import { LoginInterface } from './types/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static accessTokenKey: string = 'accessToken';
  public refreshTokenKey: string = 'refreshToken';
  public userIdKey: string = 'userId';

  public isLogged$: Subject<boolean> = new Subject<boolean>();
  public isLogged: boolean = false;

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

  setToken(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      this.isLogged = true;
      this.isLogged$.next(true);
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  getToken(key: string): string | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return null;
      }
      return JSON.parse(item);
    } catch (e) {
      console.error('Error getting item from localStorage', e);
      return null;
    }
  }

  removeToken(): void {
    localStorage.removeItem(AuthService.accessTokenKey);
    this.isLogged = false;
    this.isLogged$.next(false);
  }
}
