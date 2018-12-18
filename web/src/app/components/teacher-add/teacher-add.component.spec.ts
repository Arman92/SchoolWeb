import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAddComponent } from './teacher-add.component';

describe('TeacherAddComponent', () => {
  let component: TeacherAddComponent;
  let fixture: ComponentFixture<TeacherAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherAddComponent ]
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
