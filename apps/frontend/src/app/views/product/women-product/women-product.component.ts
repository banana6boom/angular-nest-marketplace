import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFilterComponent } from '../../../shared/components/product-filter/product-filter.component';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { ProductType } from '../../../shared/product.type';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-women-product',
  imports: [CommonModule, ProductFilterComponent, ProductCardComponent],
  templateUrl: './women-product.component.html',
  styleUrl: './women-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WomenProductComponent implements OnInit {
  productService = inject(ProductService);

  products: ProductType[] = [];

  ngOnInit() {
    this.products =
      this.productService.getProduct();
  }

}
