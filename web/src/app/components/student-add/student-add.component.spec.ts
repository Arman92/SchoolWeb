import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAddComponent } from './student-add.component';
import { DemoMaterialModule } from 'src/app/common/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StudentService } from 'src/app/services/student.service';
import { StudentMockService, StudentMock } from 'src/app/services/mock/student.mock';
import { APP_CONFIG, APP_DI_CONFIG } from 'src/app/config/app-config.module';
import { MatDialogRefMock } from 'src/app/common/mat-dialog-mock';

describe('StudentAddComponent', () => {
  let component: StudentAddComponent;
  let fixture: ComponentFixture<StudentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentAddComponent],
      imports: [
        DemoMaterialModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: APP_CONFIG, useValue: APP_DI_CONFIG },
        { provide: StudentService, useClass: StudentMockService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAddComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('form should be invalid when empty', () => {
    expect(component.studentForm.valid).toBeFalsy();
  });

  it('each field should be invalid initially', () => {
    expect(component.firstNameFormControl.valid).toBeFalsy();
    expect(component.lastNameFormControl.valid).toBeFalsy();
    expect(component.ageFormControl.valid).toBeFalsy();
  });

  it('field errors should be correct in case of invalidity', () => {
    let errors = component.firstNameFormControl.errors || {};
    expect(errors['required']).toBeTruthy();

    errors = component.lastNameFormControl.errors || {};
    expect(errors['required']).toBeTruthy();

    errors = component.ageFormControl.errors || {};
    expect(errors['required']).toBeTruthy();

    component.firstNameFormControl.setValue('ab');
    errors = component.firstNameFormControl.errors || {};
    expect(errors['minlength']).toBeTruthy();
    expect(errors['required']).toBeFalsy();

    component.lastNameFormControl.setValue('ab');
    errors = component.lastNameFormControl.errors || {};
    expect(errors['minlength']).toBeTruthy();
    expect(errors['required']).toBeFalsy();

    component.ageFormControl.setValue(0);
    errors = component.ageFormControl.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['min']).toBeTruthy();

    component.ageFormControl.setValue(100);
    errors = component.ageFormControl.errors || {};
    expect(errors['min']).toBeFalsy();
    expect(errors['max']).toBeTruthy();

    component.ageFormControl.setValue(50);
    errors = component.ageFormControl.errors || {};
    expect(errors['min']).toBeFalsy();
    expect(errors['max']).toBeFalsy();

  });

  it('form submits (createStudent), a student should be created and returned', () => {
    component.firstNameFormControl.setValue('Jason');
    component.lastNameFormControl.setValue('McCartey');
    component.ageFormControl.setValue(50);

    expect(component.studentForm.valid).toBeTruthy();

    component.createStudent();

    expect(component.hasError).toBeNull();
  });

  it('form submits (editStudent), the student should be edited and returned', () => {
    component.data = { student: StudentMock };

    component.firstNameFormControl.setValue('Jack');
    component.lastNameFormControl.setValue('McCourtey');
    component.ageFormControl.setValue(25);

    expect(component.studentForm.valid).toBeTruthy();

    component.editStudent();

    expect(component.hasError).toBeNull();
  });

});
