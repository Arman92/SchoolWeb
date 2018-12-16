import { Class } from './class';

export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    classes: Class[];
}
