
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace SchoolWeb.Entities
{
    [JsonObject(NamingStrategyType = typeof(CamelCaseNamingStrategy))]
    public class Course
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual string Location { get; set; }
        public virtual Teacher Teacher { get; set; }
        public virtual IList<StudentGrade> StudentGrades { get; set; }

        public Course()
        {
            StudentGrades = new List<StudentGrade>();
        }

    }
}
