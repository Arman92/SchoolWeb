using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NHibernate;
using SchoolWeb.Database;
using NHibernate.Linq;
using SchoolWeb.Entities;
using SchoolWeb.Helper;

namespace SchoolWeb.Controllers
{
    [Route("api/[controller]")]
    public class StudentGradesController : Controller
    {
        ISession nhSession;
        public StudentGradesController(ISession session)
        {
            nhSession = session;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int currentPageNo = 1, int pageSize = 20)
        {
            var students = await nhSession
                .Query<StudentGrade>()
                .Skip((currentPageNo - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Json(APIResult.New().WithSuccess().WithResult(students));
        }

        [HttpGet]
        [Route("GetByCourse/{courseId}")]
        public async Task<IActionResult> GetByCourse(int courseId)
        {
            var studentGrades = await nhSession
            .Query<StudentGrade>()
            .Where(c => c.Course.Id == courseId)
            .ToListAsync();

            return Json(APIResult.New().WithSuccess().WithResult(studentGrades));
        }


        [HttpPost]
        [Route("{courseId}/{studentId}")]
        public async Task<IActionResult> Post(int courseId, int studentId, [FromBody] float grade)
        {
            using (var tr = nhSession.BeginTransaction())
            {
                var course = await nhSession.GetAsync<Course>(courseId);
                var student = await nhSession.GetAsync<Student>(studentId);
                if (course != null && student != null)
                {
                    var studentGrade = new StudentGrade();
                    studentGrade.Course = course;
                    studentGrade.Student = student;
                    studentGrade.Grade = grade;
                    await nhSession.SaveAsync(studentGrade);
                    await tr.CommitAsync();

                    return Json(APIResult.New().WithSuccess().WithResult(studentGrade));
                }
                else
                {
                    return BadRequest(Json(APIResult.New().WithError("Either Course or Student does not exist")));
                }

            }
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] StudentGrade studentGradeUpdate)
        {
            var studentGradeToEdit = await nhSession.Query<StudentGrade>()
                                    .Where(s => s.Course.Id == studentGradeUpdate.Course.Id && s.Student.Id == studentGradeUpdate.Student.Id)
                                    .SingleOrDefaultAsync();

            if (studentGradeToEdit == null)
            {
                return NotFound(Json(APIResult.New().WithError("Could not update student as it was not Found")));
            }
            else
            {
                using (var tr = nhSession.BeginTransaction())
                {
                    studentGradeToEdit.Grade = studentGradeUpdate.Grade;

                    await nhSession.SaveOrUpdateAsync(studentGradeToEdit);
                    await tr.CommitAsync();

                    return Json(APIResult.New().WithSuccess().WithResult(studentGradeToEdit));
                }
            }
        }


        [HttpDelete()]
        [Route("GetByCourse/{courseId}/{studentId}")]
        public async Task<IActionResult> Delete(int courseId, int studentId)
        {
            var studentToDelete = await nhSession.Query<StudentGrade>()
                                    .Where(s => s.Course.Id == courseId && s.Student.Id == studentId)
                                    .SingleOrDefaultAsync();

            if (studentToDelete == null)
            {
                return NotFound(Json(APIResult.New().WithError("Could not delete student as it was not Found")));
            }
            else
            {
                using (var tr = nhSession.BeginTransaction())
                {
                    await nhSession.DeleteAsync(studentToDelete);
                    await tr.CommitAsync();

                    return Json(APIResult.New().WithSuccess().WithResult(true));
                }
            }
        }

    }
}
