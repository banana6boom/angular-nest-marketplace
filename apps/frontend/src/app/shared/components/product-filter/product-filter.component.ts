import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionPanel,
} from 'primeng/accordion';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { TieredMenu } from 'primeng/tieredmenu';
import { Badge } from 'primeng/badge';
import { MenuItem } from 'primeng/api';
import { min } from 'rxjs';
import { Slider } from 'primeng/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  imports: [
    CommonModule,
    Accordion,
    AccordionPanel,
    AccordionContent,
    AccordionHeader,
    OverlayPanelModule,
    TieredMenu,
    Slider,
    FormsModule,
  ],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFilterComponent {
  priceRange: number[] = [70, 270];
  min = 0;
  max = 400;

  sizes: string[] = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];
  selectedSizes: string[] = [];

  selectorColor: string | null = null;

  colors = [
    { name: 'Purple', value: '#8e44ad' },
    { name: 'Black', value: '#000000' },
    { name: 'Red', value: '#e74c3c' },
    { name: 'Orange', value: '#e67e22' },
    { name: 'Navy', value: '#2980b9' },
    { name: 'White', value: '#ffffff' },
    { name: 'Broom', value: '#d35400' },
    { name: 'Green', value: '#2ecc71' },
    { name: 'Yellow', value: '#f1c40f' },
    { name: 'Grey', value: '#bdc3c7' },
    { name: 'Pink', value: '#e91e63' },
    { name: 'Blue', value: '#00bcd4' },
  ];

  items: MenuItem[] = [
    {
      label: 'Tops',
      items: [{ label: 'Brand A' }, { label: 'Brand B' }, { label: 'Brand C' }],
    },
    {
      label: 'Printed T-shirts',
      items: [{ label: 'Brand A' }, { label: 'Brand B' }, { label: 'Brand C' }],
    },
    {
      label: 'Plain T-shirts',
      items: [{ label: 'Brand A' }, { label: 'Brand B' }, { label: 'Brand C' }],
    },
    {
      label: 'Kurti',
      items: [{ label: 'Brand A' }, { label: 'Brand B' }, { label: 'Brand C' }],
    },
    {
      label: 'Boxers',
      items: [{ label: 'Brand A' }, { label: 'Brand B' }, { label: 'Brand C' }],
    },
    {
      label: 'Full sleeve T-shirts',
      items: [{ label: 'Brand A' }, { label: 'Brand B' }, { label: 'Brand C' }],
    },
    {
      label: 'Joggers',
      items: [{ label: 'Brand A' }, { label: 'Brand B' }, { label: 'Brand C' }],
    },
    {
      label: 'Payjamas',
      items: [{ label: 'Brand A' }, { label: 'Brand B' }, { label: 'Brand C' }],
    },
    {
      label: 'Jeans',
      items: [{ label: 'Brand A' }, { label: 'Brand B' }, { label: 'Brand C' }],
    },
  ];

  itemsStyle: MenuItem[] = [
    {
      label: 'Classic',
      items: [{ label: 'Brand A' }, { label: 'Brand B' }, { label: 'Brand C' }],
    },
    {
      label: 'Casual',
      items: [{ label: 'Brand A' }, { label: 'Brand B' }, { label: 'Brand C' }],
    },
    {
      label: 'Business',
      items: [{ label: 'Brand A' }, { label: 'Brand B' }, { label: 'Brand C' }],
    },
    {
      label: 'Sport',
      items: [{ label: 'Brand A' }, { label: 'Brand B' }, { label: 'Brand C' }],
    },
    {
      label: 'Elegant',
      items: [{ label: 'Brand A' }, { label: 'Brand B' }, { label: 'Brand C' }],
    },
    {
      label: 'Formal (evening)',
      items: [{ label: 'Brand A' }, { label: 'Brand B' }, { label: 'Brand C' }],
    },
  ];

  openedPanels: string[] = ['0', '1', '2', '3', '4'];

  onAccordionChange(nextValues: any): void {
    const values = Array.isArray(nextValues) ? nextValues : [nextValues];
    if (!values.includes('0') || !values.includes('4')) {
      this.openedPanels = ['0', '4', ...values];
    } else {
      this.openedPanels = values;
    }
  }

  selectColor(color: string): void {
    this.selectorColor = this.selectorColor === color ? null : color;
  }

  toggleSize(size: string): void {
    const index: number = this.selectedSizes.indexOf(size);
    if (index > -1) {
      this.selectedSizes.splice(index, 1);
    } else {
      this.selectedSizes.push(size);
    }
  }
}
