

using FluentNHibernate.Mapping;
using SchoolWeb.Entities;

namespace SchoolWeb.Mappings
{
    public class CourseMap : ClassMap<Course>
    {
        public CourseMap()
        {
            Id(x => x.Id);
            Map(x => x.Name).Not.Nullable();
            Map(x => x.Location).Not.Nullable();
            References(x => x.Teacher);

            HasMany(x => x.StudentGrades)
                .Cascade.All()
                .Inverse();
        }

    }
}