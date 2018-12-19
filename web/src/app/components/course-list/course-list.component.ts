import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course';
import { MatDialog } from '@angular/material';
import { CourseAddComponent } from '../course-add/course-add.component';
import { YesNoDialogComponent } from 'src/app/common/yes-no-dialog/yes-no-dialog.component';
import { StudentAddComponent } from '../student-add/student-add.component';
import { StudentGradeAddComponent } from '../student-grade-add/student-grade-add.component';
import { StudentGradeListComponent } from '../student-grade-list/student-grade-list.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'location', 'teacher', 'actions'];
  courses: Course[];
  selectedCourse: Course;
  selectedRowIndex: number;
  @ViewChild('studentsListC') studentListC: StudentGradeListComponent;


  constructor(private courseService: CourseService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe(result => {
      console.log('getCourses:', result);
      this.courses = result;
    });
  }


  onCourseRowClicked(row) {
    this.selectedRowIndex = row.id;
    this.selectedCourse = row as Course;
  }

  addNewCourse() {
    const dialogRef = this.dialog.open(CourseAddComponent, {
      width: '500px',
      data: { course: null },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadCourses();
    });
  }

  editCourse(course: Course) {
    const dialogRef = this.dialog.open(CourseAddComponent, {
      width: '500px',
      data: { course: course }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadCourses();
    });
  }

  deleteCourse(course: Course) {
    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      width: '500px',
      data: { title: 'Are you absolutely sure about deleting ' + course.name + '?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.courseService.deleteCourse(course).subscribe(() => {
          this.loadCourses();
        }, err => {
          // TODO: should inform user about error in UI:
          console.log('Error deleting course', err);
        });
      }
    });
  }

  createStudent(course: Course) {
    const dialogRef = this.dialog.open(StudentAddComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  createStudentGrade(course: Course) {
    const dialogRef = this.dialog.open(StudentGradeAddComponent, {
      width: '500px',
      data: { course: course }
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.studentListC.loadStudentGrades();
    });
  }

}
