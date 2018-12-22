import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TeacherService } from 'src/app/services/teacher.service';
import { Teacher } from 'src/app/models/teacher';

export interface DialogData {
  teacher: Teacher;
}

@Component({
  selector: 'app-teacher-add',
  templateUrl: './teacher-add.component.html',
  styleUrls: ['./teacher-add.component.scss']
})
export class TeacherAddComponent implements OnInit {
  teacherForm: FormGroup;
  firstNameFormControl: FormControl;
  lastNameFormControl: FormControl;
  hasError: any;

  constructor(
    public dialogRef: MatDialogRef<TeacherAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private teacherService: TeacherService
  ) {

    this.firstNameFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);

    this.lastNameFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);

    this.teacherForm = new FormGroup({
      firstName: this.firstNameFormControl,
      lastName: this.lastNameFormControl,
    });
  }

  ngOnInit() {
  }


  createTeacher() {
    this.hasError = null;

    const teacher: Teacher = {
      id: 0,
      firstName: this.firstNameFormControl.value,
      lastName: this.lastNameFormControl.value,
    };
    this.teacherService.addTeacher(teacher).subscribe(result => {
      this.dialogRef.close();
    }, err => {
      this.hasError = err;
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
