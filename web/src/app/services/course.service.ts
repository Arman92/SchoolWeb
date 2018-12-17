import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../config/app-config.module';
import { Course } from '../models/course';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: HttpClient) {
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.config.apiEndpoint}/api/Course`);
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.config.apiEndpoint}/api/Course/` + id);
  }

  deleteCourse(course: Course) {
    return this.http.delete<Course>(`${this.config.apiEndpoint}/api/Course/` + course.id);
  }

  updateCourse(course: Course) {
    return this.http.put<Course>(`${this.config.apiEndpoint}/api/Course/` + course.id, course);
  }

  addCourse(course: Course) {
    return this.http.post<Course>(`${this.config.apiEndpoint}/api/Course`, course);
  }

}
