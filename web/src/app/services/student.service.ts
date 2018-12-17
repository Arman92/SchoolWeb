import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../config/app-config.module';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: HttpClient) {
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.config.apiEndpoint}/api/Student`);
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.config.apiEndpoint}/api/Student/` + id);
  }

  deleteStudent(student: Student) {
    return this.http.delete<Student>(`${this.config.apiEndpoint}/api/Student/` + student.id);
  }

  updateStudent(student: Student) {
    return this.http.put<Student>(`${this.config.apiEndpoint}/api/Student/` + student.id, student);
  }

  addStudent(student: Student) {
    return this.http.post<Student>(`${this.config.apiEndpoint}/api/Student`, student);
  }

}
