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
    public class CourseController : Controller
    {
        ISession nhSession;
        public CourseController(ISession session)
        {
            nhSession = session;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int currentPageNo = 1, int pageSize = 20)
        {
            var users = await nhSession
                .Query<Course>()
                .Skip((currentPageNo - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            if (!users.Any())
            {
                return NotFound("No course found");
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
                .Query<Course>()
                .Where(s => s.Id == id)
                .SingleOrDefaultAsync();

            if (user == null)
            {
                return NotFound("Course not Found");
            }
            else
            {
                return Json(user);
            }
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Course course)
        {
            if (!string.IsNullOrEmpty(course.Name))
            {
                using (var tr = nhSession.BeginTransaction())
                {
                    await nhSession.SaveAsync(course);
                    await tr.CommitAsync();

                    return CreatedAtAction("Post", course);
                }
            }
            else
            {
                return BadRequest("Course name was not given");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Course userUpdateValue)
        {
            var studentToEdit = await nhSession.Query<Course>()
                                    .Where(s => s.Id == id)
                                    .SingleOrDefaultAsync();

            if (studentToEdit == null)
            {
                return NotFound("Could not update course as it was not Found");
            }
            else
            {
                using (var tr = nhSession.BeginTransaction())
                {
                    await nhSession.SaveOrUpdateAsync(userUpdateValue);
                    await tr.CommitAsync();

                    return Json("Updated course");
                }
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var studentToDelete = await nhSession.Query<Course>()
                                    .Where(s => s.Id == id)
                                    .SingleOrDefaultAsync();

            if (studentToDelete == null)
            {
                return NotFound("Could not delete course as it was not Found");
            }
            else
            {
                using (var tr = nhSession.BeginTransaction())
                {
                    await nhSession.DeleteAsync(studentToDelete);
                    await tr.CommitAsync();

                    return Json("Deleted course");
                }
            }
        }

    }
}
