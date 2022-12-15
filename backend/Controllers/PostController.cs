using backend.DTOs.Post;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
public class PostController : ControllerBase
{
    // private readonly PostService _postService;

    // public PostController([FromServices] PostService service)
    // {
    //     _postService = service;
    // }

    private readonly string _PastaDeUpload = @"C:\Users\pedro\Área de Trabalho\dev\react\mini-blog\frontend\public\uploads";

    [HttpPost("/post")]
    public async Task<IActionResult> CreatePost(
        [FromForm] PostRequestDTO postRequestDTO,
        [FromServices] PostService service
        )
    {
        // Verifica se o arquivo foi enviado
        if (postRequestDTO.Image == null || postRequestDTO.Image.Length == 0)
            return Content("Nenhum arquivo selecionado");

        // Obtém o caminho para salvar o arquivo
        // var filePath = Path.Combine(
        //     Directory.GetCurrentDirectory(), "wwwroot",
        //     "files", postRequestDTO.Image.FileName);

        var filePath = Path.Combine(_PastaDeUpload, postRequestDTO.Image.FileName);

        // Obtém o caminho do diretório
        var directoryPath = Path.GetDirectoryName(filePath);

        // Cria o diretório, se ele ainda não existir
        if (!Directory.Exists(directoryPath))
            Directory.CreateDirectory(directoryPath);

        //directoryPath+

        try
        {
            // Salva o arquivo
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await postRequestDTO.Image.CopyToAsync(stream);
            }

            Console.WriteLine("Titulo:" + postRequestDTO.Title);
            Console.WriteLine("Categoria:" + postRequestDTO.Category);
            Console.WriteLine("Imagem:" + postRequestDTO.Image.FileName);

            PostResponseDTO retorno = await service.CreatePost(postRequestDTO);

            return Ok(retorno);
        }
        catch (IOException)
        {
            // Adiciona uma mensagem de erro personalizada em caso de falha
            return Content("Ocorreu um erro ao salvar o arquivo");
        }
        catch (Exception exception)
        {
            return StatusCode(500, "Erro ao criar post! " + exception.Message);
        }
    }
}

