import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../config/app-config.module';
import { HttpClient } from '@angular/common/http';
import { Teacher } from '../models/teacher';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: HttpClient) {
  }

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.config.apiEndpoint}/api/Teachers`).pipe(catchError(this.handleError));
  }

  getTeacher(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.config.apiEndpoint}/api/Teachers/` + id).pipe(catchError(this.handleError));
  }

  deleteTeacher(teacher: Teacher) {
    return this.http.delete<Teacher>(`${this.config.apiEndpoint}/api/Teachers/` + teacher.id).pipe(catchError(this.handleError));
  }

  updateTeacher(teacher: Teacher) {
    return this.http.put<Teacher>(`${this.config.apiEndpoint}/api/Teachers/` + teacher.id, teacher).pipe(catchError(this.handleError));
  }

  addTeacher(teacher: Teacher) {
    return this.http.post<Teacher>(`${this.config.apiEndpoint}/api/Teachers`, teacher).pipe(catchError(this.handleError));
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
