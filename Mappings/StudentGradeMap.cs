

using FluentNHibernate.Mapping;
using SchoolWeb.Entities;

namespace SchoolWeb.Mappings
{
    public class StudentGradeMap : ClassMap<StudentGrade>
    {
        public StudentGradeMap()
        {
            Map(x => x.Grade);

            References(x => x.Course);
            References(x => x.Student);

            CompositeId()
                .KeyReference(x => x.Student, "student_id")
                .KeyReference(x => x.Course, "course_id");

        }
    }
}