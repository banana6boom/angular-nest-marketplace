import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFilterComponent } from '../../../shared/components/product-filter/product-filter.component';

@Component({
  selector: 'app-women-product',
  imports: [CommonModule, ProductFilterComponent],
  templateUrl: './women-product.component.html',
  styleUrl: './women-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WomenProductComponent {}
