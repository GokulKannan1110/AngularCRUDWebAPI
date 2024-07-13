using CRUD_WebApi.DataBase;
using CRUD_WebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUD_WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeDbContext EmployeeDbContext;

        public EmployeeController(EmployeeDbContext employeeDbContext)
        {
            this.EmployeeDbContext = employeeDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
           var employees = await EmployeeDbContext.Employees.ToListAsync();
           return Ok(employees);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmployee([FromBody] Employee employee)
        {
            employee.Id = Guid.NewGuid();
            await EmployeeDbContext.Employees.AddAsync(employee);
            await EmployeeDbContext.SaveChangesAsync();
            return Ok(employee);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateEmployee([FromRoute] Guid id, [FromBody] Employee employee)
        {
            var employeeRecord = await EmployeeDbContext.Employees.FirstOrDefaultAsync(emp => emp.Id == id);
            if(employeeRecord != null)
            {
                employeeRecord.Name = employee.Name;
                employeeRecord.Email = employee.Email;
                employeeRecord.MobileNo = employee.MobileNo;
                await EmployeeDbContext.SaveChangesAsync();
                return Ok(employee);
            }
            else
            {
                return NotFound("Employee Not Found");
            }           
            
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] Guid id)
        {
            var employeeRecord = await EmployeeDbContext.Employees.FirstOrDefaultAsync(emp => emp.Id == id);
            if (employeeRecord != null)
            {
                EmployeeDbContext.Employees.Remove(employeeRecord);
                await EmployeeDbContext.SaveChangesAsync();
                return Ok(employeeRecord);
            }
            else
            {
                return NotFound("Employee Not Found");
            }

        }
    }
}
