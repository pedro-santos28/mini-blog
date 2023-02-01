using System.ComponentModel.DataAnnotations.Schema;

namespace backend.DTOs.Post;

public class PostRequestDTO
{
    public string Title { get; set; }
    public string Category { get; set; }
    public string Description { get; set; }
    public IFormFile Image { get; set; }
}
