import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Carousel } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-main',
  imports: [CommonModule, Carousel, GalleriaModule, Button],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
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

  constructor() {}

  ngOnInit() {}
}
