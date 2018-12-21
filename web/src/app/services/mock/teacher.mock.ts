import { Teacher } from 'src/app/models/teacher';
import { of, Observable } from 'rxjs';
import { APIResult, APIResultWrapper } from 'src/app/common/api-result';

export const TeacherListMock: Teacher[] = [
    {
        id: 1,
        firstName: 'Nicola',
        lastName: 'Tesla',
    },
    {
        id: 2,
        firstName: 'Albert',
        lastName: 'Einstein',
    },
    {
        id: 3,
        firstName: 'Isaac',
        lastName: 'Newton',
    }
];

export const TeacherMock: Teacher = TeacherListMock[0];


export class TeacherMockService {
    getTeachers(): Observable<APIResult<Teacher[]>> {
        return of(APIResultWrapper.wrapSuccessData(TeacherListMock));
    }
    getTeacher(id: number): Observable<APIResult<Teacher>> {
        return of(APIResultWrapper.wrapSuccessData(TeacherListMock[0]));
    }
    deleteTeacher(teacher: Teacher): Observable<APIResult<boolean>> {
        return of(APIResultWrapper.wrapSuccessData(true));
    }
    updateTeacher(teacher: Teacher): Observable<APIResult<Teacher>> {
        return of(APIResultWrapper.wrapSuccessData(TeacherListMock[0]));
    }
    addTeacher(teacher: Teacher): Observable<APIResult<Teacher>> {
        return of(APIResultWrapper.wrapSuccessData(TeacherListMock[0]));
    }
}
