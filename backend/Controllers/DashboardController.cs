using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace backend.Controllers;


[Authorize]
[Route("/dashboard")]
[ApiController]

public class DashboardController : ControllerBase
{
    [HttpGet]
    public IActionResult GetDashboard()
    {
        return StatusCode(401);
    }
}
