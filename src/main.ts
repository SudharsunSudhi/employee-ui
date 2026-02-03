import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { EmployeesComponent } from './app/employees/employees.component';

bootstrapApplication(EmployeesComponent, {
  providers: [provideHttpClient()]
}).catch(err => console.error(err));

