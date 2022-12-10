using System.ComponentModel.DataAnnotations;

namespace backend.DTOs;

public class UserRequestDTO
{
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Senha { get; set; }

    [Compare("Senha", ErrorMessage = "As senhas não conferem")]
    public string SenhaConfirmacao { get; set; }
}
