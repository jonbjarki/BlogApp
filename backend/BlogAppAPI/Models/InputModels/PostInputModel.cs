using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogAppAPI.Models.InputModels
{
    public class PostInputModel
    {
        public required string Title { get; set; }
        public required string Content { get; set; }
        public string Description { get; set; } = "";
        public string CoverImageUrl { get; set; } = "";
    }
}