import { Course } from 'src/app/models/course';
import { TeacherListMock } from './teacher.mock';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { APIResult, APIResultWrapper } from 'src/app/common/api-result';

export const CourseListMock: Course[] = [
    {
        id: 1,
        name: 'Biology',
        location: 'Great Hall',
        teacher: TeacherListMock[0],
    },
    {
        id: 2,
        name: 'Chemistry',
        location: 'Chemistry Dept.',
        teacher: TeacherListMock[1],
    },
    {
        id: 3,
        name: 'Electrical Introduction',
        location: 'Elec. Dept.',
        teacher: TeacherListMock[2],
    }
];

export const CourseMock: Course = CourseListMock[0];

export class CourseMockService {
    getCourses(): Observable<APIResult<Course[]>> {
        return of(APIResultWrapper.wrapSuccessData(CourseListMock));
    }
    getCourse(id: number): Observable<APIResult<Course>> {
        return of(APIResultWrapper.wrapSuccessData(CourseListMock[0]));
    }
    deleteCourse(course: Course): Observable<APIResult<boolean>> {
        return of(APIResultWrapper.wrapSuccessData(true));
    }
    updateCourse(course: Course): Observable<APIResult<Course>> {
        return of(APIResultWrapper.wrapSuccessData(CourseListMock[0]));
    }
    addCourse(course: Course): Observable<APIResult<Course>> {
        return of(APIResultWrapper.wrapSuccessData(CourseListMock[0]));
    }
}
