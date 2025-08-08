using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BlogAppAPI.Data;
using BlogAppAPI.Models;
using BlogAppAPI.Models.Dtos;
using BlogAppAPI.Models.InputModels;
using Microsoft.AspNetCore.Authorization;
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
                Title = p.Title,
                Content = p.Content,
                Description = p.Description,
                CoverImageUrl = p.CoverImageUrl,
                Author = new UserDto
                {
                    Email = p.Author.Email!,
                    UserName = p.Author.UserName!
                }
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
                    Title = p.Title,
                    Content = p.Content,
                    Description = p.Description,
                    CoverImageUrl = p.CoverImageUrl,
                    Author = new UserDto
                    {
                        UserName = p.Author.UserName!,
                        Email = p.Author.Email!
                    }
                })
                .FirstOrDefault();

            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }

        [Authorize(Policy = "RequireAuthenticatedUser")]
        [HttpPost]
        public IActionResult CreatePost([FromBody] PostInputModel post)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ??
                         throw new InvalidOperationException("User ID not found in claims.");
            var newPost = new Post
            {
                Content = post.Content,
                Title = post.Title,
                Description = post.Description,
                CoverImageUrl = post.CoverImageUrl,
                AuthorId = userId,
            };

            _context.Add(newPost);
            _context.SaveChanges();

            return CreatedAtAction("GetPostById", new { newPost.Id }, null);
        }

        [Authorize(Policy = "RequireAuthenticatedUser")]
        [HttpPatch("{id}")]
        public IActionResult UpdatePost(int id, [FromBody] UpdatePostInputModel post)
        {
            var existingPost = _context.Posts.Find(id);
            if (existingPost == null)
            {
                return NotFound();
            }

            // Only update fields that are provided (not null)
            if (post.Title != null)
            {
                existingPost.Title = post.Title;
            }

            if (post.Content != null)
            {
                existingPost.Content = post.Content;
            }

            if (post.Description != null)
            {
                existingPost.Description = post.Description;
            }

            if (post.CoverImageUrl != null)
            {
                existingPost.CoverImageUrl = post.CoverImageUrl;
            }

            _context.SaveChanges();

            return NoContent();
        }

        [Authorize(Policy = "RequireAuthenticatedUser")]
        [HttpDelete("{id}")]
        public IActionResult DeletePost(int id)
        {
            var postToDelete = _context.Posts.Find(id);

            if (postToDelete == null)
            {
                return NotFound();
            }

            _context.Posts.Remove(postToDelete);
            _context.SaveChanges();

            return NoContent();
        }
    }
}