import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatCardModule, MatListModule, MatTableModule, MatButtonModule,
  MatButtonToggleModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher
} from '@angular/material';

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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CourseListComponent,
    StudentListComponent,
    StudentAddComponent,
    CourseAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatButtonModule,
    MatButtonToggleModule,
    AppConfigModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    StudentService,
    CourseService,
    TeacherService,
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  entryComponents: [StudentAddComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
