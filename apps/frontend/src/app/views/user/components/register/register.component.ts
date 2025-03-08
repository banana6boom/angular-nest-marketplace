import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, NgOptimizedImage, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  isPasswordVisible: boolean = false;
  isVerification: boolean = false;
  isCheckEmail: boolean = false;
  isSingUp: boolean = true;
  public formRegister!: FormGroup;

  get email(): any {
    return this.formRegister.get('email');
  }

  get password(): any {
    return this.formRegister.get('password');
  }

  get agreePrivate(): any {
    return this.formRegister.get('agreePrivate');
  }

  get agreeSubscribe(): any {
    return this.formRegister.get('agreeSubscribe');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.formRegister = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-z0-9]{8,}$')]],
      agreePrivate: [false, [Validators.requiredTrue]],
      agreeSubscribe: [false, [Validators.requiredTrue]],
    });
  }

  onSubmit(): void {
    console.log(this.formRegister.value);
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
