import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  isPasswordVisibility: boolean = false;
  ngOnInit(): void {
    console.log(1);
  }

  togglePasswordVisibility() {
    this.isPasswordVisibility = !this.isPasswordVisibility
  }
}
