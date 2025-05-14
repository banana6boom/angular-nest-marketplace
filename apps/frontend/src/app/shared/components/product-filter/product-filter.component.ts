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
  ],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFilterComponent {
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

  openedPanels: string[] = ['0'];

  onAccordionChange(nextValues: any) {
    const values = Array.isArray(nextValues) ? nextValues : [nextValues];
    if (!values.includes('0')) {
      this.openedPanels = ['0', ...values];
    } else {
      this.openedPanels = values;
    }
  }
}
