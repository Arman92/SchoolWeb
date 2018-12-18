import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course';
import { MatDialog } from '@angular/material';
import { CourseAddComponent } from '../course-add/course-add.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'location', 'teacher', 'actions'];
  courses: Course[];
  selectedCourse: Course;

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
    alert(row);
    this.selectedCourse = row as Course;
  }

  addNewCourse() {
    const dialogRef = this.dialog.open(CourseAddComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadCourses();
    });
  }

}
