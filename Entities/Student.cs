
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
    public class Student
    {
        public virtual int Id { get; set; }
        public virtual string FirstName { get; set; }
        public virtual string LastName { get; set; }
        public virtual uint Age { get; set; }
        public virtual IList<StudentGrade> StudentGrades { get; set; }

        public Student()
        {
            StudentGrades = new List<StudentGrade>();
        }
    }
}