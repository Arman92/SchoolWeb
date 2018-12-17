import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../config/app-config.module';
import { HttpClient } from '@angular/common/http';
import { Teacher } from '../models/teacher';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: HttpClient) {
  }

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.config.apiEndpoint}/api/Teachers`);
  }

  getTeacher(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.config.apiEndpoint}/api/Teachers/` + id);
  }

  deleteTeacher(teacher: Teacher) {
    return this.http.delete<Teacher>(`${this.config.apiEndpoint}/api/Teachers/` + teacher.id);
  }

  updateTeacher(teacher: Teacher) {
    return this.http.put<Teacher>(`${this.config.apiEndpoint}/api/Teachers/` + teacher.id, teacher);
  }

  addTeacher(teacher: Teacher) {
    return this.http.post<Teacher>(`${this.config.apiEndpoint}/api/Teachers`, teacher);
  }

}
