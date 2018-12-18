
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace SchoolWeb.Entities
{
    [JsonObject(NamingStrategyType = typeof(CamelCaseNamingStrategy))]
    public class StudentGrade
    {
        public virtual Course Course { get; set; }
        public virtual Student Student { get; set; }
        public virtual float Grade { get; set; }


        public override int GetHashCode()
        {
            return (Course.Id + "|" + Student.Id).GetHashCode();

        }

        public override bool Equals(object obj)
        {
            var toCompare = obj as StudentGrade;
            if (toCompare == null)
            {
                return false;
            }
            return (this.GetHashCode() == toCompare.GetHashCode()) && this.Grade == toCompare.Grade;
        }
    }
}
