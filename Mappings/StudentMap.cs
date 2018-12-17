

using FluentNHibernate.Mapping;
using SchoolWeb.Entities;

namespace SchoolWeb.Mappings
{
    public class StudentMap : ClassMap<Student>
    {
        public StudentMap()
        {
            Id(x => x.Id);
            Map(x => x.FirstName).Not.Nullable();
            Map(x => x.LastName).Not.Nullable();
            Map(x => x.Age);

            HasManyToMany(x => x.Courses)
                 .Cascade.All()
                 .Table("StudentClass");

            HasMany(x => x.StudentGrades)
                .Cascade.All()
                .Inverse();
        }

    }
}