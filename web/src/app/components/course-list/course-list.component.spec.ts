import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListComponent } from './course-list.component';
import { StudentGradeAddComponent } from '../student-grade-add/student-grade-add.component';
import { StudentGradeListComponent } from '../student-grade-list/student-grade-list.component';
import { YesNoDialogComponent } from 'src/app/common/yes-no-dialog/yes-no-dialog.component';
import { CourseAddComponent } from '../course-add/course-add.component';
import { StudentAddComponent } from '../student-add/student-add.component';
import { CourseService } from 'src/app/services/course.service';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseListComponent,
        StudentAddComponent,
        StudentGradeListComponent,
        StudentGradeAddComponent,
        YesNoDialogComponent,
        CourseAddComponent
      ],
      providers: [
        { provide: CourseService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
