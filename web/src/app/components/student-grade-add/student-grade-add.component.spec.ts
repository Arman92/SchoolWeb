import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGradeAddComponent } from './student-grade-add.component';
import { DemoMaterialModule } from 'src/app/common/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StudentGradeService } from 'src/app/services/student-grade.service';
import { StudentGradeMockService } from 'src/app/services/mock/student-grade.mock';
import { APP_DI_CONFIG, APP_CONFIG } from 'src/app/config/app-config.module';
import { StudentMockService } from 'src/app/services/mock/student.mock';
import { StudentService } from 'src/app/services/student.service';
import { CourseService } from 'src/app/services/course.service';
import { CourseMockService } from 'src/app/services/mock/course.mock';

describe('StudentGradeAddComponent', () => {
  let component: StudentGradeAddComponent;
  let fixture: ComponentFixture<StudentGradeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentGradeAddComponent],
      imports: [
        DemoMaterialModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: APP_CONFIG, useValue: APP_DI_CONFIG },
        { provide: StudentService, useClass: StudentMockService },
        { provide: StudentGradeService, useClass: StudentGradeMockService },
        { provide: CourseService, useClass: CourseMockService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentGradeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
