import { TestBed } from '@angular/core/testing';

import { TeacherService } from './teacher.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AppConfig, AppConfigModule, APP_CONFIG, APP_DI_CONFIG } from '../config/app-config.module';
import { APIResult } from '../common/api-result';
import { TeacherListMock } from './mock/teacher.mock';
import { Teacher } from '../models/teacher';

describe('TeacherService', () => {
  let service: TeacherService;
  let httpMock: HttpTestingController;
  let appConfig: AppConfig;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      AppConfigModule
    ],
    providers: [
      TeacherService,
      { provide: APP_CONFIG, useValue: APP_DI_CONFIG },
    ]
  }));


  beforeEach(() => {
    // inject the service
    service = TestBed.get(TeacherService);
    appConfig = TestBed.get(APP_CONFIG);
    httpMock = TestBed.get(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the teachers successfully', () => {
    service.getTeachers().subscribe(data => {
      expect(data.success).toBe(true);
      expect(data.result).toBeTruthy();
      expect(data.result.length).toBeGreaterThan(0);
      expect(data.result[0].id).toBe(TeacherListMock[0].id);
      expect(data.result[1].id).toBe(TeacherListMock[1].id);
    });

    const req = httpMock.expectOne(`${appConfig.apiEndpoint}/api/Teachers`, 'getting teachers');
    expect(req.request.method).toBe('GET');

    const apiResponse: APIResult<Teacher[]> = {
      success: true,
      errorMessage: '',
      result: TeacherListMock
    };

    req.flush(apiResponse);
    httpMock.verify();

  });
});
