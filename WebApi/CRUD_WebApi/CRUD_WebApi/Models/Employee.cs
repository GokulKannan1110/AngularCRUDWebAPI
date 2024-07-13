using System.ComponentModel.DataAnnotations;

namespace CRUD_WebApi.Models
{
    public class Employee
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
    }
}
