import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primeng/accordion';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { TieredMenu } from 'primeng/tieredmenu';

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
  @ViewChild('op') overlay!: OverlayPanel;

  // В вашем компоненте
  items = [
    {
      label: 'Tops',
      items: [
        {label: 'Basic Tops'},
        {label: 'Designer Tops'},
        {
          label: 'Sports',
          items: [
            {label: 'Tank Tops'},
            {label: 'Training Tops'}
          ]
        }
      ]
    }
  ];

  timeout: any;

  showOverlay(event: MouseEvent) {
    clearTimeout(this.timeout);
    this.overlay.show(event);
  }

  hideOverlay() {
    this.timeout = setTimeout(() => this.overlay.hide(), 11200);
  }
}
