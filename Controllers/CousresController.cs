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
    public class CoursesController : Controller
    {
        ISession nhSession;
        public CoursesController(ISession session)
        {
            nhSession = session;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int currentPageNo = 1, int pageSize = 20)
        {
            var courses = await nhSession
                .Query<Course>()
                .Skip((currentPageNo - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Json(courses);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var course = await nhSession
                .Query<Course>()
                .Where(s => s.Id == id)
                .SingleOrDefaultAsync();

            if (course == null)
            {
                return NoContent(); // Returns a 204 No Content response
            }
            else
            {
                return Json(course);
            }
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Course course)
        {
            if (!string.IsNullOrEmpty(course.Name))
            {
                using (var tr = nhSession.BeginTransaction())
                {
                    var teacher = await nhSession.GetAsync<Teacher>(course.Teacher.Id);
                    if (teacher != null)
                    {
                        course.Teacher = teacher;
                        await nhSession.SaveAsync(course);
                        await tr.CommitAsync();

                        return CreatedAtAction("Post", course);
                    }
                    else
                    {
                        return BadRequest("Teacher not found");
                    }

                }
            }
            else
            {
                return BadRequest("Course name was not given");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Course courseUpdateValue)
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
                    await nhSession.SaveOrUpdateAsync(courseUpdateValue);
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
