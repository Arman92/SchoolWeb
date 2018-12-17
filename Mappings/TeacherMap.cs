

using FluentNHibernate.Mapping;
using SchoolWeb.Entities;

namespace SchoolWeb.Mappings
{
    public class TeacherMap : ClassMap<Teacher>
    {
        public TeacherMap()
        {
            Id(x => x.Id);
            Map(x => x.FirstName);
            Map(x => x.LastName);

            HasMany(x => x.Courses)
                .Inverse()
                .Cascade.All();
        }
    }
}