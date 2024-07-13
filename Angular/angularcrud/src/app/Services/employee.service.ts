import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Employee } from '../Models/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  constructor(private httpClient: HttpClient){}

  baseURl = "http://localhost:28929/api/Employee";

  GetEmployee(): Observable<Employee[]>
  {
    return this.httpClient.get<Employee[]>(this.baseURl);
  }


  CreateEmployee(employee: Employee) : Observable<Employee>
  {
    //console.log(employee);
    employee.id = "00000000-0000-0000-0000-000000000000";
    return this.httpClient.post<Employee>(this.baseURl, employee);
  }

  UpdateEmployee(employee: Employee) : Observable<Employee>
  {
    //console.log(employee);
    return this.httpClient.put<Employee>(this.baseURl + "/"+employee.id, employee);
  }

  DeleteEmployee(employee: Employee): Observable<Employee>
  {
    return this.httpClient.delete<Employee>(this.baseURl + "/" + employee.id);
  }
}
