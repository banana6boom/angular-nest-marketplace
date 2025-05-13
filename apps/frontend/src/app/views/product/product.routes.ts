import { Routes } from '@angular/router';

export default [
  {
    path: 'women',
    loadComponent: () =>
      import('./women-product/women-product.component').then(c => c.WomenProductComponent),
  }
] as Routes;


