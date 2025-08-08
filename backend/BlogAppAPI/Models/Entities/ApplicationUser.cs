using Microsoft.AspNetCore.Identity;

namespace BlogAppAPI.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string ProfileImage { get; set; } = "";
    }
}