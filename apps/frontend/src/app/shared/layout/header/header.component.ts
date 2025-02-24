import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { FloatLabel } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';

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
export class HeaderComponent {
  isLogged: boolean = false;

  languages = [
    { label: 'English (united States)', value: 'en-US' },
    { label: 'Русский (Россия)', value: 'ru-RU' },
    { label: 'Français (France)', value: 'fr-FR' },
  ];

  selectedLanguage = 'en-US';
}
