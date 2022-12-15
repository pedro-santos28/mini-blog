using backend.DTOs.Post;
using backend.Models;
using backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services;

public class PostService
{
    private readonly PostRepository _postRepository;

    public PostService([FromServices] PostRepository repository)
    {
        _postRepository = repository;
    }

    public async Task<PostResponseDTO> CreatePost(PostRequestDTO postRequestDTO)
    {
        Post post = new Post
        {
            Title = postRequestDTO.Title,
            Category = postRequestDTO.Category,
            Description = postRequestDTO.Description,
            Image = postRequestDTO.Image.FileName,
            CreatedAt = DateTime.Now
        };

        var resultado = await _postRepository.CreatePost(post);

        var resultadoFinal = new PostResponseDTO
        {
            Id = resultado.Id,
            Title = resultado.Title,
            Category = resultado.Category,
        };

        return resultadoFinal;
    }
}
