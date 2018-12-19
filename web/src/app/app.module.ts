import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { AppConfigModule } from './config/app-config.module';
import { StudentService } from './services/student.service';
import { CourseService } from './services/course.service';
import { TeacherService } from './services/teacher.service';
import { HttpClientModule } from '@angular/common/http';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { CourseAddComponent } from './components/course-add/course-add.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DemoMaterialModule } from './common/material.module';
import { TeacherAddComponent } from './components/teacher-add/teacher-add.component';
import { YesNoDialogComponent } from './common/yes-no-dialog/yes-no-dialog.component';
import { StudentGradeService } from './services/student-grade.service';
import { StudentGradeListComponent } from './components/student-grade-list/student-grade-list.component';
import { StudentGradeAddComponent } from './components/student-grade-add/student-grade-add.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CourseListComponent,
    StudentListComponent,
    StudentGradeListComponent,
    StudentAddComponent,
    StudentGradeAddComponent,
    CourseAddComponent,
    TeacherAddComponent,
    YesNoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    AppConfigModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    StudentService,
    StudentGradeService,
    CourseService,
    TeacherService,
    StudentGradeService
  ],
  entryComponents: [StudentAddComponent, StudentGradeAddComponent, CourseAddComponent, TeacherAddComponent, YesNoDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
