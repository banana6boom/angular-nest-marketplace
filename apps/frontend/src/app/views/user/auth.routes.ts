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
  },
] as Routes;


