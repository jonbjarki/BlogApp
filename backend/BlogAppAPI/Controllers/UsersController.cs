// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using BlogAppAPI.Data;
// using BlogAppAPI.Models;
// using BlogAppAPI.Models.InputModels;
// using Microsoft.AspNetCore.Mvc;

// namespace BlogAppAPI.Controllers
// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class UsersController : ControllerBase
//     {
//         private readonly ApplicationDBContext _context;

//         public UsersController(ApplicationDBContext context)
//         {
//             _context = context;
//         }

//         [HttpGet("{id}", Name = "GetUserById")]
//         public IActionResult GetUserById(string id)
//         {
//             var user = _context.Users.FirstOrDefault(u => u.Id == id);
//             if (user == null)
//             {
//                 return NotFound();
//             }
//             return Ok(user);


//         }

//         [HttpPost]
//         public IActionResult CreateUser([FromBody] UserInputModel user)
//         {
//             var newUser = new User
//             {
//                 Name = user.Name,
//                 Email = user.Email,
//                 ProfileImage = user.ProfileImage
//             };

//             _context.Users.Add(newUser);
//             _context.SaveChanges();

//             return CreatedAtAction("GetUserById", new { newUser.Id }, null);
//         }
//     }
// }