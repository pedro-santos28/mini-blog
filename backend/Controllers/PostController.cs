using backend.DTOs.Post;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
// [Authorize]
[Route("post")]
public class PostController : ControllerBase
{
    private readonly string _pastaDeUpload = @"C:\Users\pedro\Área de Trabalho\dev\react\mini-blog\frontend\public\uploads";

    private readonly PostService _postService;

    public PostController([FromServices] PostService postService)
    {
        _postService = postService;
    }

    [HttpPost]
    public async Task<IActionResult> CreatePost(
        [FromForm] PostRequestDTO postRequestDTO)
    {
        // Verifica se o arquivo foi enviado
        if (postRequestDTO.Image == null || postRequestDTO.Image.Length == 0)
            return StatusCode(500, "Nenhum arquivo selecionado");

        // Obtém o caminho para salvar o arquivo
        var filePath = Path.Combine(_pastaDeUpload, postRequestDTO.Image.FileName);

        // Obtém o caminho do diretório
        var directoryPath = Path.GetDirectoryName(filePath);

        // Cria o diretório, se ele ainda não existir
        if (!Directory.Exists(directoryPath))
            Directory.CreateDirectory(directoryPath);

        try
        {
            // Salva o arquivo
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await postRequestDTO.Image.CopyToAsync(stream);
            }
            PostResponseDTO retorno = await _postService.CreatePost(postRequestDTO);
            return StatusCode(201, retorno);
        }
        catch (IOException)
        {
            // Adiciona uma mensagem de erro personalizada em caso de falha
            return StatusCode(500, "Ocorreu um erro ao salvar o arquivo");
        }
        catch (Exception exception)
        {
            return StatusCode(500, "Erro ao criar post! " + exception.Message);
        }
    }

    [HttpGet]
    public async Task<List<PostResponseDTO>> GetPosts()
    {
        try
        {
            List<PostResponseDTO> postResponseDTO = await _postService.GetPosts();
            return postResponseDTO;
        }
        catch (Exception exception)
        {
            throw new Exception("Não foi possível recuperar os posts! " + exception.Message);
        }
    }

    [HttpGet("{id:int}")]
    public async Task<PostResponseDTO> GetPost([FromRoute] int id)
    {
        try
        {
            PostResponseDTO postResponseDTO = await _postService.GetPost(id);
            return postResponseDTO;
        }
        catch (Exception exception)
        {
            throw new Exception("Não foi possível recuperar os posts! " + exception.Message);
        }
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeletePost([FromRoute] int id)
    {
        try
        {
            await _postService.DeletePost(id);
            return StatusCode(204);
        }
        catch (Exception exception)
        {
            return StatusCode(500, exception.Message);
        }
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> EditPost(
        [FromForm] PostRequestDTO postRequestDTO,
        [FromRoute] int id)
    {
        // Verifica se o arquivo foi enviado
        if (postRequestDTO.Image == null || postRequestDTO.Image.Length == 0)
            return StatusCode(500, "Nenhum arquivo selecionado");

        // Obtém o caminho para salvar o arquivo
        var filePath = Path.Combine(_pastaDeUpload, postRequestDTO.Image.FileName);

        // Obtém o caminho do diretório
        var directoryPath = Path.GetDirectoryName(filePath);

        // Cria o diretório, se ele ainda não existir
        if (!Directory.Exists(directoryPath))
            Directory.CreateDirectory(directoryPath);

        try
        {
            // Salva o arquivo
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await postRequestDTO.Image.CopyToAsync(stream);
            }
            PostResponseDTO retorno = await _postService.EditPost(postRequestDTO, id);
            return StatusCode(200, retorno);
        }
        catch (IOException)
        {
            // Adiciona uma mensagem de erro personalizada em caso de falha
            return StatusCode(500, "Ocorreu um erro ao salvar o arquivo");
        }
        catch (Exception exception)
        {
            return StatusCode(500, "Erro ao atualizar post! " + exception.Message);
        }
    }
}