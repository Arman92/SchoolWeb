import { StudentGrade } from 'src/app/models/studentGrade';
import { CourseMock } from './course.mock';
import { StudentMock } from './student.mock';
import { of, Observable } from 'rxjs';
import { APIResult, APIResultWrapper } from 'src/app/common/api-result';

export const StudentGradeListMock: StudentGrade[] = [
    {
        course: CourseMock,
        student: StudentMock,
        grade: 18.7,
    },
    {
        course: CourseMock,
        student: StudentMock,
        grade: 18.7,
    }
];

export class StudentGradeMockService {
    getStudentGrades(): Observable<APIResult<StudentGrade[]>> {
        return of(APIResultWrapper.wrapSuccessData(StudentGradeListMock));
    }
    getStudentGradesGradesOfCourse(): Observable<APIResult<StudentGrade[]>> {
        return of(APIResultWrapper.wrapSuccessData(StudentGradeListMock));
    }
    deleteStudentGrade(studentGrade: StudentGrade): Observable<APIResult<boolean>> {
        return of(APIResultWrapper.wrapSuccessData(true));
    }
    updateStudentGrade(studentGrade: StudentGrade): Observable<APIResult<StudentGrade>> {
        return of(APIResultWrapper.wrapSuccessData(StudentGradeListMock[0]));
    }
    addStudentGrade(studentGrade: StudentGrade): Observable<APIResult<StudentGrade>> {
        return of(APIResultWrapper.wrapSuccessData(StudentGradeListMock[0]));
    }
}
