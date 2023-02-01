using backend.DTOs;
using backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using backend.DTOs.User;
using Mapster;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using backend.Infrastructure.Config.Identity;

namespace backend.Services;

public class UserService
{
    private readonly UserRepository _userRepository;
    private readonly IConfiguration _configuration;
    private readonly IHttpContextAccessor _httpContextAccessor;
    //identity dependencies
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    public UserService([FromServices] UserRepository repository, UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
    {
        _configuration = configuration;
        _httpContextAccessor = httpContextAccessor;
        _userRepository = repository;
        _userManager = userManager;
        _signInManager = signInManager;
    }

    public async Task<List<UserResponseDTO>> GetUsers()
    {
        List<User> listUsers = await _userRepository.GetUsers();
        var userResponseDTOs = listUsers.Adapt<List<UserResponseDTO>>();
        return userResponseDTOs;
    }

    public async Task<UserResponseDTO> GetUser(string Id)
    {
        var user = await _userManager.FindByIdAsync(Id);
        if (user == null)
            throw new ArgumentException("Usuário não existe!");
        var userResponseDTO = user.Adapt<UserResponseDTO>();
        return userResponseDTO;
    }

    public async Task<UserResponseDTO> PutUser(UserRequestDTO userRequestDTO, string Id)
    {
        User findedUser = await _userManager.FindByIdAsync(Id);
        if (findedUser == null)
            throw new ArgumentException("Usuário não encontrado");
        findedUser.Email = userRequestDTO.Email;
        findedUser.UserName = userRequestDTO.UserName;
        var updatedUser = await _userRepository.PutUser(findedUser);
        return updatedUser.Adapt<UserResponseDTO>();
    }

    public async Task<Boolean> DeleteUser(string Id)
    {
        User findedUser = await _userRepository.GetUser(Id);
        if (findedUser == null)
            throw new ArgumentException("Usuário não encontrado");
        await _userRepository.DeleteUser(Id);
        return true;
    }

    public async Task<UserResponseDTO> PostUser(UserRequestDTO userRequestDTO)
    {
        var userExists = await _userManager.FindByNameAsync(userRequestDTO.UserName);
        if (userExists != null)
        {
            var userResponseDTO1 = new UserResponseDTO();
            return userResponseDTO1;
        }

        var emailExists = await _userManager.FindByEmailAsync(userRequestDTO.Email);
        if (emailExists != null)
        {
            var userResponseDTO1 = new UserResponseDTO();
            return userResponseDTO1;
        }

        if (string.IsNullOrWhiteSpace(userRequestDTO.UserName) || string.IsNullOrWhiteSpace(userRequestDTO.Senha))
        {
            var userResponseDTO1 = new UserResponseDTO();
            return userResponseDTO1;
        }

        var user = new User
        {
            UserName = userRequestDTO.UserName,
            Email = userRequestDTO.Email,
            DataCriacao = DateTime.Now,
            DataAtualizacao = DateTime.Now,
        };

        var result = await _userManager.CreateAsync(user, userRequestDTO.Senha);

        if (!result.Succeeded)
            throw new ArgumentException("Cadastro do usuário falhou." + result);
        //Senha precisa ter um digito, uma uppercase letter e um alfanumérico

        UserResponseDTO userResponseDTO = user.Adapt<UserResponseDTO>();
        return userResponseDTO;
    }

    public async Task<TokenJWT> SignIn(LoginRequestDTO loginRequestDTO)
    {
        var user = await _userManager.FindByNameAsync(loginRequestDTO.UserName);
        if (user == null)
            throw new ArgumentException("Usuário não encontrado.");

        if (!await _userManager.CheckPasswordAsync(user, loginRequestDTO.Senha))
            throw new ArgumentException("Senha inválida.");

        var userRoles = await _userManager.GetRolesAsync(user);

        var authClaims = new List<Claim>{
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

        foreach (var userRole in userRoles)
        {
            authClaims.Add(new Claim(ClaimTypes.Role, userRole));
        }

        var token = new TokenJWTBuilder()
            .AddSecurityKey(JwtSecurityKey.Create("Secret_Key-12345678"))
            .AddSubject("Pedro - Developer")
            .AddIssuer("Teste.Securiry.Bearer")
            .AddAudience("Teste.Securiry.Bearer")
            .AddExpiry(5)
            .Builder();

        return token;
    }

    public async Task<User> GetCurrentUser()
    {
        var userId = _userManager.GetUserId(_httpContextAccessor.HttpContext.User);
        User user = await _userManager.GetUserAsync(_httpContextAccessor.HttpContext.User);
        return user;
    }
}
