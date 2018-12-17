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
        public StudentController()
        {
        }

        [HttpGet]
        public async Task<IActionResult> Get(int currentPageNo = 1, int pageSize = 20)
        {
            using (var session = DbInitializer.OpenSession())
            {
                var users = await session.Query<Student>().ToListAsync();

                if (!users.Any())
                {
                    return NotFound("Users not Found");
                }
                else
                {
                    return Ok(users);
                }

            }
        }

    }
}
