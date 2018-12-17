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
    public class StudentController : Controller
    {
        ISession nhSession;
        public StudentController(ISession session)
        {
            nhSession = session;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int currentPageNo = 1, int pageSize = 20)
        {
            var users = await nhSession
                .Query<Student>()
                .Skip((currentPageNo - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            if (!users.Any())
            {
                return NotFound("No student found");
            }
            else
            {
                return Ok(users);
            }

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var user = await nhSession
                .Query<Student>()
                .Where(s => s.Id == id)
                .SingleOrDefaultAsync();

            if (user == null)
            {
                return NotFound("Student not Found");
            }
            else
            {
                return Json(user);
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

                    return CreatedAtAction("Post", student);
                }
            }
            else
            {
                return BadRequest("Students's name was not given");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Student userUpdateValue)
        {
            var studentToEdit = await nhSession.Query<Student>()
                                    .Where(s => s.Id == id)
                                    .SingleOrDefaultAsync();

            if (studentToEdit == null)
            {
                return NotFound("Could not update student as it was not Found");
            }
            else
            {
                using (var tr = nhSession.BeginTransaction())
                {
                    await nhSession.SaveOrUpdateAsync(userUpdateValue);
                    await tr.CommitAsync();

                    return Json("Updated student");
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
