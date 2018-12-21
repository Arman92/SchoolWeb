import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListComponent } from './student-list.component';
import { DemoMaterialModule } from 'src/app/common/material.module';
import { APP_CONFIG, APP_DI_CONFIG } from 'src/app/config/app-config.module';
import { StudentService } from 'src/app/services/student.service';
import { StudentMockService } from 'src/app/services/mock/student.mock';

describe('StudentListComponent', () => {
  let component: StudentListComponent;
  let fixture: ComponentFixture<StudentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentListComponent],
      imports: [
        DemoMaterialModule,
      ],
      providers: [
        { provide: APP_CONFIG, useValue: APP_DI_CONFIG },
        { provide: StudentService, useClass: StudentMockService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
