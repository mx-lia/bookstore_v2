using System.Linq;
using System.Security.Authentication;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

// ReSharper disable UnusedAutoPropertyAccessor.Global
namespace Application.Authentication.Commands
{
    public class LoginCommand : IRequest<Customer>
    {
        public string Email { get; set; }

        public string Password { get; set; }
    }

    public class LoginCommandHandler : IRequestHandler<LoginCommand, Customer>
    {
        private readonly IDbContext context;
        private readonly IHashService hashService;
        public LoginCommandHandler(IDbContext dbContext, IHashService hashService)
        {
            context = dbContext;
            this.hashService = hashService;
        }
        public async Task<Customer> Handle(LoginCommand command, CancellationToken cancellationToken)
        {
            Customer customer = context.Customers.Where(customer => customer.Email == command.Email).FirstOrDefault();

            if (customer == null)
            {
                throw new InvalidCredentialException($"Email {command.Email} doesn't registered in the system!");
            }

            if(!hashService.Verify(command.Password, customer.Password))
            {
                throw new InvalidCredentialException($"Invalid password for {command.Email}");
            }

            return customer;
        }
    }
}