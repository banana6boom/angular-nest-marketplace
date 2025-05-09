import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Carousel } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { Button } from 'primeng/button';
import { of } from 'rxjs';
import { CategoriesCardComponent } from '../../shared/components/categories-card/categories-card.component';
import { CategoriesService } from '../../shared/services/categories.service';
import { Categories } from '../../shared/types/categories';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductService } from '../../shared/services/product.service';
import { ProductType } from '../../shared/product.type';
import { RatingComponent } from '../../shared/components/rating/rating.component';

@Component({
  selector: 'app-main',
  imports: [
    CommonModule,
    Carousel,
    GalleriaModule,
    Button,
    CategoriesCardComponent,
    ProductCardComponent,
    RatingComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  categoryService: CategoriesService = inject(CategoriesService);
  productService: ProductService = inject(ProductService);
  categoriesMen: Categories[] = [];
  categoriesWoman: Categories[] = [];
  productsInTheLimelight: ProductType[] = [];
  // В компоненте
  slides = [
    {
      image: 'assets/images/shop-slide-1.png',
      category: 'T-Shirt / Tops',
      title: 'Summer Value Pack',
      description: 'cool / colorful / comfy',
    },
    {
      image: 'assets/images/shop-slide-2.webp',
      category: 'Jackets / Coats',
      title: 'Winter Collection',
      description: 'warm / stylish / trendy',
    },
  ];

  discounts = [
    {
      image: 'assets/images/discounts-main-one.png',
      category: 'Low Price',
      title: 'High Coziness',
      description: 'UPTO 50% OFF',
    },
    {
      image: 'assets/images/discounts-main-two.png',
      category: 'Beyoung Presents',
      title: 'Breezy Summer Style',
      description: 'UPTO 50% OFF',
    },
  ];

  feedback = [
    {
      image: 'assets/images/feedback/feedback-person-1.png',
      rating: 5,
      name: 'Name',
      description: 'Feedback',
    },
    {
      image: 'assets/images/feedback/feedback-person-1.png',
      rating: 5,
      name: 'Name',
      description: 'Feedback',
    },
    {
      image: 'assets/images/feedback/feedback-person-1.png',
      rating: 5,
      name: 'Name',
      description: 'Feedback',
    },
    {
      image: 'assets/images/feedback/feedback-person-1.png',
      rating: 5,
      name: 'Name',
      description: 'Feedback',
    }
  ];

  newArrival = [
    {
      image: 'assets/images/arrival/item-1.png',
      title: 'Knitted Joggers',
    },
    {
      image: 'assets/images/arrival/item-2.png',
      title: 'Full Sleeve',
    },
    {
      image: 'assets/images/arrival/item-3.png',
      title: 'Active T-Shirts',
    },
    {
      image: 'assets/images/arrival/item-4.png',
      title: 'Urban Shirts',
    },
    {
      image: 'assets/images/arrival/item-5.png',
      title: 'Plain T-Shirt',
    },
  ];

  constructor() {}

  ngOnInit() {
    this.categoriesMen = this.categoryService.getCategoriesMen();
    this.categoriesWoman = this.categoryService.getCategoriesWoman();
    this.productsInTheLimelight =
      this.productService.getProductInTheLimelight();
  }
}
