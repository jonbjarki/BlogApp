using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogAppAPI.Models.Dtos
{
    public class UserDto
    {
        public required string UserName { get; set; }
        public required string Email { get; set; }
    }
}