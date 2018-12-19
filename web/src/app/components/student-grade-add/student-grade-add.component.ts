import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup } from '@angular/forms';
import { DefaultErrorStateMatcher } from 'src/app/common/error-state-matcher';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/student';
import { StudentGrade } from 'src/app/models/studentGrade';
import { StudentGradeService } from 'src/app/services/student-grade.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course';

export interface DialogData {
  course: Course;
  student: Student;
  grade: number;
}

@Component({
  selector: 'app-student-grade-add',
  templateUrl: './student-grade-add.component.html',
  styleUrls: ['./student-grade-add.component.scss']
})
export class StudentGradeAddComponent implements OnInit {
  studentGradeForm: FormGroup;
  courseFormControl: FormControl;
  studentFormControl: FormControl;
  gradeFormControl: FormControl;
  courses: Course[];
  students: Student[];


  matcher = new DefaultErrorStateMatcher();
  hasError: any;

  constructor(
    public dialogRef: MatDialogRef<StudentGradeAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private studentService: StudentService,
    private courseService: CourseService,
    private studentGradeService: StudentGradeService,
    public dialog: MatDialog) {

    this.courseFormControl = new FormControl(data.course ? data.course.id : '', [
      Validators.required,
    ]);

    this.studentFormControl = new FormControl(data.student ? data.student.id : '', [
      Validators.required,
    ]);

    this.gradeFormControl = new FormControl(data.grade ? data.grade : '', [
      Validators.required,
    ]);

    this.studentGradeForm = new FormGroup({
      course: this.courseFormControl,
      student: this.studentFormControl,
      grade: this.gradeFormControl,
    });

  }

  ngOnInit() {
    this.courseService.getCourses().subscribe(result => {
      console.log('courseService.getCourses()', result);
      this.courses = result;
    });

    this.studentService.getStudents().subscribe(result => {
      console.log('studentService.getStudents()', result);
      this.students = result;
    });
  }


  createStudentGrade() {
    this.hasError = null;

    const studentGrade: StudentGrade = {
      course: this.studentFormControl.value,
      student: this.courseFormControl.value,
      grade: this.gradeFormControl.value,
    };

    this.studentGradeService.addStudentGrade(studentGrade).subscribe(result => {
      this.dialogRef.close();
    }, err => {
      this.hasError = err;
    });
  }

  editStudent() {
    this.hasError = null;
    console.log('this.gradeFormControl.value ', this.gradeFormControl.value, 3);

    const studentGrade: StudentGrade = {
      grade: this.gradeFormControl.value,
      course: this.courseFormControl.value,
      student: this.studentFormControl.value
    };

    this.studentGradeService.updateStudentGrade(studentGrade).subscribe(result => {
      this.dialogRef.close();
    }, err => {
      this.hasError = err;
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
