import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Categories } from '../../types/categories';

@Component({
  selector: 'app-categories-card',
  imports: [CommonModule],
  templateUrl: './categories-card.component.html',
  styleUrl: './categories-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesCardComponent {
  @Input() category!: Categories;


}
