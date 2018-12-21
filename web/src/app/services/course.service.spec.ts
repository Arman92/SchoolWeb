import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CourseService } from './course.service';
import { Course } from '../models/course';
import { APP_CONFIG, APP_DI_CONFIG, AppConfig, AppConfigModule } from '../config/app-config.module';
import { APIResult } from '../common/api-result';
import { CourseListMock } from './mock/course.mock';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;
  let appConfig: AppConfig;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      AppConfigModule
    ],
    providers: [
      CourseService,
      { provide: APP_CONFIG, useValue: APP_DI_CONFIG },
    ]
  }));

  beforeEach(() => {
    // inject the service
    service = TestBed.get(CourseService);
    appConfig = TestBed.get(APP_CONFIG);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the coruses successfully', () => {
    service.getCourses().subscribe(data => {
      expect(data.success).toBe(true);
      expect(data.result).toBeTruthy();
      expect(data.result.length).toBeGreaterThan(0);
    });

    const req = httpMock.expectOne(`${appConfig.apiEndpoint}/api/Courses`, 'getting courses');
    expect(req.request.method).toBe('GET');

    const apiResponse: APIResult<Course[]> = {
      success: true,
      errorMessage: '',
      result: CourseListMock
    };

    req.flush(apiResponse);
    httpMock.verify();

  });

});
