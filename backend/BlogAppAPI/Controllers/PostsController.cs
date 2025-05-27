using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlogAppAPI.Data;
using BlogAppAPI.Models;
using BlogAppAPI.Models.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace BlogAppAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private ApplicationDBContext _context;

        public PostsController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<PostDto> GetAllPosts()
        {
            return _context.Posts.Select(p => new PostDto
            {
                Id = p.Id,
                Content = p.Content,
                AuthorName = p.Author.Name
            });
        }
    }
}