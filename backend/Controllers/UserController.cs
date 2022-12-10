using backend.DTOs;
using backend.DTOs.User;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace backend.Controllers;

[ApiController]
[Authorize]
[Route("/user")]
public class UserController : ControllerBase
{
    private readonly UserService _userService;

    public UserController([FromServices] UserService service)
    {
        _userService = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<UserResponseDTO>>> GetUsers()
    {
        try
        {
            List<UserResponseDTO> userResponseDTO = await _userService.GetUsers();
            return userResponseDTO;
        }
        catch (Exception e)
        {
            throw new Exception("Não foi possível recuperar os usuários! " + e.Message);
        }
    }

    [HttpGet("{Id}")]
    public async Task<ActionResult<UserResponseDTO>> GetUser([FromRoute] string Id)
    {
        try
        {
            var userResponseDTO = await _userService.GetUser(Id);
            return userResponseDTO;
        }
        catch (Exception e)
        {
            throw new Exception("Não foi possível recuperar o usuário! " + e.Message);
        }
    }

    [HttpDelete("{Id}")]
    public async Task<ActionResult> DeleteUser([FromRoute] string Id)
    {
        try
        {
            var userResponseDTO = await _userService.DeleteUser(Id);
            return StatusCode(204);
        }
        catch (Exception e)
        {
            throw new Exception("Erro ao excluir usuário! " + e.Message);
        }
    }

    [HttpPut("{Id}")]
    public async Task<ActionResult<UserResponseDTO>> PutUser([FromRoute] string Id, [FromBody] UserRequestDTO userRequestDTO)
    {
        try
        {
            var userResponseDTO = await _userService.PutUser(userRequestDTO, Id);
            return StatusCode(200, userResponseDTO);
        }
        catch (Exception e)
        {
            throw new Exception("Erro ao excluir usuário! " + e.Message);
        }
    }

    //cadastrar
    [AllowAnonymous]
    [HttpPost("/signup")]
    public async Task<ActionResult<UserResponseDTO>> SignUp([FromBody] UserRequestDTO userRequestDTO)
    {
        try
        {
            var userResponseDTO = await _userService.PostUser(userRequestDTO);
            return StatusCode(201, userResponseDTO);
        }
        catch (Exception e)
        {
            throw new Exception("Erro ao cadastrar usuário! " + e);
        }
    }

    //logar
    [AllowAnonymous]
    [HttpPost("/signin")]
    public async Task<ActionResult<LoginResponseDTO>> SignIn([FromBody] LoginRequestDTO loginRequestDTO)
    {
        try
        {
            var LoginResponseDTO = await _userService.SignIn(loginRequestDTO);
            return StatusCode(200, LoginResponseDTO);
        }
        catch (Exception e)
        {
            return StatusCode(401, e.Message);
        }
    }
}


