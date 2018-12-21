import { TestBed } from '@angular/core/testing';
import { StudentGradeService } from './student-grade.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppConfigModule, APP_CONFIG, APP_DI_CONFIG, AppConfig } from '../config/app-config.module';
import { APIResult } from '../common/api-result';
import { StudentGrade } from '../models/studentGrade';
import { StudentGradeListMock } from './mock/student-grade.mock';


describe('StudentGradeService', () => {
    let service: StudentGradeService;
    let httpMock: HttpTestingController;
    let appConfig: AppConfig;

    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
            AppConfigModule
        ],
        providers: [
            StudentGradeService,
            { provide: APP_CONFIG, useValue: APP_DI_CONFIG },
        ]
    }));


    beforeEach(() => {
        // inject the service
        service = TestBed.get(StudentGradeService);
        appConfig = TestBed.get(APP_CONFIG);
        httpMock = TestBed.get(HttpTestingController);
    });


    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get the student grades successfully', () => {
        service.getStudentGrades().subscribe(data => {
            expect(data.success).toBe(true);
            expect(data.result).toBeTruthy();
            expect(data.result.length).toBeGreaterThan(0);
            expect(data.result[0].grade).toBe(StudentGradeListMock[0].grade);
            expect(data.result[0].course.id).toBe(StudentGradeListMock[0].course.id);
        });

        const req = httpMock.expectOne(`${appConfig.apiEndpoint}/api/StudentGrades`, 'getting student grades');
        expect(req.request.method).toBe('GET');

        const apiResponse: APIResult<StudentGrade[]> = {
            success: true,
            errorMessage: '',
            result: StudentGradeListMock
        };

        req.flush(apiResponse);
        httpMock.verify();

    });

});
