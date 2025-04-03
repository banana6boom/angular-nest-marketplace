import {
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  isFooterVisible: boolean = true;
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$), // Отписка при уничтожении компонента
      )
      .subscribe(() => {
        const currentRoute = this.route.firstChild?.snapshot;
        this.isFooterVisible = !currentRoute?.data?.['hideFooter']; // Используем данные маршрута для скрытия футера
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
