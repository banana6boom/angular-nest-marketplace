import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthorizationInterface } from '../../types/authorization.interface';
import {
  catchError,
  EMPTY,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { DefaultResponseInterface } from '../../../../shared/types/default-response.interface';
import { CurrentUserInterface } from '../../../../core/auth/types/current-user.interface';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginInterface } from '../../types/login.interface';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLink,
    ReactiveFormsModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit, OnDestroy {
  public isPasswordVisible = false;
  public formRegister!: FormGroup;
  private destroy$ = new Subject<void>();

  get controls(): any {
    return this.formRegister.controls;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.formRegister = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^[a-z0-9]{8,}$'),
        ],
      ],
      agreePrivate: [false, [Validators.requiredTrue]],
      agreeSubscribe: [false],
    });
  }

  onSubmit(): void {
    if (!this.formRegister.valid || !this.formRegister.value.agreePrivate) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail:
          'You must accept the privacy policy and fill out the form correctly',
      });
      return;
    }

    const { email, password } = this.formRegister.value;
    const newUser: AuthorizationInterface = { email, password };

    this.authService
      .register(newUser)
      .pipe(
        switchMap((data: CurrentUserInterface | DefaultResponseInterface) => {
          if ('message' in data) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error!',
              detail: data.message,
            });
            return EMPTY;
          }

          const registerResponse = data as CurrentUserInterface;
          if (!registerResponse._id) {
            this.messageService.add({
              severity: 'danger',
              summary: 'Error!',
              detail: 'Ошибка при регистрации',
            });
            return EMPTY;
          }

          this.messageService.add({
            severity: 'success',
            summary: 'Success!',
            detail: 'You have successfully registered',
          });
          return this.router.navigate(['/verification']);
        }),
        catchError((err: HttpErrorResponse) => {
          const errorMessage = err.error?.message || 'Register error';
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

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
