import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';


@Injectable({ providedIn: 'root' })
export class EmployeeService {
private apiUrl = 'https://localhost:7078/api/Employees';


constructor(private http: HttpClient) {}


getAll(): Observable<Employee[]> {
return this.http.get<Employee[]>(this.apiUrl);
}


add(emp: Employee) {
return this.http.post(this.apiUrl, emp);
}


update(emp: Employee) {
return this.http.put(`${this.apiUrl}/${emp.id}`, emp);
}


delete(id: number) {
return this.http.delete(`${this.apiUrl}/${id}`);
}
}