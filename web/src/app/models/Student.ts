import { IClass } from './Class';

export interface IStudent {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    classes: IClass[];
}
