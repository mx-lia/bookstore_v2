using System;
using System.Threading.Tasks;
using Application.FavouriteBooksAPI.Commands;
using Application.FavouriteBooksAPI.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FavouriteBooksController : BaseController
    {
        [HttpGet]
        [Route("/api/favourites")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get([FromRoute] int customerId)
        {
            GetFavouritesByCustomerIdRequest request = new GetFavouritesByCustomerIdRequest() { CustomerId = customerId };
            var result = await Mediator.Send(request);

            return Ok(result);
        }

        [HttpPost]
        [Route("/api/favourites")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] CreateFavouriteBookCommand command)
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

        [HttpDelete]
        [Route("/api/favourites/{ISBN}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Delete([FromRoute] string ISBN)
        {
            try
            {
                DeleteFavouriteBookCommand command = new DeleteFavouriteBookCommand() { ISBN = ISBN };
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
