import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupInterface } from './types/signup.interface';
import { Observable } from 'rxjs';
import { DefaultResponseInterface } from '../../shared/types/default-response.interface';
import { environment } from '../../../environments/environment';
import { CurrentUserInterface } from './types/current-user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public accessTokenKey: string = 'accessToken'
  public refreshTokenKey: string = 'refreshToken'
  public userIdKey: string = 'userId'

  constructor(private http: HttpClient) {}

  register(params: SignupInterface): Observable<CurrentUserInterface | DefaultResponseInterface> {
    return this.http.post<CurrentUserInterface | DefaultResponseInterface>(environment.api + 'auth/register', params);
  }

  setItem(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    }catch (e) {
      console.error('Error saving to localStorage', e)
    }
  }

  getItem(key: string): string | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return null; // Если ключ не найден
      }
      return JSON.parse(item); // Возвращаем распарсенные данные
    } catch (e) {
      console.error('Error getting item from localStorage', e);
      return null; // В случае ошибки парсинга возвращаем null
    }
  }

}
