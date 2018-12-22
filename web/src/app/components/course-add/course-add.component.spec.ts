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
import { MatDialogRefMock } from 'src/app/common/mat-dialog-mock';

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
        { provide: MatDialogRef, useClass: MatDialogRefMock },
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
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.courseForm.valid).toBeFalsy();
  });

  it('each field should be invalid initially', () => {
    expect(component.nameFormControl.valid).toBeFalsy();
    expect(component.locationFormControl.valid).toBeFalsy();
    expect(component.teacherFormControl.valid).toBeFalsy();
  });

  it('field errors should be correct in case of invalidity', () => {
    let errors = component.nameFormControl.errors || {};
    expect(errors['required']).toBeTruthy();

    errors = component.locationFormControl.errors || {};
    expect(errors['required']).toBeTruthy();

    errors = component.teacherFormControl.errors || {};
    expect(errors['required']).toBeTruthy();

    component.nameFormControl.setValue('abc');
    errors = component.nameFormControl.errors || {};
    expect(errors['minlength']).toBeTruthy();
    expect(errors['required']).toBeFalsy();

    component.locationFormControl.setValue('abc');
    errors = component.locationFormControl.errors || {};
    expect(errors['minlength']).toBeTruthy();
    expect(errors['required']).toBeFalsy();

    component.teacherFormControl.setValue(component.teachers[0].id);
    errors = component.teacherFormControl.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('form submits, a course should be created and returned', () => {
    component.nameFormControl.setValue('History');
    component.locationFormControl.setValue('Class Building #1');
    component.teacherFormControl.setValue(component.teachers[0].id);

    expect(component.courseForm.valid).toBeTruthy();

    component.createCourse();

    expect(component.hasError).toBeNull();

  });
});
