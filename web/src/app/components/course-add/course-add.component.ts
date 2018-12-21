import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DefaultErrorStateMatcher } from 'src/app/common/error-state-matcher';
import { TeacherService } from 'src/app/services/teacher.service';
import { Teacher } from 'src/app/models/teacher';
import { TeacherAddComponent } from '../teacher-add/teacher-add.component';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

export interface DialogData {
  course: Course;
}

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent implements OnInit {
  teachers: Teacher[];
  courseForm: FormGroup;
  nameFormControl: FormControl;
  locationFormControl: FormControl;
  teacherFormControl: FormControl;


  matcher = new DefaultErrorStateMatcher();
  hasError: any;

  constructor(
    public dialogRef: MatDialogRef<CourseAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private teacherService: TeacherService,
    private courseService: CourseService,
    public dialog: MatDialog) {

    this.nameFormControl = new FormControl(data.course ? data.course.name : '', [
      Validators.required,
      Validators.minLength(5),
    ]);

    this.locationFormControl = new FormControl(data.course ? data.course.location : '', [
      Validators.required,
      Validators.minLength(5),
    ]);

    this.teacherFormControl = new FormControl(data.course ? data.course.teacher.id : '', [
      Validators.required,
    ]);

    this.courseForm = new FormGroup({
      name: this.nameFormControl,
      location: this.locationFormControl,
      teacher: this.teacherFormControl,
    });

  }

  ngOnInit() {
    this.loadTeachers();
  }

  loadTeachers() {
    this.teacherService.getTeachers().subscribe(result => {
      this.teachers = result.result;
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
      teacher: { id: this.teacherFormControl.value, firstName: '', lastName: '' },
      students: []
    };

    this.courseService.addCourse(course).subscribe(result => {
      this.dialogRef.close();
    }, err => {
      this.hasError = err;
    });
  }

  editCourse() {
    this.hasError = null;
    console.log('this.teacherFormControl.value ', this.teacherFormControl.value, 3);

    this.data.course.name = this.nameFormControl.value;
    this.data.course.location = this.locationFormControl.value;
    this.data.course.teacher.id = this.teacherFormControl.value;

    this.courseService.updateCourse(this.data.course).subscribe(result => {
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
      this.teacherService.getTeachers().subscribe(res => {
        this.teachers = res.result;
      }, err => {
        console.log('Got an error getting teachers', err);
      });
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
