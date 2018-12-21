import { TestBed } from '@angular/core/testing';

import { StudentService } from './student.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AppConfig, AppConfigModule, APP_CONFIG, APP_DI_CONFIG } from '../config/app-config.module';
import { APIResult } from '../common/api-result';
import { StudentGrade } from '../models/studentGrade';
import { StudentListMock } from './mock/student.mock';
import { Student } from '../models/student';

describe('StudentService', () => {
  let service: StudentService;
  let httpMock: HttpTestingController;
  let appConfig: AppConfig;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      AppConfigModule
    ],
    providers: [
      StudentService,
      { provide: APP_CONFIG, useValue: APP_DI_CONFIG },
    ]
  }));


  beforeEach(() => {
    // inject the service
    service = TestBed.get(StudentService);
    appConfig = TestBed.get(APP_CONFIG);
    httpMock = TestBed.get(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the student grades successfully', () => {
    service.getStudents().subscribe(data => {
      expect(data.success).toBe(true);
      expect(data.result).toBeTruthy();
      expect(data.result.length).toBeGreaterThan(0);
      expect(data.result[0].id).toBe(StudentListMock[0].id);
      expect(data.result[1].id).toBe(StudentListMock[1].id);
    });

    const req = httpMock.expectOne(`${appConfig.apiEndpoint}/api/Students`, 'getting students');
    expect(req.request.method).toBe('GET');

    const apiResponse: APIResult<Student[]> = {
      success: true,
      errorMessage: '',
      result: StudentListMock
    };

    req.flush(apiResponse);
    httpMock.verify();

  });
});
