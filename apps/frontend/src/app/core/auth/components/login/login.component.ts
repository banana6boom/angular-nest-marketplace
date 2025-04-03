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
import {
  catchError,
  EMPTY,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { AuthService } from '../../services/auth.service';
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
  isPasswordVisible = false;
  formLogin!: FormGroup;
  private destroy$ = new Subject<void>();

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
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please fill out the form correctly',
      });
      return;
    }

    const { email, password } = this.formLogin.value;
    const user: AuthorizationInterface = { email, password };
    this.authService
      .login(user)
      .pipe(
        switchMap((data) => {
          // Если сервер вернул ошибку
          if ('message' in data) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error!',
              detail: data.message,
            });
            return EMPTY; // Завершаем поток
          }

          const loginResponse = data as LoginInterface;
          if (!loginResponse.access_token && !loginResponse.refresh_token) {
            this.messageService.add({
              severity: 'danger',
              summary: 'Error!',
              detail: 'Ошибка при авторизации',
            });
            return [];
          }

          this.authService.setToken(
            loginResponse.access_token,
            loginResponse.refresh_token,
          );

          return this.router.navigate(['/']);
        }),
        catchError((err: HttpErrorResponse) => {
          const errorMessage = err.error?.message || 'Login error';
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: errorMessage,
          });
          return EMPTY;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
