using backend.DTOs.Post;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace backend.Controllers;

[ApiController]
[Authorize]
[Route("dashboard")]
public class DashboardController : ControllerBase
{

    [HttpGet]
    public async Task<List<PostResponseDTO>> GetPosts(
        [FromForm] PostRequestDTO postRequestDTO,
        [FromServices] PostService service
        )
    {
        try
        {
            List<PostResponseDTO> postResponseDTO = await service.GetPosts();
            return postResponseDTO;
        }
        catch (Exception exception)
        {
            throw new Exception("Não foi possível recuperar os posts! " + exception.Message);
        }
    }

    [HttpPut("{id:int}")]
    public async Task<PostResponseDTO> GetPost([FromRoute] int id,
    [FromServices] PostService service)
    {
        try
        {

            PostResponseDTO postResponseDTO = await service.GetPost(id);
            return postResponseDTO;
        }
        catch (Exception exception)
        {
            throw new Exception("Não foi possível recuperar os posts! " + exception.Message);
        }
    }

    // [HttpDelete("{id:int}")]
    // public async<IActionResult> GetPost([FromRoute] int id,
    // [FromServices] PostService service)
    // {
    //     try
    //     {

    //         PostResponseDTO postResponseDTO = await service.GetPost(id);
    //         return postResponseDTO;
    //     }
    //     catch (Exception exception)
    //     {
    //         throw new Exception("Não foi possível recuperar os posts! " + exception.Message);
    //     }
    // }
}
