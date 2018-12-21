import { Student } from 'src/app/models/student';
import { CourseListMock } from './course.mock';
import { Observable, of } from 'rxjs';
import { APIResult, APIResultWrapper } from 'src/app/common/api-result';

export const StudentListMock: Student[] = [
    {
        id: 1,
        firstName: 'Jessie',
        lastName: 'Pinkman',
        age: 21,
        courses: CourseListMock,
    },
    {
        id: 2,
        firstName: 'Walter',
        lastName: 'White',
        age: 28,
        courses: [CourseListMock[0], CourseListMock[1]],
    },
    {
        id: 3,
        firstName: 'Jessica',
        lastName: 'Alba',
        age: 25,
    }
];

export const StudentMock: Student = StudentListMock[0];


export class StudentMockService {
    getStudents(): Observable<APIResult<Student[]>> {
        return of(APIResultWrapper.wrapSuccessData(StudentListMock));
    }
    getStudent(id: number): Observable<APIResult<Student>> {
        return of(APIResultWrapper.wrapSuccessData(StudentListMock[0]));
    }
    deleteStudent(student: Student): Observable<APIResult<boolean>> {
        return of(APIResultWrapper.wrapSuccessData(true));
    }
    updateStudent(student: Student): Observable<APIResult<Student>> {
        return of(APIResultWrapper.wrapSuccessData(StudentListMock[0]));
    }
    addStudent(student: Student): Observable<APIResult<Student>> {
        return of(APIResultWrapper.wrapSuccessData(StudentListMock[0]));
    }
}
