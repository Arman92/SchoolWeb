import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/models/course';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'age', 'actions'];
  private _course: Course;
  students: Student[];

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getStudents().subscribe(result => {
      console.log('getStudentsOfCourse:', result);
      this.students = result;
    });
  }

  get course(): Course {
    return this._course;
  }

  @Input()
  set course(val: Course) {
    this._course = val;
    if (this._course) {
      this.studentService.getStudentsOfCourse(this.course.id).subscribe(result => {
        console.log('getStudentsOfCourse:', result);
        this.students = result;
      });
    }
  }

}
