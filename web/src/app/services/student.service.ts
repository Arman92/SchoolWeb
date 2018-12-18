import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../config/app-config.module';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: HttpClient) {
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.config.apiEndpoint}/api/Students`).pipe(catchError(this.handleError));
  }

  getStudentsOfCourse(courseId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.config.apiEndpoint}/api/Students/GetByCourse/` + courseId).pipe(catchError(this.handleError));
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.config.apiEndpoint}/api/Students/` + id).pipe(catchError(this.handleError));
  }

  deleteStudent(student: Student) {
    return this.http.delete<Student>(`${this.config.apiEndpoint}/api/Students/` + student.id).pipe(catchError(this.handleError));
  }

  updateStudent(student: Student) {
    return this.http.put<Student>(`${this.config.apiEndpoint}/api/Students/` + student.id, student).pipe(catchError(this.handleError));
  }

  addStudent(student: Student) {
    return this.http.post<Student>(`${this.config.apiEndpoint}/api/Students`, student).pipe(catchError(this.handleError));
  }


  // this could also be a private method of the component class
  private handleError(error: any) {
    // log error
    // could be something more sophisticated
    const errorMsg = error.message || ` there is some error doing http request!`;
    console.error(errorMsg);

    // throw an application level error
    return observableThrowError(error);
  }
}
