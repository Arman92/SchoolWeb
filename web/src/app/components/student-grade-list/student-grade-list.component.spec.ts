import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGradeListComponent } from './student-grade-list.component';
import { DemoMaterialModule } from 'src/app/common/material.module';
import { APP_CONFIG, APP_DI_CONFIG } from 'src/app/config/app-config.module';
import { StudentGradeService } from 'src/app/services/student-grade.service';
import { StudentGradeMockService } from 'src/app/services/mock/student-grade.mock';

describe('StudentGradeListComponent', () => {
  let component: StudentGradeListComponent;
  let fixture: ComponentFixture<StudentGradeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentGradeListComponent],
      imports: [
        DemoMaterialModule,
      ],
      providers: [
        { provide: APP_CONFIG, useValue: APP_DI_CONFIG },
        { provide: StudentGradeService, useClass: StudentGradeMockService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentGradeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
