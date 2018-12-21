import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/models/course';
import { StudentGrade } from 'src/app/models/studentGrade';
import { StudentGradeService } from 'src/app/services/student-grade.service';
import { StudentGradeAddComponent } from '../student-grade-add/student-grade-add.component';
import { MatDialog } from '@angular/material';
import { YesNoDialogComponent } from 'src/app/common/yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'app-student-grade-list',
  templateUrl: './student-grade-list.component.html',
  styleUrls: ['./student-grade-list.component.scss']
})
export class StudentGradeListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'age', 'grade', 'actions'];
  private _course: Course;
  studentGrades: StudentGrade[];

  constructor(private studentGradeService: StudentGradeService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  loadStudentGrades() {
    if (this._course) {
      this.studentGradeService.getStudentsGradesOfCourse(this.course.id).subscribe(result => {
        console.log('getStudentsGradesOfCourse:', result);
        this.studentGrades = result.result;
      });
    }
  }

  get course(): Course {
    return this._course;
  }

  @Input()
  set course(val: Course) {
    this._course = val;
    this.loadStudentGrades();
  }


  editStudentGrade(studentGrade: StudentGrade) {
    const dialogRef = this.dialog.open(StudentGradeAddComponent, {
      width: '500px',
      data: { student: studentGrade.student, course: studentGrade.course, grade: studentGrade.grade }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadStudentGrades();
    });
  }

  deleteStudentGrade(studentGrade: StudentGrade) {
    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      width: '500px',
      data: {
        title: 'Are you absolutely sure about deleting' +
          `${studentGrade.student.firstName} ${studentGrade.student.lastName} grade record?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentGradeService.deleteStudentGrade(studentGrade).subscribe(() => {
          this.loadStudentGrades();
        }, err => {
          // TODO: should inform user about error in UI:
          console.log('Error deleting student grade', err);
        });
      }
    });
  }
}
