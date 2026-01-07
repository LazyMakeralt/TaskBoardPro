import { Routes } from '@angular/router';


export const routes: Routes = [
  { 
    path: 'home', 
    loadComponent: () => import('./features/home/home').then(m => m.Home) 
  },
  { 
    path: 'about', 
    loadComponent: () => import('./features/about/about').then(m => m.About) 
  },
  { 
    path: 'tasks', 
    loadComponent: () => import('./features/tasks/tasks').then(m => m.TasksComponent) 
  },
  { 
    path: '', 
    redirectTo: '/home', 
    pathMatch: 'full' 
  }
];
