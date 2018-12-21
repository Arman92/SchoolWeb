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
});
