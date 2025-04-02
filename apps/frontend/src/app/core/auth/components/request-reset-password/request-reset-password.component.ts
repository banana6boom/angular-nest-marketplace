import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-reset-password',
  imports: [CommonModule],
  templateUrl: './request-reset-password.component.html',
  styleUrl: './request-reset-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestResetPasswordComponent {}
