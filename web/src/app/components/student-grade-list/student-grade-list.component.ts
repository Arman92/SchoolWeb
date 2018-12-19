import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/models/course';
import { StudentGrade } from 'src/app/models/studentGrade';
import { StudentGradeService } from 'src/app/services/student-grade.service';

@Component({
  selector: 'app-student-grade-list',
  templateUrl: './student-grade-list.component.html',
  styleUrls: ['./student-grade-list.component.scss']
})
export class StudentGradeListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'age', 'grade', 'actions'];
  private _course: Course;
  studentGrades: StudentGrade[];

  constructor(private studentGradeService: StudentGradeService) { }

  ngOnInit() {
  }

  get course(): Course {
    return this._course;
  }

  @Input()
  set course(val: Course) {
    this._course = val;
    if (this._course) {
      this.studentGradeService.getStudentsGradesOfCourse(this.course.id).subscribe(result => {
        console.log('getStudentsGradesOfCourse:', result);
        this.studentGrades = result;
      });
    }
  }

}
