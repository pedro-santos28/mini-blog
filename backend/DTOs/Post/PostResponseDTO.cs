namespace backend.DTOs.Post;

public class PostResponseDTO
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Category { get; set; }
    public string Image { get; set; }
    public DateTime CreatedAt { get; set; }
}
