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
    public class TeachersController : Controller
    {
        ISession nhSession;
        public TeachersController(ISession session)
        {
            nhSession = session;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int currentPageNo = 1, int pageSize = 20)
        {
            var teachers = await nhSession
                .Query<Teacher>()
                .Skip((currentPageNo - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(teachers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var teacher = await nhSession
                .Query<Teacher>()
                .Where(s => s.Id == id)
                .SingleOrDefaultAsync();

            if (teacher == null)
            {
                return NoContent(); // Returns a 204 No Content response
            }
            else
            {
                return Json(teacher);
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
        public async Task<IActionResult> Put(int id, [FromBody] Teacher teacherUpdateValue)
        {
            var teacherToEdit = await nhSession.Query<Teacher>()
                                    .Where(s => s.Id == id)
                                    .SingleOrDefaultAsync();

            if (teacherToEdit == null)
            {
                return NotFound("Could not update teacher as it was not Found");
            }
            else
            {
                using (var tr = nhSession.BeginTransaction())
                {
                    await nhSession.SaveOrUpdateAsync(teacherUpdateValue);
                    await tr.CommitAsync();

                    return Json("Updated teacher");
                }
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var teacherToDelete = await nhSession.Query<Teacher>()
                                    .Where(s => s.Id == id)
                                    .SingleOrDefaultAsync();

            if (teacherToDelete == null)
            {
                return NotFound("Could not delete teacher as it was not Found");
            }
            else
            {
                using (var tr = nhSession.BeginTransaction())
                {
                    await nhSession.DeleteAsync(teacherToDelete);
                    await tr.CommitAsync();

                    return Json("Deleted teacher");
                }
            }
        }

    }
}
