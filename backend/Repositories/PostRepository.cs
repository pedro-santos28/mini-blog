using backend.Context;
using backend.Models;

namespace backend.Repositories;

public class PostRepository
{
    private readonly ContextDB _context;

    //Construtor que vai injetar a dependência
    public PostRepository(ContextDB context)
    {
        _context = context;
    }

    public async Task<Post> CreatePost(Post postModel)
    {
        try
        {
            await _context.Post.AddAsync(postModel);
            await _context.SaveChangesAsync();
            return postModel;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
}
