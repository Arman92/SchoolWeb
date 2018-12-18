import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'location', 'teacher', 'actions'];
  courses: Course[];
  selectedCourse: Course;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getCourses().subscribe(result => {
      console.log('getCourses:', result);
      this.courses = result;
    });
  }


  onCourseRowClicked(row) {
    alert(row);
    this.selectedCourse = row as Course;
  }

}
