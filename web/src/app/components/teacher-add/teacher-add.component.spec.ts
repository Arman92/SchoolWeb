import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAddComponent } from './teacher-add.component';
import { DemoMaterialModule } from 'src/app/common/material.module';
import { APP_CONFIG, APP_DI_CONFIG } from 'src/app/config/app-config.module';
import { TeacherMockService } from 'src/app/services/mock/teacher.mock';
import { TeacherService } from 'src/app/services/teacher.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('TeacherAddComponent', () => {
  let component: TeacherAddComponent;
  let fixture: ComponentFixture<TeacherAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherAddComponent],
      imports: [
        DemoMaterialModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: APP_CONFIG, useValue: APP_DI_CONFIG },
        { provide: TeacherService, useClass: TeacherMockService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('form should be invalid when empty', () => {
    expect(component.teacherForm.valid).toBeFalsy();
  });

  it('each field should be invalid initially', () => {
    expect(component.firstNameFormControl.valid).toBeFalsy();
    expect(component.lastNameFormControl.valid).toBeFalsy();
  });

  it('field errors should be correct in case of invalidity', () => {
    let errors = component.firstNameFormControl.errors || {};
    expect(errors['required']).toBeTruthy();

    errors = component.lastNameFormControl.errors || {};
    expect(errors['required']).toBeTruthy();

    component.firstNameFormControl.setValue('ab');
    errors = component.firstNameFormControl.errors || {};
    expect(errors['minlength']).toBeTruthy();
    expect(errors['required']).toBeFalsy();

    component.lastNameFormControl.setValue('ab');
    errors = component.lastNameFormControl.errors || {};
    expect(errors['minlength']).toBeTruthy();
    expect(errors['required']).toBeFalsy();
  });

  it('form submits (createTeacher), a teacher should be created and returned', () => {
    component.firstNameFormControl.setValue('Jason');
    component.lastNameFormControl.setValue('McCartey');

    expect(component.teacherForm.valid).toBeTruthy();

    component.createTeacher();

    expect(component.hasError).toBeNull();
  });

});
