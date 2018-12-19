import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGradeAddComponent } from './student-grade-add.component';

describe('StudentGradeAddComponent', () => {
  let component: StudentGradeAddComponent;
  let fixture: ComponentFixture<StudentGradeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentGradeAddComponent]
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
