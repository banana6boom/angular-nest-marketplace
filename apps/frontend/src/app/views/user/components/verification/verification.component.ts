import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-verification',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerificationComponent {}
