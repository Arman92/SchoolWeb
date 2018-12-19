using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NHibernate;
using SchoolWeb.Database;
using NHibernate.Linq;
using SchoolWeb.Entities;

namespace SchoolWeb.Controllers
{
    [Route("api/[controller]")]
    public class StudentGradeController : Controller
    {
        ISession nhSession;
        public StudentGradeController(ISession session)
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

            return Ok(students);
        }

        [HttpGet]
        [Route("GetByCourse/{courseId}")]
        public async Task<IActionResult> GetByCourse(int courseId)
        {
            var studentGrades = await nhSession
            .Query<StudentGrade>()
            .Where(c => c.Course.Id == courseId)
            .ToListAsync();

            return Ok(studentGrades);
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] StudentGrade studentGrade)
        {
            if (studentGrade.Course != null && studentGrade.Course.Id != 0)
            {
                using (var tr = nhSession.BeginTransaction())
                {
                    await nhSession.SaveAsync(studentGrade);
                    await tr.CommitAsync();

                    return CreatedAtAction("Post", studentGrade);
                }
            }
            else
            {
                return BadRequest("Studentgrade is empty");
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
                return NotFound("Could not update student as it was not Found");
            }
            else
            {
                using (var tr = nhSession.BeginTransaction())
                {
                    studentGradeToEdit.Grade = studentGradeUpdate.Grade;

                    await nhSession.SaveOrUpdateAsync(studentGradeToEdit);
                    await tr.CommitAsync();

                    return Json("Updated student");
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
                return NotFound("Could not delete student as it was not Found");
            }
            else
            {
                using (var tr = nhSession.BeginTransaction())
                {
                    await nhSession.DeleteAsync(studentToDelete);
                    await tr.CommitAsync();

                    return Json("Deleted student");
                }
            }
        }

    }
}
