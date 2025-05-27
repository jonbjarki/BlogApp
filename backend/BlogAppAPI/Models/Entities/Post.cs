using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogAppAPI.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Content { get; set; } = "";

        public int AuthorId { get; set; }

        // Navigation properties
        public required User Author { get; set; }
    }
}