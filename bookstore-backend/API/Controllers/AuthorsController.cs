using System;
using System.Threading.Tasks;
using Application.AuthorAPI.Requests;
using Application.AuthorsAPI.Commands;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AuthorsController : BaseController
    {
        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get()
        {
            GetAuthorsRequest request = new GetAuthorsRequest();
            var result = await Mediator.Send(request);

            return Ok(result);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] CreateAuthorCommand command)
        {
            try
            {
                var created = await Mediator.Send(command);
                return Ok(created);
            }
            catch (Exception ex)
            {
                var message = new
                {
                    message = ex.Message
                };
                Response.StatusCode = 400;
                return new JsonResult(message);
            }
        }
    }
}
