import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { FloatLabel } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { AuthService } from '../../../core/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterLink,
    IconField,
    InputIcon,
    FloatLabel,
    DropdownModule,
    FormsModule,
    InputText,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authService: AuthService = inject(AuthService);
  private subscription: Subscription | null = null;

  isLogged: boolean = this.authService.getLoggedIn();

  languages = [
    { label: 'English (United States)', value: 'en-US' },
    { label: 'Russian (Russia)', value: 'ru-RU' },
  ];

  ngOnInit(): void {
    this.subscription = this.authService.isLogged$.subscribe(
      (isLogged: boolean): void => {
        this.isLogged = isLogged;
      },
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  selectedLanguage: string = 'en-US';
}
