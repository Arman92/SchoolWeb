import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGradeAddComponent } from './student-grade-add.component';
import { DemoMaterialModule } from 'src/app/common/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StudentGradeService } from 'src/app/services/student-grade.service';
import { StudentGradeMockService } from 'src/app/services/mock/student-grade.mock';
import { APP_DI_CONFIG, APP_CONFIG } from 'src/app/config/app-config.module';
import { StudentMockService, StudentListMock, StudentMock } from 'src/app/services/mock/student.mock';
import { StudentService } from 'src/app/services/student.service';
import { CourseService } from 'src/app/services/course.service';
import { CourseMockService, CourseListMock, CourseMock } from 'src/app/services/mock/course.mock';
import { MatDialogRefMock } from 'src/app/common/mat-dialog-mock';

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
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
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


  it('form should be invalid when empty', () => {
    expect(component.studentGradeForm.valid).toBeFalsy();
  });

  it('each field should be invalid initially', () => {
    expect(component.courseFormControl.valid).toBeFalsy();
    expect(component.studentFormControl.valid).toBeFalsy();
    expect(component.gradeFormControl.valid).toBeFalsy();
  });

  it('field errors should be correct in case of invalidity', () => {
    let errors = component.courseFormControl.errors || {};
    expect(errors['required']).toBeTruthy();

    errors = component.studentFormControl.errors || {};
    expect(errors['required']).toBeTruthy();

    errors = component.gradeFormControl.errors || {};
    expect(errors['required']).toBeTruthy();

    component.gradeFormControl.setValue(-1);
    errors = component.gradeFormControl.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['min']).toBeTruthy();

    component.gradeFormControl.setValue(110);
    errors = component.gradeFormControl.errors || {};
    expect(errors['min']).toBeFalsy();
    expect(errors['max']).toBeTruthy();

    component.gradeFormControl.setValue(50);
    errors = component.gradeFormControl.errors || {};
    expect(errors['min']).toBeFalsy();
    expect(errors['max']).toBeFalsy();

  });

  it('form submits (createStudentGrade), a student grade should be created and returned', () => {
    component.courseFormControl.setValue(CourseListMock[0].id);
    component.studentFormControl.setValue(StudentListMock[0].id);
    component.gradeFormControl.setValue(50);

    expect(component.studentGradeForm.valid).toBeTruthy();

    component.createStudentGrade();

    expect(component.hasError).toBeNull();
  });

  it('form submits (editStudentGrade), the student grade should be edited and returned', () => {
    component.data = { student: StudentMock, course: CourseMock, grade: 17.2 };

    component.courseFormControl.setValue(component.data.course.id);
    component.studentFormControl.setValue(component.data.student.id);
    component.gradeFormControl.setValue(25);

    expect(component.studentGradeForm.valid).toBeTruthy();

    component.editStudentGrade();

    expect(component.hasError).toBeNull();
  });


});
