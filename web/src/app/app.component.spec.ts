import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { routes } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { DemoMaterialModule } from './common/material.module';
import { AppConfigModule } from './config/app-config.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { StudentGradeListComponent } from './components/student-grade-list/student-grade-list.component';
import { StudentGradeAddComponent } from './components/student-grade-add/student-grade-add.component';
import { YesNoDialogComponent } from './common/yes-no-dialog/yes-no-dialog.component';
import { CourseAddComponent } from './components/course-add/course-add.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        DemoMaterialModule,
        BrowserAnimationsModule,
        AppConfigModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        CourseListComponent,
        StudentAddComponent,
        StudentListComponent,
        StudentGradeListComponent,
        StudentGradeAddComponent,
        YesNoDialogComponent,
        CourseAddComponent

      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'school-web'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('school-web');
  });

  // it('should render title in a section tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('section').textContent).toBeTruthy();
  // });
});
