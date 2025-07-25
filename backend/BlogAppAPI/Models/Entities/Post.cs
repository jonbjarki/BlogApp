namespace BlogAppAPI.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string Content { get; set; } = "";
        public string Description { get; set; } = "";
        public string CoverImageUrl { get; set; } = "";
        public string AuthorId { get; set; } = null!;

        // Navigation properties
        public ApplicationUser Author { get; set; } = null!;
    }
}