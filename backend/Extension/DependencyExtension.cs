using backend.Repositories;
using backend.Services;
namespace backend.Extension;

public static class DependencyExtension
{
    public static void AddServices(this IServiceCollection services)
    {
        services.AddScoped<UserService>();
        services.AddScoped<PostService>();
    }

    public static void AddRepository(this IServiceCollection services)
    {
        services.AddScoped<UserRepository>();
        services.AddScoped<PostRepository>();
    }
}
