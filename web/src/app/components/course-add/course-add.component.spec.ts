import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAddComponent } from './course-add.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatHint, MatError, MatFormField, MatOption, MatSelect, MatInput, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DemoMaterialModule } from 'src/app/common/material.module';
import { APP_CONFIG, APP_DI_CONFIG } from 'src/app/config/app-config.module';
import { CourseService } from 'src/app/services/course.service';
import { CourseMockService } from 'src/app/services/mock/course.mock';
import { TeacherService } from 'src/app/services/teacher.service';
import { TeacherMockService } from 'src/app/services/mock/teacher.mock';

describe('CourseAddComponent', () => {
  let component: CourseAddComponent;
  let fixture: ComponentFixture<CourseAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseAddComponent,
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        DemoMaterialModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: APP_CONFIG, useValue: APP_DI_CONFIG },
        { provide: CourseService, useClass: CourseMockService },
        { provide: TeacherService, useClass: TeacherMockService }
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
