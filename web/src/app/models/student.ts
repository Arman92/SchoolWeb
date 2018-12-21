import { Course } from './course';

export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    courses?: Course[];
}
