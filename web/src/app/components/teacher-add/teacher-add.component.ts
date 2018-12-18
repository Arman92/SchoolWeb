import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DialogData } from '../course-add/course-add.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TeacherService } from 'src/app/services/teacher.service';
import { Teacher } from 'src/app/models/teacher';

@Component({
  selector: 'app-teacher-add',
  templateUrl: './teacher-add.component.html',
  styleUrls: ['./teacher-add.component.scss']
})
export class TeacherAddComponent implements OnInit {
  firstNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  hasError: any;

  constructor(
    public dialogRef: MatDialogRef<TeacherAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private teacherService: TeacherService
  ) {

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
