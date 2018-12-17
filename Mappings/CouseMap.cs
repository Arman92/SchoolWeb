

using FluentNHibernate.Mapping;
using SchoolWeb.Entities;

namespace SchoolWeb.Mappings
{
    public class CourseMap : ClassMap<Course>
    {
        public CourseMap()
        {
            Id(x => x.Id);
            Map(x => x.Name);
            References(x => x.Teacher);

            HasManyToMany(x => x.Students)
                 .Cascade.All()
                 .Inverse()
                 .Table("StudentClass");

            HasMany(x => x.StudentGrades)
                .Cascade.All()
                .Inverse();


        }

    }
}