import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { DefaultErrorStateMatcher } from 'src/app/common/error-state-matcher';
import { TeacherService } from 'src/app/services/teacher.service';
import { Teacher } from 'src/app/models/teacher';
import { TeacherAddComponent } from '../teacher-add/teacher-add.component';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent implements OnInit {
  teachers: Teacher[];
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  locationFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  teacherFormControl = new FormControl('', [
    Validators.required,
  ]);


  matcher = new DefaultErrorStateMatcher();
  hasError: any;

  constructor(
    public dialogRef: MatDialogRef<CourseAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private teacherService: TeacherService,
    private courseService: CourseService,
    public dialog: MatDialog) {

  }

  ngOnInit() {
    this.loadTeachers();
  }

  loadTeachers() {
    this.teacherService.getTeachers().subscribe(result => {
      this.teachers = result;
    }, err => {
      console.log('Got an error getting teachers', err);
    });
  }

  createCourse() {
    this.hasError = null;

    const course: Course = {
      id: 0,
      location: this.locationFormControl.value,
      name: this.nameFormControl.value,
      teacher: { id: this.teacherFormControl.value, firstName: '', lastName: '' }
    };

    this.courseService.addCourse(course).subscribe(result => {
      this.dialogRef.close();
    }, err => {
      this.hasError = err;
    });
  }

  showAddTeacherDialog() {
    const dialogRef = this.dialog.open(TeacherAddComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.teacherService.getTeachers().subscribe(result => {
        this.teachers = result;
      }, err => {
        console.log('Got an error getting teachers', err);
      });
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
