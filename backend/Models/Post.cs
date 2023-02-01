namespace backend.Models;
using System.ComponentModel.DataAnnotations.Schema;
public class Post
{
    public int Id { get; set; }
    [Column(TypeName = "varchar(50)")]
    public string Title { get; set; }
    [Column(TypeName = "varchar(50)")]
    public string Category { get; set; }
    [Column(TypeName = "text")]
    public string Description { get; set; }

    [Column(TypeName = "varchar(100)")]
    public string Image { get; set; }

    public DateTime CreatedAt { get; set; }

    public User CreatedBy { get; set; }
}
