
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using Newtonsoft.Json;

namespace SchoolWeb.Entities
{
    public class Student
    {
        public virtual int Id { get; protected set; }
        public virtual string FirstName { get; set; }
        public virtual string LastName { get; set; }
        public virtual uint Age { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual IList<Course> Courses { get; protected set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual IList<StudentGrade> StudentGrades { get; set; }

        public Student()
        {
            Courses = new List<Course>();
            StudentGrades = new List<StudentGrade>();
        }
    }
}