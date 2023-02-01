using System.Globalization;
using backend.DTOs.Post;
using backend.Models;
using backend.Repositories;
using Mapster;

namespace backend.Services;

public class PostService
{
    private readonly PostRepository _postRepository;

    public PostService(PostRepository repository)
    {
        _postRepository = repository;
    }

    public async Task<PostResponseDTO> CreatePost(PostRequestDTO postRequestDTO)
    {
        // Post post = new Post
        // {
        //     Title = postRequestDTO.Title,
        //     Category = postRequestDTO.Category,
        //     Description = postRequestDTO.Description,
        //     Image = postRequestDTO.Image.FileName,
        //     CreatedAt = DateTime.Now,
        // };

        Post post = postRequestDTO.Adapt<Post>();
        post.Image = postRequestDTO.Image.FileName;
        var dataAtual = DateTime.Now;
        string formattedDate = dataAtual.ToString("d", CultureInfo.CreateSpecificCulture("pt-BR"));
        post.CreatedAt = DateTime.ParseExact(formattedDate, "d", CultureInfo.CreateSpecificCulture("pt-BR"));

        var resultado = await _postRepository.CreatePost(post);

        var resultadoFinal = new PostResponseDTO
        {
            Id = resultado.Id,
            Title = resultado.Title,
            Category = resultado.Category,
            Image = resultado.Image,
        };
        return resultadoFinal;
    }

    public async Task<List<PostResponseDTO>> GetPosts()
    {
        List<Post> listPost = await _postRepository.GetPosts();
        List<PostResponseDTO> postResponseDTO = listPost.Adapt<List<PostResponseDTO>>();
        return postResponseDTO;
    }
    public async Task<PostResponseDTO> GetPost(int id)
    {
        Post Post = await _postRepository.GetPost(id);
        PostResponseDTO postResponseDTO = Post.Adapt<PostResponseDTO>();
        return postResponseDTO;
    }

    public async Task<Boolean> DeletePost(int id)
    {
        Post post = await _postRepository.GetPost(id);
        if (post != null)
        {
            return await _postRepository.DeletePost(post);
        }
        else
        {
            throw new Exception("Post não encontrado.");
        }
    }
    public async Task<PostResponseDTO> EditPost(PostRequestDTO postRequestDTO, int id)
    {
        Post post = await _postRepository.GetPost(id);

        if (post != null)
        {
            postRequestDTO.Adapt(post);
            post.Image = postRequestDTO.Image.FileName;
            _postRepository.EditPost(post);
            PostResponseDTO postResponseDTO = post.Adapt<PostResponseDTO>();
            return postResponseDTO;
        }
        else
        {
            throw new Exception("Post não encontrado.");
        }
    }
}
