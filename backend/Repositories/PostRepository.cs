using backend.Context;
using backend.Models;
using Microsoft.EntityFrameworkCore;

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

    public async Task<List<Post>> GetPosts()
    {
        List<Post> listPost = await _context.Post.AsNoTracking().ToListAsync();
        return listPost;
    }

    public async Task<Post> GetPost(int id)
    {
        Post Post = await _context.Post.AsNoTracking().FirstOrDefaultAsync(Post => Post.Id == id);
        return Post;
    }

    public async Task<Boolean> DeletePost(Post post)
    {
        _context.Remove(post);
        await _context.SaveChangesAsync();
        return true;
    }
    public void EditPost(Post post)
    {
        _context.Update(post);
        _context.SaveChanges();
    }
}
