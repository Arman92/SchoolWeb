import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListComponent } from './course-list.component';
import { StudentGradeAddComponent } from '../student-grade-add/student-grade-add.component';
import { StudentGradeListComponent } from '../student-grade-list/student-grade-list.component';
import { YesNoDialogComponent } from 'src/app/common/yes-no-dialog/yes-no-dialog.component';
import { CourseAddComponent } from '../course-add/course-add.component';
import { StudentAddComponent } from '../student-add/student-add.component';
import { CourseService } from 'src/app/services/course.service';
import { DemoMaterialModule } from 'src/app/common/material.module';
import { StudentListComponent } from '../student-list/student-list.component';
import { CourseMockService } from 'src/app/services/mock/course.mock';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { APP_CONFIG, APP_DI_CONFIG } from 'src/app/config/app-config.module';
import { TeacherService } from 'src/app/services/teacher.service';
import { TeacherMockService } from 'src/app/services/mock/teacher.mock';
import { StudentGradeService } from 'src/app/services/student-grade.service';
import { StudentGradeMockService } from 'src/app/services/mock/student-grade.mock';
import { StudentMockService } from 'src/app/services/mock/student.mock';
import { StudentService } from 'src/app/services/student.service';
import { MatDialog } from '@angular/material';
import { MatDialogMock } from '../../common/mat-dialog-mock';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseListComponent,
        StudentAddComponent,
        StudentListComponent,
        StudentGradeListComponent,
        StudentGradeAddComponent,
        YesNoDialogComponent,
        CourseAddComponent
      ],
      imports: [
        DemoMaterialModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [
        { provide: APP_CONFIG, useValue: APP_DI_CONFIG },
        { provide: CourseService, useClass: CourseMockService },
        { provide: TeacherService, useClass: TeacherMockService },
        { provide: StudentGradeService, useClass: StudentGradeMockService },
        { provide: StudentService, useClass: StudentMockService },
        {
          // When the component asks for the MatDialog service, we we’ll provide the MatDialogMock one.
          provide: MatDialog, useClass: MatDialogMock,
        }

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
