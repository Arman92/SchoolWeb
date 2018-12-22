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
    public class StudentsController : Controller
    {
        ISession nhSession;
        public StudentsController(ISession session)
        {
            nhSession = session;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int currentPageNo = 1, int pageSize = 20)
        {
            var students = await nhSession
                .Query<Student>()
                .Skip((currentPageNo - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Json(APIResult.New().WithSuccess().WithResult(students));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var student = await nhSession
                .Query<Student>()
                .Where(s => s.Id == id)
                .SingleOrDefaultAsync();

            if (student == null)
            {
                return NotFound(Json(APIResult.New().WithError("Student Not found"))); // Returns a 204 No Content response
            }
            else
            {
                return Json(APIResult.New().WithSuccess().WithResult(student));
            }
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Student student)
        {
            if (!string.IsNullOrEmpty(student.FirstName))
            {
                using (var tr = nhSession.BeginTransaction())
                {
                    await nhSession.SaveAsync(student);
                    await tr.CommitAsync();

                    return Json(APIResult.New().WithSuccess().WithResult(student));
                }
            }
            else
            {
                return BadRequest(Json(APIResult.New().WithError("Student's name was not given")));
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Student studentUpdateValue)
        {
            var studentToEdit = await nhSession.Query<Student>()
                                    .Where(s => s.Id == id)
                                    .SingleOrDefaultAsync();

            if (studentToEdit == null)
            {
                return NotFound(APIResult.New().WithError("Could not update student as it was not Found"));
            }
            else
            {
                using (var tr = nhSession.BeginTransaction())
                {
                    studentToEdit.FirstName = studentUpdateValue.FirstName;
                    studentToEdit.LastName = studentUpdateValue.LastName;
                    studentToEdit.Age = studentUpdateValue.Age;

                    await nhSession.SaveOrUpdateAsync(studentToEdit);
                    await tr.CommitAsync();

                    return Json(APIResult.New().WithSuccess().WithResult(studentToEdit));
                }
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var studentToDelete = await nhSession.Query<Student>()
                                    .Where(s => s.Id == id)
                                    .SingleOrDefaultAsync();

            if (studentToDelete == null)
            {
                return NotFound(APIResult.New().WithError("Could not delete student as it was not Found"));
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
