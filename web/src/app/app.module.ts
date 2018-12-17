import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { AppConfigModule } from './config/app-config.module';
import { StudentService } from './services/student.service';
import { CourseService } from './services/course.service';
import { TeacherService } from './services/teacher.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CourseListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    AppConfigModule,
    HttpClientModule
  ],
  providers: [StudentService, CourseService, TeacherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
