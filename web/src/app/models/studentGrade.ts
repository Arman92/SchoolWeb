import { Course } from './course';
import { Student } from './student';

export interface StudentGrade {
    course: Course;
    student: Student;
    grade: number;
}
