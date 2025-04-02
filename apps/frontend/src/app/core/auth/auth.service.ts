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



}
