using CRUD_WebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CRUD_WebApi.DataBase
{
    public class EmployeeDbContext : DbContext
    {
        public EmployeeDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Employee> Employees { get; set; }
    }
}
