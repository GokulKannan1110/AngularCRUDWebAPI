import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './Services/employee.service';
import { Employee } from './Models/Employee';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angularcrud';
  employeeArray: Employee[] = [];
  employeeFormGroup!: FormGroup;
  isEditMode: boolean = false;
  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder) {
    this.employeeFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      name: new FormControl("", Validators.required),
      mobileNo: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required)
    })
  }

  ngOnInit(): void {
    this.GetEmployees();
  }

  GetEmployees() {
    this.employeeService.GetEmployee().subscribe({
      next: (res) => {
        console.log(res);
        this.employeeArray = res;
      }
    });
  }

  OnSubmit() {

    if (this.employeeFormGroup.value.id != null && this.employeeFormGroup.value.id != "") {
      //console.log(this.employeeFormGroup.value);
      this.employeeService.UpdateEmployee(this.employeeFormGroup.value).subscribe({
        next: (response) => {
          console.log(response);
          this.employeeFormGroup.setValue({ id: "", name: "", mobileNo: "", email: "" });
          this.GetEmployees();

        },
        error: (error) => {
          console.log("Error Occurred");
          console.log(error);
        }
      });
    }
    else {
      //console.log(this.employeeFormGroup.value);
      this.employeeService.CreateEmployee(this.employeeFormGroup.value).subscribe({
        next: (response) => {
          console.log(response);
          this.employeeFormGroup.setValue({ id: "", name: "", mobileNo: "", email: "" });
          this.GetEmployees();

        },
        error: (error) => {
          console.log("Error Occurred");
          console.log(error);
        }
      });
    }


  }

  FillForm(emp: Employee) {
    this.employeeFormGroup.setValue({
      id: emp.id,
      name: emp.name,
      mobileNo: emp.mobileNo,
      email: emp.email
    })
    this.isEditMode = true;
  }

  DeleteEmployee(emp: Employee)
  {
    console.log(emp);
    this.employeeService.DeleteEmployee(emp).subscribe({
      next: () => {
        this.GetEmployees();
      }
    })
  }
}
