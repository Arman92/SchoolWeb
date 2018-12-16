import { ITeacher } from './Teacher';
import { IStudent } from './Student';


export interface IClass {
    id: number;
    name: string;
    location: string;
    teacher: ITeacher;
    students: IStudent[];
}
