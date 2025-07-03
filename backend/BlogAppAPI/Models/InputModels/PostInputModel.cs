using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogAppAPI.Models.InputModels
{
    public class PostInputModel
    {
        public required string Content { get; set; }
        public int AuthorId { get; set; }
    }
}