import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../config/app-config.module';
import { Course } from '../models/course';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: HttpClient) {
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.config.apiEndpoint}/api/Courses`).pipe(catchError(this.handleError));
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.config.apiEndpoint}/api/Courses/` + id).pipe(catchError(this.handleError));
  }

  deleteCourse(course: Course) {
    return this.http.delete<Course>(`${this.config.apiEndpoint}/api/Courses/` + course.id).pipe(catchError(this.handleError));
  }

  updateCourse(course: Course) {
    return this.http.put<Course>(`${this.config.apiEndpoint}/api/Courses/` + course.id, course).pipe(catchError(this.handleError));
  }

  addCourse(course: Course) {
    return this.http.post<Course>(`${this.config.apiEndpoint}/api/Courses`, course).pipe(catchError(this.handleError));
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
