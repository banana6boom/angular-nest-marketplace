import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription, switchMap, tap } from 'rxjs';
import { AuthService } from '../../auth.service';
import { AuthorizationInterface } from '../../types/authorization.interface';
import { DefaultResponseInterface } from '../../../../shared/types/default-response.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginInterface } from '../../types/login.interface';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLink,
    Toast,
    ReactiveFormsModule,
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  isPasswordVisible: boolean = false;
  formLogin!: FormGroup;
  private subscription: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
  ) {}

  get controls(): any {
    return this.formLogin.controls;
  }

  ngOnInit() {
    this.initializeForm();
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  initializeForm(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSingIn(): void {
    if (!this.formLogin.valid) {
      return;
    }

    const { email, password } = this.formLogin.value;
    const user: AuthorizationInterface = { email, password };
    this.subscription = this.authService
      .login(user)
      .pipe(
        tap((data: LoginInterface | DefaultResponseInterface) => {
          if ('message' in data) {
            this.messageService.add({
              severity: 'danger',
              summary: 'Error!',
              detail: data.message,
            });
            throw new Error('Login failed');
          }
        }),
        switchMap((data) => {
          const loginResponse = data as LoginInterface;
          if (!loginResponse.access_token) {
            this.messageService.add({
              severity: 'danger',
              summary: 'Error!',
              detail: 'Ошибка при авторизации',
            });
            return [];
          }

          this.authService.setToken(
            AuthService.accessTokenKey,
            loginResponse.access_token,
          );

          return this.router.navigate(['/']);
        }),
      )
      .subscribe({
        error: (err: HttpErrorResponse) => {
          const error: string = err.error?.message || 'Login error';
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: error,
          });
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
