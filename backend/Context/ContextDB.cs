using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
namespace backend.Context;

public class ContextDB : IdentityDbContext<User>
{
    public ContextDB(DbContextOptions<ContextDB> options) : base(options)
    {

    }

    //tables
    public DbSet<User> User { get; set; }
    public DbSet<UserRole> UserRole { get; set; }

}
