import { TestBed } from '@angular/core/testing';
import { StudentGradeService } from './student-grade.service';


describe('StudentGradeService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: StudentGradeService = TestBed.get(StudentGradeService);
        expect(service).toBeTruthy();
    });
});
