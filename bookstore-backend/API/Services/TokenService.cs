using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using API.Settings;
using Application.Common.Interfaces;
using Microsoft.IdentityModel.Tokens;
using Domain.Entities;
using Microsoft.Extensions.Primitives;
using System.Linq;

namespace API.Services
{
    public class TokenService : ITokenService
    {

        private readonly AppConfiguration _appConfiguration;

        private readonly IHttpContextAccessor _httpContextAccessor;

        public TokenService(IOptions<AppConfiguration> appConfiguration, IHttpContextAccessor httpContextAccessor)
        {
            _appConfiguration = appConfiguration.Value;
            _httpContextAccessor = httpContextAccessor;
        }

        public int GetUserId()
        {
            _httpContextAccessor.HttpContext.Request.Headers.TryGetValue("Authorization", out StringValues stringToken);
            var tokenHandler = new JwtSecurityTokenHandler();
            JwtSecurityToken token = tokenHandler.ReadToken(stringToken.ToString().Replace("Bearer ", "")) as JwtSecurityToken;
            return int.Parse(token.Claims.First(claim => claim.Type == "nameid").Value);
        }

        public string AppendSecurityToken(Customer customer)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appConfiguration.Audience.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, customer.Id.ToString()),
                    new Claim(ClaimTypes.Email, customer.Email),
                    new Claim(ClaimTypes.Role, customer.Role.ToString()),
                }),
                Expires = DateTime.UtcNow.AddMinutes(_appConfiguration.Audience.TokenExpiryMinutes),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _appConfiguration.Audience.Iss,
                Audience = _appConfiguration.Audience.Aud,
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            string tokenValue = tokenHandler.WriteToken(token);
            _httpContextAccessor.HttpContext.Response.Headers.Append("Authorization", "Bearer " + tokenValue);
            return tokenValue;
        }

        public string GetUserName()
        {
            return "no username";
        }
    }
}
