import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../config/app-config.module';
import { HttpClient } from '@angular/common/http';
import { Teacher } from '../models/teacher';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { APIResult } from '../common/api-result';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: HttpClient) {
  }

  getTeachers(): Observable<APIResult<Teacher[]>> {
    return this.http.get<APIResult<Teacher[]>>(`${this.config.apiEndpoint}/api/Teachers`)
      .pipe(catchError(this.handleError));
  }

  getTeacher(id: number): Observable<APIResult<Teacher>> {
    return this.http.get<APIResult<Teacher>>(`${this.config.apiEndpoint}/api/Teachers/` + id)
      .pipe(catchError(this.handleError));
  }

  deleteTeacher(teacher: Teacher): Observable<APIResult<Boolean>> {
    return this.http.delete<APIResult<Boolean>>(`${this.config.apiEndpoint}/api/Teachers/` + teacher.id)
      .pipe(catchError(this.handleError));
  }

  updateTeacher(teacher: Teacher): Observable<APIResult<Teacher>> {
    return this.http.put<APIResult<Teacher>>(`${this.config.apiEndpoint}/api/Teachers/` + teacher.id, teacher)
      .pipe(catchError(this.handleError));
  }

  addTeacher(teacher: Teacher): Observable<APIResult<Teacher>> {
    return this.http.post<APIResult<Teacher>>(`${this.config.apiEndpoint}/api/Teachers`, teacher)
      .pipe(catchError(this.handleError));
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
