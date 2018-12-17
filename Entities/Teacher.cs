
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using Newtonsoft.Json;

namespace SchoolWeb.Entities
{
    public class Teacher
    {
        public virtual int Id { get; protected set; }
        public virtual string FirstName { get; set; }
        public virtual string LastName { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual IList<Course> Courses { get; protected set; }

        public Teacher()
        {
            Courses = new List<Course>();
        }
    }
}