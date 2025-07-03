namespace BlogAppAPI.Models.Dtos
{
    public class PostDto
    {
        public int Id { get; set; }
        public string Content { get; set; } = "";
        public string AuthorName { get; set; } = "";
    }
}