using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BlogAppAPI.Data;
using BlogAppAPI.Models;
using BlogAppAPI.Models.Dtos;
using BlogAppAPI.Models.InputModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BlogAppAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public PostsController(ApplicationDBContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }


        [HttpGet]
        public IActionResult GetAllPosts()
        {
            return Ok(_context.Posts.Select(p => new PostDto
            {
                Id = p.Id,
                Content = p.Content,
                AuthorName = p.Author.Name
            }));
        }

        [HttpGet("{id}", Name = "GetPostById")]
        public IActionResult GetPostById(int id)
        {
            var post = _context.Posts
                .Where(p => p.Id == id)
                .Select(p => new PostDto
                {
                    Id = p.Id,
                    AuthorName = p.Author.Email!,
                    Content = p.Content,
                })
                .FirstOrDefault();

            if (post == null) {
                return NotFound();
            }

            return Ok(post);
        }

        [HttpPost]
        public IActionResult CreatePost([FromBody] PostInputModel post)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? 
                         throw new InvalidOperationException("User ID not found in claims.");
            var newPost = new Post
            {
                Content = post.Content,
                AuthorId = userId,
            };

            _context.Add(newPost);
            _context.SaveChanges();

            return CreatedAtAction("GetPostById", new { newPost.Id }, null);
        }
    }
}