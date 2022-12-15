using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace backend.Models;

public class User : IdentityUser
{

    [Required]
    public DateTime DataCriacao { get; set; }

    [Required]
    public DateTime DataAtualizacao { get; set; }
}
