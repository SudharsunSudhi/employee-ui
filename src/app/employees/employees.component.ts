import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';

import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [];
  emp: Employee = this.createEmptyEmployee();

  searchText = '';
  page = 1;

  showModal = false;
  isEditMode = false;

  constructor(private employeeService: EmployeeService) {}

  // ================= INIT =================
  ngOnInit(): void {
    this.loadEmployees();
  }

  // ================= LOAD =================
  loadEmployees() {
    this.employeeService.getAll().subscribe({
      next: data => this.employees = data,
      error: () => Swal.fire('Error', 'Failed to load employees', 'error')
    });
  }

  // ================= FILTER =================
  get filteredEmployees(): Employee[] {
    if (!this.searchText) return this.employees;

    const text = this.searchText.toLowerCase();
    return this.employees.filter(e =>
      e.firstName.toLowerCase().includes(text) ||
      e.department.toLowerCase().includes(text)
    );
  }

  // ================= ADD =================
  addEmployee() {
    this.isEditMode = false;
    this.emp = this.createEmptyEmployee();
    this.showModal = true;
  }

  // ================= EDIT =================
  edit(employee: Employee) {
    this.isEditMode = true;
    this.emp = { ...employee };
    this.showModal = true;
  }

  // ================= CLOSE MODAL =================
  // closeModal() {
  //   this.showModal = false;
  //   this.emp = this.createEmptyEmployee();
  // }


  closeModal() {
  this.showModal = false;
  this.emp = this.createEmptyEmployee();

  // 🔥 CLEAN BOOTSTRAP SIDE EFFECTS
  document.body.classList.remove('modal-open');

  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) {
    backdrop.remove();
  }
}

  // ================= SAVE =================
  save() {
    if (!this.isValid()) {
      Swal.fire('Validation Error', 'Please fill all required fields', 'error');
      return;
    }

    this.isEditMode ? this.confirmUpdate() : this.confirmAdd();
  }

  // ================= VALIDATION =================
  private isValid(): boolean {
    return (
      this.emp.firstName.trim().length > 0 &&
      this.emp.department.trim().length > 0 &&
      this.emp.salary > 0
    );
  }

  // ================= ADD FLOW =================
  private confirmAdd() {
    Swal.fire({
      title: 'Save Employee?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Save'
    }).then(result => {
      if (result.isConfirmed) {
        this.employeeService.add(this.emp).subscribe({
          next: () => {
            Swal.fire('Success', 'Employee added successfully', 'success')
              .then(() => {
                this.showModal = false;
                this.loadEmployees();
              });
          },
          error: () => Swal.fire('Error', 'Failed to add employee', 'error')
        });
      }
    });
  }

  // ================= UPDATE FLOW =================
  private confirmUpdate() {
    Swal.fire({
      title: 'Update Employee?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Update'
    }).then(result => {
      if (result.isConfirmed) {
        this.employeeService.update(this.emp).subscribe({
          next: () => {
            Swal.fire('Success', 'Employee updated successfully', 'success')
              .then(() => {
                this.showModal = false;
                this.loadEmployees();
              });
          },
          error: () => Swal.fire('Error', 'Failed to update employee', 'error')
        });
      }
    });
  }

  // ================= DELETE =================
  delete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This employee will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete'
    }).then(result => {
      if (result.isConfirmed) {
        this.employeeService.delete(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Employee deleted successfully.', 'success');
            this.loadEmployees();
          },
          error: () => Swal.fire('Error', 'Delete failed', 'error')
        });
      }
    });
  }

  // ================= HELPER =================
  private createEmptyEmployee(): Employee {
    return {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      salary: 0
    };
  }
}
