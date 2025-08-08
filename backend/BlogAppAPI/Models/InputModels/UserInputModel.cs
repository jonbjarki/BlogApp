using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogAppAPI.Models.InputModels
{
    public class UserInputModel
    {
        public string Email { get; set; } = "";
        public string UserName { get; set; } = "";
        public string ProfileImage { get; set; } = "";
    }
}