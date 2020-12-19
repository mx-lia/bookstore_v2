using System.Threading.Tasks;
using Application.Authentication.Commands;
using Application.Common.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AuthenticationController : BaseController
    {
        private readonly ITokenService _tokenService;

        public AuthenticationController(ITokenService tokenService)
        {
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("signin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<string>> Login([FromBody] LoginCommand command)
        {
            Customer customer = await Mediator.Send(command);
            string token = _tokenService.AppendSecurityToken(customer);
            return Ok(new { customer, token });
        }

        [AllowAnonymous]
        [HttpPost("signup")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Register([FromBody] RegisterCommand command)
        {
            Customer customer = await Mediator.Send(command);
            string token = _tokenService.AppendSecurityToken(customer);
            return Ok(new { customer, token });
        }

        [HttpPost("signout")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Logout()
        {
            return await Task.FromResult(Ok());
        }
    }
}