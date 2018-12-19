import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup } from '@angular/forms';
import { DefaultErrorStateMatcher } from 'src/app/common/error-state-matcher';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/student';

export interface DialogData {
  student: Student;
}

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss']
})
export class StudentAddComponent implements OnInit {
  studentForm: FormGroup;
  firstNameFormControl: FormControl;
  lastNameFormControl: FormControl;
  ageFormControl: FormControl;


  matcher = new DefaultErrorStateMatcher();
  hasError: any;

  constructor(
    public dialogRef: MatDialogRef<StudentAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private studentService: StudentService,
    public dialog: MatDialog) {

    this.firstNameFormControl = new FormControl(data.student ? data.student.firstName : '', [
      Validators.required,
      Validators.minLength(3),
    ]);

    this.lastNameFormControl = new FormControl(data.student ? data.student.lastName : '', [
      Validators.required,
      Validators.minLength(3),
    ]);

    this.ageFormControl = new FormControl(data.student ? data.student.age : '', [
      Validators.required,
    ]);

    this.studentForm = new FormGroup({
      firstName: this.firstNameFormControl,
      lastName: this.lastNameFormControl,
      age: this.ageFormControl,
    });

  }

  ngOnInit() {
  }


  createStudent() {
    this.hasError = null;
    console.log('this.ageFormControl.value ', this.ageFormControl.value, 3);

    const student: Student = {
      id: 0,
      lastName: this.lastNameFormControl.value,
      firstName: this.firstNameFormControl.value,
      age: this.ageFormControl.value,
      courses: [],
    };

    this.studentService.addStudent(student).subscribe(result => {
      this.dialogRef.close();
    }, err => {
      this.hasError = err;
    });
  }

  editStudent() {
    this.hasError = null;
    console.log('this.ageFormControl.value ', this.ageFormControl.value, 3);

    this.data.student.firstName = this.firstNameFormControl.value;
    this.data.student.lastName = this.lastNameFormControl.value;
    this.data.student.age = this.ageFormControl.value;

    this.studentService.updateStudent(this.data.student).subscribe(result => {
      this.dialogRef.close();
    }, err => {
      this.hasError = err;
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
