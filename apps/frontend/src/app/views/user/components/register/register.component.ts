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
import { SignupInterface } from '../../../../core/auth/types/signup.interface';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../core/auth/auth.service';
import { DefaultResponseInterface } from '../../../../shared/types/default-response.interface';
import { CurrentUserInterface } from '../../../../core/auth/types/current-user.interface';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse } from '@angular/common/http';

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
  public isPasswordVisible: boolean = false;
  public formRegister!: FormGroup;
  private subscription: Subscription | null = null;

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
    if (!this.formRegister.valid) {
      return;
    }

    const { email, password, agreePrivate } = this.formRegister.value;

    if (!agreePrivate) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'You must accept the privacy policy',
      });
      return;
    }

    const newUser: SignupInterface = { email, password };

    this.subscription = this.authService.register(newUser).subscribe({
      next: (data: CurrentUserInterface | DefaultResponseInterface): void => {
        if ((data as DefaultResponseInterface).message !== undefined) {
          this.messageService.add({
            severity: 'danger',
            summary: 'Error!',
            detail: (data as DefaultResponseInterface).message,
          });
          return;
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'You have successfully registered',
        });

        setTimeout(() => {
          this.router.navigate(['/verification']);
        }, 3000);
      },
      error: (errorResponse: HttpErrorResponse) => {
        const error: string =
          errorResponse.error?.message || 'Registration error';
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: error,
        });
      },
    });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
