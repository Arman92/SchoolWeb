
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SchoolWeb.Entities
{
    public class Course
    {
        public virtual int Id { get; protected set; }
        public virtual string Name { get; set; }
        public virtual string Location { get; set; }
        public virtual Teacher Teacher { get; set; }
        public virtual IList<Student> Students { get; set; }
        public virtual IList<StudentGrade> StudentGrades { get; set; }

        public Course()
        {
            Students = new List<Student>();
            StudentGrades = new List<StudentGrade>();
        }

        public virtual void AddStudent(Student student)
        {
            student.Courses.Add(this);
            Students.Add(student);
        }
    }
}
