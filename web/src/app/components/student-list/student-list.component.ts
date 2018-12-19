import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/models/course';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/student';
import { StudentGradeService } from 'src/app/services/student-grade.service';
import { StudentAddComponent } from '../student-add/student-add.component';
import { MatDialog } from '@angular/material';
import { YesNoDialogComponent } from 'src/app/common/yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'age', 'actions'];
  students: Student[];
  grades: { [studentId: number]: number; } = {};

  constructor(private studentService: StudentService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe(result => {
      console.log('getStudentsOfCourse:', result);
      this.students = result;
    });
  }

  editStudent(student: Student) {
    const dialogRef = this.dialog.open(StudentAddComponent, {
      width: '500px',
      data: { student: student }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadStudents();
    });
  }

  deleteStudent(student: Student) {
    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      width: '500px',
      data: { title: 'Are you absolutely sure about deleting ' + student.firstName + ' ' + student.lastName + '?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentService.deleteStudent(student).subscribe(() => {
          this.loadStudents();
        }, err => {
          // TODO: should inform user about error in UI:
          console.log('Error deleting student', err);
        });
      }
    });
  }

}
