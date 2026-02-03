import { Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';

export const routes: Routes = [
  {
    path: 'employees',  // URL path
    component: EmployeesComponent
  },
  {
    path: '',           // Default route
    redirectTo: 'employees',
    pathMatch: 'full'
  },
  {
    path: '**',         // Wildcard, catch-all
    redirectTo: 'employees'
  }
];
