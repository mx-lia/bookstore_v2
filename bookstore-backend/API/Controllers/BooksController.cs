using System;
using System.Threading.Tasks;
using Application.BooksAPI.Commands;
using Application.BooksAPI.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BooksController : BaseController
    {
        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get([FromQuery] GetBooksRequest request)
        {
            var result = await Mediator.Send(request);

            return Ok(result);
        }

        [HttpGet]
        [Route("{ISBN}")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get([FromRoute] string ISBN)
        {
            GetBookByISBNRequest request = new GetBookByISBNRequest() { ISBN = ISBN };
            var result = await Mediator.Send(request);

            return Ok(result);
        }

        [HttpGet("count")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetCount()
        {
            GetBooksCountRequest request = new GetBooksCountRequest();
            var result = await Mediator.Send(request);

            return Ok(result);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] CreateBookCommand command)
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

        [HttpPut]
        [Route("{ISBN}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromRoute] string ISBN, [FromBody] UpdateBookCommand command)
        {
            try
            {
                command.ISBN = ISBN;
                var updated = await Mediator.Send(command);
                return Ok(updated);
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

        [HttpDelete]
        [Route("{ISBN}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Delete([FromRoute] string ISBN)
        {
            try
            {
                DeleteBookCommand command = new DeleteBookCommand() { ISBN = ISBN };
                var deleted = await Mediator.Send(command);
                return Ok(deleted);
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
