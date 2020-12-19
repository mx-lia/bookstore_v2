using System;
using System.Threading.Tasks;
using Application.CustomersAPI.Commands;
using Application.CustomersAPI.Requests;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CustomersController : BaseController
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get()
        {
            GetCustomerByIdRequest request = new GetCustomerByIdRequest();
            var result = await Mediator.Send(request);

            return Ok(result);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] UpdateCustomerCommand command)
        {
            try
            {
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
    }
}
