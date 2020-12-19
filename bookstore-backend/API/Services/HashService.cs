using Application.Common.Interfaces;

namespace API.Services
{
    public class HashService : IHashService
    {
        private static readonly string SALT = "r=123--4(&31_+123$@#";
        public string GetHash(string input)
        {
            string pass = SALT + input;
            string hash = BCrypt.Net.BCrypt.HashPassword(pass);
            return hash;
        }
        public bool Verify(string candidate, string hashed)
        {
            return BCrypt.Net.BCrypt.Verify(SALT + candidate, hashed);
        }
    }
}
