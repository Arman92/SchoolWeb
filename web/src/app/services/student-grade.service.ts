import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../config/app-config.module';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StudentGrade } from '../models/studentGrade';

@Injectable({
    providedIn: 'root'
})
export class StudentGradeService {

    constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: HttpClient) {
    }

    getStudentGrades(): Observable<StudentGrade[]> {
        return this.http.get<StudentGrade[]>(`${this.config.apiEndpoint}/api/StudentGrades`)
            .pipe(catchError(this.handleError));
    }

    getStudentsGradesOfCourse(courseId: number): Observable<StudentGrade[]> {
        return this.http.get<StudentGrade[]>(`${this.config.apiEndpoint}/api/StudentGrades/GetByCourse/` + courseId)
            .pipe(catchError(this.handleError));
    }

    getStudentGrade(id: number): Observable<StudentGrade> {
        return this.http.get<StudentGrade>(`${this.config.apiEndpoint}/api/StudentGrades/` + id)
            .pipe(catchError(this.handleError));
    }

    deleteStudentGrade(student: StudentGrade) {
        return this.http.delete<StudentGrade>(`${this.config.apiEndpoint}/api/StudentGrades/`
            + student.course.id + '/' + student.student.id)
            .pipe(catchError(this.handleError));
    }

    updateStudentGrade(student: StudentGrade) {
        return this.http.put<StudentGrade>(`${this.config.apiEndpoint}/api/StudentGrades/`, student)
            .pipe(catchError(this.handleError));
    }

    addStudentGrade(student: StudentGrade) {
        return this.http.post<StudentGrade>(`${this.config.apiEndpoint}/api/StudentGrades`, student)
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
