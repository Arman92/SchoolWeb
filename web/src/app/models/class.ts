import { Teacher } from './teacher';
import { Student } from './student';


export interface Class {
    id: number;
    name: string;
    location: string;
    teacher: Teacher;
    students: Student[];
}
