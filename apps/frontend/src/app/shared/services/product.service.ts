import { Injectable } from '@angular/core';
import { ProductType } from '../product.type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() {}

  productInTheLimelight: ProductType[] = [
    {
      title: 'Black Sweatshirt',
      brand: 'Jhanvi’s  Brand',
      image: '/assets/images/product/item-1.png',
      price: 34,
    },
    {
      title: 'line Pattern',
      brand: 'AS’s  Brand',
      image: '/assets/images/product/item-2.png',
      price: 49,
    },
    {
      title: 'Black Shorts',
      brand: 'MM’s  Brand',
      image: '/assets/images/product/item-3.png',
      price: 37,
    },
    {
      title: 'Levender Hoodie',
      brand: 'Nike’s  Brand',
      image: '/assets/images/product/item-4.png',
      price: 67,
    },
  ]

  getProductInTheLimelight(): ProductType[] {
    return this.productInTheLimelight;
  }
}
