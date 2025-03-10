import { Routes } from '@angular/router';

export default [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(c => c.LoginComponent),
  },{
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then(c => c.RegisterComponent),
  },{
    path: 'reset-create',
    loadComponent: () =>
      import('./components/reset/reset.component').then(c => c.ResetComponent),
  },
] as Routes;


