using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlogAppAPI.Data;
using BlogAppAPI.Models;
using BlogAppAPI.Models.Dtos;
using BlogAppAPI.Models.InputModels;
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
        public IActionResult GetPostById(int id) {
            throw new NotImplementedException();
        }

        [HttpPost]
        public IActionResult CreatePost([FromBody] PostInputModel post)
        {
            var newPost = new Post
            {
                Content = post.Content,
                AuthorId = post.AuthorId
            };

            _context.Add(newPost);
            _context.SaveChanges();

            return CreatedAtAction("GetPostById", new { newPost.Id }, null);
        }
    }
}