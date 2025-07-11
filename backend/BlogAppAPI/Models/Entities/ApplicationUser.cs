using Microsoft.AspNetCore.Identity;

namespace BlogAppAPI.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; } = "";
        public string ProfileImage { get; set; } = "";
    }
}