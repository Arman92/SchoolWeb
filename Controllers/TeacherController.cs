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
    public class TeacherController : Controller
    {
        ISession nhSession;
        public TeacherController(ISession session)
        {
            nhSession = session;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int currentPageNo = 1, int pageSize = 20)
        {
            var users = await nhSession
                .Query<Teacher>()
                .Skip((currentPageNo - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            if (!users.Any())
            {
                return NotFound("No teacher found");
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
                .Query<Teacher>()
                .Where(s => s.Id == id)
                .SingleOrDefaultAsync();

            if (user == null)
            {
                return NotFound("Teacher not Found");
            }
            else
            {
                return Json(user);
            }
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Teacher teacher)
        {
            if (!string.IsNullOrEmpty(teacher.FirstName))
            {
                using (var tr = nhSession.BeginTransaction())
                {
                    await nhSession.SaveAsync(teacher);
                    await tr.CommitAsync();

                    return CreatedAtAction("Post", teacher);
                }
            }
            else
            {
                return BadRequest("Teacher's name was not given");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Teacher userUpdateValue)
        {
            var studentToEdit = await nhSession.Query<Teacher>()
                                    .Where(s => s.Id == id)
                                    .SingleOrDefaultAsync();

            if (studentToEdit == null)
            {
                return NotFound("Could not update teacher as it was not Found");
            }
            else
            {
                using (var tr = nhSession.BeginTransaction())
                {
                    await nhSession.SaveOrUpdateAsync(userUpdateValue);
                    await tr.CommitAsync();

                    return Json("Updated teacher");
                }
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var studentToDelete = await nhSession.Query<Teacher>()
                                    .Where(s => s.Id == id)
                                    .SingleOrDefaultAsync();

            if (studentToDelete == null)
            {
                return NotFound("Could not delete teacher as it was not Found");
            }
            else
            {
                using (var tr = nhSession.BeginTransaction())
                {
                    await nhSession.DeleteAsync(studentToDelete);
                    await tr.CommitAsync();

                    return Json("Deleted teacher");
                }
            }
        }

    }
}
