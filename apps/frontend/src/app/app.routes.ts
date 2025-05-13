import { Route } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { MainComponent } from './views/main/main.component';
import { authForwardGuard } from './core/auth/guard/auth-forward.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: MainComponent },
      {
        path: '',
        loadChildren: () => import('./core/auth/auth.routes'),
        canActivate: [authForwardGuard],
        data: { hideFooter: true },
      },
      {
        path: '',
        loadChildren: () => import('./views/product/product.routes'),
      },
    ],
  },
];
