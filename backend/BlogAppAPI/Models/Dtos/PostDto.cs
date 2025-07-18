namespace BlogAppAPI.Models.Dtos
{
    public class PostDto
    {
        public int Id { get; set; }
        public string Content { get; set; } = "";
        public string Description { get; set; } = "";
        public string CoverImageUrl { get; set; } = "";
        public UserDto Author { get; set; } = null!;
    }
}